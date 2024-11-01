import { Link } from "@remix-run/react";
import { version } from "@vue/compiler-sfc";

import Logo from "~/assets/logo.svg?react";

import { repository } from "@/package.json";
import ThemesSwitcher from "~/components/themes-switcher";
import { cn } from "~/lib/utils";

const Header = ({ className }: { className?: string }) => {
  const regex = /git\+(https:\/\/github.com\/.+)\.git/;
  const githubUrl = repository.url.replace(regex, "$1");
  return (
    <header
      className={cn(
        "flex items-center justify-between border-border border-b px-6 py-1.5",
        className,
      )}
    >
      <Link to="/" className="flex select-none items-center font-bold text-xl">
        <Logo className="size-10" />
        Vue<span className="text-green-500">AST</span>
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="ml-1.5 inline-flex items-center rounded bg-green-50 px-1.5 py-0.5 font-semibold text-green-500 text-xs ring-1 ring-green-500 ring-inset ring-opacity-25 dark:bg-green-400 dark:bg-opacity-10 dark:text-green-400 dark:ring-green-400 dark:ring-opacity-25">
                {version}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-normal text-base">Support Vue latest version</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </Link>
      <div className="flex items-center">
        <Link
          to={githubUrl}
          target="_blank"
          className="flex size-9 items-center justify-center rounded-md hover:bg-accent"
        >
          <span className="i-radix-icons-github-logo size-4" />
          <span className="sr-only">GitHub</span>
        </Link>
        <ThemesSwitcher />
      </div>
    </header>
  );
};

export default Header;
