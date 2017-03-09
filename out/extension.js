"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
function activate(context) {
    console.log("Started LRA3 Tools.");
    context.subscriptions.push(vscode_1.commands.registerCommand("removeDateColumn", removeDateColumn));
    context.subscriptions.push(vscode_1.commands.registerCommand("groupByMinute", groupByMinute));
    context.subscriptions.push(vscode_1.commands.registerCommand("groupByHour", groupByHours));
    context.subscriptions.push(vscode_1.commands.registerCommand("groupBySecond", groupBySeconds));
}
exports.activate = activate;
function removeDateColumn() {
    let txt = vscode_1.window.activeTextEditor.document.getText(vscode_1.window.activeTextEditor.selection);
    txt = txt.replace(/^\d{4}-\d{2}-\d{2} /gm, '');
    vscode_1.window.activeTextEditor.edit((edit) => {
        edit.replace(vscode_1.window.activeTextEditor.selection, txt);
    });
}
var unformattedText;
function groupByMinute() {
    let search = /^\s*(?:\d{4}-\d{2}-\d{2} )?(\d{2}:\d{2}):\d{2}\.\d{3}?/gm;
    groupByTime(search);
}
function groupByHours() {
    let search = /^\s*(?:\d{4}-\d{2}-\d{2} )?(\d{2}):\d{2}:\d{2}\.\d{3}?/gm;
    groupByTime(search);
}
function groupBySeconds() {
    let search = /^\s*(?:\d{4}-\d{2}-\d{2} )?(\d{2}:\d{2}:\d{2})\.\d{3}?/gm;
    groupByTime(search);
}
function groupByTime(search) {
    let txt = vscode_1.window.activeTextEditor.document.getText();
    let changelines = [];
    try {
        // Get first entry
        let m = search.exec(txt);
        let tnow = Number(m[1].replace(":", ""));
        changelines.push(vscode_1.window.activeTextEditor.document.positionAt(m.index + 1).line);
        // Get all lines that changed the given time
        while (m = search.exec(txt)) {
            let ct = Number(m[1].replace(":", ""));
            if (ct > tnow) {
                changelines.push(vscode_1.window.activeTextEditor.document.positionAt(m.index + 1).line);
                tnow = ct;
            }
        }
    }
    catch (error) {
        let i = 0;
    }
    try {
        // Insert a tab to each line to trigger collapse
        vscode_1.window.activeTextEditor.edit((edit) => {
            for (let i = 0, j = 0; i < vscode_1.window.activeTextEditor.document.lineCount; i++)
                if (i !== changelines[j])
                    edit.insert(new vscode_1.Position(i, 0), "\t");
                else if (j < changelines.length)
                    j++;
        });
    }
    catch (error) {
        let i = 0;
    }
}
//# sourceMappingURL=extension.js.map