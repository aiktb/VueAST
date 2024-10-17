import type { SFCParseResult } from "@vue/compiler-sfc";
import { codeToHtml } from "shiki";

interface AstJsonPreviewProps {
  ast: SFCParseResult;
}

const AstJsonPreview = ({ ast }: AstJsonPreviewProps) => {
  const [highlightedAstJson, setHighlightedAstJson] = useState<string>("");

  useEffect(() => {
    const highlightJson = async () => {
      const json = JSON.stringify({ descriptor: ast.descriptor, errors: ast.errors }, null, 2);
      const highlighted = await codeToHtml(json, {
        lang: "json",
        theme: "min-light",
      });
      setHighlightedAstJson(highlighted);
    };

    highlightJson();
  }, [ast]);

  return (
    <div>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki has escaped html. */}
      <div dangerouslySetInnerHTML={{ __html: highlightedAstJson }} />
    </div>
  );
};

export default AstJsonPreview;
