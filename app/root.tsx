import "@fontsource/afacad-flux/400.css";
import "@fontsource/afacad-flux/500.css";
import "@fontsource/afacad-flux/700.css";
import "@fontsource/fira-code/400.css";
import "@fontsource/fira-code/700.css";
import afacadFlux400Woff2 from "@fontsource/afacad-flux/files/afacad-flux-latin-400-normal.woff2?url";
import afacadFlux500Woff2 from "@fontsource/afacad-flux/files/afacad-flux-latin-500-normal.woff2?url";
import afacadFlux700Woff2 from "@fontsource/afacad-flux/files/afacad-flux-latin-700-normal.woff2?url";
import firaCode400Woff2 from "@fontsource/fira-code/files/fira-code-latin-400-normal.woff2?url";
import firaCode700Woff2 from "@fontsource/fira-code/files/fira-code-latin-700-normal.woff2?url";

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
        <link rel="preload" as="font" type="font/woff2" href={afacadFlux400Woff2} />
        <link rel="preload" as="font" type="font/woff2" href={afacadFlux500Woff2} />
        <link rel="preload" as="font" type="font/woff2" href={afacadFlux700Woff2} />
        <link rel="preload" as="font" type="font/woff2" href={firaCode400Woff2} />
        <link rel="preload" as="font" type="font/woff2" href={firaCode700Woff2} />
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
