import {MigrationInterface, QueryRunner} from "typeorm";

export class relacaoRfidZone1616801683359 implements MigrationInterface {
    name = 'relacaoRfidZone1616801683359'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "zones" ADD "rfidId" character varying`);
        await queryRunner.query(`ALTER TABLE "zones" ADD CONSTRAINT "UQ_43cd87f725e5ede4bc3a3fe9d6c" UNIQUE ("rfidId")`);
        await queryRunner.query(`ALTER TABLE "zones" ADD CONSTRAINT "FK_43cd87f725e5ede4bc3a3fe9d6c" FOREIGN KEY ("rfidId") REFERENCES "rfids"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "zones" DROP CONSTRAINT "FK_43cd87f725e5ede4bc3a3fe9d6c"`);
        await queryRunner.query(`ALTER TABLE "zones" DROP CONSTRAINT "UQ_43cd87f725e5ede4bc3a3fe9d6c"`);
        await queryRunner.query(`ALTER TABLE "zones" DROP COLUMN "rfidId"`);
    }

}
