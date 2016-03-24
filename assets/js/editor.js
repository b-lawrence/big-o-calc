(function() {
  var Editor = (function() {

    var editor = ace.edit('editor'),
      result = '',

      setTheme = function() {
        editor.setTheme('ace/theme/monokai');
      },

      setEditorMode = function() {
        editor.getSession().setMode('ace/mode/javascript');
      },

      getEditorContent = function() {
        result = editor.getValue();
      },

      runCode = function() {
        eval(result);
      };

    return {
      setTheme: setTheme,
      setEditorMode: setEditorMode,
      getEditorContent: getEditorContent,
      runCode: runCode
    };
  })();

  Editor.setTheme();
  Editor.setEditorMode();
  Editor.getEditorContent();
  Editor.runCode();
})();
