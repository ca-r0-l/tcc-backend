import Rfid from "../entities/Rfid";
import RfidRepository from "../gateways/RfidRepository";
import RfidExistsError from "../errors/RfidExistsError";

export default class RfidService {

    constructor(
        private rfidRepository: RfidRepository
    ) { }

    public async save(rfid: Rfid): Promise<Rfid> {

        await this.checkRfidExist(rfid.helixId);
        
        return await this.rfidRepository.save(rfid);
    }

    private async checkRfidExist(helixId: string): Promise<void> {
        const rfid = await this.findByHelixId(helixId);
        if (rfid !== null) {
            throw new RfidExistsError("Rfid com esse id do Helix já existe");
        }
    }

    public async findById(id: string): Promise<Rfid | null> {
        return await this.rfidRepository.findById(id);
    }

    public async findByHelixId(helixId: string): Promise<Rfid | null> {
        return await this.rfidRepository.findByHelixId(helixId);
    }

    public async findAll(): Promise<Rfid[]> {
        return await this.rfidRepository.findAll();
    }

    public async delete(id: string): Promise<void> {
        return await this.rfidRepository.delete(id);
    }
}
