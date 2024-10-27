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
    <div className="h-full overflow-scroll">
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki has escaped html. */}
      <div dangerouslySetInnerHTML={{ __html: highlightedAstJson }} />
    </div>
  );
};

export default SelectedNodeView;
