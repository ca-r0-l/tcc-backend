import Zone from "../entities/Zone";

export default interface ZoneRepository {
    save(zone: Zone): Promise<Zone>
    
    findAll(): Promise<Zone[]>

    findById(id: string): Promise<Zone | null>

    delete(id: string): Promise<void>

    findByName(name: string): Promise<Zone | null>
    
    update(id: string, zone: JSON): Promise<Zone | null>
}