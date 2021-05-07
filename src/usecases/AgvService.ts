import Agv from "../entities/Agv";
import AgvRepository from "../gateways/AgvRepository";
import HelixService from "../services/HelixService";
import ZoneService from "./ZoneService";

export default class AgvService {

    constructor(
        private agvRepository: AgvRepository,
        private helixService: HelixService,
        private zoneService: ZoneService
    ) { }

    public async save(agv: Agv): Promise<Agv> {

        // await this.checkZoneNotExist(agv.name)
        
        return await this.agvRepository.save({
            id: agv.id,
            name: agv.name,
            helixId: agv.helixId,
            location: agv.location,
            batteryPercentage: agv.batteryPercentage,
            path: agv.path
        } as Agv);
    }
    
    // private async checkZoneNotExist(name: string): Promise<void> {
    //     const rfid = await this.findByName(name);
        
    //     if (rfid !== null) {
    //         throw new ZoneExistsError("Zona já existe");
    //     }
    // }
    
    // public async checkZoneExist(name: string): Promise<void> {
    //     const rfid = await this.findByName(name);
        
    //     if (rfid === null) {
    //         throw new ZoneExistsError("Zona não existe");
    //     }
    // }

    public async findAllFromHelix(): Promise<any> {
        return await this.helixService.getAllAgvsNames();
    }

    public async findById(id: string): Promise<Agv | null> {
        return await this.agvRepository.findById(id);
    }

    public async findAll(): Promise<Agv[]> {
        return await this.agvRepository.findAll();
    }

    public async delete(id: string): Promise<void> {
        return await this.agvRepository.delete(id);
    }
}