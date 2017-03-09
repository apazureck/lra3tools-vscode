import { ExtensionContext, commands, window } from 'vscode'

export function activate(context: ExtensionContext) {
    console.log("Started LRA3 Tools.");
    context.subscriptions.push(commands.registerCommand("removeDateColumn", removeDateColumn));
}

function removeDateColumn() {
    let txt = window.activeTextEditor.document.getText(window.activeTextEditor.selection);
    txt = txt.replace(/^\d{4}-\d{2}-\d{2} /gm, '');
    window.activeTextEditor.edit((edit) => {
        edit.replace(window.activeTextEditor.selection, txt);
    })
}