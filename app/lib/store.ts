import type { Node } from "@vue/compiler-core";
import type { SFCBlock } from "@vue/compiler-sfc";
import { create } from "zustand";

type SelectedNodeState = {
  node: Node | SFCBlock | null;
};

type SelectedNodeAction = {
  updateSelectedNode: (node: SelectedNodeState["node"]) => void;
};

type SelectedNodeStore = SelectedNodeState & SelectedNodeAction;

export const useSelectedNodeStore = create<SelectedNodeStore>((set) => ({
  node: null,
  updateSelectedNode: (node) => set(() => ({ node })),
}));
