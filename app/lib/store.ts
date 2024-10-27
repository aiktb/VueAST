import type { Node } from "@vue/compiler-core";
import type { SFCBlock } from "@vue/compiler-sfc";
import { create } from "zustand";
import { persist } from "zustand/middleware";

type GlobalOptionsState = {
  view: "JSON" | "tree";
};

type GlobalOptionsAction = {
  updateView: (view: GlobalOptionsState["view"]) => void;
};

export const useGlobalOptionsStore = create<GlobalOptionsState & GlobalOptionsAction>()(
  persist(
    (set) => ({
      view: "tree",
      updateView: (view) => set({ view }),
    }),
    {
      name: "zustand-global-options",
    },
  ),
);

type SelectedNodeState = {
  node: Node | SFCBlock | null;
};

type SelectedNodeAction = {
  updateSelectedNode: (node: SelectedNodeState["node"]) => void;
};

export const useSelectedNodeStore = create<SelectedNodeState & SelectedNodeAction>((set) => ({
  node: null,
  updateSelectedNode: (node) => set({ node }),
}));
