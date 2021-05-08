import axios from "axios";

export default class HelixService {
    private URL_HELIX_API_BROKER = `http://${process.env.URL_HELIX_API}:1026`;
    private headers = { 'Accept': 'application/json', 'fiware-service': 'helixiot', 'fiware-servicepath': '/' };

    constructor() { }

    async getAllAgvsNames(): Promise<string[]> {
        const res = await axios.get(`${this.URL_HELIX_API_BROKER}/v2/entities?type=agv-molis`, { headers: this.headers });
        
        if (this.requestWasSuccessful(res.status) && res.data.length > 0) {
            return (res.data as HelixIdResponse[]).map(i => i.id);
        }
        return [];
    }

    async getLastAgvStatusById(id: string): Promise<HelixGetSensorResponse> {
        const res = await axios.get(`${this.URL_HELIX_API_BROKER}/v2/entities/${id}`, { headers: this.headers });
        
        if (this.requestWasSuccessful(res.status) && res.data !== null) {
            return {
                name: res.data.id,
                location: {
                    value: res.data.location.value,
                    lastUpdate: res.data.location.metadata.TimeInstant.value
                },
                voltage: {
                    value: res.data.voltage.value,
                    lastUpdate: res.data.voltage.metadata.TimeInstant.value
                }
            } as HelixGetSensorResponse;
        }
        return null;
    }

    private requestWasSuccessful(status: number): boolean {
        return status >= 200 && status < 400;
    }
}

export interface HelixGetSensorResponse {
    name: string,
    location: HelixSensorsGetSensorDetailResponse,
    voltage: HelixSensorsGetSensorDetailResponse
}

export interface HelixSensorsGetSensorDetailResponse {
    value: string,
    lastUpdate: string
}

export interface HelixIdResponse {
    id: string
}