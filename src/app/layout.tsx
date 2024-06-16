import type {Metadata} from "next";
import "@/styles/globals.css";
import EveProfile from "@/components/Profile/EveProfile";
import {Shentox} from "@/components/Fonts/Fonts";
import Menu from "@/components/Menu/Menu";
import LayoutStyles from "./layout.module.css"

export const metadata: Metadata = {
    title: "Eve tools",
    description: "",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={Shentox.className}>
            <body>
                <header className={LayoutStyles.header}>
                    <div className={LayoutStyles.menu}><Menu /></div>
                    <div className={LayoutStyles.profile}><EveProfile /></div>
                </header>
                <main>
                    {children}
                </main>
            </body>
        </html>
    );
}
