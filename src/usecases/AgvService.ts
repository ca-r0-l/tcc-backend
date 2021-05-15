import Agv from "../entities/Agv";
import AgvExistsError from "../errors/AgvExistsError";
import AgvRepository from "../gateways/AgvRepository";
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
            batteryPercentage: Number.parseFloat(agvFromHelix.voltage.value) * 100,
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

    public async findAll(): Promise<Agv[]> {
        const agvs = await this.agvRepository.findAll();

        console.clear();
        console.log(agvs)

        return agvs.map(agv => {
            let location = "";
            if (agv.path !== null && agv.path.length > 0) {
                location = agv.path.find(i => i.id === agv.location).name;
            }

            return {
                id: agv.id,
                name: agv.name,
                helixId: agv.helixId,
                batteryPercentage: agv.batteryPercentage,
                location: location,
                path: agv.path,
            } as Agv
        })
    }

    public async delete(id: string): Promise<void> {
        return await this.agvRepository.delete(id);
    }
}
