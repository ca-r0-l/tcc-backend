import Agv from "../entities/Agv";
import AgvRepository from "../gateways/AgvRepository";
import HelixService from "../services/HelixService";
import Zone from "../entities/Zone";

export default class AgvService {

    constructor(
        private agvRepository: AgvRepository,
        private helixService: HelixService,
    ) { }

    public async save(agv: Agv): Promise<Agv> {

        // await this.checkZoneNotExist(agv.name)
        console.log(agv);
        
        const zonesPath = agv.path.map(zone => {
            return {
                id: zone.id,
                name: zone.name,
                rfid: zone.rfid
            } as Zone
        });
        return await this.agvRepository.save({
            id: agv.id,
            name: agv.name,
            helixId: agv.helixId,
            location: agv.location,
            batteryPercentage: agv.batteryPercentage,
            path: zonesPath
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
