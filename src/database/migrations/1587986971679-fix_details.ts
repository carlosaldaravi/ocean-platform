import {MigrationInterface, QueryRunner} from "typeorm";

export class fixDetails1587986971679 implements MigrationInterface {
    name = 'fixDetails1587986971679'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_details" DROP COLUMN "status"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_details" DROP COLUMN "created_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_details" DROP COLUMN "updated_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "phone" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_details" ALTER COLUMN "phone" SET NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user_details" ADD "updated_at" TIMESTAMP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user_details" ADD "created_at" TIMESTAMP NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "user_details" ADD "status" character varying(8) NOT NULL DEFAULT 'ACTIVE'`, undefined);
    }

}
