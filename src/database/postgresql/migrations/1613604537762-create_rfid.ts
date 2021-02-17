import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createRfid1613604537762 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "rfids",
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
                {
                    name: "zoneId",
                    type: "varchar",
                },
                {
                    name: "helixId",
                    type: "varchar",
                },
            ],
            foreignKeys: [
                {
                    name: "ZoneRfid",
                    columnNames: ["zoneId"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "zones"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("rfids");
    }

}
