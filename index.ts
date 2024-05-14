//* Imports

import initCLI from "./plugins/cli/initCLI";

async function main () {
    await Promise.all([
        //* Main
    ]);

    //* Post Main
    await initCLI({
        boolean: ["json"]
    });
}

main().catch(console.error).finally(() => {
    process.exit(0);
});

process.on('uncaughtException', console.log);
process.on('unhandledRejection', console.log);