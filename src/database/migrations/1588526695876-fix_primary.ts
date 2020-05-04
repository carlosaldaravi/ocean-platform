import {MigrationInterface, QueryRunner} from "typeorm";

export class fixPrimary1588526695876 implements MigrationInterface {
    name = 'fixPrimary1588526695876'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "student_targets" DROP CONSTRAINT "FK_e8d50e17ee055480c9c859578a5"`, undefined);
        await queryRunner.query(`ALTER TABLE "student_targets" DROP CONSTRAINT "FK_6a9dc8f795707e1579233f7df28"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_instructors" DROP CONSTRAINT "FK_ff1fe7ba07418a03281c94fac46"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_instructors" DROP CONSTRAINT "FK_45fb0bdabe0c1d642a1f367fe36"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_students" DROP CONSTRAINT "FK_f92b04de7259dd40d646d0a4570"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_students" DROP CONSTRAINT "FK_0c333793939e89fc835e6a95dbd"`, undefined);
        await queryRunner.query(`ALTER TABLE "student_targets" DROP CONSTRAINT "FK_41214fe641aee9450ad8c6bd7a8"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_6a9dc8f795707e1579233f7df2"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_e8d50e17ee055480c9c859578a"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_45fb0bdabe0c1d642a1f367fe3"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_ff1fe7ba07418a03281c94fac4"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_0c333793939e89fc835e6a95db"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_f92b04de7259dd40d646d0a457"`, undefined);
        await queryRunner.query(`ALTER TABLE "student_targets" DROP COLUMN "validated_by"`, undefined);
        await queryRunner.query(`ALTER TABLE "student_targets" DROP COLUMN "date"`, undefined);
        await queryRunner.query(`ALTER TABLE "student_targets" DROP COLUMN "feedback"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_students" DROP COLUMN "deleted_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_students" DROP COLUMN "paid"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_students" DROP COLUMN "created_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_students" DROP COLUMN "updated_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_instructors" DROP COLUMN "cashed"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_instructors" DROP COLUMN "created_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_instructors" DROP COLUMN "updated_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_instructors" DROP COLUMN "deleted_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "student_targets" ADD "validated_by" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "student_targets" ADD "date" date NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "student_targets" ADD "feedback" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD "level_id" integer`, undefined);
        await queryRunner.query(`ALTER TABLE "course_instructors" ADD "cashed" boolean NOT NULL DEFAULT false`, undefined);
        await queryRunner.query(`ALTER TABLE "course_instructors" ADD "created_at" date NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "course_instructors" ADD "updated_at" date NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "course_instructors" ADD "deleted_at" date`, undefined);
        await queryRunner.query(`ALTER TABLE "course_students" ADD "paid" boolean NOT NULL DEFAULT false`, undefined);
        await queryRunner.query(`ALTER TABLE "course_students" ADD "created_at" date NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "course_students" ADD "updated_at" date NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "course_students" ADD "deleted_at" date`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_6a9dc8f795707e1579233f7df2" ON "student_targets" ("student_id") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_e8d50e17ee055480c9c859578a" ON "student_targets" ("target_id") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_0c333793939e89fc835e6a95db" ON "course_students" ("student_id") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_f92b04de7259dd40d646d0a457" ON "course_students" ("course_id") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_45fb0bdabe0c1d642a1f367fe3" ON "course_instructors" ("instructor_id") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_ff1fe7ba07418a03281c94fac4" ON "course_instructors" ("course_id") `, undefined);
        await queryRunner.query(`ALTER TABLE "student_targets" ADD CONSTRAINT "FK_41214fe641aee9450ad8c6bd7a8" FOREIGN KEY ("validated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_08f642b752f63f945086eccbc8d" FOREIGN KEY ("level_id") REFERENCES "levels"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "student_targets" ADD CONSTRAINT "FK_6a9dc8f795707e1579233f7df28" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "student_targets" ADD CONSTRAINT "FK_e8d50e17ee055480c9c859578a5" FOREIGN KEY ("target_id") REFERENCES "targets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "course_students" ADD CONSTRAINT "FK_0c333793939e89fc835e6a95dbd" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "course_students" ADD CONSTRAINT "FK_f92b04de7259dd40d646d0a4570" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "course_instructors" ADD CONSTRAINT "FK_45fb0bdabe0c1d642a1f367fe36" FOREIGN KEY ("instructor_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "course_instructors" ADD CONSTRAINT "FK_ff1fe7ba07418a03281c94fac46" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "course_instructors" DROP CONSTRAINT "FK_ff1fe7ba07418a03281c94fac46"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_instructors" DROP CONSTRAINT "FK_45fb0bdabe0c1d642a1f367fe36"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_students" DROP CONSTRAINT "FK_f92b04de7259dd40d646d0a4570"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_students" DROP CONSTRAINT "FK_0c333793939e89fc835e6a95dbd"`, undefined);
        await queryRunner.query(`ALTER TABLE "student_targets" DROP CONSTRAINT "FK_e8d50e17ee055480c9c859578a5"`, undefined);
        await queryRunner.query(`ALTER TABLE "student_targets" DROP CONSTRAINT "FK_6a9dc8f795707e1579233f7df28"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_08f642b752f63f945086eccbc8d"`, undefined);
        await queryRunner.query(`ALTER TABLE "student_targets" DROP CONSTRAINT "FK_41214fe641aee9450ad8c6bd7a8"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_ff1fe7ba07418a03281c94fac4"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_45fb0bdabe0c1d642a1f367fe3"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_f92b04de7259dd40d646d0a457"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_0c333793939e89fc835e6a95db"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_e8d50e17ee055480c9c859578a"`, undefined);
        await queryRunner.query(`DROP INDEX "IDX_6a9dc8f795707e1579233f7df2"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_students" DROP COLUMN "deleted_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_students" DROP COLUMN "updated_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_students" DROP COLUMN "created_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_students" DROP COLUMN "paid"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_instructors" DROP COLUMN "deleted_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_instructors" DROP COLUMN "updated_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_instructors" DROP COLUMN "created_at"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_instructors" DROP COLUMN "cashed"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "level_id"`, undefined);
        await queryRunner.query(`ALTER TABLE "student_targets" DROP COLUMN "feedback"`, undefined);
        await queryRunner.query(`ALTER TABLE "student_targets" DROP COLUMN "date"`, undefined);
        await queryRunner.query(`ALTER TABLE "student_targets" DROP COLUMN "validated_by"`, undefined);
        await queryRunner.query(`ALTER TABLE "course_instructors" ADD "deleted_at" date`, undefined);
        await queryRunner.query(`ALTER TABLE "course_instructors" ADD "updated_at" date NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "course_instructors" ADD "created_at" date NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "course_instructors" ADD "cashed" boolean NOT NULL DEFAULT false`, undefined);
        await queryRunner.query(`ALTER TABLE "course_students" ADD "updated_at" date NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "course_students" ADD "created_at" date NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "course_students" ADD "paid" boolean NOT NULL DEFAULT false`, undefined);
        await queryRunner.query(`ALTER TABLE "course_students" ADD "deleted_at" date`, undefined);
        await queryRunner.query(`ALTER TABLE "student_targets" ADD "feedback" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "student_targets" ADD "date" date NOT NULL DEFAULT now()`, undefined);
        await queryRunner.query(`ALTER TABLE "student_targets" ADD "validated_by" integer`, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_f92b04de7259dd40d646d0a457" ON "course_students" ("course_id") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_0c333793939e89fc835e6a95db" ON "course_students" ("student_id") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_ff1fe7ba07418a03281c94fac4" ON "course_instructors" ("course_id") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_45fb0bdabe0c1d642a1f367fe3" ON "course_instructors" ("instructor_id") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_e8d50e17ee055480c9c859578a" ON "student_targets" ("target_id") `, undefined);
        await queryRunner.query(`CREATE INDEX "IDX_6a9dc8f795707e1579233f7df2" ON "student_targets" ("student_id") `, undefined);
        await queryRunner.query(`ALTER TABLE "student_targets" ADD CONSTRAINT "FK_41214fe641aee9450ad8c6bd7a8" FOREIGN KEY ("validated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "course_students" ADD CONSTRAINT "FK_0c333793939e89fc835e6a95dbd" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "course_students" ADD CONSTRAINT "FK_f92b04de7259dd40d646d0a4570" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "course_instructors" ADD CONSTRAINT "FK_45fb0bdabe0c1d642a1f367fe36" FOREIGN KEY ("instructor_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "course_instructors" ADD CONSTRAINT "FK_ff1fe7ba07418a03281c94fac46" FOREIGN KEY ("course_id") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "student_targets" ADD CONSTRAINT "FK_6a9dc8f795707e1579233f7df28" FOREIGN KEY ("student_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "student_targets" ADD CONSTRAINT "FK_e8d50e17ee055480c9c859578a5" FOREIGN KEY ("target_id") REFERENCES "targets"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

}
