import { Column, Entity, OneToOne, PrimaryColumn } from "typeorm";
import ZoneModel from "./ZoneModel";

@Entity("rfids")
export default class RfidModel {

    @PrimaryColumn()
    id: string;
    
    @Column()
    name: string;

    @Column()
    helixId: string;
}
