import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("rfids")
export default class RfidModel {

    @PrimaryColumn()
    id: string;
    
    @Column()
    name: string;

    @Column()
    helixId: string;
}
