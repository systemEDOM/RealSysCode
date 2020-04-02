getEditor(window.language);

$("#language").change(function () {
    $.ajax({
        url: '/snippets/updateByAjax/' + window.id,
        type: 'PUT',
        data: "language=" + $("#language").val(),
        success: function (response) {
            M.toast({ html: 'Updated your language' });
            getEditor($("#language").val());
        },
        error: function (response) {
            M.toast({ html: 'Error updating your language' });
        }
    });
});

function getEditor(language) {
    let languageSelected;
    switch (language) {
        case "c":
            languageSelected = "text/x-csrc";
            break;
        case "cplusplus":
            languageSelected = "text/x-c++src";
            break;
        case "css":
            languageSelected = "text/x-scss";
            break;
        case "html":
            languageSelected = "text/html";
            break;
        case "java":
            languageSelected = "text/x-java";
            break;
        case "javascript":
            languageSelected = "text/javascript";
            break;
        case "php":
            languageSelected = "application/x-httpd-php";
            break;
        default:
            break;
    }

    CodeMirror.commands.autocomplete = function (cm) {
        cm.showHint({ hint: CodeMirror.hint.anyword });
    }

    window.editor = CodeMirror.fromTextArea(document.getElementById("code"), {
        extraKeys: { "Ctrl-Space": "autocomplete" },
        mode: { name: languageSelected, globalVars: true },
        lineNumbers: true,
        lineWrapping: true,
        theme: "material-darker",
        indentUnit: 4,
        indentWithTabs: true,
        autofocus: true,
        matchBrackets: true,
        styleActiveLine: true,
        autoCloseBrackets: true,
    });

    const onCursorActivity = (instance) => {
        const cursor = editor.getCursor();
        window.line = cursor.line + 1;
        window.ch = ch + 1;
        console.log(window.line, window.ch);
    }

    window.editor.on("cursorActivity", onCursorActivity);

    window.editor.on('change', function (cMirror, changeObj) {
        console.log("here", changeObj.to.line);
        $.ajax({
            url: '/snippets/updateByAjax/' + window.id,
            type: 'PUT',
            data: "code=" + cMirror.getValue(),
            success: function (response) {
                socket.emit('code_emit', { id: window.id, value: cMirror.getValue() });
            },
            error: function (response) {
                M.toast({ html: 'Error updating your code' });
            }
        });
    });

    // editor.setSize("500", "450"); 
}