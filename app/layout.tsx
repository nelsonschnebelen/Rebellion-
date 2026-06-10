import type { Metadata } from "next";
import "./globals.css";
import FacebookPixel from "@/components/FacebookPixel";

export const metadata: Metadata = {
    title: "World Cup 2026 Watch Party | Rebellion",
    description:
        "Every USA match and the knockout rounds at Rebellion. No cover, first come first served. $5 Goal Beers, $4 Half-Time Pours, $3 Goal Shots.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className="bg-void antialiased">
                <FacebookPixel />
                {children}
            </body>
        </html>
    );
}
