import { CreateTable } from './create-table.user-case';

describe('use-cases/create-table.user-case.ts', () => {
    test('should create table with default values', () => {
        const createTable = new CreateTable();
        const table = createTable.execute({ base: 2 });
        const rows = table.split('\n');

        expect(createTable).toBeInstanceOf(CreateTable);
        expect(table).toContain('2 X 1 = 2');
        expect(table).toContain('2 X 10 = 20');
        expect(rows.length-1).toEqual(10);
    });

    test('should create table with custom values', () => {
        const options = {
            base: 3,
            limit:5
        }

        const table = new CreateTable().execute(options);
        const rows = table.split('\n');
        expect(rows.length).toEqual(6);
        expect(table).toContain('3 X 1 = 3');
        expect(table).toContain('3 X 5 = 15');
        console.log(rows);
        console.log(options.limit);
        expect(rows.length).toBe(options.limit+1);
    });
});
