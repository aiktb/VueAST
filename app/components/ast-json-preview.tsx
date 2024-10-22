import type { SFCParseResult } from "@vue/compiler-sfc";
import { codeToHtml } from "shiki";
interface AstJsonPreviewProps {
  ast: SFCParseResult;
}

const AstJsonPreview = ({ ast }: AstJsonPreviewProps) => {
  const [highlightedAstJson, setHighlightedAstJson] = useState<string>("");

  useEffect(() => {
    const highlightJson = async () => {
      const json = JSON.stringify(ast, null, 2);
      const highlighted = await codeToHtml(json, {
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
      });
      setHighlightedAstJson(highlighted);
    };

    highlightJson();
  }, [ast]);

  return (
    <div className="text-sm">
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki has escaped html. */}
      <div dangerouslySetInnerHTML={{ __html: highlightedAstJson }} />
    </div>
  );
};

export default AstJsonPreview;
