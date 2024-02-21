import fs from 'fs';
import { yarg } from './config/plugins/args.plugin';

const {b:base ,l:limit,s:show} = yarg

const header = `
    ================================
                TABLA DEL ${base}
    ================================`;
let textoMultiplicaciones = '';

for (let i = 1; i <= limit; i++) {
    textoMultiplicaciones += `${base} X ${i} = ${base*i}\n`;
}

const plantilla = header+textoMultiplicaciones;

const pathCarpeta =`outputs`

if (show) {
    console.log(plantilla);
} 

fs.mkdirSync(pathCarpeta, { recursive: true });
fs.writeFileSync(`${pathCarpeta}/output-tabla-del-${base}.txt`, plantilla);
console.log('archivo creado correctamente!');