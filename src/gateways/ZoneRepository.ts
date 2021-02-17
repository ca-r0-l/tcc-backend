import Zone from "../entities/Zone";

export default interface ZoneRepository {
    save(zone: Zone): Promise<Zone>
    
    findAll(): Promise<Zone[]>

    findById(id: string): Promise<Zone>

    findByName(name: string): Promise<Zone | null>
}