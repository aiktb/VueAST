import type { MetaFunction } from "@netlify/remix-runtime";
import { parse } from "@vue/compiler-sfc";

import { ClientOnly } from "remix-utils/client-only";
import AstJsonPreview from "~/components/ast-json-preview";
import CodeMirrorEditor from "~/components/code-mirror-editor";
import Header from "~/components/header";

export const meta: MetaFunction = () => {
  return [
    { title: "VueAST" },
    {
      name: "description",
      content: "View the AST structure of the Vue template syntax online immediately.",
    },
  ];
};

const exampleCode = `<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
</script>

<template>
  <span class="count">{{ count }}</span>
  <button @click="count++">Add</button>
</template>

<style scoped>
.count {
  color: green;
}
</style>
`;

export default function Index() {
  const [code, setCode] = useState(exampleCode);
  const ast = parse(code);

  return (
    <div className="relative h-screen">
      <Header className="sticky top-0 z-20 h-12 w-full" />
      <main className="h-[calc(100%-48px)] overflow-scroll">
        <ResizablePanelGroup direction="horizontal" className="w-full overflow-scroll">
          <ResizablePanel defaultSize={50}>
            <div className="h-full items-center justify-center p-6">
              <ClientOnly>{() => <CodeMirrorEditor code={code} onChange={setCode} />}</ClientOnly>
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
