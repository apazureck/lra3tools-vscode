"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode_1 = require("vscode");
function activate(context) {
    console.log("Started LRA3 Tools.");
    context.subscriptions.push(vscode_1.commands.registerCommand("removeDateColumn", removeDateColumn));
}
exports.activate = activate;
function removeDateColumn() {
    let txt = vscode_1.window.activeTextEditor.document.getText(vscode_1.window.activeTextEditor.selection);
    txt = txt.replace(/^\d{4}-\d{2}-\d{2} /gm, '');
    vscode_1.window.activeTextEditor.edit((edit) => {
        edit.replace(vscode_1.window.activeTextEditor.selection, txt);
    });
}
//# sourceMappingURL=extension.js.map