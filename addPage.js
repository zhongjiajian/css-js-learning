const { rejects } = require("assert");
// var {
//     exec
// } = require("child_process");
var fs = require('fs');
const { resolve } = require("path");
var path = require('path');

var args = process.argv.splice(2);

function checkOptions(args) {
    return new Promise((resolve, reject) => {
        if (!args.includes('-n')) {
            return reject("缺少n参数,like: node addPage.js -n '新页面名字'");
        };
        let filePath = args[args.indexOf('-n') + 1];
        return resolve(filePath);
    })
}

function writeFile(filePath){
    return new Promise((resolve,reject)=>{
        const fileName = filePath.split("/").pop();
        filePath = path.resolve(__dirname,`./demos/${filePath}.html`)
        let content = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${fileName}</title>
    <link rel="stylesheet" href="/static/css/main.css">
    <style>
    </style>
</head>
<body>
    
</body>
</html>`;
        
        fs.writeFile(filePath,content,err=>{
            if(err) return reject(err);
            resolve("add success");
        })
    })
}

(async function () {
    const filePath = await checkOptions(args);
    return await writeFile(filePath);
})()
.then(console.log)
.catch(console.log)

