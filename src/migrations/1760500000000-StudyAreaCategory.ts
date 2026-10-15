import { MigrationInterface, QueryRunner, Table, TableColumn, TableForeignKey } from "typeorm";

// First migration after switching off `synchronize`. Every step checks the current schema first,
// so it is safe whether or not the earlier synchronize-based deploys (content.order, contact.company/type) already ran.
export class StudyAreaCategory1760500000000 implements MigrationInterface {
    name = 'StudyAreaCategory1760500000000';

    public async up(queryRunner: QueryRunner): Promise<void> {
        if (!(await queryRunner.hasColumn('content', 'order'))) {
            await queryRunner.addColumn('content', new TableColumn({ name: 'order', type: 'int', default: 0 }));
        }

        if (!(await queryRunner.hasColumn('contact', 'company'))) {
            await queryRunner.addColumn('contact', new TableColumn({ name: 'company', type: 'varchar', length: '255', isNullable: true }));
        }

        if (!(await queryRunner.hasColumn('contact', 'type'))) {
            await queryRunner.addColumn('contact', new TableColumn({ name: 'type', type: 'varchar', length: '255', default: "'individual'" }));
        }

        if (!(await queryRunner.hasTable('study_area_category'))) {
            await queryRunner.createTable(new Table({
                name: 'study_area_category',
                columns: [
                    { name: 'id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    { name: 'name', type: 'varchar', length: '255' },
                    { name: 'model', type: 'varchar', length: '255' },
                    { name: 'order', type: 'int', default: 0 },
                    { name: 'createdAt', type: 'datetime', precision: 6, default: 'CURRENT_TIMESTAMP(6)' },
                    { name: 'updatedAt', type: 'datetime', precision: 6, default: 'CURRENT_TIMESTAMP(6)', onUpdate: 'CURRENT_TIMESTAMP(6)' },
                ],
            }));
        }

        if (!(await queryRunner.hasColumn('study_area', 'categoryId'))) {
            await queryRunner.addColumn('study_area', new TableColumn({ name: 'categoryId', type: 'int', isNullable: true }));
        }

        const studyArea = await queryRunner.getTable('study_area');
        if (!studyArea?.foreignKeys.some(fk => fk.columnNames.includes('categoryId'))) {
            await queryRunner.createForeignKey('study_area', new TableForeignKey({
                columnNames: ['categoryId'],
                referencedTableName: 'study_area_category',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }));
        }
    }

    // Only reverts what this feature introduced; content/contact columns predate the migration setup and hold live data.
    public async down(queryRunner: QueryRunner): Promise<void> {
        const studyArea = await queryRunner.getTable('study_area');
        const foreignKey = studyArea?.foreignKeys.find(fk => fk.columnNames.includes('categoryId'));
        if (foreignKey) await queryRunner.dropForeignKey('study_area', foreignKey);

        if (await queryRunner.hasColumn('study_area', 'categoryId')) {
            await queryRunner.dropColumn('study_area', 'categoryId');
        }

        if (await queryRunner.hasTable('study_area_category')) {
            await queryRunner.dropTable('study_area_category');
        }
    }
}
