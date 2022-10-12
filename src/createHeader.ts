import * as vscode from "vscode";
import KNOWN_FILE_TYPES from "./knownFiles";

export default async function createHeader(file: vscode.Uri) {
    const projectConf = vscode.workspace.getConfiguration(
        "header-generator-tek"
    );
    const fileLang = file.path.split(".").pop()!;
    const projectName = (projectConf.get("project-name") as string) ?? "";

    if (!(KNOWN_FILE_TYPES as Object).hasOwnProperty(fileLang)) {
        vscode.window.showErrorMessage("Unknown file type");
        return;
    }

    const headerTitle = await vscode.window.showInputBox({
        title: "The project name :",
        value: projectName,
    });

    if (!headerTitle) {
        vscode.window.showErrorMessage("Missing project name :(");
        return;
    }

    const headerDescr = await vscode.window.showInputBox({
        title: "A quick description of the project :",
    });

    if (!headerDescr) {
        vscode.window.showErrorMessage("Missing description :(");
        return;
    }

    projectConf.update("project-name", headerTitle.trim());

    const { cs, cc, ce } =
        KNOWN_FILE_TYPES[fileLang as keyof typeof KNOWN_FILE_TYPES];

    const headerContent = `${cs}
${cc}EPITECH PROJECT, 2022
${cc}${headerTitle.trim()}
${cc}File description:
${cc}${headerDescr.trim()}
${ce}
`;

    const headerEdit = new vscode.WorkspaceEdit();
    headerEdit.insert(file, new vscode.Position(0, 0), headerContent);

    const success = await vscode.workspace.applyEdit(headerEdit);

    if (!success) {
        vscode.window.showErrorMessage("Something went wrong :(");
    }
}
