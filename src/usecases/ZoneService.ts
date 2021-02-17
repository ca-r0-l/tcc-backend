import ZoneRepository from "../gateways/ZoneRepository";
import Zone from "../entities/Zone";
import ZoneExistsError from "../errors/ZoneExistsError";

export default class ZoneService {

    constructor(private zoneRepository: ZoneRepository) {}

    public async save(zone: Zone): Promise<Zone> {

        if (!await this.verifyZoneExists(zone.name)) {
            throw new ZoneExistsError("Zona já existe");
        }
        
        return await this.zoneRepository.save({
            id: zone.id,
            name: zone.name
        } as Zone);
    }

    private async verifyZoneExists(name: string): Promise<boolean> {
        const user = await this.findByName(name);
        if (user === null) return true;
        return false;
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
}
