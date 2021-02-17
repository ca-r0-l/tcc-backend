import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";
import ZoneModel from "./ZoneModel";

@Entity("rfids")
export default class RfidModel {

    @PrimaryColumn()
    id: string;
    
    @Column()
    name: string;

    @OneToOne(() => ZoneModel)
    @JoinColumn()
    zone: ZoneModel;

    @Column()
    helixId: string;
}
