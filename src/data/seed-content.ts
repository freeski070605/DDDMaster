import type { GalleryCategory, HomeStatistic, ServiceArea } from "@/types/content";

export const brandName = "Divine Design and Decor LLC";

export const eventTypes = [
  "Wedding",
  "Birthday",
  "Baby Shower",
  "Bridal Shower",
  "Graduation",
  "Corporate Event",
  "Custom Styling",
] as const;

export const budgetRanges = [
  "Under $1,500",
  "$1,500 - $3,000",
  "$3,000 - $5,000",
  "$5,000 - $8,500",
  "$8,500+",
] as const;

export const inquiryServiceOptions = [
  "Draping",
  "Balloon Décor",
  "Floral Design",
  "Treat Table / Dessert Table",
  "Custom Signage",
  "Full Event Design",
  "Backdrop Setup",
  "Other",
] as const;

export const serviceAreas: ServiceArea[] = [
  {
    slug: "philadelphia",
    name: "Philadelphia",
    headline: "Event decor in Philadelphia with a polished, editorial touch.",
    description:
      "From intimate city showers to statement receptions, we style Philadelphia events with layered detail, thoughtful florals, and seamless setup.",
    neighborhoods: ["Center City", "Rittenhouse", "Fishtown", "Northeast", "Main Line"],
    venueTypes: ["Hotels", "Banquet halls", "Private homes", "Rooftops"],
  },
  {
    slug: "delaware-county",
    name: "Delaware County",
    headline: "Luxury celebration design for Delaware County hosts who want it done beautifully.",
    description:
      "We create warm, elevated event environments throughout Delaware County for milestone celebrations, weddings, and polished social events.",
    neighborhoods: ["Springfield", "Lansdowne", "Media", "Ridley", "Swarthmore"],
    venueTypes: ["Community venues", "Country clubs", "Private estates", "Restaurants"],
  },
  {
    slug: "south-jersey",
    name: "South Jersey",
    headline: "Custom event styling across South Jersey for celebrations that deserve impact.",
    description:
      "Our South Jersey clients choose us for statement backdrops, refined tablescapes, and an experience that feels calm from consultation to breakdown.",
    neighborhoods: ["Cherry Hill", "Voorhees", "Deptford", "Washington Township", "Sicklerville"],
    venueTypes: ["Event suites", "Ballrooms", "Church halls", "Clubhouses"],
  },
  {
    slug: "chester",
    name: "Chester",
    headline: "Meaningful event decor in Chester that feels elegant, warm, and effortless.",
    description:
      "We help Chester families and couples host with confidence through cohesive event styling that photographs beautifully and feels intentional in person.",
    neighborhoods: ["Downtown Chester", "Upland", "Parkside", "Brookhaven"],
    venueTypes: ["Banquet spaces", "Church venues", "Community centers", "Outdoor tents"],
  },
  {
    slug: "upper-darby",
    name: "Upper Darby",
    headline: "High-end event decor in Upper Darby for standout celebrations.",
    description:
      "Whether you are planning a sweet sixteen, shower, or wedding event, we bring cohesive design direction and luxury finishing details to Upper Darby events.",
    neighborhoods: ["Bywood", "Drexel Hill", "Highland Park", "Stonehurst"],
    venueTypes: ["Reception halls", "Private homes", "Garden spaces", "Multipurpose venues"],
  },
  {
    slug: "camden",
    name: "Camden",
    headline: "Camden event styling designed for memorable atmospheres and smooth execution.",
    description:
      "Our Camden-area decor services are ideal for clients who want elevated visuals, guest-ready setups, and a team that handles the details with care.",
    neighborhoods: ["Waterfront South", "Cramer Hill", "Parkside", "Gateway"],
    venueTypes: ["Waterfront venues", "Indoor lounges", "Community halls", "Corporate spaces"],
  },
];

export const homeStats: HomeStatistic[] = [
  { value: "150+", label: "events styled" },
  { value: "25+", label: "cities served" },
  { value: "82%", label: "clients from referrals or repeats" },
];

export const fallbackSiteSettings = {
  phone: "(267) 555-0144",
  email: "hello@divinedesigndecor.com",
  instagramHandle: "@divinedesigndecor",
  instagramUrl: "https://www.instagram.com/divinedesigndecor",
  heroBadge: "Warm, guided event decor for weddings, showers, and milestone celebrations",
  heroTitle: "Luxury Event Decor That Turns Moments Into Experiences",
  heroSubtitle:
    "Divine Design and Decor creates elevated celebrations across Philadelphia, Delaware County, South Jersey, and surrounding areas with refined styling, warm hospitality, and flawless visual storytelling.",
  heroPrimaryCta: "Book a Consultation",
  heroSecondaryCta: "View Our Work",
  heroImage: "/images/events/IMG_0822-2.jpg",
  heroImageAlt: "Elegant wedding reception decorated by Divine Design and Decor",
  story:
    "We design celebration spaces that feel emotionally rich, visually polished, and entirely personal to the people gathering inside them.",
  mission:
    "To create unforgettable atmospheres for life's most meaningful moments through intentional decor, calm planning support, and elevated execution.",
  serviceAreas: serviceAreas.map((area) => area.name),
  statistics: homeStats,
  featuredCategoryLabels: [
    "Weddings",
    "Milestone Birthdays",
    "Baby Showers",
    "Bridal Events",
    "Graduations",
    "Corporate Experiences",
  ],
  galleryHeadline: "Beautiful rooms are memorable. Easy planning makes them enjoyable.",
  galleryCopy:
    "We help clients move from scattered ideas to a clear, polished event plan with visuals that feel welcoming, elevated, and celebration-ready.",
  showcaseEyebrow: "Transformation-led styling",
  showcaseTitle: "We design spaces that feel inviting before guests even take their seats.",
  showcaseCopy:
    "From focal installations to layered table details, each setup is designed to feel organized, elegant, and easy for guests to enjoy the moment.",
  showcasePrimaryImage: "/images/events/IMG_0509-2.jpg",
  showcasePrimaryImageAlt: "Styled event setup with detailed decor and statement focal point",
  showcaseSecondaryImage: "/images/events/IMG_0808-2.jpg",
  showcaseSecondaryImageAlt: "Completed event reveal with polished tablescape and celebration decor",
  servicesHeadline: "Choose the level of design support that fits your celebration.",
  servicesCopy:
    "Whether you need one standout focal moment or full event styling, we build the decor plan around your venue, your guest experience, and your goals.",
  instagramSectionEyebrow: "Instagram",
  instagramSectionTitle: "Follow recent decor moments, room reveals, and celebration details.",
  instagramSectionCopy:
    "Use this section to share real event photos that help visitors understand your design style and the kind of atmosphere you create.",
  instagramImages: [],
  testimonialsHeadline: "Clients trust the work because the process feels steady from day one.",
  testimonialsCopy:
    "Design matters, but so does communication. Our clients come back because they feel supported, listened to, and confident along the way.",
  testimonialsSupportEyebrow: "Why clients refer us",
  testimonialsSupportTitle: "Clear communication, calm planning, and event-day confidence.",
  testimonialsSupportCopy:
    "We pair polished design with a process that feels easy to follow, so clients know what is happening and can enjoy the celebration more fully.",
  bookingSteps: [
    {
      title: "Inquire",
      description:
        "Share your event date, venue, inspiration, and goals so we can understand the atmosphere you want to create.",
    },
    {
      title: "Design Consultation",
      description:
        "We align on style direction, package needs, logistics, and investment during a guided consultation.",
    },
    {
      title: "Celebrate Beautifully",
      description:
        "Our team handles styling, setup, and finishing touches so your event feels seamless and unforgettable.",
    },
  ],
  processHeadline: "A simple process that keeps planning clear and manageable.",
  processCopy:
    "Each step is designed to be straightforward, with clear next actions and practical guidance so you never feel lost in the process.",
  socialProofHeadline: "Seen on timelines, remembered in person.",
  socialProofCopy:
    "Our installations are designed to stop the scroll and leave a lasting impression once your guests step into the room.",
  serviceAreasHeadline: "Serving families, couples, and hosts across the greater Philadelphia region.",
  serviceAreasCopy:
    "We regularly design events in Philadelphia, Delaware County, South Jersey, Chester, Upper Darby, Camden, and nearby communities.",
  faqHeadline: "Questions answered in plain language, without the guesswork.",
  faqCopy:
    "We keep the process transparent so you know what to expect around booking, travel, timing, and event-day support.",
  investmentHeadline: "Start with a package, then tailor the details around your event.",
  investmentCopy:
    "Our packages give you a clear starting point, and we can customize from there based on venue size, guest count, focal pieces, and overall styling goals.",
  ctaBannerTitle: "Ready for decor that feels as special as the moment itself?",
  ctaBannerCopy:
    "Tell us about your celebration and we will help shape a design experience that feels elevated from the very first conversation.",
  ctaBannerImage: "/images/events/IMG_0822-2.jpg",
  ctaBannerImageAlt: "Elegant event decor setup ready for guests",
  consultationDurationMinutes: 30,
};

export const fallbackServices = [
  {
    slug: "draping",
    title: "Draping",
    category: "Custom Styling",
    description:
      "Soft, polished draping for backdrops, entry moments, ceremony spaces, photo areas, and room transformations that need a more elevated finish.",
    shortDescription:
      "Elegant draping for backdrops, entrances, focal walls, and room transformations.",
    startingPrice: 0,
    idealFor: "Clients who want to soften a venue, frame a focal area, or create a polished photo-ready backdrop.",
    includes: [
      "Draping design consultation",
      "Fabric color and placement recommendations",
      "Backdrop, entry, or focal area installation",
      "Setup and breakdown coordination",
    ],
    image: "/images/events/IMG_0822-2.jpg",
    featured: true,
  },
  {
    slug: "furniture-rentals",
    title: "Furniture Rentals",
    category: "Custom Styling",
    description:
      "Statement furniture rentals for lounge moments, sweetheart seating, guest photo areas, and styled celebration setups.",
    shortDescription:
      "Furniture rentals for lounge areas, statement seating, and styled focal moments.",
    startingPrice: 0,
    idealFor: "Hosts who need statement seating, lounge pieces, or rental accents that complete the event design.",
    includes: [
      "Furniture selection guidance",
      "Rental coordination",
      "Delivery and placement planning",
      "Pickup and breakdown coordination",
    ],
    image: "/images/events/IMG_0509-2.jpg",
    featured: true,
  },
  {
    slug: "prop-rentals",
    title: "Prop Rentals",
    category: "Custom Styling",
    description:
      "Decor prop rentals for themed displays, dessert tables, welcome areas, photo moments, and custom celebration styling.",
    shortDescription:
      "Decor prop rentals for themed displays, dessert tables, and photo-ready setups.",
    startingPrice: 0,
    idealFor: "Clients building a styled moment who need the right props, accents, and visual details.",
    includes: [
      "Prop selection support",
      "Display styling recommendations",
      "Rental preparation",
      "Return and breakdown coordination",
    ],
    image: "/images/events/IMG_0808-2.jpg",
    featured: true,
  },
  {
    slug: "party-in-a-bag",
    title: "Party in a Bag",
    category: "Custom Styling",
    description:
      "A ready-to-style party package with coordinated printed and decorative details such as chip bags, menu cards, and matching celebration pieces.",
    shortDescription:
      "Coordinated party details including chip bags, menu cards, and matching event pieces.",
    startingPrice: 0,
    idealFor: "Hosts who want coordinated party details prepared together in one easy package.",
    includes: [
      "Custom theme direction",
      "Chip bags",
      "Menu cards",
      "Coordinated printed party details",
      "Packaged party-ready materials",
    ],
    image: "/images/events/IMG_0822-2.jpg",
    featured: true,
  },
] as const;

export const fallbackPackages = [
  {
    name: "Signature Styling",
    slug: "signature-styling",
    startingPrice: 1500,
    description:
      "A polished focal install for intimate celebrations that need a strong visual moment without a full-room takeover.",
    image: "/images/events/IMG_0509-2.jpg",
    highlights: [
      "One styled focal area",
      "Backdrop and premium prop pairing",
      "Selective balloon, floral, or candle accents",
      "Setup and breakdown included",
    ],
    addOns: ["Custom signage", "Dessert display styling", "Statement chair rental"],
    bestFor: "Birthdays, showers, and milestone dinners",
    featured: false,
  },
  {
    name: "Luxe Celebration",
    slug: "luxe-celebration",
    startingPrice: 3200,
    description:
      "A more immersive room design with coordinated styling moments, layered materials, and stronger guest-facing impact.",
    image: "/images/events/IMG_0808-2.jpg",
    highlights: [
      "Multiple styled areas",
      "Welcome display and focal backdrop",
      "Table accents or tablescape styling",
      "Planning support and on-site styling",
    ],
    addOns: ["Throne chair", "Floral upgrades", "Candle collections", "Custom seating chart"],
    bestFor: "Large showers, elegant birthdays, and upscale social events",
    featured: true,
  },
  {
    name: "Wedding Design Collection",
    slug: "wedding-design-collection",
    startingPrice: 4800,
    description:
      "A wedding-forward styling package for couples who want cohesive ceremony and reception decor with refined romantic detail.",
    image: "/images/events/IMG_0822-2.jpg",
    highlights: [
      "Ceremony styling",
      "Reception design support",
      "Sweetheart or head table feature",
      "Consultation-led design process",
    ],
    addOns: ["Aisle styling", "Lounge vignette", "Luxury centerpieces", "Custom signage suite"],
    bestFor: "Couples wanting elevated, photo-rich wedding decor",
    featured: true,
  },
  {
    name: "Bespoke Studio Experience",
    slug: "bespoke-studio-experience",
    startingPrice: 6500,
    description:
      "Our most tailored offer for clients who want high-touch creative direction and a distinct design story from concept to execution.",
    image: "/images/events/IMG_0822-2.jpg",
    highlights: [
      "Custom concept development",
      "Venue styling plan",
      "Premium rentals and sourcing direction",
      "White-glove install experience",
    ],
    addOns: ["Floral installs", "Stage builds", "Guest gifting displays", "Luxury table styling"],
    bestFor: "Brand activations, weddings, and fully custom events",
    featured: true,
  },
];

export const fallbackTestimonials = [
  {
    name: "Alyssa R.",
    role: "Bride, Philadelphia",
    rating: 5,
    quote:
      "The room felt like an entirely different venue once Divine Design and Decor finished. Every detail felt intentional, elegant, and so personal to us.",
    image: "/images/events/IMG_0822-2.jpg",
    featured: true,
  },
  {
    name: "Monique T.",
    role: "Baby Shower Host, Delaware County",
    rating: 5,
    quote:
      "I wanted soft and elevated, and they delivered something beyond what I could picture. Guests kept asking who designed everything.",
    image: "/images/events/IMG_0808-2.jpg",
    featured: true,
  },
  {
    name: "Jordan P.",
    role: "Birthday Client, South Jersey",
    rating: 5,
    quote:
      "Professional, responsive, and incredibly creative. The setup made the whole evening feel premium without ever feeling overdone.",
    image: "/images/events/IMG_0509-2.jpg",
    featured: false,
  },
  {
    name: "Keisha M.",
    role: "Corporate Event Coordinator, Philadelphia",
    rating: 5,
    quote:
      "They understood the brief immediately and translated it into an event environment that felt polished, branded, and guest-friendly.",
    image: "/images/events/IMG_0822-2.jpg",
    featured: false,
  },
];

export const fallbackFaqs = [
  {
    question: "How far in advance should I book?",
    answer:
      "For weddings and large-scale events, we recommend booking at least 8 to 12 weeks in advance. Smaller social events can often be accommodated sooner based on availability.",
    featured: true,
  },
  {
    question: "Do you travel outside Philadelphia?",
    answer:
      "Yes. We regularly serve Philadelphia, Delaware County, South Jersey, Chester, Upper Darby, Camden, and nearby surrounding areas. Travel fees may apply depending on distance and setup complexity.",
    featured: true,
  },
  {
    question: "Do you offer custom packages?",
    answer:
      "Absolutely. Many of our clients start with a package and then customize with upgraded florals, specialty rentals, candle styling, signage, or additional decor moments.",
    featured: true,
  },
  {
    question: "Is setup and breakdown included?",
    answer:
      "Setup is included in every decor package. Breakdown is included for most installations and will always be clarified in your proposal so there are no surprises.",
    featured: false,
  },
  {
    question: "Do you require a deposit?",
    answer:
      "Yes. A signed agreement and retainer are required to secure your event date. Final payment timing is outlined clearly during booking.",
    featured: false,
  },
  {
    question: "Can you work with my venue's policies?",
    answer:
      "Yes. We coordinate with venue guidelines, load-in windows, insurance requirements, and setup restrictions whenever needed.",
    featured: false,
  },
  {
    question: "What happens after I inquire?",
    answer:
      "You will receive a confirmation email right away. From there, we review your details, follow up with next steps, and invite you to a consultation if your date is available.",
    featured: true,
  },
];

export const fallbackGalleryItems: Array<{
  title: string;
  slug: string;
  category: GalleryCategory;
  venue: string;
  description: string;
  image: string;
  beforeImage?: string;
  afterImage?: string;
  featured: boolean;
}> = [
  {
    title: "Romantic Ivory Wedding Reception",
    slug: "romantic-ivory-wedding-reception",
    category: "Wedding",
    venue: "Center City ballroom",
    description:
      "A candlelit reception concept with sweetheart table florals, layered neutrals, and soft lavender detailing.",
    image: "/images/events/IMG_0822-2.jpg",
    featured: true,
  },
  {
    title: "Milestone Dinner with Statement Backdrop",
    slug: "milestone-dinner-with-statement-backdrop",
    category: "Birthday",
    venue: "Private event suite in Philadelphia",
    description:
      "A luxe birthday setting featuring dramatic focal decor, premium signage, and elevated guest photo moments.",
    image: "/images/events/IMG_0509-2.jpg",
    featured: true,
  },
  {
    title: "Soft Lavender Baby Shower",
    slug: "soft-lavender-baby-shower",
    category: "Baby Shower",
    venue: "Delaware County clubhouse",
    description:
      "A warm shower design built around soft lavender, layered arches, and elegant tabletop accents.",
    image: "/images/events/IMG_0808-2.jpg",
    featured: true,
  },
  {
    title: "Bride-to-Be Garden Shower",
    slug: "bride-to-be-garden-shower",
    category: "Bridal Shower",
    venue: "Main Line garden venue",
    description:
      "A romantic shower with champagne details, soft florals, and a custom welcome moment.",
    image: "/images/events/IMG_0822-2.jpg",
    featured: false,
  },
  {
    title: "Modern Graduation Celebration",
    slug: "modern-graduation-celebration",
    category: "Graduation",
    venue: "Upper Darby reception hall",
    description:
      "Personalized graduation decor with school colors interpreted through a clean, upscale lens.",
    image: "/images/events/IMG_0509-2.jpg",
    featured: false,
  },
  {
    title: "Corporate Appreciation Dinner",
    slug: "corporate-appreciation-dinner",
    category: "Corporate Event",
    venue: "Philadelphia hotel ballroom",
    description:
      "A polished corporate atmosphere with branded accents, soft lighting, and elegant tablescape details.",
    image: "/images/events/IMG_0808-2.jpg",
    featured: false,
  },
];
