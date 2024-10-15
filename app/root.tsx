import { Links, Meta, Outlet, Scripts, ScrollRestoration } from "@remix-run/react";

import "~/assets/tailwind.css";

import "@fontsource/afacad-flux/400.css";
import "@fontsource/afacad-flux/700.css";
import "@fontsource/fira-code/400.css";
import "@fontsource/fira-code/700.css";

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
