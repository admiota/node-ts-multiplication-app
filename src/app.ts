import { yarg} from "./config/plugins/args.plugin";
import { ServerApp } from "./presentation/server.app";

//FUNCIÓN ANÓNIMA AUTOINVOCADA(o del async es opcional)---> (async DENTRO LA FUNCIÓN)();
(async() => {
    await main();
})();


async function main() {
    const { b:base, l:limit, s:showTable, n:name, d:destination } = yarg;
    ServerApp.run({base, limit, showTable, name, destination});
}