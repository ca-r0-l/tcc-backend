import Rfid from "../entities/Rfid";
import RfidRepository from "../gateways/RfidRepository";
import RfidExistsError from "../errors/RfidExistsError";
import ZoneRepository from "../gateways/ZoneRepository";

export default class RfidService {

    constructor(private rfidRepository: RfidRepository, private zoneRepository: ZoneRepository) {}

    public async save(rfid: Rfid): Promise<Rfid> {

        if (!await this.verifyRfidExists(rfid.helixId)) {
            throw new RfidExistsError("Rfid já existe");
        }        
        
        return await this.rfidRepository.save(rfid);
    }

    private async verifyRfidExists(helixId: string): Promise<boolean> {
        const user = await this.findByHelixId(helixId);
        if (user === null) return true;
        return false;
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
}
