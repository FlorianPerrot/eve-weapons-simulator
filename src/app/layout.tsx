import type {Metadata} from "next";
import "@/styles/globals.css";
import EveProfile from "@/components/Profile/EveProfile";
import {Shentox} from "@/components/Fonts/Fonts";
import Menu from "@/components/Menu/Menu";
import LayoutStyles from "./layout.module.css"

export const metadata: Metadata = {
    title: "Eve weapons simulator",
    description: "EvE Online Weapons simulator, simulate shoot with turret and missile weapons",
    keywords: [ "eve", "eve online", "simulator", "turret", "missile",
        "third party", "tracking speed", "velocity", "hit chance" ],
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
