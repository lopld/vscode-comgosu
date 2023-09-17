(()=>{"use strict";var t={496:t=>{t.exports=require("vscode")}},e={};function o(r){var s=e[r];if(void 0!==s)return s.exports;var n=e[r]={exports:{}};return t[r](n,n.exports,o),n.exports}var r={};(()=>{var t=r;Object.defineProperty(t,"__esModule",{value:!0}),t.deactivate=t.activate=void 0;const e=o(496);t.activate=function(t){let o=e.commands.registerTextEditorCommand("vscode-comgosu.copyCodeWithLines",(async(t,o)=>{let r=[];r.push(`Path: ${function(t){if(void 0===e.workspace.workspaceFolders)return t.document.uri.fsPath;for(const o of e.workspace.workspaceFolders){const e=t.document.uri.path,r=o.uri.path;if(e.startsWith(r))return e.substring(r.length+1)}return t.document.uri.fsPath}(t)}`);const s=[...t.selections].sort(((t,e)=>t.start.line-e.start.line));for(let e=0;e<s.length;++e){const o=s[e];for(let e=o.start.line;e<=o.end.line;++e){const o=t.document.lineAt(e);r.push(`${o.lineNumber+1}: ${o.text}`)}e!==s.length-1&&r.push("...")}await e.env.clipboard.writeText(r.join("\n")),e.window.showInformationMessage(`ComGosu: Copied with ${r.length-1} lines.`)}));t.subscriptions.push(o)},t.deactivate=function(){}})(),module.exports=r})();