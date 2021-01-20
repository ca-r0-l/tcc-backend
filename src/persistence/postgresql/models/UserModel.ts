import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("users")
export default class UserModel {

    @PrimaryColumn()
    id: string;
    
    @Column()
    name: string;
    
    @Column()
    department: string;
    
    @Column()
    role: string;
    
    @Column()
    email: string;
    
    @Column()
    password: string;
}
