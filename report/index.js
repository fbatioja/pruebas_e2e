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

    let scenariesJson = cypress.scenaries;
    console.log(scenariesJson);
    for (let i in scenariesJson) {
        let scenarieOld = `${scenariesJson[i].pathFeature}/3.3.0`;
        let scenarieNew = `${scenariesJson[i].pathFeature}/3.42.5`;
        let scenaries = fs.readdirSync(scenarieOld);

        var dirScenarie = `${dir}/${scenaries[i]}`;
        if (!fs.existsSync(dirScenarie)){
            fs.mkdirSync(dirScenarie);
        }
        for (j in scenaries) {
            let steps;
            try {
                steps = fs.readdirSync(`${scenarieOld}/${scenaries[i]}`);
            } catch {
                continue;
            }
            console.log(steps);
            for (indexStep in steps) {
                pathStepOld = `${scenarieOld}/${scenaries[j]}/${steps[indexStep]}`
                pathStepNew = `${scenarieNew}/${scenaries[j]}/${steps[indexStep]}`
                if (!fs.existsSync(pathStepNew)) {
                    continue;
                }

                let data = await compareImages(
                    fs.readFileSync(pathStepOld),
                    fs.readFileSync(pathStepNew),
                    options
                );
                fs.writeFileSync(`${dir}/${scenaries[i]}/compare-${steps[j]}`, data.getBuffer());
            }
        }
    }

    console.log('------------------------------------------------------------------------------------')
    console.log("Execution finished. Check the report under the results folder")
    return;
}
(async ()=>console.log(await executeTest()))();

function getTestExecution(scenarie) {
    let ls = fs.readdirSync(scenarie);
    return Math.max(ls);
}

function createReport(datetime){
    return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report VRT GHOST
            </h1>
            <p>Executed: ${datetime}</p>
            <div id="visualizer">
                ${config.browsers.map(b=>browser(b, resInfo[b]))}
            </div>
        </body>
    </html>`
}

function htmlStep(scenario, image1, image2, resultInfo) {
    return `
<div class=" browser" id="test0">
    <div class=" btitle">
        <h2>Escenario: ${scenario}</h2>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Reference</span>
        <img class="img2" src="${image1}" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">Test</span>
        <img class="img2" src="${image2}" id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src="${image2}" id="diffImage" label="Diff">
      </div>
    </div>
  </div>`
}

function htmlScenarie(resultInfo) {

}
async function compareKraken(scenaries, pathOldVersion, pathNewVersion) {
    scenaries = kraken.scenaries;
    pathOldVersion = kraken.pathOldVersion;
    pathNewVersion = kraken.pathNewVersion;

    let resultInfo = {}
    for (let i in scenaries) {
        if (!fs.existsSync(`${dir}/${scenaries[i]}`)) {
            fs.mkdirSync(`${dir}/${scenaries[i]}`);
        }

        resultInfo[i] = []
        let scenarieOld =  pathOldVersion + scenaries[i];
        let scenarieNew =  pathNewVersion + scenaries[i];
        let {steps, pathSteps} = getSteps(scenarieOld);

        let pathStepsNew = scenarieNew + '/';
        stepsNew = getSteps(scenarieNew);

        for (j in pathSteps) {
            pathStepNew = pathStepsNew + '/' + steps[j];
            if (!fs.existsSync(pathStepNew)) {
                continue;
            }

            let data = await compareImages(
                fs.readFileSync(pathSteps[j]),
                fs.readFileSync(pathStepNew),
                options
            );
            resultInfo[i][j] = {
                isSameDimensions: data.isSameDimensions,
                dimensionDifference: data.dimensionDifference,
                rawMisMatchPercentage: data.rawMisMatchPercentage,
                misMatchPercentage: data.misMatchPercentage,
                diffBounds: data.diffBounds,
                analysisTime: data.analysisTime
            }

            fs.writeFileSync(`${dir}/${scenaries[i]}/compare-${steps[j]}`, data.getBuffer());
        }
    }
}
