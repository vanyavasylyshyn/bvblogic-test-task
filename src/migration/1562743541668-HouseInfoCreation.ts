import {MigrationInterface, QueryRunner} from "typeorm";

export class HouseInfoCreating1562739385795 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS houseinfo (
                                    id INT AUTO_INCREMENT,
                                    name VARCHAR(50),
                                    description VARCHAR(255),
                                    minDuration INT,
                                    srcImage VARCHAR(255),
                                    adress VARCHAR(255) DEFAULT NULL,
                                    dailyPrice INT,
                                    weekendPrice INT,
                                    discount INT,
                                    PRIMARY KEY(id)
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE houseinfo`);
    }

}
