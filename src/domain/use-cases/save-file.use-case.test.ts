import { option } from 'yargs';
import { SaveFile } from './save-file.use-case';
import fs from 'fs';

describe('use-cases/save-file.use-case.test.ts', () => {
    const customOptions = {
            fileContent: 'custom content',
            fileDestination: 'custom/outputs/file-destination',
            fileName:'custom-table-name'
    }
    const customFilePath = `${customOptions.fileDestination}/${customOptions.fileName}.txt`;

    //LIFE CYCLE
    /*beforeEach(() => {
        //LIMPIAMOS ANTES DE HACER LOS TESTS
        //fs.rmSync('output', { recursive: true });
    });*/
    afterEach(() => {
        const outputFolderExists = fs.existsSync('output');
        if (outputFolderExists) fs.rmSync('output', { recursive: true });
        const customOutputFolderExists = fs.existsSync(customFilePath);
        if (customOutputFolderExists) fs.rmSync('custom', {recursive:true});
    });


    test('should save file with default values', () => {
        const saveFile = new SaveFile()
        const filePath = 'output/table.txt';
        const options = {
            fileContent: 'test content'
        }
    
        const result = saveFile.execute(options);
        const fileExists = fs.existsSync(filePath);
        const checkFileContent = fs.readFileSync(filePath, { encoding: 'utf-8' });
        
        expect(result).toBeTruthy();
        expect(fileExists).toBeTruthy();
        expect(checkFileContent).toContain(options.fileContent);
    });

    test('should save file with custom values', () => {
        const saveFile = new SaveFile();
        
        const result = saveFile.execute(customOptions);
        const fileExists = fs.existsSync(customFilePath);
        const checkFileContent = fs.readFileSync(customFilePath, { encoding: 'utf-8' });

        expect(result).toBeTruthy();
        expect(fileExists).toBeTruthy();
        expect(checkFileContent).toBe(customOptions.fileContent);
    });

    test('should return false if directory couldnt be created', () => {
        const saveFile = new SaveFile();

        const mkdirMock = jest.spyOn(fs, 'mkdirSync').mockImplementation(
            () => { throw new Error('This is a custom error message from making a dir(Testing)'); }
        );

        const result = saveFile.execute(customOptions);

        expect(result).toBeFalsy();

        mkdirMock.mockRestore();
    });

    test('should return false if cannot write in a file', () => {
        const saveFile = new SaveFile();
        const writeFileMock = jest.spyOn(fs, 'writeFileSync').mockImplementation(
            () => { throw new Error('This is a custom error message from writing a file(Testing)') }
        );

        const result = saveFile.execute({fileContent:'Hola'});

        expect(result).toBeFalsy();
        
        writeFileMock.mockRestore();
    });
});