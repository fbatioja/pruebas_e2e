const compareImages = require("resemblejs/compareImages")
const fs = require('fs');
const config = require("./config.json");

const { kraken, cypress, options } = config;

async function executeTest(){
    let datetime = new Date().toISOString().replace(/:/g,".");
    var dir = './results/' + datetime;
    if (!fs.existsSync('./results/')){
        fs.mkdirSync('./results/');
    }
    fs.mkdirSync(dir);
    let resultInfo = []

    let scenariesJson = cypress.scenaries;
    for (let i in scenariesJson) {
        let scenarieOld = `${scenariesJson[i].pathFeature}/3.3.0`;
        let scenarieNew = `${scenariesJson[i].pathFeature}/3.42.5`;
        let scenaries = fs.readdirSync(scenarieOld);

        for (let j in scenaries) {
            var dirScenarie = `${dir}/${scenaries[j]}`;
            if (!fs.existsSync(dirScenarie)){
                fs.mkdirSync(dirScenarie);
            }
            let steps;
            try {
                steps = fs.readdirSync(`${scenarieOld}/${scenaries[j]}`);
            } catch {
                continue;
            }
            console.log(scenaries[j]);
            console.log(steps);
            for (let indexStep in steps) {
                let pathStepOld = `${scenarieOld}/${scenaries[j]}/${steps[indexStep]}`
                let pathStepNew = `${scenarieNew}/${scenaries[j]}/${steps[indexStep]}`
                if (!fs.existsSync(pathStepNew)) {
                    continue;
                }

                let data = await compareImages(
                    fs.readFileSync(pathStepOld),
                    fs.readFileSync(pathStepNew),
                    options
                );
                let index = '' + indexStep + j
                resultInfo[index] = {
                    isSameDimensions: data.isSameDimensions,
                    dimensionDifference: data.dimensionDifference,
                    rawMisMatchPercentage: data.rawMisMatchPercentage,
                    misMatchPercentage: data.misMatchPercentage,
                    diffBounds: data.diffBounds,
                    analysisTime: data.analysisTime,
                    imageReference:`${scenaries[j]}/before-${steps[indexStep]}`,
                    imageTest:`${scenaries[j]}/after-${steps[indexStep]}`,
                    imageResult: `${scenaries[j]}/compare-${steps[indexStep]}`,
                    scenarie: scenaries[j]
                }
                var inStr = fs.createReadStream(pathStepOld);
                var outStr = fs.createWriteStream(`${dir}/${scenaries[j]}/before-${steps[indexStep]}`);

                inStr.pipe(outStr);

                inStr = fs.createReadStream(pathStepNew);
                outStr = fs.createWriteStream(`${dir}/${scenaries[j]}/after-${steps[indexStep]}`);

                inStr.pipe(outStr);

                fs.writeFileSync(`${dir}/${scenaries[j]}/compare-${steps[indexStep]}`, data.getBuffer());
            }
        }
    }
    fs.writeFileSync(`./results/${datetime}/report.html`, createReport(datetime, resultInfo));
    fs.copyFileSync('./index.css', `./results/${datetime}/index.css`);

    console.log('------------------------------------------------------------------------------------')
    console.log("Execution finished. Check the report under the results folder")
    return;
}
(async ()=>console.log(await executeTest()))();

function getTestExecution(scenarie) {
    let ls = fs.readdirSync(scenarie);
    return Math.max(ls);
}

function browser(info){

    console.log(info);
    return `<div class=" browser" id="test0">
    <div class=" btitle">
        <h2>Escenario: ${info.scenarie}</h2>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Reference</span>
        <img class="img2" src="${info.imageReference}" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Test</span>
        <img class="img2" src="${info.imageTest}" id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src="${info.imageResult}" id="diffImage" label="Diff">
      </div>
    </div>
  </div>`
}

function createReport(datetime, resInfo){
    console.log(datetime);
    console.log(resInfo);
    return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report for Ghost
            </h1>
            <p>Executed: ${datetime}</p>
            <div id="visualizer">
                ${resInfo.map(b => browser(b))}
            </div>
        </body>
    </html>`
}
