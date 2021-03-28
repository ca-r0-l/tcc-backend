import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";
import RfidModel from "./RfidModel";
import AgvModel from "./AgvModel";

@Entity("zones")
export default class ZoneModel {

    @PrimaryColumn()
    id: string;
    
    @Column()
    name: string;

    @OneToOne(type => RfidModel)
    @JoinColumn()
    rfid: RfidModel;

    @ManyToOne(type => AgvModel, agv => agv.path)
    @JoinColumn({ name: "zoneId"})
    agv: AgvModel
}
