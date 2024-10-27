import type { Node, TemplateChildNode } from "@vue/compiler-core";
import { NodeTypes } from "@vue/compiler-core";
import type { SFCBlock, SFCParseResult, SFCTemplateBlock } from "@vue/compiler-sfc";
import { useSelectedNodeStore } from "~/lib/store";
import { cn } from "~/lib/utils";

interface CollapsibleTreeViewProps {
  ast: SFCParseResult;
}

const CollapsibleTreeView = ({ ast }: CollapsibleTreeViewProps) => {
  return (
    <div className="h-full font-mono">
      {ast.descriptor.template && <TemplateTreeRootNode instance={ast.descriptor.template} />}
      {ast.descriptor.scriptSetup && (
        <CollapsibleButton node={ast.descriptor.scriptSetup}>
          {ast.descriptor.scriptSetup.type}
        </CollapsibleButton>
      )}
      {ast.descriptor.script && (
        <CollapsibleButton node={ast.descriptor.script}>
          {ast.descriptor.script.type}
        </CollapsibleButton>
      )}
      {ast.descriptor.styles.map((style) => (
        <CollapsibleButton node={style} key={style.loc.start.offset}>
          {style.type}
        </CollapsibleButton>
      ))}
    </div>
  );
};
export default CollapsibleTreeView;

interface CollapsibleButtonProps {
  children: React.ReactNode;
  node: Node | SFCBlock;
}

const CollapsibleButton = ({ children, node }: CollapsibleButtonProps) => {
  const { updateSelectedNode, node: selectedNode } = useSelectedNodeStore();
  return (
    <button
      type="button"
      onClick={() => updateSelectedNode(node)}
      className={cn("flex w-full items-start uppercase", {
        "text-blue-500": node === selectedNode,
      })}
    >
      {children}
    </button>
  );
};

interface TemplateTreeRootNodeProps {
  instance: SFCTemplateBlock;
}

const TemplateTreeRootNode = ({ instance }: TemplateTreeRootNodeProps) => {
  return (
    <div>
      <CollapsibleButton node={instance}>{instance.type}</CollapsibleButton>
      <div>
        {instance.ast?.children.map((child) => (
          <TemplateTreeNode instance={child} key={child.loc.start.offset} />
        ))}
      </div>
    </div>
  );
};

interface TemplateTreeNodeProps {
  instance: TemplateChildNode;
}

const TemplateTreeNode = ({ instance }: TemplateTreeNodeProps) => {
  // COMPOUND_EXPRESSION is a node that is only generated when the compiler optimizes.
  // Impossible to appear in the use case. It's excluded here just to eliminate TSC warning.
  const hasChildren = instance.type !== NodeTypes.COMPOUND_EXPRESSION && "children" in instance;

  return (
    <div>
      <div className="ml-3">
        <CollapsibleButton node={instance}>{NodeTypes[instance.type]}</CollapsibleButton>
        {hasChildren && (
          <div>
            {instance.children.map((child) => (
              <TemplateTreeNode instance={child} key={child.loc.start.offset} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
