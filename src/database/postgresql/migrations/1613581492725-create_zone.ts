import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createZone1613581492725 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "zones",
            columns: [
                {
                    name: "id",
                    type: "varchar",
                    unsigned: true,
                    isPrimary: true,
                },
                {
                    name: "name",
                    type: "varchar",
                },
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("zones");
    }

}
