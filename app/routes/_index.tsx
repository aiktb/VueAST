import type { MetaFunction } from "@netlify/remix-runtime";

import { type SFCParseResult, parse } from "@vue/compiler-sfc";

import AstJsonPreview from "~/components/ast-json-preview";
import CodeMirrorEditor from "~/components/code-mirror-editor";

export const meta: MetaFunction = () => {
  return [
    { title: "Vueast" },
    {
      name: "description",
      content: "View the AST structure of the Vue template syntax online immediately.",
    },
  ];
};

export default function Index() {
  const exampleCode = `<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
</script>

<template>
  <span>{{ count }}</span>
  <button @click="count++">Add</button>
</template>
`;
  const [code, setCode] = useState<string>(exampleCode);
  const [ast, setAst] = useState<SFCParseResult>(parse(code));

  useEffect(() => {
    setAst(parse(code));
  }, [code]);

  return (
    <ResizablePanelGroup direction="horizontal" className="min-h-screen w-full overflow-scroll">
      <ResizablePanel defaultSize={50}>
        <div className="max-h-screen items-center justify-center overflow-scroll p-6">
          <CodeMirrorEditor code={code} onChange={setCode} />
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle={true} />
      <ResizablePanel defaultSize={50}>
        <div className="max-h-screen items-center justify-center overflow-scroll p-6">
          <AstJsonPreview ast={ast} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
