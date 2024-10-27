import { useGlobalOptionsStore } from "~/lib/store";

const GlobalOptions = () => {
  const { view, updateView } = useGlobalOptionsStore();

  const handleChangeView = (value: typeof view) => {
    if (value !== view) {
      updateView(value);
    }
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button size="icon" variant="ghost" className="gap-1 font-bold hover:bg-accent sm:w-20">
          <span className="i-lucide-settings size-4" />
          <span className="sr-only sm:not-sr-only">Options</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80">
        <div className="grid gap-4">
          <div className="space-y-2">
            <h4 className="font-medium leading-none">Global options</h4>
            <p className="text-muted-foreground text-sm">
              These options are persistent by default.
            </p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <div className="text-sm">View</div>
              <RadioGroup
                defaultValue={view}
                className="col-span-2 grid-cols-2"
                onValueChange={handleChangeView}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="JSON" id="radio-json" />
                  <Label htmlFor="radio-json">JSON</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="tree" id="radio-tree" />
                  <Label htmlFor="radio-tree">Tree</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default GlobalOptions;
