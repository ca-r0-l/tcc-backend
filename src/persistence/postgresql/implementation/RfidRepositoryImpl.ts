import { getRepository } from "typeorm";
import RfidModel from "../models/RfidModel";
import Rfid from "../../../entities/Rfid";
import RfidRepository from "../../../gateways/RfidRepository";

export default class ZoneRepositoryImpl implements RfidRepository {
    
    public async save(rfid: Rfid): Promise<Rfid> {
        const rfidRepository = getRepository(RfidModel);

        console.log('\n\n\n', rfid, '\n\n\n\n');

        const rfidToSave = {
            id: rfid.id,
            name: rfid.name,
            zone: rfid.zone,
            helixId: rfid.helixId,
        } as RfidModel

        console.log('\n\n\n', rfidToSave, '\n\n\n\n');
        
        
        return this.toRfid(await rfidRepository.save(
            rfidRepository.create(rfidToSave)
        ));
    }

    public async findAll(): Promise<Rfid[]> {
        const rfidRepository = getRepository(RfidModel);
        
        const allRfid = await rfidRepository.find();
        return allRfid.map(Rfid => this.toRfid(Rfid));
    }

    public async findById(id: string): Promise<Rfid | null> {
        const rfidRepository = getRepository(RfidModel);

        return this.toRfid(await rfidRepository.findOne({ where : {id: id}}));
    }

    public async findByHelixId(id: string): Promise<Rfid | null> {
        const rfidRepository = getRepository(RfidModel);

        return this.toRfid(await rfidRepository.findOne({ where : {helixId: id}}));
    }
    
    private toRfid(rfidModel?: RfidModel): Rfid | null{
        if (rfidModel !== null && rfidModel !== undefined) {
            return {
                id: rfidModel.id,
                name: rfidModel.name,
                zone: rfidModel.zone,
                helixId: rfidModel.helixId
            } as Rfid;
        } else {
            return null;
        }
    }
}
