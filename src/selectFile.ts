import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export default function selectFile(
    currentFolder: vscode.WorkspaceFolder
): Promise<vscode.Uri | null> {
    return new Promise((resolve) => {
        const quickPick = vscode.window.createQuickPick();
        let currentFile: string | null = "";
        let currentFileParent = "";

        if (
            (
                vscode.window.activeTextEditor?.document.uri.path ?? ""
            ).startsWith(currentFolder.uri.path)
        ) {
            currentFile = path.relative(
                currentFolder.uri.path,
                vscode.window.activeTextEditor?.document.uri.path!
            );
        } else {
            currentFile = null;
        }

        if (currentFile) {
            quickPick.value = currentFile;
            currentFileParent = quickPick.value
                .split("/")
                .slice(0, -1)
                .join("/");
        }

        const uriToScan = vscode.Uri.file(
            path.join(currentFolder.uri.path, currentFileParent)
        );

        vscode.workspace.fs.readDirectory(uriToScan).then((files) => {
            quickPick.items = files.map(([file, _]) => ({
                label: path.join(currentFileParent, file.toString()),
            }));
        });

        quickPick.canSelectMany = false;
        quickPick.title = "Choose a file:";

        quickPick.onDidChangeValue(async () => {
            let newDirPath = path.join(
                currentFolder.uri.path + "/" + quickPick.value
            );
            let newDir = vscode.Uri.file(newDirPath);

            if (
                fs.existsSync(newDir.path) &&
                fs.statSync(newDir.path).isDirectory()
            ) {
                quickPick.items = (
                    await vscode.workspace.fs.readDirectory(newDir)
                ).map(([file, _]) => ({
                    label: path.join(quickPick.value, file.toString()),
                }));

                return;
            }
        });

        quickPick.onDidAccept(async () => {
            const selection = quickPick.activeItems[0];

            if (!selection?.label) {
                vscode.window.showErrorMessage("You have to select a file");
                resolve(null);
            }

            let filePath = vscode.Uri.file(
                path.join(currentFolder.uri.path, selection.label)
            );

            if ((await vscode.workspace.fs.stat(filePath)).type !== 1) {
                vscode.window.showErrorMessage("You can only select a file");
                resolve(null);
            }

            resolve(filePath);
            quickPick.dispose();
        });

        quickPick.show();
    });
}
