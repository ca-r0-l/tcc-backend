import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import ZoneModel from "./ZoneModel";

@Entity("agvs")
export default class AgvModel {

    @PrimaryGeneratedColumn()
    id: string;
    
    @Column()
    name: string;

    @Column()
    helixId: string;

    @Column()
    batteryPercentage: number;

    @OneToMany(type => ZoneModel, zone => zone.id)
    path: ZoneModel[]
}
