import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";
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
    batteryPercentage: number;

    @Column()
    location: string;

    @OneToMany(() => ZoneModel, zones => zones.agv)
    @JoinColumn({ name: "zoneId"})
    path: ZoneModel[]
}
