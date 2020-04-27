import {MigrationInterface, QueryRunner} from "typeorm";

export class secondMigration1587985853995 implements MigrationInterface {
    name = 'secondMigration1587985853995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_details" ("id" SERIAL NOT NULL, "firstname" character varying, "lastname" character varying, "phone" character varying(9) NOT NULL, "city" character varying(50), "knownWay" character varying(50), "size" character varying(50), "weight" integer, "footprint" integer, "date_born" TIMESTAMP, "comments" character varying, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "PK_fb08394d3f499b9e441cab9ca51" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`CREATE TABLE "user_roles " ("usersId" integer NOT NULL, "rolesId" integer NOT NULL, CONSTRAINT "PK_068d107e50e0f5f58e6bb299207" PRIMARY KEY ("usersId", "rolesId"))`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_e18e83c3c920bb25611cb735df" ON "user_roles " ("usersId") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_90098ba7a48d2b3ee05d362d82" ON "user_roles " ("rolesId") `, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "firstname"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastname"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "city"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "knownWay"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "size"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "languages"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "weight"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "footprint"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "date_born"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "detail_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_9fc134ca20766e165ad650ee740" UNIQUE ("detail_id")`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_9fc134ca20766e165ad650ee740" FOREIGN KEY ("detail_id") REFERENCES "user_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles " ADD CONSTRAINT "FK_e18e83c3c920bb25611cb735df4" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles " ADD CONSTRAINT "FK_90098ba7a48d2b3ee05d362d824" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_roles " DROP CONSTRAINT "FK_90098ba7a48d2b3ee05d362d824"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_roles " DROP CONSTRAINT "FK_e18e83c3c920bb25611cb735df4"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_9fc134ca20766e165ad650ee740"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_9fc134ca20766e165ad650ee740"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "detail_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "date_born" TIMESTAMP`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "footprint" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "weight" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "languages" character varying(50)`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "size" character varying(50)`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "knownWay" character varying(50)`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "city" character varying(50)`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying(9) NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "lastname" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "firstname" character varying`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_90098ba7a48d2b3ee05d362d82"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_e18e83c3c920bb25611cb735df"`, undefined);
        await queryRunner.query(`DROP TABLE "user_roles "`, undefined);
        await queryRunner.query(`DROP TABLE "roles"`, undefined);
        await queryRunner.query(`DROP TABLE "user_details"`, undefined);
    }

}
