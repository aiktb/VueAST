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
import { cn } from "~/lib/utils";

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
        setUnsavedChanges(false);
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

  const [unsavedChanges, setUnsavedChanges] = useState(false);
  return (
    <div className="relative h-full">
      <ShortcutTips className="absolute top-0 right-0 z-10" unsavedChanges={unsavedChanges} />
      <CodeMirror
        value={code}
        className="h-full"
        height="100%"
        autoFocus
        translate="no"
        theme={resolvedTheme === "light" ? githubLight : githubDark}
        extensions={[vue(), styleTheme, customKeymap]}
        onChange={() => {
          setUnsavedChanges(true);
        }}
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

const ShortcutTips = ({
  className,
  unsavedChanges,
}: { className: string; unsavedChanges: boolean }) => {
  const isMacOS = navigator?.userAgent?.match(/Macintosh;/);
  return (
    <TooltipProvider delayDuration={300}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" variant="outline" className={cn("", className)}>
            <span className="i-radix-icons-keyboard size-4" />
            {unsavedChanges && (
              <span className="-translate-y-1/2 absolute top-0 right-0 flex size-2 translate-x-1/2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-green-500" />
              </span>
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent className="text-base">
          {unsavedChanges && (
            <p className="underline decoration-green-500">There are unsaved changes.</p>
          )}
          <p>
            Save: <Kbd>{isMacOS ? "⌘" : "Ctrl"}</Kbd> + <Kbd>S</Kbd>
          </p>
          <p>
            Format: <Kbd>{isMacOS ? "⇧" : "Shift"}</Kbd> + <Kbd>{isMacOS ? "⌥	" : "Alt"}</Kbd>
            {" +"} <Kbd> F </Kbd>
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
