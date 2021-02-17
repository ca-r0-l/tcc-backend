import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}
