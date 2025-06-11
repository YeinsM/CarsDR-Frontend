'use client';
import { LayoutProvider } from '../layout/context/layoutcontext';
import { PrimeReactProvider } from 'primereact/api';

import "../styles/layout/layout.css";

import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <title>PrimeReact - DIAMOND</title>
                <meta charSet="UTF-8" />
                <meta
                    name="description"
                    content="The ultimate collection of design-agnostic, flexible and accessible React UI Components."
                />
                <meta name="robots" content="index, follow" />
                <meta name="viewport" content="initial-scale=1, width=device-width" />
                <meta property="og:type" content="website" />
                <meta property="og:title" content="Diamond by PrimeReact for NextJS" />
                <meta property="og:url" content="https://diamond.primereact.org" />
                <meta
                    property="og:description"
                    content="The ultimate collection of design-agnostic, flexible and accessible React UI Components."
                />
                <meta property="og:image" content="https://www.primefaces.org/static/social/diamond-react.png" />
                <meta property="og:ttl" content="604800" />
                <link rel="icon" href={`/favicon.ico`} type="image/x-icon" />
                <link id="theme-link" href={`/theme/theme-light/green/theme.css`} rel="stylesheet"></link>
            </head>
            <body>
                {/* <PrimeReactProvider value={{ unstyled: true, pt: {} }}> */}
                <PrimeReactProvider>
                    <LayoutProvider>{children}</LayoutProvider>
                </PrimeReactProvider>
            </body>
        </html>
    );
}
