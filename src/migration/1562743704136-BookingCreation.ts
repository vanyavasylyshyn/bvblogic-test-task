import {MigrationInterface, QueryRunner} from "typeorm";

export class BookingCreating1562741761430 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE IF NOT EXISTS booking (
            id INT AUTO_INCREMENT,
            status TINYINT DEFAULT 1,
            guestChecked TINYINT DEFAULT 0,
            houseId INT,
            periodId INT,
            guestInfoId INT,
            startingDate DATE,
            finishingDate DATE,
            FOREIGN KEY(houseId) REFERENCES houseinfo(id),
            FOREIGN KEY(periodId) REFERENCES periods(id) ON UPDATE CASCADE ON DELETE CASCADE,
            FOREIGN KEY(guestInfoId) REFERENCES guestinfo(id) ON UPDATE CASCADE ON DELETE CASCADE,
            PRIMARY KEY(id)
        )`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE booking`);
    }

}
