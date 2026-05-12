export interface TextBeat {
  id: string;
  start: number;
  end: number;
  eyebrow: string;
  headline: string;
  body: string;
  tag?: string;
}

export const TEXT_BEATS: TextBeat[] = [
  {
    id: "a",
    start: 0.0,
    end: 0.2,
    eyebrow: "Chapter I",
    headline: "BLADE\nRUSH",
    body: "Enter the flow state.",
    tag: "001",
  },
  {
    id: "b",
    start: 0.25,
    end: 0.45,
    eyebrow: "Chapter II",
    headline: "SILENT\nSTORM",
    body: "Master the art of the unseen edge.",
    tag: "002",
  },
  {
    id: "c",
    start: 0.5,
    end: 0.7,
    eyebrow: "Chapter III",
    headline: "NEON\nKINETICS",
    body: "Speed is your only currency.",
    tag: "003",
  },
  {
    id: "d",
    start: 0.75,
    end: 0.95,
    eyebrow: "Chapter IV",
    headline: "FINAL\nASCENSION",
    body: "Give your everything & Claim the throne.",
    tag: "004",
  },
];

export const FEATURES_1st = [
  {
    id: "01",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path
          d="M18 4L4 12V24L18 32L32 24V12L18 4Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M18 4V32M4 12L32 24M32 12L4 24"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.4"
        />
      </svg>
    ),
    color: "#ff2d6b",
    label: "SECTION 01",
    title: "EXPLORE WORLDS",
    body: "Travel across immersive environments, each crafted with unique lore, secrets, and challenges.",
  },
  {
    id: "02",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect
          x="6"
          y="6"
          width="24"
          height="24"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M6 18H30M18 6V30"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.5"
        />
        <circle cx="18" cy="18" r="4" stroke="currentColor" strokeWidth="1.5" />
      </svg>
    ),
    color: "#bf5af2",
    label: "SECTION 03",
    title: "PLAY-TO-EARN",
    body: "Earn tokens and rewards simply by playing, trading, and creating within the friendly ecosystem.",
  },
  {
    id: "03",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <rect
          x="8"
          y="8"
          width="20"
          height="20"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <rect
          x="13"
          y="13"
          width="10"
          height="10"
          rx="1"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M8 8L4 4M28 8L32 4M8 28L4 32M28 28L32 32"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
    color: "#00e5ff",
    label: "SECTION 04",
    title: "NFT MARKETPLACE",
    body: "Own, trade, and showcase rare skins, weapons, and land that evolve with your journey.",
  },
  {
    id: "04",
    icon: (
      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
        <path
          d="M18 4L22 14H32L24 20L27 30L18 24L9 30L12 20L4 14H14L18 4Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
        <path
          d="M18 12L20 18H26L21 21.6L23 27L18 23.4L13 27L15 21.6L10 18H16L18 12Z"
          stroke="currentColor"
          strokeWidth="0.8"
          opacity="0.35"
        />
      </svg>
    ),
    color: "#ff2d6b",
    label: "SECTION 05",
    title: "PLAYER GOVERNANCE",
    body: "Secure your influence. Participate in a DAO to vote on key game updates and future development.",
  },
];

export const NEWS_1st = [
  {
    id: "1",
    tag: "UPDATE",
    tagColor: "#00e5ff",
    date: "MAY 08 · 2026",
    title: "SEASON 3: VOID RIFT DROPS TONIGHT",
    body: "The dimensional rift tears open new realms — with 12 new maps, 3 legendary weapons, and a new boss class.",
    img: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&q=80",
  },
  {
    id: "2",
    tag: "PATCH NOTES",
    tagColor: "#bf5af2",
    date: "APR 29 · 2026",
    title: "BLADE RUSH v2.4 — BALANCE SHIFT",
    body: "Dash cooldown reworked. Rank decay adjusted. Shadow class receives major buff across all tiers.",
    img: "https://images.unsplash.com/photo-1534423861386-85a16f5d13fd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGdhbWluZ3xlbnwwfHwwfHx8MA%3D%3D",
  },
  {
    id: "3",
    tag: "ESPORTS",
    tagColor: "#ff2d6b",
    date: "APR 20 · 2026",
    title: "WORLD CHAMPIONSHIP BRACKET LIVE",
    body: "32 teams. One throne. The global bracket is set — watch live and earn exclusive watch-party drops.",
    img: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&q=80",
  },
  {
    id: "4",
    tag: "COMMUNITY",
    tagColor: "#00e5ff",
    date: "APR 11 · 2026",
    title: "PLAYER COUNCIL VOTE: MAP ROTATION",
    body: "Governance is live. Cast your vote for the next permanent map in ranked — results decide the season.",
    img: "https://images.unsplash.com/photo-1511512578047-dfb367046420?w=600&q=80",
  },
  {
    id: "5",
    tag: "LORE",
    tagColor: "#bf5af2",
    date: "APR 01 · 2026",
    title: "THE FORGOTTEN ARCHIVE — CHAPTER 7",
    body: "Deep within the fractured citadel lies a secret that rewrites the Blade Rush origin story entirely.",
    img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&q=80",
  },
];

export const Constant = {
  bg: "#000000",
  surface: "#0a0a0a",
  card: "#0d0d0d",
  border: "rgba(255,255,255,0.07)",
  borderHover: "rgba(255,255,255,0.18)",
  text: "#ffffff",
  muted: "rgba(255,255,255,0.45)",
  dim: "rgba(255,255,255,0.18)",
  cyan: "#00f5ff",
  magenta: "#ff2d6b",
  gold: "#ffd24d",
  green: "#00ff9d",
  purple: "#9b5de5",
  font: "'Bebas Neue', sans-serif",
  body: "'Inter', sans-serif",
};

export const FEATURES = [
  {
    id: "01",
    icon: "⊕",
    accent: Constant.magenta,
    title: "EXPLORE\nWORLDS",
    body: "Travel across immersive environments, each crafted with unique lore, secrets, and challenges waiting to be conquered.",
  },
  {
    id: "02",
    icon: "⊖",
    accent: Constant.green,
    title: "PVP & PVE\nBATTLES",
    body: "Fight for glory in skill-based battles. Team up with allies or conquer solo in epic encounters.",
  },
  {
    id: "03",
    icon: "◎",
    accent: Constant.purple,
    title: "PLAY-TO-EARN\nECONOMY",
    body: "Earn tokens and rewards simply by playing, trading, and creating within the ecosystem.",
  },
  {
    id: "04",
    icon: "⬡",
    accent: Constant.cyan,
    title: "NFT\nMARKETPLACE",
    body: "Own, trade, and showcase rare skins, weapons, and land that evolve with your journey.",
  },
  {
    id: "05",
    icon: "✕",
    accent: Constant.magenta,
    title: "PLAYER\nGOVERNANCE",
    body: "Secure your influence. Participate in a DAO to vote on key game updates and future development.",
  },
];

export const NEWS = [
  {
    id: 1,
    tag: "PATCH 2.4",
    tagColor: Constant.cyan,
    date: "MAY 08, 2026",
    title: "Silent Storm Update — New Arena & Weapons Drop",
    body: "The Silent Storm patch introduces 3 new arenas, 12 legendary weapons, and a complete overhaul of the ranked matchmaking system.",
    img: "https://images.unsplash.com/photo-1538481199705-c710c4e965fc?w=600&q=80",
    featured: true,
  },
  {
    id: 2,
    tag: "EVENT",
    tagColor: Constant.magenta,
    date: "APR 30, 2026",
    title: "Neon Kinetics World Championship Announced",
    body: "$500K prize pool. 64 teams. One throne. Registration opens June 1st.",
    img: "https://images.unsplash.com/photo-1560253023-3ec5d502959f?w=600&q=80",
    featured: false,
  },
  {
    id: 3,
    tag: "DEV BLOG",
    tagColor: Constant.gold,
    date: "APR 22, 2026",
    title: "Designing the Final Ascension Chapter",
    body: "A behind-the-scenes look at how our level designers crafted the endgame sequence.",
    img: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?w=600&q=80",
    featured: false,
  },
  {
    id: 4,
    tag: "ECONOMY",
    tagColor: Constant.green,
    date: "APR 15, 2026",
    title: "Season 3 Tokenomics Rebalance",
    body: "New staking rewards, burn mechanics, and marketplace fee reductions explained.",
    img: "https://images.unsplash.com/photo-1614854262318-831574f15f1f?w=600&q=80",
    featured: false,
  },
];

export const WEAPONS = [
  {
    id: "W01",
    name: "VOID\nBLADE",
    class: "MELEE",
    tier: "S",
    stats: { dmg: 95, spd: 88, range: 30, crit: 72 },
    accent: Constant.cyan,
    icon: "⚔",
    lore: "Forged in the collapse of the first server-gate. Cuts through both flesh and data.",
  },
  {
    id: "W02",
    name: "GHOST\nPULSE",
    class: "RANGED",
    tier: "A",
    stats: { dmg: 78, spd: 95, range: 88, crit: 65 },
    accent: Constant.magenta,
    icon: "◈",
    lore: "A railgun that fires compressed silence. Zero sound. Zero mercy.",
  },
  {
    id: "W03",
    name: "NEON\nFANG",
    class: "HYBRID",
    tier: "S",
    stats: { dmg: 82, spd: 76, range: 55, crit: 91 },
    accent: Constant.gold,
    icon: "⚡",
    lore: "The edge glows brighter with every kill. Handle with care.",
  },
  {
    id: "W04",
    name: "DARK\nMATTER",
    class: "SUPPORT",
    tier: "A",
    stats: { dmg: 60, spd: 70, range: 72, crit: 55 },
    accent: Constant.purple,
    icon: "◉",
    lore: "Destabilizes space around enemies. Allies phase through it freely.",
  },
];

export const FOOTER_LINKS = {
  GAME: ["Download", "Patch Notes", "Roadmap", "Beta Access"],
  COMMUNITY: ["Discord", "Reddit", "Twitch", "YouTube"],
  ECONOMY: ["Marketplace", "Staking", "Tokenomics", "Whitepaper"],
  LEGAL: ["Privacy Policy", "Terms of Use", "Cookie Settings", "EULA"],
};
