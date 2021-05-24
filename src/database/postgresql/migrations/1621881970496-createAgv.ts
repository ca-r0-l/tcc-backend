import {MigrationInterface, QueryRunner} from "typeorm";

export class createAgv1621881970496 implements MigrationInterface {
    name = 'createAgv1621881970496'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "rfids" ("id" character varying NOT NULL, "name" character varying NOT NULL, "helixId" character varying NOT NULL, CONSTRAINT "PK_6f5b13098225127dca317fb09bc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "zones" ("id" character varying NOT NULL, "name" character varying NOT NULL, "rfidId" character varying, "zoneId" character varying, CONSTRAINT "REL_43cd87f725e5ede4bc3a3fe9d6" UNIQUE ("rfidId"), CONSTRAINT "PK_880484a43ca311707b05895bd4a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "agvs" ("id" character varying NOT NULL, "name" character varying NOT NULL, "helixId" character varying NOT NULL, "batteryPercentage" integer NOT NULL, "location" character varying NOT NULL, CONSTRAINT "PK_e7dea799967c0a579b4d430083b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" character varying NOT NULL, "name" character varying NOT NULL, "department" character varying NOT NULL, "role" integer NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "salt" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);

        await queryRunner.query(`ALTER TABLE "zones" ADD CONSTRAINT "UQ_43cd87f725e5ede4bc3a3fe9d6c" UNIQUE ("rfidId")`);
        await queryRunner.query(`ALTER TABLE "zones" ADD CONSTRAINT "FK_43cd87f725e5ede4bc3a3fe9d6c" FOREIGN KEY ("rfidId") REFERENCES "rfids"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "zones" DROP CONSTRAINT "FK_43cd87f725e5ede4bc3a3fe9d6c"`);
        await queryRunner.query(`ALTER TABLE "zones" DROP CONSTRAINT "UQ_43cd87f725e5ede4bc3a3fe9d6c"`);
        await queryRunner.query(`ALTER TABLE "zones" DROP COLUMN "rfidId"`);
        
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "agvs"`);
        await queryRunner.query(`DROP TABLE "zones"`);
        await queryRunner.query(`DROP TABLE "rfids"`);
    }

}
