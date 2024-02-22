//import { yarg } from './args.plugin';

const runCommand = async(args:string[]) => {
    process.argv = [...process.argv, ...args];
    const { yarg } = await import('./args.plugin');
    return yarg;
};

describe('plugins/args.plugin.ts', () => {
    const originalArgv = process.argv;
    
    beforeEach(() => {
        process.argv = originalArgv;
        jest.resetModules();
    });

    test('should default values', async() => {
        const argv = await runCommand(['-b', '5']);
        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 10,
            s: false,
            n: 'multiplication-table',
            d: 'output',
        }));
    });


    test('should return configuration with custom values', async () => {
         //-l
        const argv = await runCommand(['-b', '5', '-l', '8','-s','-n','custom-name','-d','custom-directory']);
        expect(argv).toEqual(expect.objectContaining({
            b: 5,
            l: 8,
            s: true,
            n: 'multiplication-table',
            d: 'custom-directory',
        }));

        
    });
});