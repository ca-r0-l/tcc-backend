import { getRepository } from "typeorm";
import ZoneRepository from "../../../gateways/ZoneRepository";
import ZoneModel from "../models/ZoneModel";
import Zone from "../../../entities/Zone";

export default class ZoneRepositoryImpl implements ZoneRepository {
    public async delete(id: string): Promise<void> {
        const zoneRepository = getRepository(ZoneModel);
        
        await zoneRepository.delete(id);
    }
    
    public async save(user: Zone): Promise<Zone> {
        const zoneRepository = getRepository(ZoneModel);

        const userToSave = {
            id: user.id,
            name: user.name
        } as ZoneModel
        
        return this.toZone(await zoneRepository.save(
            zoneRepository.create(userToSave)
        ));
    }

    public async findAll(): Promise<Zone[]> {
        const zoneRepository = getRepository(ZoneModel);
        
        const allZones = await zoneRepository.find();
        return allZones.map(zone => this.toZone(zone));
    }

    public async findById(id: string): Promise<Zone | null> {
        const zoneRepository = getRepository(ZoneModel);

        return this.toZone(await zoneRepository.findOne({ where : {id: id}}));
    }

    public async findByName(name: string): Promise<Zone | null> {
        const zoneRepository = getRepository(ZoneModel);

        return this.toZone(await zoneRepository.findOne({ where : {name: name}}));
    }
    
    private toZone(zoneModel?: ZoneModel): Zone | null{
        if (zoneModel !== null && zoneModel !== undefined) {
            return {
                id: zoneModel.id,
                name: zoneModel.name
            } as Zone;
        } else {
            return null;
        }
    }
}
