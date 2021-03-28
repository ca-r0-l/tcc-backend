import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createAgv1616967094481 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "agvs",
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
                    name: "helixId",
                    type: "varchar",
                },
                {
                    name: "batteryPercentage",
                    type: "varchar",
                },
                {
                    name: "location",
                    type: "varchar",
                },
                {
                    name: "zoneId",
                    type: "varchar",
                },
            ],
            foreignKeys: [
                {
                    name: "AgvZone",
                    columnNames: ["zoneId"],
                    referencedColumnNames: ["id"],
                    referencedTableName: "zones"
                }
            ]
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("agvs");
    }

}
