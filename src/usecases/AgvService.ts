import Agv from "../entities/Agv";
import AgvRepository from "../gateways/AgvRepository";
import HelixService from "../services/HelixService";

export default class AgvService {

    constructor(
        private agvRepository: AgvRepository,
        private helixService: HelixService,
    ) { }

    public async save(agv: Agv): Promise<Agv> {
        return await this.agvRepository.save({
            id: agv.id,
            name: agv.name,
            helixId: agv.helixId,
            location: agv.location,
            batteryPercentage: agv.batteryPercentage,
            path: agv.path
        } as Agv);
    }

    public async findAllFromHelix(): Promise<any> {
        return await this.helixService.getAllAgvsNames();
    }

    public async getLastAgvStatusById(id: string): Promise<any> {
        return await this.helixService.getLastAgvStatusById(id);
    }

    public async findById(id: string): Promise<Agv | null> {
        return await this.agvRepository.findById(id);
    }

    public async findAll(): Promise<Agv[]> {
        const agvs = await this.agvRepository.findAll();

        return agvs.map(agv => {
            const location = agv.path.find(i => i.id === agv.location);

            return {
                id: agv.id,
                name: agv.name,
                helixId: agv.helixId,
                batteryPercentage: agv.batteryPercentage,
                location: location.name,
                path: agv.path,
            } as Agv
        })
    }

    public async delete(id: string): Promise<void> {
        return await this.agvRepository.delete(id);
    }
}
