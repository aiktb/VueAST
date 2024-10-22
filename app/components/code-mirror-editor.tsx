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
      borderRight: "none",
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
    <div className="relative h-full">
      <ShortcutTips className="absolute top-0 right-0 z-10" />
      <CodeMirror
        value={code}
        className="h-full"
        height="100%"
        theme={theme === "light" ? githubLight : githubDark}
        extensions={[vue(), styleTheme, customKeymap]}
      />
    </div>
  );
};

export default CodeMirrorEditorProps;

const Kbd = ({ children }: { children: string }) => {
  return (
    <kbd className="inline-flex h-5 min-w-5 items-center justify-center rounded bg-neutral-50 px-1 font-medium font-mono text-[10px] text-neutral-900 ring-1 ring-neutral-300 ring-inset dark:bg-neutral-800 dark:text-white dark:ring-neutral-700">
      {children}
    </kbd>
  );
};

const ShortcutTips = ({ className }: { className: string }) => {
  const isMacOS = navigator?.userAgent?.match(/Macintosh;/);
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline" className={className}>
            <span className="i-radix-icons-keyboard size-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="text-sm">
          <p className="flex items-center gap-0.5">
            Save: <Kbd>{isMacOS ? "⌘" : "Ctrl"}</Kbd>
            <Kbd>S</Kbd>
          </p>
          <p className="mt-1 flex items-center gap-0.5">
            Format: <Kbd>{isMacOS ? "⇧" : "Shift"}</Kbd> <Kbd>{isMacOS ? "⌥	" : "Alt"}</Kbd>
            <Kbd>F</Kbd>
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
