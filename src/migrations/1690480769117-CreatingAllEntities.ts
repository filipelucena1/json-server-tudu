import { MigrationInterface, QueryRunner } from "typeorm";

export class CreatingAllEntities1690480769117 implements MigrationInterface {
    name = 'CreatingAllEntities1690480769117'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(50) NOT NULL, "email" character varying(70) NOT NULL, "password" character varying(120) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "subtasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(70) NOT NULL, "completed" boolean NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "taskId" uuid, CONSTRAINT "PK_035c1c153f0239ecc95be448d96" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "attachments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "currentUrl" character varying NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "taskId" uuid, CONSTRAINT "PK_5e1f050bcff31e3084a1d662412" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "content" character varying(300) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "taskId" uuid, CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tasks" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(100) NOT NULL, "status" character varying(10) NOT NULL, "description" character varying(300), "deadline" date NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), "userId" uuid, "categoryId" uuid, CONSTRAINT "PK_8d12ff38fcc62aaba2cab748772" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(70) NOT NULL, "color" character varying(70) NOT NULL, "createdAt" date NOT NULL DEFAULT now(), "updatedAt" date NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tasks_members_users" ("tasksId" uuid NOT NULL, "usersId" uuid NOT NULL, CONSTRAINT "PK_32bc20030948429883a6ab3a4dc" PRIMARY KEY ("tasksId", "usersId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_2a6503d54400c210ddcc1b3319" ON "tasks_members_users" ("tasksId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3f51c3e80ad558d66ced268384" ON "tasks_members_users" ("usersId") `);
        await queryRunner.query(`ALTER TABLE "subtasks" ADD CONSTRAINT "FK_bde15cf8f7b07bb4ccad8ef6fa3" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "attachments" ADD CONSTRAINT "FK_65152e15d915ebe1294160bd1d3" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "comments" ADD CONSTRAINT "FK_9adf2d3106c6dc87d6262ccadfe" FOREIGN KEY ("taskId") REFERENCES "tasks"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_166bd96559cb38595d392f75a35" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks" ADD CONSTRAINT "FK_8ae9301033f772a42330e917a7d" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tasks_members_users" ADD CONSTRAINT "FK_2a6503d54400c210ddcc1b33193" FOREIGN KEY ("tasksId") REFERENCES "tasks"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "tasks_members_users" ADD CONSTRAINT "FK_3f51c3e80ad558d66ced2683844" FOREIGN KEY ("usersId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "tasks_members_users" DROP CONSTRAINT "FK_3f51c3e80ad558d66ced2683844"`);
        await queryRunner.query(`ALTER TABLE "tasks_members_users" DROP CONSTRAINT "FK_2a6503d54400c210ddcc1b33193"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_8ae9301033f772a42330e917a7d"`);
        await queryRunner.query(`ALTER TABLE "tasks" DROP CONSTRAINT "FK_166bd96559cb38595d392f75a35"`);
        await queryRunner.query(`ALTER TABLE "comments" DROP CONSTRAINT "FK_9adf2d3106c6dc87d6262ccadfe"`);
        await queryRunner.query(`ALTER TABLE "attachments" DROP CONSTRAINT "FK_65152e15d915ebe1294160bd1d3"`);
        await queryRunner.query(`ALTER TABLE "subtasks" DROP CONSTRAINT "FK_bde15cf8f7b07bb4ccad8ef6fa3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3f51c3e80ad558d66ced268384"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_2a6503d54400c210ddcc1b3319"`);
        await queryRunner.query(`DROP TABLE "tasks_members_users"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "tasks"`);
        await queryRunner.query(`DROP TABLE "comments"`);
        await queryRunner.query(`DROP TABLE "attachments"`);
        await queryRunner.query(`DROP TABLE "subtasks"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
