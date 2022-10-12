import * as vscode from "vscode";
import createHeader from "./createHeader";
import selectFile from "./selectFile";

export function activate(context: vscode.ExtensionContext) {
    let command = vscode.commands.registerCommand(
        "header-generator-tek.generate-header",
        async () => {
            const currentFolder = vscode.workspace.workspaceFolders;

            if (!currentFolder) {
                vscode.window.showErrorMessage(
                    "You are not currently in a directory"
                );
                return;
            }

            if (currentFolder.length > 1) {
                vscode.window.showErrorMessage(
                    "You must be in a single workspace"
                );
                return;
            }

            const selectedFile = await selectFile(currentFolder[0]);

            if (selectedFile) {
                createHeader(selectedFile);
            }
        }
    );

    context.subscriptions.push(command);
}

export function deactivate() {}
