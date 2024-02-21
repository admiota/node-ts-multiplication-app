import { yarg } from "../config/plugins/args.plugin"
import { CreateTable } from "../domain/use-cases/create-table.user-case";
import { SaveFile } from "../domain/use-cases/save-file.use-case";

interface RunOptions{
    base: number;
    limit: number;
    showTable: boolean;
    name: string,
    destination:string
}

export class ServerApp{
    static run({base, limit, showTable, name, destination}:RunOptions) {
        const table = new CreateTable();
        const tablePrinted = table.execute({ base, limit });

        const wasCreated = new SaveFile().execute({fileContent: tablePrinted,fileName:name,destination: destination,
});
        if (showTable) {
            console.log(tablePrinted);
        }

        (wasCreated)
            ? console.log('El archivo se creó')
            : console.log('El archivo no se creó');
        console.log('Server running...');
    }
}