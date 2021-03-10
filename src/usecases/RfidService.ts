import Rfid from "../entities/Rfid";
import RfidRepository from "../gateways/RfidRepository";
import RfidExistsError from "../errors/RfidExistsError";
import ZoneService from "./ZoneService";

export default class RfidService {

    constructor(private rfidRepository: RfidRepository, private zoneService: ZoneService) {}

    public async save(rfid: Rfid): Promise<Rfid> {

        await this.checkRfidExist(rfid.helixId);

        await this.zoneService.checkZoneExist(rfid.name);
        
        return await this.rfidRepository.save(rfid);
    }

    private async checkRfidExist(helixId: string): Promise<void> {
        const user = await this.findByHelixId(helixId);
        if (user !== null) {
            throw new RfidExistsError("Rfid já existe");
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
