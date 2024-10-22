import { vue } from "@codemirror/lang-vue";
import { EditorView, keymap } from "@codemirror/view";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import CodeMirror from "@uiw/react-codemirror";
import { useTheme } from "next-themes";
import parserBabel from "prettier/parser-babel";
import parserHtml from "prettier/parser-html";
import parserTypeScript from "prettier/parser-typescript";
import prettier from "prettier/standalone";

interface CodeMirrorEditorProps {
  code: string;
  onChange: (value: string) => void;
}

const CodeMirrorEditorProps = ({ code, onChange }: CodeMirrorEditorProps) => {
  const { theme } = useTheme();
  const styleTheme = EditorView.baseTheme({
    "&": {
      fontSize: "14px",
    },
    "&.cm-editor.cm-focused": {
      outline: "none",
    },
    ".cm-scroller": {
      fontFamily: "'Fira Code', monospace",
    },
    ".cm-gutters": {
      backgroundColor: "transparent",
    },
  });
  const customKeymap = keymap.of([
    {
      key: "Ctrl-s",
      mac: "Cmd-s",
      run: (editor) => {
        onChange(editor.state.doc.toString());
        return true;
      },
    },
    {
      key: "Shift-Alt-f",
      mac: "Shift-Cmd-f",
      run: (editor) => {
        new Promise<string>((resolve) => {
          resolve(
            prettier.format(editor.state.doc.toString(), {
              parser: "vue",
              plugins: [parserHtml, parserBabel, parserTypeScript],
            }),
          );
        }).then((formatted) => {
          editor.dispatch({
            changes: {
              from: 0,
              to: editor.state.doc.length,
              insert: formatted,
            },
          });
        });
        return true;
      },
    },
  ]);

  return (
    <CodeMirror
      value={code}
      className="h-full"
      height="100%"
      theme={theme === "light" ? githubLight : githubDark}
      extensions={[vue(), styleTheme, customKeymap]}
    />
  );
};

export default CodeMirrorEditorProps;
