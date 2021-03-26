import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import ZoneModel from "./ZoneModel";

@Entity("agvs")
export default class AgvModel {

    @PrimaryColumn()
    id: string;
    
    @Column()
    name: string;

    @Column()
    helixId: string;

    @Column()
    batteryPercentage: string;

    @Column()
    location: string;

    @Column()
    path: string;
}
