import { useTheme } from "next-themes";
import { useMount } from "~/hooks";

const ThemeIcon = ({ theme }: { theme: string | undefined }) => {
  switch (theme) {
    case "light":
      return <span className="i-lucide-sun size-4" />;
    case "dark":
      return <span className="i-lucide-moon size-4" />;
    default:
      return <span className="i-lucide-laptop-minimal size-4" />;
  }
};

const DropdownMenuDemo = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useMount(() => setMounted(true));

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          {mounted ? <ThemeIcon theme={theme} /> : <span className="size-4" />}
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
