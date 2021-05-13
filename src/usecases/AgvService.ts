import Agv from "../entities/Agv";
import AgvRepository from "../gateways/AgvRepository";
import HelixService, { HelixGetSensorResponse } from "../services/HelixService";
import RfidService from "./RfidService";

export default class AgvService {

    constructor(
        private agvRepository: AgvRepository,
        private helixService: HelixService,
        private rfidService: RfidService,
    ) { }

    public async save(agv: Agv): Promise<Agv> {
        const agvFromHelix = await this.getLastAgvStatusById(agv.helixId);
        const rfidInTheMoment = await this.rfidService.findByHelixId(agvFromHelix.location.value);        
        const zoneInTheMoment = agv.path.find(i => i.rfid.id == rfidInTheMoment.id);

        return await this.agvRepository.save({
            id: agv.id,
            name: agv.name,
            helixId: agv.helixId,
            location: zoneInTheMoment.id,
            batteryPercentage: Number.parseInt(agvFromHelix.voltage.value) * 100,
            path: agv.path
        } as Agv);
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

    public async findAll(): Promise<Agv[]> {
        const agvs = await this.agvRepository.findAll();

        return agvs.map(agv => {
            const location = agv.path.find(i => i.id === agv.location);

            return {
                id: agv.id,
                name: agv.name,
                helixId: agv.helixId,
                batteryPercentage: agv.batteryPercentage,
                location: location.name,
                path: agv.path,
            } as Agv
        })
    }

    public async delete(id: string): Promise<void> {
        return await this.agvRepository.delete(id);
    }
}
