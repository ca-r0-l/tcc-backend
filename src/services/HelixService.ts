import axios from "axios";

export default class HelixService {
    private URL_HELIX_API = "http://localhost:3000"
    private instance;

    constructor() {
        this.instance = axios.create({
            baseURL: this.URL_HELIX_API,
            timeout: 5000,
            headers: { 'Accept': 'application/json', 'fiware-service': 'helixiot', 'fiware-servicepath': '/' }
          });
    }

    async getAllAgvs() {
        const res = await this.instance.get(`${this.URL_HELIX_API}/v2/entities\\?attrs\\=id`) as HelixSensorsResponse;
        console.log(res);
        
        return res;
    }

    async getAllRfidsNames() {        
        const res = await this.instance.get(`${this.URL_HELIX_API}/v2/entities`);
        if (this.requestWasSuccessful(res.status)) {
            const listFromHelix = res.data as HelixSensorsResponse[];
            return this.getFromHelixListOnly(HelixSensorsTypeResponse.SENSOR, listFromHelix);
        }
        return [];
    }

    async getAllAgvsNames() {        
        const res = await this.instance.get(`${this.URL_HELIX_API}/v2/entities`);
        if (this.requestWasSuccessful(res.status)) {
            const listFromHelix = res.data as HelixSensorsResponse[];
            return this.getFromHelixListOnly(HelixSensorsTypeResponse.AGVMOLIS, listFromHelix);
        }
        return [];
    }
    
    async getLastAgvBatteryStatus(agvName: string) {
        return await this.instance.get(`${this.URL_HELIX_API}/v2/entities`)
    }

    async getLastAgvLocationStatus(agvName: string) {
        return await this.instance.get(`${this.URL_HELIX_API}/v2/entities`)
    }

    async getEntities() {
        return await this.instance.get(`${this.URL_HELIX_API}/v2/entities`)
    }

    private getFromHelixListOnly(type: HelixSensorsTypeResponse, list: HelixSensorsResponse[]): HelixSensorsNamesResponse[] {
        return list
            .filter(item => item.type === type)
            .map(item  => item.id as unknown as HelixSensorsNamesResponse);
    }

    private requestWasSuccessful(status: number): boolean {
        return status >= 200 && status < 400;
    }
}

export interface HelixLocationResponse {
    location: {
        type: string,
        value: string,
        metadata: {
            TimeInstant: {
                type: string,
                value: string
            }
        }
    }
}

export interface HelixSensorsResponse {
    id: string,
    type: HelixSensorsTypeResponse
}

export interface HelixSensorsNamesResponse {
    name: string
}

enum HelixSensorsTypeResponse {
    AGVMOLIS = "agvmolis",
    SENSOR = "sensor"
}