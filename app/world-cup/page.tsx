import type { Metadata } from "next";
import WatchParty from "./WatchParty";

export const metadata: Metadata = {
    title: "World Cup 2026 Watch Party | Rebellion",
    description:
        "Rebellion rebels against the ordinary — and rallies behind the Stars & Stripes. Watch every USA match and the knockout rounds with us. No cover. $5 Goal Beers, $4 Half-Time Pours, $3 Goal Shots.",
    openGraph: {
        title: "World Cup 2026 Watch Party | Rebellion",
        description:
            "Every USA match. Every knockout round. No cover, first come first served. Goal Beers, Half-Time Pours & Goal Shots at Rebellion.",
    },
};

export default function WorldCupPage() {
    return <WatchParty />;
}
