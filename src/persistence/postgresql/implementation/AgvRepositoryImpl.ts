import { getRepository } from "typeorm";
import Agv from "../../../entities/Agv";
import AgvRepository from "../../../gateways/AgvRepository";
import AgvModel from "../models/AgvModel";
import RfidModel from "../models/RfidModel";
import ZoneModel from "../models/ZoneModel";

export default class AgvRepositoryImpl implements AgvRepository {
    public async delete(id: string): Promise<void> {
        const agvRepository = getRepository(AgvModel);
        
        await agvRepository.delete(id);
    }
    
    public async save(agv: Agv): Promise<Agv> {

        const agvRepository = getRepository(AgvModel);

        const path = agv.path.map(zone =>{
            return {
                id: zone.id,
                name: zone.name,
                rfif: {
                    id: zone.rfid.id,
                    name: zone.rfid.name,
                    helixId: zone.rfid.helixId
                } as unknown as RfidModel
            } as unknown as ZoneModel
           }
        )
        
        const agvToSave = {
            id: agv.id,
            name: agv.name,
            helixId: agv.helixId,
            batteryPercentage: agv.batteryPercentage,
            location: agv.location,
            path: path
        } as AgvModel

        agvToSave.path = path;
        
        return this.toAgv(await agvRepository.save(
            agvRepository.create(agvToSave)
        ));
    }

    public async findAll(): Promise<Agv[]> {
        const agvRepository = getRepository(AgvModel);
        
        const allAgvs = await agvRepository.find({ relations: ["path"] });
        
        return allAgvs.map(agv => this.toAgv(agv));
    }

    public async findById(id: string): Promise<Agv | null> {
        const agvRepository = getRepository(AgvModel);

        return this.toAgv(await agvRepository.findOne({ where : {id: id}}));
    }

    public async findByHelixId(helixId: string): Promise<Agv | null> {
        const agvRepository = getRepository(AgvModel);
        
        return this.toAgv(await agvRepository.findOne({ where : {helixId: helixId}}));
    }

    public async findByName(name: string): Promise<Agv | null> {
        const agvRepository = getRepository(AgvModel);

        return this.toAgv(await agvRepository.findOne({ where : {name: name}}));
    }

    public async update(agv: Agv): Promise<void> {
        const agvRepository = getRepository(AgvModel);

        await agvRepository.update({ id: agv.id }, agv);
    }
    
    private toAgv(agvModel?: AgvModel): Agv | null{
        if (agvModel !== null && agvModel !== undefined) {
            return {
                id: agvModel.id,
                name: agvModel.name,
                helixId: agvModel.helixId,
                batteryPercentage: agvModel.batteryPercentage,
                location: agvModel.location,
                path: agvModel.path,
            } as Agv;
        } else {
            return null;
        }
    }
}
