/**
 * ============================================================================
 * 🎂 BIRTHDAY CONFIGURATION FILE (Yahan Apna Content Badal Sakte Hain) 🎂
 * ============================================================================
 * 
 * 18 Years Special Edition Format:
 * - Date of Birth: 11 October 2008 (Sweet 18)
 * - Countdown Timer to 11 October 2008
 * - Permanent File & Database Persistence
 * - Song: "Aasmano Ko Chhu Le Tu Ye Dua Hamari Hai"
 */

export interface MemoryPhoto {
  id: number;
  title: string;
  date: string;
  location: string;
  caption: string;
  imageUrl: string;
  accentColor: string;
}

export interface RomanticReason {
  id: number;
  title: string;
  description: string;
  iconName: string;
}

export interface BirthdayData {
  // ─── 1. NAMES, AGE & HERO CONFIGURATION ────────────────────────
  partnerName: string; // <-- [YAHAN APNE PARTNER KA NAAM BADLEIN]
  partnerNickname: string; // <-- [Pyar se bulane wala naam]
  senderName: string; // <-- [Aapka naam]
  age: number; // 18 Years
  birthDate: string; // "2008-10-11"
  ageMilestoneTitle: string;
  heroTagline: string;
  heroSubtext: string;
  birthDateDisplay: string;

  // ─── 2. 18 YEARS MILESTONE HIGHLIGHTS ──────────────────────────
  milestoneCards: Array<{
    number: string;
    label: string;
    sublabel: string;
  }>;

  // ─── 3. ROMANTIC LOVE LETTER MESSAGE ────────────────────────────
  letterTitle: string;
  letterSubtitle: string;
  letterParagraphs: string[];
  letterClosing: string;

  // ─── 4. PHOTO GALLERY / MEMORY LANE ─────────────────────────────
  galleryTitle: string;
  gallerySubtitle: string;
  photos: MemoryPhoto[];

  // ─── 5. ROMANTIC REASONS (WHY I LOVE YOU) ───────────────────────
  reasons: RomanticReason[];

  // ─── 6. SECRET SURPRISE NOTE ────────────────────────────────────
  secretModalTitle: string;
  secretWishText: string;
  secretPromises: string[];
  
  // ─── 7. SONG INFO ───────────────────────────────────────────────
  songTitle: string;
  songArtist: string;
  youtubeVideoId: string;
}

export const initialBirthdayData: BirthdayData = {
  // =================================================================
  // 1. HERO SECTION & 18 YEARS DATA (DOB: 11 October 2008):
  // =================================================================
  partnerName: "Meri Jaan", // 👉 Yahan apne partner ka naam likhein
  partnerNickname: "My Forever Love ❤️",
  senderName: "Tumhara Humdum", // 👉 Yahan apna naam likhein
  age: 18, // 👉 18 Years Milestone
  birthDate: "2008-10-11", // 👉 11 October 2008
  ageMilestoneTitle: "Celebrating 18 Beautiful Years ✨ Sweet 18",
  heroTagline: "Happy 18th Birthday, Meri Jaan!",
  heroSubtext: "11 October 2008 ko iss duniya me ek farishta aaya tha... 18 saal ki khoobsurat zindagi aur hamesha ke liye mera sath. Welcome to Sweet 18, meri jaan! ❤️",
  birthDateDisplay: "11 October 2008 · Sweet 18th Birthday ✨",

  // =================================================================
  // 2. 18 YEARS MILESTONE STATS STRIP:
  // =================================================================
  milestoneCards: [
    {
      number: "18",
      label: "Years of Pure Magic",
      sublabel: "11 October 2008 se ab tak ka haseen safar",
    },
    {
      number: "6,574+",
      label: "Days of Spreading Smiles",
      sublabel: "Har din tumhari masoomiyat ka ehsaas",
    },
    {
      number: "Chapter 18",
      label: "Sweet Eighteen Unlocked",
      sublabel: "Naye sapne, nayi udaan aur mera sath",
    },
    {
      number: "∞",
      label: "Infinite Love for You",
      sublabel: "Aaj bhi, kal bhi aur hamesha ke liye",
    },
  ],

  // =================================================================
  // 3. ROMANTIC LOVE MESSAGE / LETTER:
  // =================================================================
  letterTitle: "Ek Pyaara Sa Dil Ka Paigam...",
  letterSubtitle: "To the one turning 18 on 11 October 2008",
  letterParagraphs: [
    "Aapki zindagi me aane se meri duniya badal gayi... Pehle har din bas ek aam sa din hota tha, par jabse aapka sath mila hai, har subah ek nayi umeed aur har shaam ek pyari si muskuraahat ban gayi hai.",
    "11 October 2008 ko shuru hua yeh safar aaj apne sabse haseen mod '18 Years' par pahunch gaya hai. Bachpan ki masoomiyat aur aage aane wale hazaron sapno ke sath, yeh 18th birthday aapke jeevan me nayi roshni aur kamiyabi lekar aaye.",
    "Aapki hansi meri sabse pasandeeda aawaaz hai, aur aapki aankhon me meri puri kaayanaat basi hai. Tumhare sath beetaaya hua har ek pal mere dil ki sabse keemti yaadon me shumaar hai.",
    "Rab se bas yahi dua hai ki aapki zindagi hamesha khushiyon, barkat, sehat aur beshumaar mohabbat se bhari rahe. Chahe mausam koi bhi ho, mushkilein chahe jitni bhi ho—mera haath hamesha aapke haath me rahega.",
  ],
  letterClosing: "Hamesha sirf tumhara / tumhari,",

  // =================================================================
  // 4. PHOTO GALLERY / MEMORY LANE:
  // =================================================================
  galleryTitle: "Our Sweet Memory Lane",
  gallerySubtitle: "11 October 2008 se 18 saal ka safar aur hamari pyari yaadein",
  photos: [
    {
      id: 1,
      title: "Pehli Mulaqaat",
      date: "Woh Khaas Din",
      location: "Sweet Cafe Corner",
      caption: "Jab pehli baar tumhari aankhon me dekha tha, usi pal dil ne kaha tha yehi wo khaas shakhs hai.",
      imageUrl: "",
      accentColor: "#F43F5E",
    },
    {
      id: 2,
      title: "Shaam Ki Chai & Baatein",
      date: "Sunset Walk",
      location: "By the Lake",
      caption: "Aapke sath ghanto fizool ki baatein karna bhi duniya ka sabse sukoon bhara ehsaas lagta hai.",
      imageUrl: "",
      accentColor: "#EC4899",
    },
    {
      id: 3,
      title: "Be-wajah Ki Hansi",
      date: "Unplanned Roadtrip",
      location: "Under Open Skies",
      caption: "Jab bina kisi baat ke hum dono ek doosre ko dekh kar ghanto haste rahe the.",
      imageUrl: "",
      accentColor: "#8B5CF6",
    },
    {
      id: 4,
      title: "Fairy Lights & Candlelight",
      date: "Dinner Date",
      location: "Rooftop Garden",
      caption: "Haath me haath, dheemi roshni aur bas hum dono ki dhun.",
      imageUrl: "",
      accentColor: "#F59E0B",
    },
    {
      id: 5,
      title: "Aapka Masoom Gussa",
      date: "Cute Moments",
      location: "Everyday Magic",
      caption: "Aapka gussa hona aur fir mere manane par wo dheemi si muskaan... Sabse pyaara nazara!",
      imageUrl: "",
      accentColor: "#10B981",
    },
    {
      id: 6,
      title: "Forever & Always",
      date: "18th Year & Beyond",
      location: "In My Heart",
      caption: "Yeh to bas shuruaat hai, abhi hume sath milkar hazaron nayi yaadein banani hain.",
      imageUrl: "",
      accentColor: "#E11D48",
    },
  ],

  // =================================================================
  // 5. REASONS WHY I LOVE YOU:
  // =================================================================
  reasons: [
    {
      id: 1,
      title: "Tumhari Masoom Muskaan",
      description: "Jab tum muskurate ho, to sari duniya ka stress pal bhar me gayab ho jata hai.",
      iconName: "Smile",
    },
    {
      id: 2,
      title: "Har Pal Mera Khayal Rakhna",
      description: "Chhoti-chhoti baaton par care karna jo mere alawa koi notice nahi karta.",
      iconName: "HeartHandshake",
    },
    {
      id: 3,
      title: "Mera Sabse Achha Dost Hona",
      description: "Jiske sath bina kisi jhijhak ke main apna sab kuch share kar sakta hoon.",
      iconName: "Sparkles",
    },
    {
      id: 4,
      title: "Aapki Pyaari Awaaz",
      description: "Din bhar ki thakaan door karne ke liye aapki 2 minute ki baat kaafi hoti hai.",
      iconName: "Music",
    },
  ],

  // =================================================================
  // 6. SECRET SURPRISE NOTE & 18TH BIRTHDAY PROMISES:
  // =================================================================
  secretModalTitle: "18th Birthday Special Wish 🎁",
  secretWishText: "Happy 18th Birthday, Meri Jaan! 11 October 2008 ko shuru hui tumhari ye zindagi meri duniya ka sabse khoobsurat hissa hai. Aaj tumhare 18 saal poore hone par main yeh wada karta hoon ki hamesha tumhari khushi me apni khushi dhoondhunga, tumhare har sapne me tumhara sath dunga, aur har mushkil me tumhari dhaal bankar khada rahunga. 18th Birthday Mubarak! ❤️",
  secretPromises: [
    "Promise 1: Aapke 18th saal aur aane wale har saal ko khushiyon se bhar dunga.",
    "Promise 2: Jab bhi udaas hoge, sabse pehle sunne aur gale lagane wala main hunga.",
    "Promise 3: Aapke har ek sapne aur aim ko poora karne me hamesha aapke sath rahunga!",
  ],

  // =================================================================
  // 7. SONG CONFIGURATION (Aasmano Ko Chhu Le Tu):
  // =================================================================
  songTitle: "Aasmano Ko Chhu Le Tu Ye Dua Hamari Hai",
  songArtist: "Special Birthday Song",
  youtubeVideoId: "qACQuR8nGzY", // Full version
};
