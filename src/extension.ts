// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import fetch from "node-fetch";

export function activate(context: vscode.ExtensionContext) {
  console.log(
    'Snippet Serve has started'
  );

  let disposable = vscode.commands.registerCommand(
    "extension.snippet",
    async () => {
      // The code you place here will be executed every time your command is executed

      // Display a message box to the user
      const editor = vscode.window.activeTextEditor;
      if (!editor) {
        vscode.window.showInformationMessage("editor does not exist");
        return;
      }

      const text = editor.document.getText(editor.selection);
      // vscode.window.showInformationMessage(`selected text: ${text}`);

      const apiKey = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTU0MTI5NTQsIm5iZiI6MTU5NTQxMjk1NCwianRpIjoiY2EzOThjZDctMmEzOS00NzNjLTlmMGEtM2RjNTEyMTkwOTdiIiwiZXhwIjoxNjI2OTQ4OTU0LCJpZGVudGl0eSI6IkdldENvZGVUZXN0IiwiZnJlc2giOmZhbHNlLCJ0eXBlIjoiYWNjZXNzIn0.Rmjxa4zfzuGGW-DrHEasGfBJ0xZZdVmHGuDyemrrn6s";

      var url = "https://getcode.herokuapp.com/api/snippets/2";
  
  
      const response = await fetch(url,{
          method:"GET",
          headers:{
              "Authorization":"Bearer "+apiKey
          }
      });


      const data = await response.json();
      console.log(data.snippet.code)

      editor.edit(edit => {
              edit.replace(editor.selection, data.snippet.code);
            });

      // const quickPick = vscode.window.createQuickPick();
      // quickPick.items = data.map((x: any) => ({ label: x.snippet.code}));
      // quickPick.onDidChangeSelection(([item]) => {
      //   if (item) {
      //     // vscode.window.showInformationMessage(item.label);
      //     editor.edit(edit => {
      //       edit.replace(editor.selection, item.label);
      //     });
      //     quickPick.dispose();
      //   }
      // });
      // quickPick.onDidHide(() => quickPick.dispose());
      // quickPick.show();
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
