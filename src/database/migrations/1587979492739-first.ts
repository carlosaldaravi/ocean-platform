import {MigrationInterface, QueryRunner} from "typeorm";

export class first1587979492739 implements MigrationInterface {
    name = 'first1587979492739'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "firstname" character varying, "lastname" character varying, "phone" character varying(9) NOT NULL, "city" character varying(50), "knownWay" character varying(50), "size" character varying(50), "languages" character varying(50), "weight" integer, "footprint" integer, "date_born" TIMESTAMP, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL, "updated_at" TIMESTAMP NOT NULL, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_450a05c0c4de5b75ac8d34835b9" UNIQUE ("password"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "users"`, undefined);
    }

}
