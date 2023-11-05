import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/app/components/navbar/Navbar";
import { RegisterModal } from "@/app/components/modals/RegisterModal";
import { ToasterProvider } from "@/app/providers/ToasterProvider";

export const metadata: Metadata = {
    title: "Airbnb",
    description: "Airbnb clone built with Next.js",
};

const font = Nunito({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
            <body className={font.className}>
                <ToasterProvider />
                <RegisterModal />
                <Navbar />
                {children}
            </body>
        </html>
    );
}
