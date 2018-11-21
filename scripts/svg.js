/*
Name : RN SVG
Description : Generate SVG fo React native svg
Re-Author : cholid 
@Flow
    * Get All file by extention svg
    * Minify svg
    * Replace SVG to Support react-native-svg
    * Write File as Javascript
*/

var fs = require('fs');
var SVGO = require('svgo');
const sh = require("shelljs");

const PATH = "./src/assets/images/svg/";
const OUTPUT = './src/assets/styles/';
const OUTPUT_NAME = 'svgList.js';

const HTML = {
    dir: './html/',
    name: 'svg.html'
}

var svgo = new SVGO({
    plugins: [{
        cleanupAttrs: true,
    }, {
        removeDoctype: true,
    }, {
        removeXMLProcInst: true,
    }, {
        removeComments: true,
    }, {
        removeMetadata: true,
    }, {
        removeTitle: true,
    }, {
        removeDesc: true,
    }, {
        removeUselessDefs: true,
    }, {
        removeEditorsNSData: true,
    }, {
        removeEmptyAttrs: true,
    }, {
        removeHiddenElems: true,
    }, {
        removeEmptyText: true,
    }, {
        removeEmptyContainers: true,
    }, {
        removeViewBox: false,
    }, {
        cleanupEnableBackground: true,
    }, {
        convertStyleToAttrs: true,
    }, {
        convertColors: true,
    }, {
        convertPathData: true,
    }, {
        convertTransform: true,
    }, {
        removeUnknownsAndDefaults: true,
    }, {
        removeNonInheritableGroupAttrs: true,
    }, {
        removeUselessStrokeAndFill: true,
    }, {
        removeUnusedNS: true,
    }, {
        cleanupIDs: true,
    }, {
        cleanupNumericValues: true,
    }, {
        moveElemsAttrsToGroup: true,
    }, {
        moveGroupAttrsToElems: true,
    }, {
        collapseGroups: true,
    }, {
        removeRasterImages: false,
    }, {
        mergePaths: true,
    }, {
        convertShapeToPath: true,
    }, {
        sortAttrs: false,
    }, {
        removeDimensions: false,
    }]
});

var generate = function (options) {

    this.OUTPUT = options.OUTPUT;
    this.PATH = options.PATH;
    this.OUTPUT_NAME = options.OUTPUT_NAME;
    this.svgo = options.svgo;
    this.getFileName = function () {
        return fs.readdirSync(this.PATH);
    }
    this.getContent = function () {
        const path = this.PATH;
        let fileName = this.getFileName();
        let data = [];
        for (let file of fileName) {
            if (typeof file != "undefined" && file.indexOf(".svg") > -1) {
                data.push({
                    content: fs.readFileSync(path + file, 'utf8'),
                    name: file.replace(".svg", "")
                })
            }
        }
        return data;
    }
    this.replaceSvg = function (content) {

        content = content.replace(/<svg/g, '<Svg')
        content = content.replace(/<\/svg>/g, '<\/Svg>')
        content = content.replace(/<circle/g, '<Circle')
        content = content.replace(/<\/circle>/g, '<\/Circle>')
        content = content.replace(/<ellipse/g, '<Ellipse')
        content = content.replace(/<\/ellipse>/g, '<\/Ellipse>')
        content = content.replace(/<g/g, '<G')
        content = content.replace(/<\/g>/g, '<\/G>')
        content = content.replace(/<linearGradient/g, '<LinearGradient')
        content = content.replace(/<\/linearGradient>/g, '<\/LinearGradient>')
        content = content.replace(/<radialGradient/g, '<RadialGradient')
        content = content.replace(/<\/radialGradient>/g, '<\/RadialGradient>')
        content = content.replace(/<line/g, '<Line')
        content = content.replace(/<\/line>/g, '<\/Line>')
        content = content.replace(/<path/g, '<Path')
        content = content.replace(/<\/path>/g, '<\/Path>')
        content = content.replace(/<polygon/g, '<Polygon')
        content = content.replace(/<\/polygon>/g, '<\/Polygon>')
        content = content.replace(/<polyline/g, '<Polyline')
        content = content.replace(/<\/polyline>/g, '<\/Polyline>')
        content = content.replace(/<rect/g, '<Rect')
        content = content.replace(/<\/rect>/g, '<\/Rect>')
        content = content.replace(/<symbol/g, '<Symbol')
        content = content.replace(/<\/symbol>/g, '<\/Symbol>')
        content = content.replace(/<text/g, '<Text')
        content = content.replace(/<\/text>/g, '<\/Text>')
        content = content.replace(/<use/g, '<Use')
        content = content.replace(/<\/use>/g, '<\/Use>')
        content = content.replace(/<defs/g, '<Defs')
        content = content.replace(/<\/defs>/g, '<\/Defs>')
        content = content.replace(/<stop/g, '<Stop')
        content = content.replace(/<\/stop>/g, '<\/Stop>')
        content = content.replace(/xml:space="preserve"/g, "")
        content = content.replace(/style="stop-color:/g, 'stopColor="')
        content = content.replace(/style="fill-opacity:/g, 'fillOpacity="')
        content = content.replace(/style="stroke-width:/g, 'strokeWidth="')
        content = content.replace(/style="stroke-opacity:/g, 'strokeOpacity="')
        content = content.replace(/style="stroke-linecap:/g, 'strokeLinecap="')
        content = content.replace(/style="stroke-linejoin:/g, 'strokeLinejoin="')
        content = content.replace(/style="stroke-dasharray:/g, 'strokeDasharray="')
        content = content.replace(/style="stroke-dashoffset:/g, 'strokeDashoffset="')
        // content = content.replace(/<\?xml version=[\s\S]*?>/g, '')
        // content = content.replace(/<!--[\s\S]*?-->/g, '')
        // content = content.replace(/<title>[\s\S]*?<\/title>/g, '')
        // content = content.replace(/<desc>[\s\S]*?<\/desc>/g, '')
        // content = content.replace(/\n\n/g, '\n')
        // content = content.replace(/<Use xlink:href="#a"\/>/g, '')
        content = content.replace(/<mask([\s\S]*?)<\/mask>/g, '')
        content = content.replace(/xmlns="http:\/\/www.w3.org\/2000\/svg"/g, '')
        content = content.replace(/xmlns:xlink="[^"]*"/g, '')
        content = content.replace(/  /g, ' ')
        content = content.replace(/" >/g, '">')
        return content;
    }

    this.promiseFn = function (data) {
        let _this = this;
        return new Promise(function (resolve, reject) {
            _this.svgo.optimize(data.content).then(function (res) {
                resolve({
                    name: data.name,
                    data: res.data
                });
            }, function (e) {

            })
        });
    }

    this.syncSvg = function () {
        let _this = this;
        let contentPromize = [];

        async function asyncFn(data) {
            return await _this.promiseFn(data);
        }

        for (let data of _this.getContent()) {
            contentPromize.push(asyncFn(data));
        }

        Promise.all(contentPromize).then(function (data) {
            console.log("---->", data);
            _this.createHtml(data);
            _this.createFile(data);
        }, function (e) {
            console.log(e);
        })
    }

    this.createHtml = function (data) {
        let header = `<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"></title><style>body{background: #000000;color: #fff}img{width: 90px;}.box{display : inline-block;text-align: margin : 10px;text-align: center;font-size: 12px;}code{font-size : 8px;}</style></head><body>`;
        let box = "";
        for (let list of data) {
            box += `
                <div class="box">
                    <img src="../src/assets/images/svg/${list.name}.svg" alt="">
                    <br>
                    ${list.name}
                    <br>
                    <code>&#x3C;ssgIcon name=&#x22;${list.name}&#x22;/&#x3E;</code>
                </div>
            `;
        }
        const footer = `</body></html>`;
        const html = header + box + footer;
        if (!fs.existsSync(HTML.dir)) {
            fs.mkdirSync(HTML.dir);
        }
        fs.writeFileSync(HTML.dir + HTML.name, html);
        sh.exec(`open ${HTML.dir}${HTML.name} -a "$(VERSIONER_PERL_PREFER_32_BIT=true perl -MMac::InternetConfig -le 'print +(GetICHelper "http")[1]')"`);

    }



    this.createFile = function (data) {
        let content = `import React, {Component} from "react"; \nimport Svg, { Circle, Ellipse, G, Text, TSpan, TextPath, Path, Polygon, Polyline, Line, Rect, Use, Image, Symbol, Defs, LinearGradient, RadialGradient, Stop, ClipPath, Pattern } from 'react-native-svg'; \nconst iconList = {`;
        for (let list of data) {
            var svgOutput = this.replaceSvg(list.data);
            console.log("CREATE", list.name);
            content += `"${list.name}" : ${svgOutput},\n`;
        }

        content += `}`;
        content += `\nexport default iconList;`;

        if (!fs.existsSync(this.OUTPUT)) {
            fs.mkdirSync(this.OUTPUT);
        }
        fs.writeFileSync(this.OUTPUT + this.OUTPUT_NAME, content);
    }
}

var options = {
    PATH: PATH,
    OUTPUT: OUTPUT,
    OUTPUT_NAME: OUTPUT_NAME,
    svgo: svgo
}

var generateFile = new generate(options);
generateFile.syncSvg();
