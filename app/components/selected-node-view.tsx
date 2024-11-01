import { codeToHtml } from "shiki";
import { useSelectedNodeStore } from "~/lib/store";

const SelectedNodeView = () => {
  const { node } = useSelectedNodeStore();
  const jsonCode = JSON.stringify(node, null, 2);
  const [highlightedAstJson, setHighlightedAstJson] = useState<string>("");
  codeToHtml(jsonCode, {
    lang: "json",
    themes: {
      light: "github-light-high-contrast",
      dark: "github-dark-high-contrast",
    },
    colorReplacements: {
      "github-dark-high-contrast": {
        "#0a0c10": "#0d1117",
      },
    },
  }).then(setHighlightedAstJson);
  return (
    <div className="relative h-full">
      <div className="h-full overflow-scroll">
        <CopyTextButton text={jsonCode} className="absolute top-0 right-0" />
        {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki has escaped html. */}
        <div dangerouslySetInnerHTML={{ __html: highlightedAstJson }} />
      </div>
    </div>
  );
};

export default SelectedNodeView;

const CopyTextButton = ({ text, className }: { text: string; className: string }) => {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      size="icon"
      variant="outline"
      className={className}
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
      }}
    >
      <span className="sr-only">Copy JSON code</span>
      {copied ? (
        <span className="i-lucide-check-check size-4 animate-pulse" />
      ) : (
        <span className="i-radix-icons-copy size-4" />
      )}
    </Button>
  );
};
