'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
    Beer,
    Trophy,
    Flame,
    Timer,
    GlassWater,
    Gift,
    MapPin,
    Phone,
    Mail,
    Instagram,
    Facebook,
    Star,
    Tv,
    Users,
    Ticket,
} from 'lucide-react';

const LINKS = {
    home: 'https://rebellionrestaurants.com/',
    locations: 'https://rebellionrestaurants.com/contact/',
    events: 'https://rebellionwinebar.com/events/list/',
    story: 'https://rebellionrestaurants.com/story/',
    wineClub: 'https://rebellionwinebar.com/shop/rebellion-wine-club/',
    privateEvents: 'https://rebellionrestaurants.com/private-events/',
    wineBar: 'https://rebellionwinebar.com/',
    bistro: 'https://rebellionrestaurants.com/rebellionbistro/',
    facebook: 'https://www.facebook.com/profile.php?id=61563434782165',
    instagram: 'https://www.instagram.com/rebellionbeachside/',
};

type Match = {
    opponent: string;
    flag: string;
    date: string;
    day: string;
    time: string;
    venue: string;
    kickoff: string; // ISO timestamp (UTC)
    big?: boolean;
};

const USA_MATCHES: Match[] = [
    {
        opponent: 'Paraguay',
        flag: '🇵🇾',
        day: 'Friday',
        date: 'June 12',
        time: '9:00 PM ET',
        venue: 'Los Angeles',
        kickoff: '2026-06-13T01:00:00Z',
        big: true,
    },
    {
        opponent: 'Australia',
        flag: '🇦🇺',
        day: 'Friday',
        date: 'June 19',
        time: '3:00 PM ET',
        venue: 'Seattle',
        kickoff: '2026-06-19T19:00:00Z',
    },
    {
        opponent: 'Türkiye',
        flag: '🇹🇷',
        day: 'Thursday',
        date: 'June 25',
        time: '10:00 PM ET',
        venue: 'Los Angeles',
        kickoff: '2026-06-26T02:00:00Z',
        big: true,
    },
];

const KNOCKOUT_ROUNDS = [
    { round: 'Round of 32', dates: 'June 28 – July 3' },
    { round: 'Round of 16', dates: 'July 4 – 7' },
    { round: 'Quarterfinals', dates: 'July 9 – 11' },
    { round: 'Semifinals', dates: 'July 14 – 15' },
    { round: 'The Final', dates: 'Sunday, July 19', final: true },
];

const USA_PROMOS = [
    {
        icon: Beer,
        name: 'Goal Beer',
        price: '$5',
        detail: 'Draft of your choice for 30 minutes after every USA goal.',
        tag: 'Every USA goal',
    },
    {
        icon: GlassWater,
        name: 'Half-Time Pour',
        price: '$4',
        detail: 'Draft beer during halftime only. When the whistle blows, the price goes.',
        tag: 'Halftime only',
    },
    {
        icon: Flame,
        name: 'Goal Shots',
        price: '$3',
        detail: 'Malört shots on every USA goal. Suffer together. Celebrate together.',
        tag: 'Every USA goal',
    },
];

const BIG_MATCH_PROMOS = [
    {
        icon: Timer,
        name: '2-for-1 First Half',
        detail: 'Two-for-one drinks from kickoff through 45\' + stoppage. When the ref adds time, so do we.',
    },
    {
        icon: Gift,
        name: 'Goal of the Day',
        detail: 'First customer at the bar after each match\'s first goal gets a free pint. Sprint, don\'t walk.',
    },
];

function useCountdown(target: string) {
    const [timeLeft, setTimeLeft] = useState<{ d: number; h: number; m: number; s: number } | null>(null);

    useEffect(() => {
        const tick = () => {
            const diff = new Date(target).getTime() - Date.now();
            if (diff <= 0) {
                setTimeLeft(null);
                return;
            }
            setTimeLeft({
                d: Math.floor(diff / 86400000),
                h: Math.floor((diff / 3600000) % 24),
                m: Math.floor((diff / 60000) % 60),
                s: Math.floor((diff / 1000) % 60),
            });
        };
        tick();
        const id = setInterval(tick, 1000);
        return () => clearInterval(id);
    }, [target]);

    return timeLeft;
}

function Countdown() {
    const next = USA_MATCHES.find((m) => new Date(m.kickoff).getTime() > Date.now());
    const timeLeft = useCountdown(next?.kickoff ?? '');

    if (!next || !timeLeft) {
        return (
            <div className="font-display text-2xl md:text-3xl text-saffron-gold">
                Knockout mode: we follow the USA all the way to the Final.
            </div>
        );
    }

    const units = [
        { label: 'Days', value: timeLeft.d },
        { label: 'Hours', value: timeLeft.h },
        { label: 'Minutes', value: timeLeft.m },
        { label: 'Seconds', value: timeLeft.s },
    ];

    return (
        <div>
            <p className="font-serif uppercase tracking-[0.3em] text-cream/70 text-sm mb-4">
                Next USA kickoff — {next.day} {next.date} · USA vs {next.opponent} {next.flag}
            </p>
            <div className="flex justify-center gap-3 md:gap-6">
                {units.map((u) => (
                    <div
                        key={u.label}
                        className="bg-gunmetal/80 border border-rebellion-red/40 rounded-xl px-4 py-3 md:px-7 md:py-5 min-w-[72px] md:min-w-[110px] shadow-crave-glow"
                    >
                        <div className="font-display text-3xl md:text-5xl font-bold text-white tabular-nums">
                            {String(u.value).padStart(2, '0')}
                        </div>
                        <div className="font-serif text-xs md:text-sm uppercase tracking-widest text-saffron-gold mt-1">
                            {u.label}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

function Marquee() {
    const items = ['USA! USA! USA!', '$5 Goal Beers', 'No Cover', '$3 Malört Goal Shots', 'Every USA Match', '$4 Half-Time Pours', 'Knockout Rounds Included', 'First Come, First Served'];
    const row = items.map((t, i) => (
        <span key={i} className="font-display text-lg md:text-xl uppercase tracking-widest mx-8 inline-flex items-center gap-3">
            <Star className="w-4 h-4 text-saffron-gold fill-saffron-gold" />
            {t}
        </span>
    ));
    return (
        <div className="relative overflow-hidden bg-rebellion-red text-white py-3 border-y border-white/10">
            <div className="marquee-track whitespace-nowrap">
                {row}
                {row}
            </div>
            <style>{`
                .marquee-track { display: inline-block; animation: marquee 30s linear infinite; }
                @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
            `}</style>
        </div>
    );
}

const fadeUp = {
    initial: { opacity: 0, y: 40 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-80px' },
    transition: { duration: 0.7 },
};

export default function WatchParty() {
    return (
        <main className="min-h-screen bg-matte-black text-white overflow-x-hidden relative">
            <div className="checkered-pattern fixed inset-0 pointer-events-none" />

            {/* Hero */}
            <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
                <div className="absolute inset-0 opacity-40">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                        src="/images/IMG_1294.jpg"
                        alt="Rebellion bar"
                        className="absolute inset-0 w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-matte-black via-matte-black/60 to-black/70" />
                </div>

                <div className="relative z-10 max-w-5xl mx-auto px-6 text-center py-24">
                    <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                            src="/branding/Rebellion-Logo.svg"
                            alt="Rebellion"
                            className="h-16 md:h-20 mx-auto mb-8 invert brightness-0"
                        />
                        <div className="mb-6 flex justify-center gap-3 flex-wrap">
                            <span className="bg-rebellion-red/90 text-white px-4 py-1 rounded-full text-sm font-serif tracking-widest uppercase">
                                World Cup 2026
                            </span>
                            <span className="bg-white/10 border border-saffron-gold/50 text-saffron-gold px-4 py-1 rounded-full text-sm font-serif tracking-widest uppercase">
                                Official Watch Party
                            </span>
                        </div>
                        <h1 className="font-display text-5xl md:text-8xl font-bold mb-6 text-white drop-shadow-2xl">
                            Rebel for the <span className="text-rebellion-red">Red</span>, White{' '}
                            <span className="text-saffron-gold">&amp;</span> Brew
                        </h1>
                        <p className="font-serif text-xl md:text-2xl text-saffron-gold italic mb-4">
                            We rebel against the ordinary. We rally behind the Stars &amp; Stripes.
                        </p>
                        <p className="font-serif text-lg text-gray-200 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Every USA match. Every knockout round. The biggest tournament on Earth,
                            on our screens, with goal-fueled drink drops all summer long.
                        </p>

                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6, duration: 1 }}>
                            <Countdown />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1.2, duration: 1 }}
                            className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-cream/90 font-serif"
                        >
                            <span className="inline-flex items-center gap-2"><Ticket className="w-4 h-4 text-saffron-gold" /> No cover, ever</span>
                            <span className="inline-flex items-center gap-2"><Users className="w-4 h-4 text-saffron-gold" /> First come, first served</span>
                            <span className="inline-flex items-center gap-2"><Tv className="w-4 h-4 text-saffron-gold" /> Sound on for USA matches</span>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            <Marquee />

            {/* USA Schedule */}
            <section className="relative py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-14">
                        <h2 className="font-display text-4xl md:text-6xl font-bold">
                            The <span className="text-rebellion-red">USA</span> Schedule
                        </h2>
                        <p className="font-serif text-lg text-gray-300 mt-4 italic">
                            Group D — all times Eastern. Doors open one hour before kickoff.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {USA_MATCHES.map((m, i) => (
                            <motion.div
                                key={m.opponent}
                                {...fadeUp}
                                transition={{ duration: 0.7, delay: i * 0.15 }}
                                whileHover={{ y: -6 }}
                                className={`relative rounded-2xl border p-8 bg-gunmetal/80 ${
                                    m.big ? 'border-rebellion-red shadow-crave-glow' : 'border-white/10'
                                }`}
                            >
                                {m.big && (
                                    <span className="absolute -top-3 left-6 bg-rebellion-red text-white text-xs font-serif uppercase tracking-widest px-3 py-1 rounded-full">
                                        Big Match
                                    </span>
                                )}
                                <p className="font-serif uppercase tracking-[0.25em] text-saffron-gold text-sm mb-3">
                                    Match {i + 1} · {m.day}, {m.date}
                                </p>
                                <h3 className="font-display text-3xl font-bold mb-2">
                                    🇺🇸 USA <span className="text-rebellion-red">vs</span> {m.opponent} {m.flag}
                                </h3>
                                <p className="font-serif text-gray-300">
                                    {m.time} · {m.venue}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Knockout rounds */}
            <section className="relative py-24 px-6 bg-void/60">
                <div className="max-w-4xl mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-14">
                        <Trophy className="w-10 h-10 text-saffron-gold mx-auto mb-4" />
                        <h2 className="font-display text-4xl md:text-6xl font-bold">
                            Then We <span className="text-rebellion-red">March</span>
                        </h2>
                        <p className="font-serif text-lg text-gray-300 mt-4 italic">
                            The party doesn&apos;t stop at the group stage. Wherever the USA goes,
                            our screens follow — all the way to the Final in New Jersey.
                        </p>
                    </motion.div>

                    <div className="space-y-4">
                        {KNOCKOUT_ROUNDS.map((r, i) => (
                            <motion.div
                                key={r.round}
                                {...fadeUp}
                                transition={{ duration: 0.6, delay: i * 0.1 }}
                                className={`flex items-center justify-between rounded-xl border px-6 py-5 ${
                                    r.final
                                        ? 'border-saffron-gold bg-saffron-gold/10 shadow-crave-glow'
                                        : 'border-white/10 bg-gunmetal/70'
                                }`}
                            >
                                <div className="flex items-center gap-4">
                                    <span className={`font-display text-xl md:text-2xl font-bold ${r.final ? 'text-saffron-gold' : 'text-white'}`}>
                                        {r.round}
                                    </span>
                                    {r.final && <Trophy className="w-5 h-5 text-saffron-gold" />}
                                </div>
                                <span className="font-serif text-gray-300">{r.dates}</span>
                            </motion.div>
                        ))}
                    </div>

                    <motion.p {...fadeUp} className="text-center font-serif text-cream/70 mt-8 italic">
                        Every USA knockout match is a Big Match. Big Match promos apply.
                    </motion.p>
                </div>
            </section>

            {/* USA game promos */}
            <section className="relative py-24 px-6">
                <div className="max-w-6xl mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-14">
                        <h2 className="font-display text-4xl md:text-6xl font-bold">
                            When the USA Scores, <span className="text-rebellion-red">You Win</span>
                        </h2>
                        <p className="font-serif text-lg text-gray-300 mt-4 italic">
                            Game-day specials for every USA match.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-3 gap-6">
                        {USA_PROMOS.map((p, i) => (
                            <motion.div
                                key={p.name}
                                {...fadeUp}
                                transition={{ duration: 0.7, delay: i * 0.15 }}
                                whileHover={{ y: -6, scale: 1.02 }}
                                className="rounded-2xl border border-white/10 bg-gunmetal/80 p-8 text-center"
                            >
                                <p.icon className="w-10 h-10 text-rebellion-red mx-auto mb-5" />
                                <div className="font-display text-5xl font-bold text-saffron-gold mb-2">{p.price}</div>
                                <h3 className="font-display text-2xl font-bold mb-3">{p.name}</h3>
                                <p className="font-serif text-gray-300 leading-relaxed mb-5">{p.detail}</p>
                                <span className="inline-block bg-rebellion-red/20 border border-rebellion-red/50 text-cream text-xs font-serif uppercase tracking-widest px-3 py-1 rounded-full">
                                    {p.tag}
                                </span>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Big match promos */}
            <section className="relative py-24 px-6 bg-void/60">
                <div className="max-w-5xl mx-auto">
                    <motion.div {...fadeUp} className="text-center mb-14">
                        <h2 className="font-display text-4xl md:text-6xl font-bold">
                            <span className="text-saffron-gold">Big Match</span> Energy
                        </h2>
                        <p className="font-serif text-lg text-gray-300 mt-4 italic">
                            For the matches that matter most.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 gap-6">
                        {BIG_MATCH_PROMOS.map((p, i) => (
                            <motion.div
                                key={p.name}
                                {...fadeUp}
                                transition={{ duration: 0.7, delay: i * 0.15 }}
                                whileHover={{ y: -6 }}
                                className="rounded-2xl border border-saffron-gold/40 bg-gunmetal/80 p-8"
                            >
                                <p.icon className="w-9 h-9 text-saffron-gold mb-5" />
                                <h3 className="font-display text-2xl font-bold mb-3">{p.name}</h3>
                                <p className="font-serif text-gray-300 leading-relaxed">{p.detail}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* House rules / CTA */}
            <section className="relative py-24 px-6">
                <div className="max-w-3xl mx-auto text-center">
                    <motion.div {...fadeUp}>
                        <h2 className="font-display text-4xl md:text-5xl font-bold mb-8">
                            The House <span className="text-rebellion-red">Rules</span>
                        </h2>
                        <ul className="font-serif text-lg text-gray-200 space-y-4 mb-12">
                            <li><span className="text-saffron-gold">No cover charge.</span> Watching the World Cup should never cost a dime.</li>
                            <li><span className="text-saffron-gold">First come, first served.</span> The best seats go to the boldest rebels.</li>
                            <li><span className="text-saffron-gold">Every USA match, plus the knockout rounds</span> — through the Final on July 19.</li>
                        </ul>
                        <motion.a
                            href={LINKS.locations}
                            target="_blank"
                            rel="noopener noreferrer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block bg-rebellion-red hover:bg-rebellion-red/90 text-white px-12 py-5 rounded-full font-display text-xl shadow-2xl transition-all duration-300 border border-white/20"
                        >
                            Find Your Rebellion
                        </motion.a>
                    </motion.div>
                </div>
            </section>

            <Marquee />

            {/* Footer */}
            <footer className="relative py-16 px-6 bg-void border-t border-white/10">
                <div className="max-w-6xl mx-auto">
                    <div className="grid md:grid-cols-3 gap-10 items-start">
                        <div>
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                                src="/branding/Rebellion-Logo.svg"
                                alt="Rebellion"
                                className="h-12 mb-4 invert brightness-0"
                            />
                            <p className="font-serif text-gray-400 italic leading-relaxed">
                                &ldquo;At Rebellion, we rebel against the ordinary.&rdquo;
                            </p>
                        </div>
                        <div className="font-serif text-gray-300 space-y-2">
                            <h4 className="font-display text-lg text-white mb-3">Rebellion</h4>
                            <a href={LINKS.locations} className="block hover:text-saffron-gold transition-colors">Locations</a>
                            <a href={LINKS.events} className="block hover:text-saffron-gold transition-colors">Upcoming Events</a>
                            <a href={LINKS.story} className="block hover:text-saffron-gold transition-colors">Our Story</a>
                            <a href={LINKS.wineClub} className="block hover:text-saffron-gold transition-colors">Wine Club</a>
                            <a href={LINKS.privateEvents} className="block hover:text-saffron-gold transition-colors">Private Events</a>
                            <a href={LINKS.wineBar} className="block hover:text-saffron-gold transition-colors">Rebellion Wine Bar</a>
                            <a href={LINKS.bistro} className="block hover:text-saffron-gold transition-colors">Beachside Bar &amp; Bistro</a>
                        </div>
                        <div className="font-serif text-gray-300 space-y-3">
                            <h4 className="font-display text-lg text-white mb-3">Get in Touch</h4>
                            <a href="tel:3216132210" className="flex items-center gap-2 hover:text-saffron-gold transition-colors">
                                <Phone className="w-4 h-4 text-rebellion-red" /> 321.613.2210
                            </a>
                            <a href="mailto:michelle@rebellionwinebar.com" className="flex items-center gap-2 hover:text-saffron-gold transition-colors">
                                <Mail className="w-4 h-4 text-rebellion-red" /> michelle@rebellionwinebar.com
                            </a>
                            <a href={LINKS.locations} className="flex items-center gap-2 hover:text-saffron-gold transition-colors">
                                <MapPin className="w-4 h-4 text-rebellion-red" /> Find a location
                            </a>
                            <div className="flex gap-4 pt-2">
                                <a href={LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-saffron-gold transition-colors">
                                    <Instagram className="w-5 h-5" />
                                </a>
                                <a href={LINKS.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-saffron-gold transition-colors">
                                    <Facebook className="w-5 h-5" />
                                </a>
                            </div>
                        </div>
                    </div>
                    <p className="text-center font-serif text-gray-500 text-sm mt-12">
                        Please drink responsibly. Promotions valid in-house only during World Cup 2026 broadcasts and subject to change.
                    </p>
                </div>
            </footer>
        </main>
    );
}
