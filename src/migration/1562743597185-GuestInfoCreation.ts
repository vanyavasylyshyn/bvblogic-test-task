import { MigrationInterface, QueryRunner } from "typeorm";

export class GuestInfoCreating1562740672416 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS guestinfo (
            id INT AUTO_INCREMENT,
            name VARCHAR(20) NOT NULL,
            surname VARCHAR(30) NOT NULL,
            phonenumber VARCHAR(15) NOT NULL,
            PRIMARY KEY(id)
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE guestinfo`);
    }

}
