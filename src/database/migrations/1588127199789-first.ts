import { MigrationInterface, QueryRunner } from 'typeorm';

export class first1588127199789 implements MigrationInterface {
  name = 'first1588127199789';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user_details" ("id" SERIAL NOT NULL, "firstname" character varying, "lastname" character varying, "phone" character varying(9), "city" character varying(50), "known_way" character varying(50), "size" character varying(2), "weight" integer, "footprint" integer, "date_born" date, "comments" character varying, "gender" character varying(6), CONSTRAINT "PK_fb08394d3f499b9e441cab9ca51" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "roles" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', CONSTRAINT "UQ_648e3f5447f725579d7d4ffdfb7" UNIQUE ("name"), CONSTRAINT "PK_c1433d71a4838793a49dcad46ab" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "levels" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', CONSTRAINT "UQ_172e8f034ced78845089cca978d" UNIQUE ("name"), CONSTRAINT "PK_05f8dd8f715793c64d49e3f1901" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "targets" ("id" SERIAL NOT NULL, "name" character varying(100) NOT NULL, "description" character varying, "level_id" integer NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', CONSTRAINT "UQ_0027e2dfa88fd4d85a382976ec0" UNIQUE ("name"), CONSTRAINT "PK_87084f49e9de9dd6a3e83906584" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "student_targets" ("student_id" integer NOT NULL, "target_id" integer NOT NULL, "validated_by" integer NOT NULL, "date" date NOT NULL DEFAULT now(), "feedback" character varying, CONSTRAINT "PK_5084130a8fa95efec30d655b8da" PRIMARY KEY ("student_id", "target_id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "languages" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "usersId" integer, CONSTRAINT "UQ_9c0e155475f0aa782e4a6178969" UNIQUE ("name"), CONSTRAINT "PK_b517f827ca496b29f4d549c631d" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "detail_id" integer, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "REL_9fc134ca20766e165ad650ee74" UNIQUE ("detail_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "user_calendar" ("user_id" integer NOT NULL, "date" date NOT NULL, "type_id" integer NOT NULL, "start_time" TIME, "end_time" TIME, "comments" character varying, "deleted_at" TIMESTAMP, CONSTRAINT "PK_dae1c643f45e18bfcc20e749b6e" PRIMARY KEY ("user_id", "date"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "calendar_types" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "UQ_b39b090b6e389b3db3bf03251bd" UNIQUE ("name"), CONSTRAINT "PK_c755f0af73fa4a4cac27f9761db" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "course_calendar" ("id" SERIAL NOT NULL, "date" date NOT NULL, "type_id" integer NOT NULL, "start_time" TIME, "end_time" TIME, "comments" character varying, CONSTRAINT "REL_6ee4291c500c25b3c7ee3e4588" UNIQUE ("type_id"), CONSTRAINT "PK_fed19a48e1ec542d76aac66ec34" PRIMARY KEY ("id", "date"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "sports" ("id" SERIAL NOT NULL, "name" character varying(20) NOT NULL, "description" character varying, "status" character varying(8) NOT NULL DEFAULT 'ACTIVE', CONSTRAINT "UQ_838312bddf12c427e3f66657ff3" UNIQUE ("name"), CONSTRAINT "PK_4fa1063d368e1fd68ea63c7d860" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "user_roles" ("usersId" integer NOT NULL, "rolesId" integer NOT NULL, CONSTRAINT "PK_38ffcfb865fc628fa337d9a0d4f" PRIMARY KEY ("usersId", "rolesId"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_99b019339f52c63ae615358738" ON "user_roles" ("usersId") `,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_13380e7efec83468d73fc37938" ON "user_roles" ("rolesId") `,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "user_languages" ("usersId" integer NOT NULL, "languagesId" integer NOT NULL, CONSTRAINT "PK_6fd61cffba7d95e3e7cd9e218b0" PRIMARY KEY ("usersId", "languagesId"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_0abdcc8e9d7015fbdc0c68abc2" ON "user_languages" ("usersId") `,
      undefined,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_7dea00115cd6992f3dafbba644" ON "user_languages" ("languagesId") `,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "targets" ADD CONSTRAINT "FK_56dcc118681e94ba6c294274bd7" FOREIGN KEY ("level_id") REFERENCES "levels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "student_targets" ADD CONSTRAINT "FK_6a9dc8f795707e1579233f7df28" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "student_targets" ADD CONSTRAINT "FK_e8d50e17ee055480c9c859578a5" FOREIGN KEY ("target_id") REFERENCES "targets"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "student_targets" ADD CONSTRAINT "FK_41214fe641aee9450ad8c6bd7a8" FOREIGN KEY ("validated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "languages" ADD CONSTRAINT "FK_7fbf555b37ad74f8b83ff1ee6e5" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "FK_9fc134ca20766e165ad650ee740" FOREIGN KEY ("detail_id") REFERENCES "user_details"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_calendar" ADD CONSTRAINT "FK_6d9eccb0965092259c476f62aeb" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_calendar" ADD CONSTRAINT "FK_3dae5fecf062b9846cc5f205b19" FOREIGN KEY ("type_id") REFERENCES "calendar_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "course_calendar" ADD CONSTRAINT "FK_6ee4291c500c25b3c7ee3e45882" FOREIGN KEY ("type_id") REFERENCES "calendar_types"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_99b019339f52c63ae6153587380" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" ADD CONSTRAINT "FK_13380e7efec83468d73fc37938e" FOREIGN KEY ("rolesId") REFERENCES "roles"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_languages" ADD CONSTRAINT "FK_0abdcc8e9d7015fbdc0c68abc20" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_languages" ADD CONSTRAINT "FK_7dea00115cd6992f3dafbba6449" FOREIGN KEY ("languagesId") REFERENCES "languages"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user_languages" DROP CONSTRAINT "FK_7dea00115cd6992f3dafbba6449"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_languages" DROP CONSTRAINT "FK_0abdcc8e9d7015fbdc0c68abc20"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "FK_13380e7efec83468d73fc37938e"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_roles" DROP CONSTRAINT "FK_99b019339f52c63ae6153587380"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "course_calendar" DROP CONSTRAINT "FK_6ee4291c500c25b3c7ee3e45882"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_calendar" DROP CONSTRAINT "FK_3dae5fecf062b9846cc5f205b19"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "user_calendar" DROP CONSTRAINT "FK_6d9eccb0965092259c476f62aeb"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_9fc134ca20766e165ad650ee740"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "languages" DROP CONSTRAINT "FK_7fbf555b37ad74f8b83ff1ee6e5"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "student_targets" DROP CONSTRAINT "FK_41214fe641aee9450ad8c6bd7a8"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "student_targets" DROP CONSTRAINT "FK_e8d50e17ee055480c9c859578a5"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "student_targets" DROP CONSTRAINT "FK_6a9dc8f795707e1579233f7df28"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "targets" DROP CONSTRAINT "FK_56dcc118681e94ba6c294274bd7"`,
      undefined,
    );
    await queryRunner.query(
      `DROP INDEX "IDX_7dea00115cd6992f3dafbba644"`,
      undefined,
    );
    await queryRunner.query(
      `DROP INDEX "IDX_0abdcc8e9d7015fbdc0c68abc2"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "user_languages"`, undefined);
    await queryRunner.query(
      `DROP INDEX "IDX_13380e7efec83468d73fc37938"`,
      undefined,
    );
    await queryRunner.query(
      `DROP INDEX "IDX_99b019339f52c63ae615358738"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "user_roles"`, undefined);
    await queryRunner.query(`DROP TABLE "sports"`, undefined);
    await queryRunner.query(`DROP TABLE "course_calendar"`, undefined);
    await queryRunner.query(`DROP TABLE "calendar_types"`, undefined);
    await queryRunner.query(`DROP TABLE "user_calendar"`, undefined);
    await queryRunner.query(`DROP TABLE "users"`, undefined);
    await queryRunner.query(`DROP TABLE "languages"`, undefined);
    await queryRunner.query(`DROP TABLE "student_targets"`, undefined);
    await queryRunner.query(`DROP TABLE "targets"`, undefined);
    await queryRunner.query(`DROP TABLE "levels"`, undefined);
    await queryRunner.query(`DROP TABLE "roles"`, undefined);
    await queryRunner.query(`DROP TABLE "user_details"`, undefined);
  }
}
