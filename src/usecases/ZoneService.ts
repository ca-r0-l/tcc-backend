import ZoneRepository from "../gateways/ZoneRepository";
import Zone from "../entities/Zone";
import ZoneExistsError from "../errors/ZoneExistsError";

export default class ZoneService {

    constructor(private zoneRepository: ZoneRepository) {}

    public async save(zone: Zone): Promise<Zone> {

        await this.checkZoneNotExist(zone.name)
        
        return await this.zoneRepository.save({
            id: zone.id,
            name: zone.name,
            rfid: zone.rfid
        } as Zone);
    }
    
    private async checkZoneNotExist(name: string): Promise<void> {
        const rfid = await this.findByName(name);
        
        if (rfid !== null) {
            throw new ZoneExistsError("Zona já existe");
        }
    }
    
    public async checkZoneExist(name: string): Promise<void> {
        const rfid = await this.findByName(name);
        
        if (rfid === null) {
            throw new ZoneExistsError("Zona não existe");
        }
    }

    public async findById(id: string): Promise<Zone | null> {
        return await this.zoneRepository.findById(id);
    }

    public async findByName(zoneName: string): Promise<Zone | null> {
        return await this.zoneRepository.findByName(zoneName);
    }

    public async findAll(): Promise<Zone[]> {
        return await this.zoneRepository.findAll();
    }

    public async delete(id: string): Promise<void> {
        return await this.zoneRepository.delete(id);
    }
}
