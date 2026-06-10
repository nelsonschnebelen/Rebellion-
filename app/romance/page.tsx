import type { Metadata } from "next";
import Romance from "./Romance";

export const metadata: Metadata = {
    title: "A Rebel's Romance | February Italian Pop-Up",
    description:
        "Experience handmade pasta and Italian romance at Rebellion Beachside Bar & Bistro. February only.",
};

export default function RomancePage() {
    return <Romance />;
}
