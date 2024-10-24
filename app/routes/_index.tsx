import type { LoaderFunctionArgs, MetaFunction } from "@netlify/remix-runtime";
import { json } from "@netlify/remix-runtime";
import { useLoaderData, useSearchParams } from "@remix-run/react";
import { parse } from "@vue/compiler-sfc";

import { ClientOnly } from "remix-utils/client-only";
import AstJsonPreview from "~/components/ast-json-preview";
import CodeMirrorEditor from "~/components/code-mirror-editor";
import Header from "~/components/header";

import exampleCode from "~/assets/example.vue?raw";

export const meta: MetaFunction = () => {
  return [
    { title: "VueAST" },
    {
      name: "description",
      content: "View the AST structure of the Vue template syntax online immediately.",
    },
  ];
};

export const loader = ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const q = url.searchParams.get("code");
  if (q) {
    return json({ code: q });
  }
  return json({ code: exampleCode });
};

export default function Index() {
  const { code: defaultCode } = useLoaderData<typeof loader>();
  const [code, setCode] = useState(defaultCode);
  const ast = parse(code);

  const [_, setSearchParams] = useSearchParams();
  const onChange = (newCode: string) => {
    if (newCode === code) {
      return;
    }
    setCode(newCode);
    const newParams = new URLSearchParams();
    newParams.set("code", newCode);
    setSearchParams(newParams);
  };
  return (
    <div className="relative grid h-dvh grid-rows-[3rem,_1fr]">
      <Header className="sticky top-0 z-20 w-full" />
      <main className="overflow-scroll">
        <ResizablePanelGroup direction="horizontal" className="w-full overflow-scroll">
          <ResizablePanel defaultSize={50}>
            <div className="h-full items-center justify-center p-6">
              <ClientOnly>{() => <CodeMirrorEditor code={code} onChange={onChange} />}</ClientOnly>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle={true} />
          <ResizablePanel defaultSize={50}>
            <div className="h-full items-center justify-center p-6">
              <AstJsonPreview ast={ast} />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}
