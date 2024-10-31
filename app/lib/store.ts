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

type GlobalOptionsStore = GlobalOptionsState & GlobalOptionsAction;

export const useGlobalOptionsStore = create<GlobalOptionsStore>()(
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
  valid: boolean;
};

type SelectedNodeAction = {
  updateSelectedNode: (node: SelectedNodeState["node"]) => void;
  updateValid: (valid: SelectedNodeState["valid"]) => void;
};

type SelectedNodeStore = SelectedNodeState & SelectedNodeAction;

export const useSelectedNodeStore = create<SelectedNodeStore>((set) => ({
  node: null,
  valid: true,
  updateSelectedNode: (node) => set(() => ({ node })),
  updateValid: (valid) => set(() => ({ valid })),
}));
