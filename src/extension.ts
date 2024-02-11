// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "vsc-reader" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('vsc-reader.readText', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Opening the webview for the current file!');

		let editor = vscode.window.activeTextEditor;

		if (!editor) {
			vscode.window.showErrorMessage('No active editor found!');
			return;
		} else {
			const panel = vscode.window.createWebviewPanel(
				'vsc-reader', // Identifies the type of the webview. Used internally
				'VSC Reader', // Title of the panel displayed to the user
				vscode.ViewColumn.One, // Editor column to show the new webview panel in.
				{} // Webview options. More on these later.
			);

			panel.webview.html = getWebviewContent(editor.document.getText());
		}
	});

	context.subscriptions.push(disposable);
}

function getWebviewContent(text: string) {
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
		<meta charset="UTF-8">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>VSC Reader</title>
		<style>
			body {
				font-family: Arial, sans-serif;
				background-color: #f0f0f0;
				padding: 20px;
			}
		</style>
	</head>
	<body>
		${text}
	</body>
	</html>`;
}

// This method is called when your extension is deactivated
export function deactivate() {}
