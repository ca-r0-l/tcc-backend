import Agv from "../entities/Agv";

export default interface AgvRepository {
    save(agv: Agv): Promise<Agv>
    
    findAll(): Promise<Agv[]>

    findById(id: string): Promise<Agv | null>

    findByHelixId(helixId: string): Promise<Agv | null>

    delete(id: string): Promise<void>

    update(agv: Agv): Promise<void>
}