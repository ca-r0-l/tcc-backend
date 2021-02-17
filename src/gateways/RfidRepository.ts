import Rfid from "../entities/Rfid";

export default interface RfidRepository {
    save(rfid: Rfid): Promise<Rfid>
    
    findAll(): Promise<Rfid[]>

    findById(id: string): Promise<Rfid | null>

    findByHelixId(id: string): Promise<Rfid | null>
}