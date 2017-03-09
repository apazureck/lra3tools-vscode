import { ExtensionContext, commands, window, Position } from 'vscode'

export function activate(context: ExtensionContext) {
    console.log("Started LRA3 Tools.");
    context.subscriptions.push(commands.registerCommand("removeDateColumn", removeDateColumn));
    context.subscriptions.push(commands.registerCommand("groupByMinute", groupByMinute));
    context.subscriptions.push(commands.registerCommand("groupByHour", groupByHours));
    context.subscriptions.push(commands.registerCommand("groupBySecond", groupBySeconds));
}

function removeDateColumn() {
    let txt = window.activeTextEditor.document.getText(window.activeTextEditor.selection);
    txt = txt.replace(/^\d{4}-\d{2}-\d{2} /gm, '');
    window.activeTextEditor.edit((edit) => {
        edit.replace(window.activeTextEditor.selection, txt);
    });
}

var unformattedText: string;

function groupByMinute() {
    let search = /^\s*(?:\d{4}-\d{2}-\d{2} )?(\d{2}:\d{2}):\d{2}\.\d{3}?/gm
    groupByTime(search);
}

function groupByHours() {
    let search = /^\s*(?:\d{4}-\d{2}-\d{2} )?(\d{2}):\d{2}:\d{2}\.\d{3}?/gm
    groupByTime(search);
}

function groupBySeconds() {
    let search = /^\s*(?:\d{4}-\d{2}-\d{2} )?(\d{2}:\d{2}:\d{2})\.\d{3}?/gm
    groupByTime(search);
}

function groupByTime(search: RegExp) {
    let txt = window.activeTextEditor.document.getText();
    let changelines: number[] = [];
    try {
        // Get first entry
        let m = search.exec(txt);
        let tnow: number = Number(m[1].replace(":",""));
        changelines.push(window.activeTextEditor.document.positionAt(m.index+1).line);
        // Get all lines that changed the given time
        while (m = search.exec(txt)) {
            let ct = Number(m[1].replace(":",""));
            if (ct > tnow) {
                changelines.push(window.activeTextEditor.document.positionAt(m.index+1).line);
                tnow = ct;
            }
        }
    } catch (error) {
        let i = 0;
    }

    try {
        // Insert a tab to each line to trigger collapse
        window.activeTextEditor.edit((edit) => {
            for (let i = 0, j = 0; i < window.activeTextEditor.document.lineCount; i++)
                if (i !== changelines[j])
                    edit.insert(new Position(i, 0), "\t");
                else if(j < changelines.length)
                    j++;
        });
    } catch (error) {
        let i = 0;
    }
}