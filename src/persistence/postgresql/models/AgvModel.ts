import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("agv")
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