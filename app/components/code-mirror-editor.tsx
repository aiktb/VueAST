import { vue } from "@codemirror/lang-vue";
import { EditorView, keymap } from "@codemirror/view";
import { githubDark, githubLight } from "@uiw/codemirror-theme-github";
import CodeMirror from "@uiw/react-codemirror";
import { useTheme } from "next-themes";
import * as parserBabel from "prettier/parser-babel";
import * as parserHtml from "prettier/parser-html";
import * as parserPostCSS from "prettier/parser-postcss";
import * as parserTypeScript from "prettier/parser-typescript";
import * as prettierPluginESTree from "prettier/plugins/estree";
import * as prettier from "prettier/standalone";

interface CodeMirrorEditorProps {
  code: string;
  onChange: (value: string) => void;
}

const CodeMirrorEditorProps = ({ code, onChange }: CodeMirrorEditorProps) => {
  const { resolvedTheme } = useTheme();
  const styleTheme = EditorView.baseTheme({
    "&": {
      fontSize: "14px",
    },
    "&.cm-editor.cm-focused": {
      outline: "none",
    },
    ".cm-scroller": {
      fontFamily: "'Fira Code', monospace",
      fontSize: "16px",
    },
    ".cm-gutters": {
      borderRight: "none",
    },
    "&dark .cm-gutters": {
      backgroundColor: "#0D1117",
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
        prettier
          .formatWithCursor(editor.state.doc.toString(), {
            parser: "vue",
            plugins: [
              prettierPluginESTree,
              parserTypeScript,
              parserBabel,
              parserHtml,
              parserPostCSS,
            ],
            cursorOffset: editor.state.selection.main.head,
          })
          .then(({ formatted, cursorOffset }) => {
            editor.dispatch({
              changes: {
                from: 0,
                to: editor.state.doc.length,
                insert: formatted,
              },
              selection: { anchor: cursorOffset, head: cursorOffset },
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
        autoFocus
        translate="no"
        theme={resolvedTheme === "light" ? githubLight : githubDark}
        extensions={[vue(), styleTheme, customKeymap]}
      />
    </div>
  );
};

export default CodeMirrorEditorProps;

const Kbd = ({ children }: { children: string }) => {
  return (
    <kbd className="rounded font-medium font-mono text-[12px] text-neutral-900 uppercase dark:text-white">
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
        <TooltipContent>
          <p className="text-sm">
            Save: <Kbd>{isMacOS ? "⌘" : "Ctrl"}</Kbd> + <Kbd>S</Kbd>
          </p>
          <p className="mt-1 text-sm">
            Format: <Kbd>{isMacOS ? "⇧" : "Shift"}</Kbd> + <Kbd>{isMacOS ? "⌥	" : "Alt"}</Kbd>
            {" +"} <Kbd> F </Kbd>
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
