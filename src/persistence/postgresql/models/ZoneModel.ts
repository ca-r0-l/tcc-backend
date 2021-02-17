import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("zones")
export default class ZoneModel {

    @PrimaryColumn()
    id: string;
    
    @Column()
    name: string;
}
