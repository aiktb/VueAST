import { vue } from "@codemirror/lang-vue";
import { EditorView, basicSetup } from "codemirror";

import { cn } from "~/lib/utils";

interface CodeMirrorEditorProps {
  code: string;
  onChange: (value: string) => void;
  className?: string;
}

const CodeMirrorEditorProps = ({ code, className, onChange }: CodeMirrorEditorProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  useEffect(() => {
    if (!editorRef.current) {
      return;
    }

    viewRef.current = new EditorView({
      extensions: [
        basicSetup,
        vue(),
        EditorView.theme({
          ".cm-scroller": {
            fontFamily: "Fira Code, monospace",
          },
        }),
      ],
      parent: editorRef.current,
      doc: code,
    });

    return () => {
      if (viewRef.current) {
        viewRef.current.destroy();
      }
    };
  }, []);

  const emitChangeEvent = () => {
    if (!viewRef.current) {
      return;
    }
    onChange(viewRef.current.state.doc.toString());
  };

  return (
    <div
      ref={editorRef}
      className={cn("relative size-full overflow-hidden font-mono", className)}
      translate="no"
      onKeyDown={(e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === "s") {
          e.preventDefault();
          emitChangeEvent();
        }
      }}
      onBlur={emitChangeEvent}
    />
  );
};

export default CodeMirrorEditorProps;
