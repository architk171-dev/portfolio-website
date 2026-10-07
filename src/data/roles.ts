export type RoleGroup = { title: string; points: string[] };

export type Role = {
  id: string;
  company: string;
  role: string;
  period: string;
  context: string;
  dates: string;
  meta: string;
  summary: string;
  current?: boolean;
  scope: string;
  groups: RoleGroup[];
  metrics: { value: string; label: string }[];
  tools: string[];
};

export const roles: Role[] = [
  {
    id: "corra",
    dates: '2025 — NOW',
    meta: 'Freelance Product Consultant · Growth',
    summary: "An early brand's landing page looked fine, but it was quietly losing signups at every step. I had one freelance sprint to find the leaks and get people to actually sign up.",
    current: true,
    company: "Corra Club",
    role: "Freelance Product Consultant",
    period: "2025 – Present",
    context: "Landing page & growth · Remote",
    scope: "Consulting on landing-page conversion and checkout reliability.",
    groups: [
      {
        title: "Landing page & growth",
        points: [
          "Doubled first-time conversion from 4% to 8% by redesigning landing-page UX, information architecture and messaging.",
          "Monitored the checkout flow for breakages and ran RCAs to resolve failures and protect conversion.",
        ],
      },
    ],
    metrics: [
      { value: "2×", label: "first-time conversion" },
      { value: "4→8%", label: "conversion rate" },
    ],
    tools: ["Google Analytics", "Figma", "Hotjar"],
  },
  {
    id: "farmart",
    dates: '01/2025 — 06/2026',
    meta: 'Product Manager 1 · AgriTech',
    summary: "Right now I'm rebuilding how small agri-retailers buy and sell, the supply-chain plumbing behind a ₹2,500 Cr marketplace that nobody really sees. It's taught me the biggest wins usually hide in the workflows nobody wants to touch.",
    company: "FarMart",
    role: "Product Manager 1",
    period: "Jan 2025 – Jun 2026",
    context: "AgriTech · ₹2,500 Cr+ revenue · Gurgaon",
    scope:
      "Owned the marketplace, supply and partner-integration roadmap, then growth, GTM and AI-led products for agri-retailers.",
    groups: [
      {
        title: "Marketplace, supply & partner integration",
        points: [
          "Cut dispatch turnaround 55% by re-architecting multi-truck supplier workflows for peak season.",
          "Onboarded Cashfree API to automate 50% of buyer KYC, eliminating a manual-approval role.",
          "Launched automated credit-note generation, cutting AR turnaround from 1–2 days to 30 minutes.",
          "Shipped AI-powered deduction-report extraction, cutting manual entry and validation errors 80%.",
          "Shipped invoicing-automation tracking, taking TAT from 2 days to 25 minutes via AI efficiency.",
        ],
      },
      {
        title: "Growth, GTM & AI-led products",
        points: [
          "Launched app-based trade across 10 states via FarMart's app, cutting on-ground manual effort.",
          "Grew DAU from 6K to 15K among Tier-3 agri-retailers at 65% retention via persona-based re-engagement.",
          "Acted as an embedded FDE, shipping an in-house CRM end-to-end and lifting supplier QoQ retention to 16%.",
          "Shipped PO-throughput analytics that surfaced bottlenecks and informed the roadmap and cross-team fixes.",
          "Defined a ROCE-optimisation framework mapping AP–AR cycles to cut working-capital needs.",
          "Spent time in 10 districts to see how suppliers actually work before redesigning workflows.",
        ],
      },
    ],
    metrics: [
      { value: "55%", label: "faster dispatch turnaround" },
      { value: "6K→15K", label: "daily active users" },
      { value: "50%", label: "of buyer KYC automated" },
      { value: "10", label: "states on app-based trade" },
    ],
    tools: ["JIRA", "Figma", "SQL", "Metabase", "Cashfree API", "n8n"],
  },
  {
    id: "indmoney",
    dates: '07/2023 — 01/2025',
    meta: 'Associate Product Manager · FinTech',
    summary: "This was my crash course in money products, where one clumsy flow quietly costs you both trust and transactions. I owned the moments where people hesitate and drop off, across onboarding, payments and the AI on top.",
    company: "INDmoney",
    role: "Associate Product Manager",
    period: "Jul 2023 – Jan 2025",
    context: "FinTech · Wealth management platform · Gurgaon",
    scope:
      "Owned conversion, payments and revenue products, then post-purchase CX, self-serve and AI features.",
    groups: [
      {
        title: "Revenue, conversion & payments",
        points: [
          "Lifted Day-0 funnel conversion from 1.5% to 3.5% by re-architecting the onboarding-to-activation flow.",
          "Launched India's first UPI-for-mutual-funds (ICICI, Razorpay) at 84% checkout success.",
          "Drove a 28% AOV lift and 15,000+ Q1 investors via Mutual Fund Baskets with a unified checkout.",
          "Launched F&O trading on the INDmoney web terminal, expanding the platform's derivatives offering.",
        ],
      },
      {
        title: "Post-purchase CX, self-serve & AI",
        points: [
          "Cut the tickets-to-transactor ratio to 1% with an AI-powered self-serve Help Center, improving CSAT.",
          "Built AI Portfolio Scan with in-app Stories for personalised breakdowns, driving 6% repeat conversion.",
          "Owned a transaction-metric regression end-to-end: RCA on transaction logs, scoped with engineering, fixed in production within 48 hours.",
        ],
      },
    ],
    metrics: [
      { value: "1.5→3.5%", label: "Day-0 conversion" },
      { value: "84%", label: "UPI checkout success" },
      { value: "15K+", label: "Q1 investors" },
      { value: "+28%", label: "average order value" },
    ],
    tools: ["Mixpanel", "SQL", "Figma", "Razorpay", "ICICI UPI"],
  },
  {
    id: "cafe",
    dates: '07/2023 — 05/2024',
    meta: 'Co-founder · F&B',
    summary: "Before I managed roadmaps, I managed a kitchen, a P&L, and every reason a small café can quietly go under. It's the chapter that taught me unit economics the hard way, one order at a time.",
    company: "Café venture",
    role: "Co-founder",
    period: "Jul 2023 – May 2024",
    context: "F&B · Bootstrapped, self-started · Noida",
    scope: "Started and ran a café with full ownership of the P&L, unit economics and growth.",
    groups: [
      {
        title: "Founder",
        points: [
          "Generated ~₹75L revenue, owning the venture's P&L, unit economics and growth end-to-end.",
          "Ran A/B experiments on menu, packaging and pricing, and drove Instagram marketing via Petpooja POS.",
          "Negotiated visibility deals on Swiggy and Zomato; ran daily operations, vendors and staffing.",
        ],
      },
    ],
    metrics: [{ value: "~₹75L", label: "revenue generated" }],
    tools: ["Petpooja POS", "Swiggy", "Zomato", "Instagram"],
  },
  {
    id: "freecharge",
    dates: '02/2023 — 07/2023',
    meta: 'Product Intern · FinTech',
    summary: "This is the internship that turned 'I think I like product' into 'okay, this is the job.' I sat between merchants, engineers and ops, and got a little obsessed with figuring out why things broke.",
    company: "Freecharge",
    role: "Product Intern",
    period: "Feb 2023 – Jul 2023",
    context: "FinTech · Axis Bank · Gurgaon",
    scope: "Supported the product team on merchant onboarding and payment integrations.",
    groups: [
      {
        title: "Integrations & incident management",
        points: [
          "Drove B2B POS/EDC API integrations with Pine Labs, Zomato and PayU across merchant onboarding flows.",
          "Reduced merchant incident TAT by owning structured RCA across engineering and ops teams.",
        ],
      },
    ],
    metrics: [{ value: "3", label: "partner integrations" }],
    tools: ["REST APIs", "RCA"],
  },
  {
    id: "early",
    dates: 'BEFORE PRODUCT',
    meta: 'Marketing · Operations · ML interns',
    summary: "Marketing, operations, machine learning. I tried on every hat before product finally fit, and each detour taught me a bit about how real businesses actually run.",
    company: "Early internships",
    role: "Marketing · Operations · ML",
    period: "Before product",
    context: "Fansee · Crepdog Crew · Coforge",
    scope: "Three internships across very different functions before choosing product.",
    groups: [
      {
        title: "What each one taught me",
        points: [
          "Fansee, Marketing Intern: customer segmentation and pricing strategy.",
          "Crepdog Crew, Operations Intern: inventory management and competitor analysis at a D2C apparel company.",
          "Coforge, Machine Learning Intern: built ML models and a resume parser with 90% accuracy.",
        ],
      },
    ],
    metrics: [{ value: "90%", label: "resume-parser accuracy" }],
    tools: ["Python", "ML"],
  },
];
