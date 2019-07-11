import {MigrationInterface, QueryRunner} from "typeorm";

export class BlockedCreating1562741288509 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS blocked (
            id INT AUTO_INCREMENT,
            houseId INT,
            periodId INT,
            FOREIGN KEY(houseId) REFERENCES houseinfo(id),
            FOREIGN KEY(periodId) REFERENCES periods(id) ON UPDATE CASCADE ON DELETE CASCADE,
            PRIMARY KEY(id)
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE blocked`);
    }

}
