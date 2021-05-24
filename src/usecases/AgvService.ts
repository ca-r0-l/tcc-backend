import Agv from "../entities/Agv";
import AgvExistsError from "../errors/AgvExistsError";
import AgvRepository from "../gateways/AgvRepository";
import RfidModel from "../persistence/postgresql/models/RfidModel";
import ZoneModel from "../persistence/postgresql/models/ZoneModel";
import HelixService, { HelixGetSensorResponse } from "../services/HelixService";
import RfidService from "./RfidService";
import ZoneService from "./ZoneService";

export default class AgvService {

    constructor(
        private agvRepository: AgvRepository,
        private helixService: HelixService,
        private rfidService: RfidService,
        private zoneService: ZoneService,
    ) { }

    public async save(agv: Agv): Promise<Agv> {
        await this.verifyAlreadyExists(agv.helixId);

        const agvFromHelix = await this.getLastAgvStatusById(agv.helixId);
        const zones = await this.zoneService.findAll();
        const rfidInTheMoment = await this.rfidService.findByHelixId(agvFromHelix.location.value);
        const zoneInTheMoment = zones.find(i => i.rfid.id == rfidInTheMoment.id);
        
        return await this.agvRepository.save({
            id: agv.id,
            name: agv.name,
            helixId: agv.helixId,
            location: zoneInTheMoment.id,
            batteryPercentage: Math.round(Number.parseFloat(agvFromHelix.voltage.value)),
            path: zones
        } as Agv);  
    }

    private async verifyAlreadyExists(helixId: string): Promise<void> {
        const agv = await this.findByHelixId(helixId);

        if (agv !== null && agv !== undefined) {
            throw new AgvExistsError("Agv com esse id do helix já existe");
        }
    }

    public async findAllFromHelix(): Promise<any> {
        return await this.helixService.getAllAgvsNames();
    }

    public async getLastAgvStatusById(id: string): Promise<HelixGetSensorResponse> {
        return await this.helixService.getLastAgvStatusById(id);
    }

    public async findById(id: string): Promise<Agv | null> {
        return await this.agvRepository.findById(id);
    }

    public async findByHelixId(helixId: string): Promise<Agv | null> {        
        return await this.agvRepository.findByHelixId(helixId);
    }

    public async updateLocationAndBattery(helixId: string, location: string, voltage: number): Promise<void> {
        const agv = await this.agvRepository.findByHelixId(helixId);
        
        const zones = await this.zoneService.findAll();
        const rfidInTheMoment = await this.rfidService.findByHelixId(location);
        const zoneInTheMoment = zones.find(i => i.rfid.id == rfidInTheMoment.id);
        
        await this.agvRepository.update(agv.id, { location: zoneInTheMoment.id });
        await this.agvRepository.update(agv.id, { batteryPercentage: Math.round(Number.parseFloat(voltage.toString())) });
    }   

    public async findAll(): Promise<Agv[]> {
        const agvs = await this.agvRepository.findAll();
        const zones = await this.zoneService.findAll();
        return agvs.map(agv => {
            let location = "";
            if (zones !== null && zones.length > 0) {
                location = zones.find(i => i.id === agv.location).name;
            }

            return {
                id: agv.id,
                name: agv.name,
                helixId: agv.helixId,
                batteryPercentage: agv.batteryPercentage,
                location: location,
                path: zones,
            } as Agv
        })
    }

    public async delete(id: string): Promise<void> {
        return await this.agvRepository.delete(id);
    }
}
