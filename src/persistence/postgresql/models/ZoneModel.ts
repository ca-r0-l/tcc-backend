import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import RfidModel from "./RfidModel";

@Entity("zones")
export default class ZoneModel {

    @PrimaryColumn()
    id: string;
    
    @Column()
    name: string;

    @OneToOne(type => RfidModel)
    @JoinColumn()
    rfid: RfidModel;
}
