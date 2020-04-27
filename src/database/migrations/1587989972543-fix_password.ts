import {MigrationInterface, QueryRunner} from "typeorm";

export class fixPassword1587989972543 implements MigrationInterface {
    name = 'fixPassword1587989972543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "UQ_450a05c0c4de5b75ac8d34835b9"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "UQ_450a05c0c4de5b75ac8d34835b9" UNIQUE ("password")`, undefined);
    }

}
