import type { SFCParseResult } from "@vue/compiler-sfc";
import { codeToHtml } from "shiki";

import { cn } from "~/lib/utils";

interface AstJsonPreviewProps {
  ast: SFCParseResult;
  className?: string;
}

const AstJsonPreview = ({ ast, className }: AstJsonPreviewProps) => {
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
    <div className={cn("", className)}>
      {/* biome-ignore lint/security/noDangerouslySetInnerHtml: Shiki has escaped html. */}
      <div dangerouslySetInnerHTML={{ __html: highlightedAstJson }} />
    </div>
  );
};

export default AstJsonPreview;
