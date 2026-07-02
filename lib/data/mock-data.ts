// Sample content used to render the site while Supabase tables are populated.
// Each shape here mirrors a table in supabase/schema.sql 1:1, so swapping
// these for real `supabase.from(...).select()` calls is a drop-in change.

export const STATS = [
  { label: "Certified Members", value: 480, suffix: "+" },
  { label: "Corporate Partners", value: 65, suffix: "+" },
  { label: "Training Hours Delivered", value: 32000, suffix: "+" },
  { label: "Cities Across Gujarat", value: 18, suffix: "" },
];

export interface EventAgendaItem {
  time: string;
  title: string;
}

export interface EventItem {
  slug: string;
  title: string;
  status: "upcoming" | "past";
  date: string;
  endDate?: string;
  city: string;
  venue: string;
  category: string;
  price: number;
  capacity: number;
  excerpt: string;
  description: string;
  agenda: EventAgendaItem[];
  highlights: string[];
  attendees?: number;
}

export const EVENTS: EventItem[] = [
  {
    slug: "leadership-summit-2026",
    title: "GETA Leadership Summit 2026",
    status: "upcoming",
    date: "2026-08-14T09:30:00+05:30",
    endDate: "2026-08-14T18:00:00+05:30",
    city: "Ahmedabad",
    venue: "Courtyard by Marriott, Ahmedabad",
    category: "Flagship Summit",
    price: 2500,
    capacity: 400,
    excerpt:
      "A full-day gathering of Gujarat's leading executive trainers and HR heads on the future of workplace learning.",
    description:
      "GETA's flagship annual summit brings together 400+ trainers, HR leaders and institutional partners for a full day of keynotes, panel discussions and closed-door roundtables on where corporate learning is headed next. This year's theme — \"Learning at the Speed of Business\" — covers AI-assisted facilitation, hybrid delivery at scale, and what organizations are actually willing to pay for in 2027 training budgets.\n\nExpect real case studies from GETA corporate members, not vendor pitches, plus dedicated networking blocks for independent trainers to meet HR heads directly.",
    agenda: [
      { time: "09:30 AM", title: "Registration & networking breakfast" },
      { time: "10:30 AM", title: "Opening keynote — The Future of Corporate Learning" },
      { time: "12:00 PM", title: "Panel: What HR heads actually want from trainers in 2027" },
      { time: "01:30 PM", title: "Lunch & chapter networking" },
      { time: "02:30 PM", title: "Breakout workshops — AI-assisted facilitation, hybrid delivery" },
      { time: "04:30 PM", title: "GETA Excellence Awards" },
      { time: "05:30 PM", title: "Closing reception" },
    ],
    highlights: [
      "400+ trainers, HR leaders and institutional partners expected",
      "Closed-door roundtables with corporate L&D heads",
      "GETA Excellence Awards presentation",
    ],
  },
  {
    slug: "train-the-trainer-vadodara",
    title: "Train the Trainer — Vadodara Chapter",
    status: "upcoming",
    date: "2026-07-22T10:00:00+05:30",
    endDate: "2026-07-22T17:00:00+05:30",
    city: "Vadodara",
    venue: "GETA Regional Centre",
    category: "Workshop",
    price: 1200,
    capacity: 60,
    excerpt:
      "A hands-on certification workshop covering instructional design and virtual facilitation techniques.",
    description:
      "This is GETA's core certification workshop for the Vadodara chapter — the same curriculum that anchors the trainer directory's certification standard. Over one intensive day, participants work through instructional design fundamentals, virtual facilitation techniques, and assessment design, then complete a short practicum that's reviewed by GETA's certification board.\n\nOpen to GETA members and non-members considering membership; certification is issued only to active members on successful completion.",
    agenda: [
      { time: "10:00 AM", title: "Instructional design fundamentals" },
      { time: "11:30 AM", title: "Virtual & hybrid facilitation techniques" },
      { time: "01:00 PM", title: "Lunch" },
      { time: "02:00 PM", title: "Assessment design workshop" },
      { time: "03:30 PM", title: "Practicum — micro-facilitation session" },
      { time: "04:30 PM", title: "Feedback & certification briefing" },
    ],
    highlights: [
      "Certification counts toward the GETA trainer directory standard",
      "Small cohort — capped at 60 participants for hands-on feedback",
      "Led by GETA's certification board members",
    ],
  },
  {
    slug: "hr-conclave-surat",
    title: "HR & L&D Conclave — Surat",
    status: "upcoming",
    date: "2026-09-05T09:00:00+05:30",
    endDate: "2026-09-05T16:00:00+05:30",
    city: "Surat",
    venue: "Grand Bhagwati Convention Hall",
    category: "Conclave",
    price: 1500,
    capacity: 250,
    excerpt:
      "Bringing together HR leaders and independent trainers to discuss skilling priorities for 2027.",
    description:
      "A regional conclave focused on Surat's textile, diamond and manufacturing sector employers — where skilling budgets are growing fastest but trainer access has historically lagged Ahmedabad and Vadodara. Sessions cover blue-collar-to-white-collar upskilling pathways, compliance training at scale, and how mid-size manufacturers are structuring in-house L&D functions.",
    agenda: [
      { time: "09:00 AM", title: "Registration & welcome" },
      { time: "09:45 AM", title: "Keynote — Skilling priorities for Gujarat manufacturing, 2027" },
      { time: "11:15 AM", title: "Panel: Building an in-house L&D function from scratch" },
      { time: "01:00 PM", title: "Lunch" },
      { time: "02:00 PM", title: "Workshop: Compliance training at scale" },
      { time: "03:30 PM", title: "Trainer–employer matchmaking session" },
    ],
    highlights: [
      "Focused on Surat's textile, diamond and manufacturing employers",
      "Dedicated trainer–employer matchmaking session",
      "Presented in partnership with the Gujarat Chamber of Commerce",
    ],
  },
  {
    slug: "leadership-summit-2025",
    title: "GETA Leadership Summit 2025",
    status: "past",
    date: "2025-08-16T09:30:00+05:30",
    endDate: "2025-08-16T18:00:00+05:30",
    city: "Ahmedabad",
    venue: "Courtyard by Marriott, Ahmedabad",
    category: "Flagship Summit",
    price: 2200,
    capacity: 350,
    excerpt: "GETA's 2025 flagship summit on hybrid learning delivery drew 340+ trainers and HR leaders.",
    description:
      "Last year's summit focused on the shift to hybrid training delivery post-pandemic, with case studies from GETA corporate members on what worked and what didn't. The day closed with the inaugural GETA Excellence Awards, recognizing outstanding trainers across five categories.",
    agenda: [
      { time: "09:30 AM", title: "Registration & networking breakfast" },
      { time: "10:30 AM", title: "Opening keynote — Hybrid Learning, One Year In" },
      { time: "01:30 PM", title: "Lunch & chapter networking" },
      { time: "04:00 PM", title: "Inaugural GETA Excellence Awards" },
    ],
    highlights: [
      "340+ attendees across trainers, HR leaders and partners",
      "Inaugural GETA Excellence Awards presented across five categories",
      "12 corporate partnership MoUs signed on the day",
    ],
    attendees: 340,
  },
  {
    slug: "womens-leadership-workshop-rajkot",
    title: "Women in Leadership Workshop — Rajkot",
    status: "past",
    date: "2025-11-08T10:00:00+05:30",
    endDate: "2025-11-08T16:00:00+05:30",
    city: "Rajkot",
    venue: "GETA Regional Centre, Rajkot",
    category: "Workshop",
    price: 800,
    capacity: 80,
    excerpt: "A full-day workshop on executive presence and negotiation for women in leadership roles.",
    description:
      "Run in partnership with the Rajkot chapter, this workshop paired women executives with GETA-certified coaches for sessions on executive presence, negotiation, and navigating boardroom dynamics in traditionally male-dominated manufacturing and trading sectors.",
    agenda: [
      { time: "10:00 AM", title: "Executive presence masterclass" },
      { time: "12:00 PM", title: "Negotiation skills workshop" },
      { time: "02:00 PM", title: "Panel: Navigating boardroom dynamics" },
      { time: "03:30 PM", title: "Mentorship matching session" },
    ],
    highlights: [
      "80 participants matched with GETA-certified coaches",
      "Run in partnership with the Rajkot chapter",
      "Follow-up mentorship circles launched from this cohort",
    ],
    attendees: 80,
  },
  {
    slug: "digital-facilitation-bootcamp-2025",
    title: "Digital Facilitation Bootcamp",
    status: "past",
    date: "2025-04-12T09:00:00+05:30",
    endDate: "2025-04-13T17:00:00+05:30",
    city: "Ahmedabad",
    venue: "GETA House, Ahmedabad",
    category: "Bootcamp",
    price: 3000,
    capacity: 100,
    excerpt: "A two-day intensive on virtual facilitation tools and engagement techniques for hybrid classrooms.",
    description:
      "A two-day, hands-on bootcamp covering the full virtual facilitation toolkit — breakout design, interactive polling, engagement techniques for camera-off audiences, and production basics for pre-recorded modules. Capped at 100 participants across two days for direct instructor feedback.",
    agenda: [
      { time: "Day 1, 09:00 AM", title: "Virtual facilitation toolkit fundamentals" },
      { time: "Day 1, 02:00 PM", title: "Engagement techniques for camera-off audiences" },
      { time: "Day 2, 09:00 AM", title: "Breakout & interactive session design" },
      { time: "Day 2, 02:00 PM", title: "Production basics for pre-recorded modules" },
    ],
    highlights: [
      "100 trainers completed the two-day certification track",
      "Now forms the base curriculum for GETA's virtual facilitation module",
    ],
    attendees: 100,
  },
];

export const UPCOMING_EVENTS = EVENTS.filter((event) => event.status === "upcoming");
export const PAST_EVENTS = EVENTS.filter((event) => event.status === "past");

export const LEADERSHIP_PREVIEW = [
  {
    name: "Dr. Kiran Mehta",
    designation: "President",
    expertise: "Organizational Leadership",
    photo: "kiran-mehta",
  },
  {
    name: "Ansh Patel",
    designation: "Vice President",
    expertise: "Sales Enablement",
    photo: "ansh-patel",
  },
  {
    name: "Priya Shah",
    designation: "Secretary",
    expertise: "People Development",
    photo: "priya-shah",
  },
  {
    name: "Rajeev Kapoor",
    designation: "Treasurer",
    expertise: "Executive Coaching",
    photo: "rajeev-kapoor",
  },
];

export const MEMBERSHIP_TIERS = [
  {
    name: "Individual",
    price: "₹6,000",
    period: "/ year",
    description: "For independent trainers and coaches building their practice.",
    features: [
      "GETA-verified digital ID card",
      "Listing in Trainer Directory",
      "Access to member-only workshops",
      "Certificate of Association",
    ],
  },
  {
    name: "Corporate",
    price: "₹35,000",
    period: "/ year",
    description: "For L&D teams and training companies with multiple facilitators.",
    features: [
      "Up to 10 team member listings",
      "Priority event partnerships",
      "Co-branded certification support",
      "Dedicated account manager",
    ],
    featured: true,
  },
  {
    name: "Student",
    price: "₹1,500",
    period: "/ year",
    description: "For postgraduate students pursuing L&D and HR specializations.",
    features: [
      "Mentorship matching",
      "Discounted workshop access",
      "Career resource library",
      "Campus chapter eligibility",
    ],
  },
];

export const TESTIMONIALS = [
  {
    name: "Meera Iyer",
    role: "Head of L&D, a leading Ahmedabad-based manufacturing group",
    quote:
      "Being part of GETA connected our training team to a peer network we didn't have access to before — the workshops directly improved how we design onboarding.",
  },
  {
    name: "Vikram Solanki",
    role: "Independent Executive Coach, Rajkot",
    quote:
      "The certification pathway gave my practice a credibility marker that corporate clients immediately recognize.",
  },
  {
    name: "Falguni Desai",
    role: "HR Director, a Gujarat-based pharmaceutical company",
    quote:
      "GETA's trainer directory made it simple to find vetted facilitators for a state-wide leadership program in under a week.",
  },
];

export const PARTNERS = [
  "Confederation of Indian Industry — Gujarat",
  "Gujarat Chamber of Commerce",
  "NHRDN Ahmedabad Chapter",
  "MSME Development Institute",
  "Gujarat Skill Development Mission",
  "IIM Ahmedabad — Executive Education",
];

// ----------------------------------------------------------------------------
// ABOUT PAGE
// ----------------------------------------------------------------------------

export const CORE_VALUES = [
  {
    title: "Integrity",
    description: "Every member operates under a code of conduct that puts honesty and client outcomes above short-term gain.",
  },
  {
    title: "Excellence",
    description: "We hold training delivery, content design and facilitation craft to a standard worth putting the GETA name behind.",
  },
  {
    title: "Collaboration",
    description: "Trainers grow faster together — peer mentorship and knowledge-sharing are built into how the association runs.",
  },
  {
    title: "Inclusivity",
    description: "Open to trainers from every city, industry background and career stage across Gujarat, not just metro practices.",
  },
  {
    title: "Innovation",
    description: "We actively track shifts in andragogy, hybrid delivery and AI-assisted learning so members stay ahead of the curve.",
  },
  {
    title: "Accountability",
    description: "Membership is earned and maintained — standards are reviewed, and the directory stays credible because of it.",
  },
];

export const OBJECTIVES = [
  "Establish a recognized, state-wide credentialing standard for corporate trainers and executive coaches in Gujarat.",
  "Create direct pathways between certified trainers and organizations seeking verified learning partners.",
  "Run regular upskilling programs so members stay current with modern facilitation and instructional design practices.",
  "Advocate for the training and L&D profession with industry bodies, government skilling missions and academic institutions.",
  "Build a statewide chapter network so no city is more than a short drive from a GETA event or mentor.",
  "Document and share research on workplace learning outcomes specific to the Gujarat business environment.",
];

export const PRESIDENT_MESSAGE = {
  name: "Dr. Kiran Mehta",
  designation: "President, GETA",
  photo: "kiran-mehta",
  message: `When we founded GETA in 2014, Gujarat's training community was talented but fragmented — brilliant facilitators working in isolation, with no shared standard that a corporate HR head could point to and trust. Twelve years on, that has changed. We are now the state's reference point for verified training talent, and our members carry that credibility into boardrooms from Ahmedabad to Rajkot.

None of that happened by accident. It came from insisting on real vetting before a trainer joins the directory, from running certification workshops that actually raise the bar, and from treating every member — whether a solo executive coach or a twenty-person corporate training firm — as part of one professional community with one reputation to protect.

The work ahead is bigger: reaching every district in Gujarat, deepening our ties with industry and government skilling missions, and making sure the next generation of trainers has mentors who've already walked the path. I invite you to be part of that next chapter.`,
};

export const JOURNEY_TIMELINE = [
  {
    year: "2014",
    title: "GETA is founded",
    description: "A group of 22 independent trainers and HR consultants in Ahmedabad register GETA as a formal professional association.",
  },
  {
    year: "2016",
    title: "First statewide certification workshop",
    description: "GETA runs its first Train-the-Trainer certification program, setting the baseline standard for the trainer directory.",
  },
  {
    year: "2018",
    title: "Vadodara & Surat chapters open",
    description: "Membership crosses 150 as regional chapters launch outside Ahmedabad, bringing GETA programs closer to members statewide.",
  },
  {
    year: "2020",
    title: "Digital-first pivot",
    description: "GETA moves its workshops, committee meetings and certification assessments online within weeks of the pandemic disruption.",
  },
  {
    year: "2022",
    title: "Corporate partnership program launches",
    description: "Formal MoUs signed with industry chambers to route verified GETA trainers directly into member-organization L&D programs.",
  },
  {
    year: "2024",
    title: "480+ members, 18 cities",
    description: "A decade in, GETA becomes Gujarat's largest verified network of corporate trainers, coaches and L&D professionals.",
  },
  {
    year: "2026",
    title: "Digital membership & credentialing platform",
    description: "GETA launches QR-verified digital ID cards, an online trainer directory and a member portal for certificates and events.",
  },
];

// ----------------------------------------------------------------------------
// LEADERSHIP (full roster)
// ----------------------------------------------------------------------------

export type LeadershipCategory =
  | "patron"
  | "president"
  | "vice_president"
  | "secretary"
  | "treasurer"
  | "executive_committee"
  | "core_member";

export interface LeaderProfile {
  name: string;
  designation: string;
  category: LeadershipCategory;
  bio: string;
  expertise: string[];
  linkedin: string;
  email: string;
}

export const LEADERSHIP_CATEGORY_LABELS: Record<LeadershipCategory, string> = {
  patron: "Patrons",
  president: "President",
  vice_president: "Vice President",
  secretary: "Secretary",
  treasurer: "Treasurer",
  executive_committee: "Executive Committee",
  core_member: "Core Members",
};

export const LEADERSHIP_FULL: LeaderProfile[] = [
  {
    name: "Padma Shri Dr. Ashwin Trivedi",
    designation: "Founding Patron",
    category: "patron",
    bio: "A retired IIM Ahmedabad faculty member and management thinker, Dr. Trivedi has guided GETA's academic direction since its founding in 2014, shaping its certification standards.",
    expertise: ["Management Education", "Institution Building", "Curriculum Design"],
    linkedin: "#",
    email: "ashwin.trivedi@geta.org.in",
  },
  {
    name: "Ms. Leela Chandaria",
    designation: "Patron, Industry Relations",
    category: "patron",
    bio: "Former HR Director for a Fortune 500 manufacturing group in Gujarat, Ms. Chandaria connects GETA's membership with corporate learning mandates across the state.",
    expertise: ["Corporate HR Strategy", "Industry Partnerships", "Talent Development"],
    linkedin: "#",
    email: "leela.chandaria@geta.org.in",
  },
  {
    name: "Dr. Kiran Mehta",
    designation: "President",
    category: "president",
    bio: "Dr. Mehta co-founded GETA in 2014 and has led the association through its growth to 480+ members across 18 cities, with two decades of experience in organizational leadership consulting.",
    expertise: ["Organizational Leadership", "Change Management", "Executive Coaching"],
    linkedin: "#",
    email: "kiran.mehta@geta.org.in",
  },
  {
    name: "Ansh Patel",
    designation: "Vice President",
    category: "vice_president",
    bio: "Ansh leads GETA's corporate partnerships program, having spent 15 years building sales enablement functions for BFSI and IT services firms across Gujarat.",
    expertise: ["Sales Enablement", "Corporate Partnerships", "B2B Training Design"],
    linkedin: "#",
    email: "ansh.patel@geta.org.in",
  },
  {
    name: "Priya Shah",
    designation: "Secretary",
    category: "secretary",
    bio: "Priya oversees GETA's governance, member records and certification process, bringing a background in people development at a leading pharmaceutical company.",
    expertise: ["People Development", "Governance", "Member Operations"],
    linkedin: "#",
    email: "priya.shah@geta.org.in",
  },
  {
    name: "Rajeev Kapoor",
    designation: "Treasurer",
    category: "treasurer",
    bio: "Rajeev manages GETA's finances and membership pricing structure, and runs an independent executive coaching practice serving mid-market CXOs.",
    expertise: ["Executive Coaching", "Financial Governance", "CXO Advisory"],
    linkedin: "#",
    email: "rajeev.kapoor@geta.org.in",
  },
  {
    name: "Meera Iyer",
    designation: "Executive Committee — Membership",
    category: "executive_committee",
    bio: "Meera chairs the membership review panel, vetting new applications and maintaining the credibility standard behind the GETA directory.",
    expertise: ["Membership Standards", "L&D Strategy", "Onboarding Design"],
    linkedin: "#",
    email: "meera.iyer@geta.org.in",
  },
  {
    name: "Vikram Solanki",
    designation: "Executive Committee — Regional Chapters",
    category: "executive_committee",
    bio: "Vikram coordinates GETA's chapters outside Ahmedabad, including Rajkot, Vadodara and Surat, and runs an independent coaching practice based in Rajkot.",
    expertise: ["Chapter Development", "Executive Coaching", "Public Speaking"],
    linkedin: "#",
    email: "vikram.solanki@geta.org.in",
  },
  {
    name: "Falguni Desai",
    designation: "Executive Committee — Events",
    category: "executive_committee",
    bio: "Falguni leads programming for GETA's flagship summit and regional workshops, drawing on a background as HR Director at a Gujarat-based pharmaceutical company.",
    expertise: ["Event Programming", "HR Leadership", "Conclave Design"],
    linkedin: "#",
    email: "falguni.desai@geta.org.in",
  },
  {
    name: "Nikhil Bhatt",
    designation: "Executive Committee — Certification",
    category: "executive_committee",
    bio: "Nikhil designed GETA's Train-the-Trainer certification curriculum and continues to chair the assessment board that reviews it annually.",
    expertise: ["Instructional Design", "Assessment Design", "Facilitation Skills"],
    linkedin: "#",
    email: "nikhil.bhatt@geta.org.in",
  },
  {
    name: "Sanjana Rao",
    designation: "Core Member",
    category: "core_member",
    bio: "Sanjana specializes in leadership development programs for mid-size manufacturing firms and mentors newly certified GETA trainers.",
    expertise: ["Leadership Development", "Manufacturing L&D", "Mentorship"],
    linkedin: "#",
    email: "sanjana.rao@geta.org.in",
  },
  {
    name: "Devansh Joshi",
    designation: "Core Member",
    category: "core_member",
    bio: "Devansh runs a public speaking and communication skills practice and contributes to GETA's student mentorship track.",
    expertise: ["Public Speaking", "Communication Skills", "Student Mentorship"],
    linkedin: "#",
    email: "devansh.joshi@geta.org.in",
  },
  {
    name: "Ritu Malhotra",
    designation: "Core Member",
    category: "core_member",
    bio: "Ritu is an HR consultant specializing in diversity and inclusion training for IT and ITES organizations across Gujarat.",
    expertise: ["DEI Training", "HR Consulting", "IT/ITES Sector"],
    linkedin: "#",
    email: "ritu.malhotra@geta.org.in",
  },
  {
    name: "Yash Trivedi",
    designation: "Core Member",
    category: "core_member",
    bio: "Yash focuses on sales and negotiation training for BFSI clients and supports GETA's corporate partnership outreach.",
    expertise: ["Sales Training", "Negotiation", "BFSI Sector"],
    linkedin: "#",
    email: "yash.trivedi@geta.org.in",
  },
];

// ----------------------------------------------------------------------------
// TRAINER DIRECTORY
// ----------------------------------------------------------------------------

export interface TrainerDirectoryProfile {
  slug: string;
  name: string;
  city: string;
  yearsExperience: number;
  headline: string;
  industries: string[];
  specializations: string[];
  languages: string[];
  certifications: string[];
  bookable: boolean;
}

export const TRAINER_DIRECTORY: TrainerDirectoryProfile[] = [
  {
    slug: "kiran-mehta",
    name: "Dr. Kiran Mehta",
    city: "Ahmedabad",
    yearsExperience: 20,
    headline: "Organizational leadership and change management for mid-to-large enterprises.",
    industries: ["Manufacturing", "BFSI", "IT/ITES"],
    specializations: ["Organizational Leadership", "Change Management", "Executive Coaching"],
    languages: ["English", "Gujarati", "Hindi"],
    certifications: ["GETA Certified Master Trainer", "ICF Professional Coach"],
    bookable: true,
  },
  {
    slug: "ansh-patel",
    name: "Ansh Patel",
    city: "Ahmedabad",
    yearsExperience: 15,
    headline: "Sales enablement and B2B training design for BFSI and IT services teams.",
    industries: ["BFSI", "IT/ITES"],
    specializations: ["Sales Enablement", "B2B Training Design"],
    languages: ["English", "Hindi", "Gujarati"],
    certifications: ["GETA Certified Trainer"],
    bookable: true,
  },
  {
    slug: "vikram-solanki",
    name: "Vikram Solanki",
    city: "Rajkot",
    yearsExperience: 12,
    headline: "Independent executive coach specializing in public speaking and CXO advisory.",
    industries: ["Manufacturing", "Trading"],
    specializations: ["Executive Coaching", "Public Speaking"],
    languages: ["English", "Gujarati"],
    certifications: ["GETA Certified Trainer", "ICF Associate Coach"],
    bookable: true,
  },
  {
    slug: "falguni-desai",
    name: "Falguni Desai",
    city: "Surat",
    yearsExperience: 14,
    headline: "HR leadership and event-scale learning programs for pharmaceutical and manufacturing firms.",
    industries: ["Pharmaceutical", "Manufacturing"],
    specializations: ["HR Leadership", "Event Programming"],
    languages: ["English", "Hindi", "Gujarati"],
    certifications: ["GETA Certified Master Trainer"],
    bookable: true,
  },
  {
    slug: "nikhil-bhatt",
    name: "Nikhil Bhatt",
    city: "Vadodara",
    yearsExperience: 11,
    headline: "Instructional design and assessment design for certification-grade training programs.",
    industries: ["Education", "IT/ITES"],
    specializations: ["Instructional Design", "Assessment Design"],
    languages: ["English", "Hindi"],
    certifications: ["GETA Certified Trainer", "CIPD Learning & Development"],
    bookable: true,
  },
  {
    slug: "sanjana-rao",
    name: "Sanjana Rao",
    city: "Vadodara",
    yearsExperience: 9,
    headline: "Leadership development programs for mid-size manufacturing firms.",
    industries: ["Manufacturing"],
    specializations: ["Leadership Development", "Mentorship"],
    languages: ["English", "Hindi", "Gujarati"],
    certifications: ["GETA Certified Trainer"],
    bookable: true,
  },
  {
    slug: "ritu-malhotra",
    name: "Ritu Malhotra",
    city: "Ahmedabad",
    yearsExperience: 10,
    headline: "DEI training and HR consulting for IT and ITES organizations.",
    industries: ["IT/ITES"],
    specializations: ["DEI Training", "HR Consulting"],
    languages: ["English", "Hindi"],
    certifications: ["GETA Certified Trainer", "SHRM-CP"],
    bookable: true,
  },
  {
    slug: "devansh-joshi",
    name: "Devansh Joshi",
    city: "Surat",
    yearsExperience: 7,
    headline: "Public speaking and communication skills coaching, with a focus on early-career professionals.",
    industries: ["Education", "Trading"],
    specializations: ["Public Speaking", "Communication Skills"],
    languages: ["English", "Gujarati", "Hindi"],
    certifications: ["GETA Certified Trainer"],
    bookable: true,
  },
];

export const TRAINER_CITIES = Array.from(new Set(TRAINER_DIRECTORY.map((t) => t.city))).sort();
export const TRAINER_INDUSTRIES = Array.from(new Set(TRAINER_DIRECTORY.flatMap((t) => t.industries))).sort();
export const TRAINER_SPECIALIZATIONS = Array.from(new Set(TRAINER_DIRECTORY.flatMap((t) => t.specializations))).sort();
export const TRAINER_LANGUAGES = Array.from(new Set(TRAINER_DIRECTORY.flatMap((t) => t.languages))).sort();

// ----------------------------------------------------------------------------
// RESOURCES
// ----------------------------------------------------------------------------

export type ResourceType = "blog" | "article" | "download" | "template" | "research_paper" | "video";

export interface ResourceItem {
  slug: string;
  title: string;
  type: ResourceType;
  summary: string;
  author: string;
  publishedAt: string;
  memberOnly: boolean;
}

export const RESOURCE_TYPE_LABELS: Record<ResourceType, string> = {
  blog: "Blog",
  article: "Article",
  download: "Download",
  template: "Template",
  research_paper: "Research Paper",
  video: "Video",
};

export const RESOURCES: ResourceItem[] = [
  {
    slug: "future-of-hybrid-training-2027",
    title: "The Future of Hybrid Training Delivery in 2027",
    type: "blog",
    summary: "What GETA's corporate members are actually budgeting for as hybrid delivery matures beyond the pandemic-era scramble.",
    author: "Dr. Kiran Mehta",
    publishedAt: "2026-05-12",
    memberOnly: false,
  },
  {
    slug: "designing-assessments-that-measure-behavior-change",
    title: "Designing Assessments That Measure Behavior Change, Not Just Recall",
    type: "article",
    summary: "A practical framework for moving post-training assessments beyond quizzes toward observed behavior change.",
    author: "Nikhil Bhatt",
    publishedAt: "2026-04-02",
    memberOnly: false,
  },
  {
    slug: "geta-trainer-code-of-conduct",
    title: "GETA Trainer Code of Conduct",
    type: "download",
    summary: "The official code of conduct every certified GETA member agrees to on approval — required reading before your first engagement.",
    author: "GETA Secretariat",
    publishedAt: "2026-01-10",
    memberOnly: false,
  },
  {
    slug: "workshop-feedback-form-template",
    title: "Post-Workshop Feedback Form Template",
    type: "template",
    summary: "A ready-to-use participant feedback form covering content, delivery and applicability — the same one used at GETA workshops.",
    author: "GETA Secretariat",
    publishedAt: "2025-11-20",
    memberOnly: true,
  },
  {
    slug: "instructional-design-lesson-plan-template",
    title: "Instructional Design Lesson Plan Template",
    type: "template",
    summary: "A structured lesson-plan template built around the ADDIE model, used in GETA's Train-the-Trainer certification.",
    author: "Nikhil Bhatt",
    publishedAt: "2025-10-08",
    memberOnly: true,
  },
  {
    slug: "gujarat-skilling-priorities-research-2026",
    title: "Gujarat Corporate Skilling Priorities — 2026 Research Report",
    type: "research_paper",
    summary: "GETA's annual survey of 200+ HR heads across Gujarat on training budgets, priority skills and vendor selection criteria.",
    author: "GETA Research Cell",
    publishedAt: "2026-02-18",
    memberOnly: false,
  },
  {
    slug: "negotiation-skills-for-independent-trainers",
    title: "Negotiation Skills for Independent Trainers: Pricing Your First Corporate Contract",
    type: "article",
    summary: "How to price and negotiate your first few corporate engagements without underselling your expertise.",
    author: "Yash Trivedi",
    publishedAt: "2026-03-25",
    memberOnly: false,
  },
  {
    slug: "virtual-facilitation-toolkit-walkthrough",
    title: "Virtual Facilitation Toolkit — Full Walkthrough",
    type: "video",
    summary: "A recorded walkthrough of the virtual facilitation toolkit covered at the 2025 Digital Facilitation Bootcamp.",
    author: "GETA Secretariat",
    publishedAt: "2025-04-20",
    memberOnly: true,
  },
  {
    slug: "dei-training-for-manufacturing-floors",
    title: "Bringing DEI Training to the Manufacturing Floor",
    type: "blog",
    summary: "Lessons from delivering diversity and inclusion training in traditionally male-dominated manufacturing environments.",
    author: "Ritu Malhotra",
    publishedAt: "2026-06-01",
    memberOnly: false,
  },
];

// ----------------------------------------------------------------------------
// GALLERY
// ----------------------------------------------------------------------------

export type GalleryCategory = "awards" | "conferences" | "training_programs";
export type GalleryMediaType = "photo" | "video";

export interface GalleryItem {
  id: string;
  title: string;
  mediaType: GalleryMediaType;
  category: GalleryCategory;
  eventSlug?: string;
}

export const GALLERY_CATEGORY_LABELS: Record<GalleryCategory, string> = {
  awards: "Awards",
  conferences: "Conferences",
  training_programs: "Training Programs",
};

export const GALLERY_ITEMS: GalleryItem[] = [
  { id: "g1", title: "GETA Leadership Summit 2025 — Opening Keynote", mediaType: "photo", category: "conferences", eventSlug: "leadership-summit-2025" },
  { id: "g2", title: "Inaugural GETA Excellence Awards", mediaType: "photo", category: "awards", eventSlug: "leadership-summit-2025" },
  { id: "g3", title: "Excellence Award — Best Corporate Trainer 2025", mediaType: "photo", category: "awards", eventSlug: "leadership-summit-2025" },
  { id: "g4", title: "Train the Trainer — Vadodara Chapter, Practicum Session", mediaType: "photo", category: "training_programs", eventSlug: "train-the-trainer-vadodara" },
  { id: "g5", title: "Women in Leadership Workshop — Rajkot", mediaType: "photo", category: "training_programs", eventSlug: "womens-leadership-workshop-rajkot" },
  { id: "g6", title: "Digital Facilitation Bootcamp — Day 1 Recap", mediaType: "video", category: "training_programs", eventSlug: "digital-facilitation-bootcamp-2025" },
  { id: "g7", title: "HR & L&D Conclave — Surat, Panel Discussion", mediaType: "photo", category: "conferences" },
  { id: "g8", title: "Leadership Summit 2025 — Highlight Reel", mediaType: "video", category: "conferences", eventSlug: "leadership-summit-2025" },
  { id: "g9", title: "Excellence Award — Rising Trainer of the Year", mediaType: "photo", category: "awards", eventSlug: "leadership-summit-2025" },
  { id: "g10", title: "Digital Facilitation Bootcamp — Breakout Design Workshop", mediaType: "photo", category: "training_programs", eventSlug: "digital-facilitation-bootcamp-2025" },
  { id: "g11", title: "Chapter Meetup — Vadodara Regional Centre", mediaType: "photo", category: "conferences" },
  { id: "g12", title: "Women in Leadership Workshop — Mentorship Matching", mediaType: "photo", category: "training_programs", eventSlug: "womens-leadership-workshop-rajkot" },
];
