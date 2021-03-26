import Agv from "../entities/Agv";

export default interface AgvRepository {
    save(zone: Agv): Promise<Agv>
    
    findAll(): Promise<Agv[]>

    findById(id: string): Promise<Agv | null>

    delete(id: string): Promise<void>
}