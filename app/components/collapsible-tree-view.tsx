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
          <div className="i-radix-icons-dot-filled size-6 text-black dark:text-white" />
          <div className="uppercase">{ast.descriptor.scriptSetup.type}</div>
          <div className="ml-1.5 text-blue-500 group-data-[selected=true]:text-blue-200">setup</div>
        </CollapsibleButton>
      )}
      {ast.descriptor.script && (
        <CollapsibleButton node={ast.descriptor.script}>
          <div className="i-radix-icons-dot-filled size-6 text-black dark:text-white" />
          <div className="uppercase">{ast.descriptor.script.type}</div>
        </CollapsibleButton>
      )}
      {ast.descriptor.styles.map((style) => (
        <CollapsibleButton node={style} key={style.loc.start.offset}>
          <div className="i-radix-icons-dot-filled size-6 text-black dark:text-white" />

          <div className="uppercase">{style.type}</div>
        </CollapsibleButton>
      ))}
    </div>
  );
};
export default CollapsibleTreeView;

interface CollapsibleButtonProps {
  children: React.ReactNode;
  node: Node | SFCBlock;
  depth?: number;
}

const CollapsibleButton = ({ children, node, depth = 1 }: CollapsibleButtonProps) => {
  const { updateSelectedNode, node: selectedNode } = useSelectedNodeStore();
  return (
    <button
      type="button"
      onClick={() => updateSelectedNode(node)}
      style={{
        paddingLeft: `${depth * 1}rem`,
      }}
      data-selected={node === selectedNode}
      className="group mb-1.5 flex w-full items-center rounded text-green-500 transition hover:bg-green-500 hover:text-white data-[selected=true]:bg-green-500 data-[selected=true]:text-white"
    >
      {children}
    </button>
  );
};

interface TemplateTreeRootNodeProps {
  instance: SFCTemplateBlock;
}

const TemplateTreeRootNode = ({ instance }: TemplateTreeRootNodeProps) => {
  const [collapsed, setCollapsed] = useState(true);
  return (
    <div>
      <CollapsibleButton node={instance}>
        <button
          type="button"
          className="i-radix-icons-triangle-right size-6 text-black dark:text-white"
          onClick={() => setCollapsed((prev) => !prev)}
        />
        <div className="uppercase">{instance.type}</div>
      </CollapsibleButton>
      {collapsed && (
        <div>
          {instance.ast?.children.map((child) => (
            <TemplateTreeNode instance={child} key={child.loc.start.offset} />
          ))}
        </div>
      )}
    </div>
  );
};

interface TemplateTreeNodeProps {
  instance: TemplateChildNode;
  depth?: number;
}

const TemplateTreeNode = ({ instance, depth = 2 }: TemplateTreeNodeProps) => {
  // COMPOUND_EXPRESSION is a node that is only generated when the compiler optimizes.
  // Impossible to appear in the use case. It's excluded here just to eliminate TSC warning.
  const hasChildren = instance.type !== NodeTypes.COMPOUND_EXPRESSION && "children" in instance;
  const [collapsed, setCollapsed] = useState(depth <= 3);

  return (
    <div>
      <CollapsibleButton node={instance} depth={depth}>
        {hasChildren ? (
          <button
            type="button"
            className={cn("i-radix-icons-triangle-right size-6 text-black dark:text-white", {
              "rotate-90": !collapsed,
            })}
            onClick={() => setCollapsed((prev) => !prev)}
          />
        ) : (
          <div className="i-radix-icons-dot-filled size-6 text-black dark:text-white" />
        )}
        <div>{NodeTypes[instance.type]}</div>
        {instance.type === NodeTypes.ELEMENT && (
          <div className="ml-1.5 text-purple-400 group-data-[selected=true]:text-purple-200">{`<${instance.tag}>`}</div>
        )}
      </CollapsibleButton>
      {collapsed && hasChildren && (
        <div>
          {instance.children.map((child) => (
            <TemplateTreeNode instance={child} key={child.loc.start.offset} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
};
