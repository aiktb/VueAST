import "@fontsource/afacad-flux/400.css";
import "@fontsource/afacad-flux/700.css";
import "@fontsource/fira-code/400.css";
import "@fontsource/fira-code/700.css";

import "~/assets/tailwind.css";

import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";
import { ThemeProvider } from "next-themes";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    // If you do not add suppressHydrationWarning to your <html> you will get warnings because next-themes updates that element.
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="color-scheme" content="light dark" />
        <meta name="author" content="aiktb <ai.ourship@gmail.com>" />
        <Meta />
        <Links />
      </head>
      <body className="font-sans selection:bg-[#BBDFFF] dark:selection:bg-[#003D73]">
        <ThemeProvider attribute="class" disableTransitionOnChange>
          {children}
        </ThemeProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
