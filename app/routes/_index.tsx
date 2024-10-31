import type { LoaderFunctionArgs, MetaFunction } from "@netlify/remix-runtime";
import { json } from "@netlify/remix-runtime";
import { useLoaderData } from "@remix-run/react";
import { parse } from "@vue/compiler-sfc";
import { ClientOnly } from "~/lib/utils";

import CodeMirrorEditor from "~/components/code-mirror-editor";
import CollapsibleTreeView from "~/components/collapsible-tree-view";
import Header from "~/components/header";
import SelectedNodeView from "~/components/selected-node-view";

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
  const q = url.searchParams.get("q");
  if (q) {
    return json({ code: q });
  }
  return json({ code: exampleCode });
};

export default function Index() {
  const { code: defaultCode } = useLoaderData<typeof loader>();
  const [code, setCode] = useState(defaultCode);
  const ast = parse(code);

  const onChange = (newCode: string) => {
    if (newCode === code) {
      return;
    }
    setCode(newCode);
  };
  return (
    <div className="relative grid h-dvh grid-rows-[3rem,_1fr]">
      <Header className="sticky top-0 z-20 w-full" />
      <main className="overflow-scroll">
        <ResizablePanelGroup direction="horizontal" className="w-full overflow-scroll">
          <ResizablePanel defaultSize={34} id="editor-view" order={1}>
            <div className="h-full items-center justify-center px-3 py-6 lg:px-6">
              <ClientOnly>{() => <CodeMirrorEditor code={code} onChange={onChange} />}</ClientOnly>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle={true} />
          <ResizablePanel defaultSize={33} id="tree-view" order={2}>
            <div className="h-full items-center justify-center px-3 py-6 lg:px-6">
              <CollapsibleTreeView ast={ast} />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle={true} />
          <ResizablePanel defaultSize={33} id="node-view" order={3}>
            <div className="h-full items-center justify-center px-3 py-6 lg:px-6">
              <SelectedNodeView />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </main>
    </div>
  );
}
