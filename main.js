// Matth33w - 2022

const scanf = require("scanf");
const fs = require("fs");

const packageInfo = require("./package.json");

init();

var final = [];

function loadCommand(comm) {
    const fileRead = fs.createReadStream(__dirname + "/input.txt");
    const fileWrite = fs.createWriteStream(__dirname + "/output.json");
    const readline = require("readline").createInterface({ input: fileRead });

    var firstLine = true;
    var keys = [];

    readline.on("line", async stream => {
        const values = comm != "%uni%" ? stream.split(comm) : [stream];
        if(firstLine) {
            firstLine = false;
            console.log(`\n\x1b[32m[ \x1b[37mSYSTEM \x1b[32m]\x1b[37m Você possui um arquivo de texto com ${values.length} campos.`);
            console.log(stream.split(comm));
            console.log(`\n\x1b[32m[ \x1b[37mSYSTEM \x1b[32m]\x1b[37m Nesta etapa de configuração, você irá definir um nome para cada um dos campos seguindo os valores acima..`);

            for(var i = 0; i < values.length; i++) {
                console.log(`\n\x1b[32m[ \x1b[37mi \x1b[32m]\x1b[37m Defina um nome de campo para o valor de \x1b[33m${values[i]}\x1b[32m`);
                keys.push(scanf("%S"));

                if(i == values.length - 1) {
                    console.log("\n\x1b[37mCampos definidos com sucesso!\nIniciando execução..");
                }
            }
        }

        var objData = {};
        
        for(var i = 0; i < keys.length; i++) {
            objData[keys[i]] = values[i];
        }

        final.push(objData);
    });

    readline.on("close", () => {
        fileWrite.write(JSON.stringify(final));
        fileWrite.close();
        console.log("\n\x1b[32m[ ✓ ]\x1b[37m Execução feita com sucesso! Encerrando instância em 3 segundos..");
        setTimeout(() => {return 0;}, 3000);
    });
}

async function init() {
    console.clear();
    console.log("\x1b[33m_______________  _____________                                   ");
    console.log("\x1b[33m\\__    ___/\\   \\/  /\\______   \\ ____ _____  ______   ___________ ");
    console.log("\x1b[33m  |    |    \\     /  |       _// __ \\\\__  \\ \\____ \\_/ __ \\_  __ \\");
    console.log("\x1b[33m  |    |    /     \\  |    |   \\  ___/ / __ \\|  |_> >  ___/|  | \\/");
    console.log("\x1b[33m  |____|   /___/\\  \\ |____|_  /\\___  >____  /   __/ \\___  >__|   ");
    console.log("\x1b[33m                 \\_/        \\/     \\/     \\/|__|        \\/  \x1b[37m" + packageInfo.version);
    console.log("                                      Escrito por \x1b[31mMatth33w\x1b[37m - 2022");
    console.log("\n\x1b[32m[ \x1b[37mi \x1b[32m]\x1b[37m Escreva o separador do seu TXT abaixo.");
    console.log("\x1b[37mCaso o seu TXT tenha somente um campo, digite '%uni%'.\x1b[32m");

    var option = scanf("%S");
    loadCommand(option);
}