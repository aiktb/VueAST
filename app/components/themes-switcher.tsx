import { useTheme } from "next-themes";

const DropdownMenuDemo = () => {
  const { theme, setTheme } = useTheme();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {theme === "light" && <span className="i-lucide-sun" />}
          {theme === "dark" && <span className="i-lucide-moon" />}
          {theme === "system" && <span className="i-lucide-laptop-minimal" />}
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
            <span className="i-lucide-moon" />
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
