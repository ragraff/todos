import {MigrationInterface, QueryRunner} from "typeorm";

export class Todos1593480473086 implements MigrationInterface {
    name = 'Todos1593480473086'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("CREATE TABLE `todo` (`id` varchar(36) NOT NULL, `title` varchar(200) NOT NULL, `description` text NULL, `priority` enum ('LOW', 'MEDIUM', 'HIGH', 'URGENT') NOT NULL DEFAULT 'LOW', `dueDate` datetime NULL, `createDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updateDate` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), PRIMARY KEY (`id`)) ENGINE=InnoDB");
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query("DROP TABLE `todo`");
    }

}
