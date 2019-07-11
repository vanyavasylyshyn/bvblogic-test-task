import {MigrationInterface, QueryRunner} from "typeorm";

export class PeriodsCreating1562740995053 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS periods (
            id INT AUTO_INCREMENT,
            startingDate DATE,
            finishingDate DATE,
            PRIMARY KEY(id)
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE periods`);
    }

}
