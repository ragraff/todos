import {MigrationInterface, QueryRunner} from "typeorm";

export class Todos1593466239485 implements MigrationInterface {
    name = 'Todos1593466239485'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `todo` (`id` varchar(36) NOT NULL, `title` varchar(200) NOT NULL, `description` text NULL, `priority` enum ('LOW', 'MEDIUM', 'HIGH', 'URGENT') NOT NULL, `dueDate` date NULL, `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `todo`");
    }

}
