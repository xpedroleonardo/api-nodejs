import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class Example1641339635290 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "example",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
          },
          {
            name: "name",
            type: "varchar",
          },
          {
            name: "age",
            type: "varchar",
          },
          {
            name: "username",
            type: "varchar",
          },
          {
            name: "avatar",
            type: "varchar",
          },
          {
            name: "created_at",
            type: "datetime",
          },
          {
            name: "updated_at",
            type: "datetime",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("example");
  }
}
