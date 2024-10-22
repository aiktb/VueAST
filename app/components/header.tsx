import { Link } from "@remix-run/react";
import { version } from "@vue/compiler-sfc";

import Logo from "~/assets/logo.svg?react";

import packageJSON from "@/package.json";

import GlobalOptions from "~/components/global-options";
import ThemesSwitcher from "~/components/themes-switcher";

const Header = () => {
  const regex = /git\+(https:\/\/github.com\/.+)\.git/;
  const githubUrl = packageJSON.repository.url.replace(regex, "$1");
  return (
    <header className="flex items-center justify-between border-border border-b px-6 py-1.5">
      <Link to="/" className="flex items-center font-bold text-xl">
        <Logo className="size-10" />
        <span className="select-all">
          Vue<span className="text-green-500">AST</span>
        </span>
        <TooltipProvider delayDuration={300}>
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="ml-1.5 inline-flex items-center rounded bg-green-50 px-1.5 py-0.5 font-semibold text-green-500 text-xs ring-1 ring-green-500 ring-inset ring-opacity-25 dark:bg-green-400 dark:bg-opacity-10 dark:text-green-400 dark:ring-green-400 dark:ring-opacity-25">
                {version}
              </span>
            </TooltipTrigger>
            <TooltipContent>
              <p className="font-normal">Support Vue latest version</p>
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
        <GlobalOptions />
      </div>
    </header>
  );
};

export default Header;
