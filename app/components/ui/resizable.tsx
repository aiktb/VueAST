import * as ResizablePrimitive from "react-resizable-panels";

import { cn } from "~/lib/utils";

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn("flex h-full w-full data-[panel-group-direction=vertical]:flex-col", className)}
    {...props}
  />
);

const ResizablePanel = ResizablePrimitive.Panel;

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean;
}) => (
  <div className="relative">
    <ResizablePrimitive.PanelResizeHandle
      className={cn(
        "after:-translate-x-1/2 data-[panel-group-direction=vertical]:after:-translate-y-1/2 relative flex w-[1px] items-center justify-center bg-border transition-[width,_background-color] after:absolute after:inset-y-0 after:left-1/2 after:w-1 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-1 data-[panel-group-direction=vertical]:h-px data-[panel-group-direction=vertical]:w-full data-[panel-group-direction=vertical]:after:left-0 data-[panel-group-direction=vertical]:after:h-1 data-[panel-group-direction=vertical]:after:w-full data-[panel-group-direction=vertical]:after:translate-x-0 [&[data-panel-group-direction=vertical]>div]:rotate-90",
        "[backface-visibility:hidden] data-[resize-handle-state=drag]:w-[3px] data-[resize-handle-state=hover]:w-[3px] data-[resize-handle-state=drag]:bg-green-500 data-[resize-handle-state=hover]:bg-green-500",
        "data-[panel-group-direction=vertical]:data-[resize-handle-state=drag]:h-[3px] data-[panel-group-direction=vertical]:data-[resize-handle-state=hover]:h-[3px] data-[panel-group-direction=vertical]:data-[resize-handle-state=drag]:bg-green-500 data-[panel-group-direction=vertical]:data-[resize-handle-state=hover]:bg-green-500",
        "absolute inset-0 h-full",
        className,
      )}
      {...props}
    >
      {withHandle && (
        <div className="z-10 flex h-4 w-3 items-center justify-center rounded-sm border bg-border">
          <span className="i-lucide-grip-vertical size-2.5" />
        </div>
      )}
    </ResizablePrimitive.PanelResizeHandle>
  </div>
);

export { ResizablePanelGroup, ResizablePanel, ResizableHandle };
