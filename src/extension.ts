// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	// console.log('Congratulations, your extension "copy-code" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('copy-code.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from copy-code!');
	// });
	let disposable = vscode.commands.registerTextEditorCommand(
		'vscode-comgosu.copyCodeWithLines',
		async (textEditor: vscode.TextEditor, edit: vscode.TextEditorEdit) => {
			let lines = [];

			lines.push(`Path: ${fileName(textEditor)}`);
			const sorted = [...textEditor.selections].sort((a, b) => a.start.line - b.start.line);
			for (let j = 0; j < sorted.length; ++j) {
				const selection = sorted[j];

				for (let j = selection.start.line; j <= selection.end.line; ++j) {
					const line = textEditor.document.lineAt(j);
					lines.push(`${line.lineNumber + 1}: ${line.text}`);
				}

				if (j !== sorted.length - 1) {
					lines.push('...');
				}
			}

			await vscode.env.clipboard.writeText(lines.join('\n'));

			vscode.window.showInformationMessage('ComGosu: Copied with lines!');
		}
	);
	context.subscriptions.push(disposable);
}

function fileName(textEditor: vscode.TextEditor) {
	if (vscode.workspace.workspaceFolders === undefined) {
		return textEditor.document.uri.fsPath;
	}

	// Try to create a relative path if document is inside a workspace.
	// Path will be in linux format.
	for (const workspaceFolder of vscode.workspace.workspaceFolders) {
		const path = textEditor.document.uri.path;
		const wsPath = workspaceFolder.uri.path;
		if (path.startsWith(wsPath)) {
			return path.substring(wsPath.length + 1); // + 1 for slash
		}
	}

	// Fall back to fs path.
	return textEditor.document.uri.fsPath;
}

// This method is called when your extension is deactivated
export function deactivate() { }
