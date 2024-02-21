export interface CreateTableUseCase{
    execute: (options:CreateTableOptions) => string;
}

export interface CreateTableOptions{
    base: number;
    limit?: number;
}

export class CreateTable implements CreateTableUseCase{
    constructor() {
        //Inyección dependencias
    }

    execute({base,limit = 10}:CreateTableOptions) {
        let textoMultiplicaciones = '';

        for (let i = 1; i <= limit; i++) {
            textoMultiplicaciones += `${base} X ${i} = ${base*i}\n`;
        }

        return textoMultiplicaciones;
    }
}