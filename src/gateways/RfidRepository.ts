import Rfid from "../entities/Rfid";

export default interface RfidRepository {
    save(rfid: Rfid): Promise<Rfid>
    
    findAll(): Promise<Rfid[]>

    delete(id: string): Promise<void>

    findById(id: string): Promise<Rfid | null>

    findByHelixId(id: string): Promise<Rfid | null>
}