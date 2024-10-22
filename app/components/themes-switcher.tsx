import { useTheme } from "next-themes";

const DropdownMenuDemo = () => {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {/* Don't render icons dynamically based on `theme`, it will cause hydration mismatch and FOUC */}
          <span className="i-lucide-sun dark:-rotate-90 size-4 rotate-0 scale-100 transition-all dark:scale-0" />
          <span className="i-radix-icons-moon absolute size-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Switch Theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("light")}>
            <span className="i-lucide-sun" />
            <span>Light</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("dark")}>
            <span className="i-radix-icons-moon" />
            <span>Dark</span>
          </DropdownMenuItem>
          <DropdownMenuItem className="cursor-pointer" onClick={() => setTheme("system")}>
            <span className="i-lucide-laptop-minimal" />
            <span>System</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DropdownMenuDemo;
