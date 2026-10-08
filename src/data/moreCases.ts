import { ProductCase } from "./productCases";

const slideList = (dir: string, n: number, label: string) =>
  Array.from({ length: n }, (_, i) => ({
    src: `/cases/${dir}/${String(i + 1).padStart(2, "0")}.webp`,
    label: `${label}, slide ${i + 1} of ${n}`,
  }));

// District x Cafes: a strategy / product doc case (Founder's Office brief).
export const district: ProductCase = {
  id: "district",
  number: "03",
  year: "2026",
  headline: "Turning going-out into a",
  accent: "weekly habit.",
  tags: ["Product strategy", "Consumer", "0 to 1 vertical"],
  summary:
    "District built one app for dining, movies, events and sport, but people go out only twice a month. I wrote the Founder's Office brief for a cafe vertical: the cheap, weekly reason to open the app that then feeds the high-value nights out.",
  kind: "Product strategy case",
  period: "2026",
  focus: "A cafe vertical inside District",
  figmaUrl: "",
  format: "doc",
  cover: "/cases/district/cover.webp",
  coverAlt: "District x Cafes strategy case",
  tools: ["Product strategy", "Market analysis", "Unit economics", "Figma"],
  sections: [
    {
      id: "memo",
      title: "The",
      accent: "memo.",
      blocks: [
        { t: "p", text: "District has something nobody else in India has: dining, movies, events and sport in one app. But people go out occasionally. In Q1 FY26 it had about 2 million monthly users opening it roughly twice a month, with an average order above ₹1,700. Revenue swings with the release calendar, and the business is still working towards breakeven." },
        { t: "p", text: "The insight is simple. Cafes are the most frequent going-out occasion there is. People go to cafes to work, study, catch up and date, often every week. But the dining product is built for dinner: book a table, pay a big bill, get a discount. A 45-minute cafe visit does not fit that shape." },
        { t: "callout", label: "The bet", text: "Build a cafe vertical inside District, powered by District Pass. Cafes create the weekly habit; the Pass turns that habit into loyalty that carries over to movies, dining and events. Even one cafe visit a week would roughly double how often users open District." },
        { t: "callout", label: "The ask", text: "A 90-day pilot in Bengaluru and Gurugram, one product pod of about 8 people, and a ₹2 to 3 crore budget. Scale, change course or stop on the week-12 criteria." },
      ],
    },
    {
      id: "diagnosis",
      title: "Where District",
      accent: "stands.",
      blocks: [
        { t: "p", text: "District launched in November 2024 by pulling Zomato's dining-out business, movies, events and sport into one app. FY26 was its first full year in that form. The public numbers tell a clear story." },
        {
          t: "table",
          heading: "FY26 to FY27, from public filings",
          columns: ["Quarter", "Revenue", "Profitability", "Notes"],
          rows: [
            ["Q1 FY26", "₹207 Cr", "Loss", "~2M monthly users, ~2 visits a month, order above ₹1,700"],
            ["Q3 FY26", "₹300 Cr", "Op. loss ₹114 Cr", "Investment in live-event IP and District Pass"],
            ["Q4 FY26", "₹277 Cr", "EBITDA loss ₹81 Cr", "Net order value ₹2,736 Cr; revenue down 8% on the quarter"],
            ["Q1 FY27", "₹318 Cr", "Not yet profitable", "Revenue up about 53% year on year"],
          ],
        },
        { t: "list", items: [
          "The business is growing, but it is lumpy: management itself says the swings are seasonal, driven by big films and concerts.",
          "The ticket is high and the frequency low. Above ₹1,700, twice a month, describes a special-occasion app, which is hard to build a habit around.",
          "District Pass (₹999 for three months) is the first loyalty layer across categories. It needs frequent, everyday reasons to use it.",
          "Management expects breakeven in 4 to 6 quarters, and has described a path to $3B of revenue with ~$150M EBITDA within five years.",
        ] },
        { t: "callout", label: "The core problem", text: "District's growth depends on people remembering to open it for rare occasions, and every visit is expensive to win. What it lacks is a cheap, frequent, everyday reason to open the app, one that feeds the high-value categories rather than competing with them." },
      ],
    },
    {
      id: "market",
      title: "Market and",
      accent: "the opening.",
      blocks: [
        { t: "p", text: "Cafes are the right wedge. India's branded coffee shops grew 12.7% in a year to 5,339 outlets, but more than 76% of the cafes-and-bars market is independent, with no loyalty app of their own. The demand is young and weekly, and a visit is cheap enough to repeat." },
        { t: "p", text: "Cafe spend per visit is small, so cafes will not move District's revenue on their own. Their value is frequency and cross-sell." },
        {
          t: "table",
          heading: "Who else is here",
          columns: ["Player", "What they offer", "Gap District can use"],
          rows: [
            ["Swiggy Dineout", "Table booking, bill discounts", "Built for dinner, not quick cafe visits; discount friction"],
            ["EazyDiner", "Paid dining discounts", "Restaurant-led; little for daytime cafe use"],
            ["Chain apps", "Own ordering and loyalty", "One brand only; no discovery of new places"],
            ["Maps and Instagram", "Where people discover cafes today", "No booking, pay or rewards; can't answer 'can I work here?'"],
            ["Cafes themselves", "Instagram, paper stamp cards", "No data on regulars; no way to fill quiet hours"],
          ],
        },
        { t: "callout", label: "The opening", text: "Nobody owns 'which cafe should I go to right now, for what I'm doing', plus a smooth way to order and pay once there. District already has the payment rails, the dining relationships and District Pass. It is the natural owner of this moment." },
      ],
    },
    {
      id: "strategy",
      title: "The options and",
      accent: "the bet.",
      blocks: [
        { t: "p", text: "The goal is more frequent use without buying it with discounts. I scored five routes from 1 (weak) to 5 (strong) to make the trade-offs visible." },
        {
          t: "table",
          heading: "Options considered",
          columns: ["Option", "Frequency", "Cost", "Learn", "Fit", "Total"],
          rows: [
            ["A. Deeper dining discounts", "3", "1", "4", "3", "13"],
            ["B. More owned events", "2", "1", "2", "5", "12"],
            ["C. Cafe vertical", "5", "4", "4", "4", "20"],
            ["D. Richer Pass benefits only", "3", "2", "4", "5", "17"],
            ["E. Expand to more cities", "2", "2", "2", "3", "12"],
          ],
        },
        { t: "steps", heading: "What has to be true", items: [
          { title: "Users visit cafes weekly", text: "And will use an app to choose one. Tested by survey plus pilot adoption." },
          { title: "Cafes join for tools, not discounts", text: "Independents sign up for footfall and data. Tested by sign-up rate in pilot neighbourhoods." },
          { title: "Cafe users cross-sell", text: "They go on to buy movies, dining or events at a higher rate. Tested against a matched control group." },
        ] },
        { t: "callout", label: "The bet", text: "Option C, powered by D. Build the cafe vertical and use District Pass as the glue. If any of the three assumptions fails in the pilot, we stop or change course rather than scale." },
      ],
    },
    {
      id: "product",
      title: "What we'd",
      accent: "build.",
      blocks: [
        { t: "p", text: "Two sides, built together: the cafe-goer and the cafe. The consumer side meets the moment; the partner side gives cafes a reason to join without discounting." },
        { t: "steps", heading: "For cafe-goers", items: [
          { title: "Find by vibe", text: "Filters Maps can't offer: work-friendly, quiet, date spot, open late, Wi-Fi, plug points and noise level on each card." },
          { title: "How busy is it now", text: "Live or recent busyness from orders and check-ins, shown as a range, so you don't waste a trip." },
          { title: "Pay at the table", text: "Scan the table code and pay, with Pass benefits applied automatically. No bill wait." },
          { title: "Tonight, nearby", text: "After a cafe payment, a suggestion for a movie or event nearby. A ₹400 visit becomes a path to a ₹1,700 night out." },
        ] },
        { t: "steps", heading: "For cafes", items: [
          { title: "Free partner dashboard", text: "Visits via District, repeat customers, peak and quiet hours, payouts. Most independents have no data on their regulars." },
          { title: "Fill quiet hours", text: "Run an offer only in slow slots, with a predicted uplift, so cafes get footfall without discounting their busy hours." },
        ] },
        { t: "callout", label: "MVP for the pilot", text: "In: find by vibe, busyness, pay at the table, cafe rewards inside Pass, the partner dashboard, quiet-hours offers. Out for now: order-ahead (needs billing integration), the full cross-sell engine, and chain-wide deals. Each is a phase-2 decision based on results." },
      ],
    },
    {
      id: "model",
      title: "Business model and",
      accent: "unit economics.",
      blocks: [
        { t: "p", text: "Cafes earn a lower commission than movies or events, so they have to pay for themselves through frequency and cross-sell, not on their own. Here is one cafe user over one month, on my assumptions, to be replaced with pilot data." },
        {
          t: "table",
          heading: "One cafe user, one month",
          columns: ["Line", "Assumption", "Per user / month"],
          rows: [
            ["Cafe spend", "4 visits at ₹450", "₹1,800"],
            ["Commission on payments", "4%", "+₹72"],
            ["Payment processing", "~1.8%", "−₹32"],
            ["Rewards cost to District", "Free coffee 5th visit, half café-funded", "−₹60"],
            ["Cafe on its own", "", "about −₹20"],
            ["Cross-sell", "15% buy a ₹1,700 night out at ~10%", "+₹26"],
            ["Pass upgrade", "20% buy the Pass, ~₹100 net each", "+₹20"],
            ["Total contribution", "", "about +₹26"],
          ],
        },
        { t: "callout", label: "What this means", text: "Cafes on their own lose a little, by design: they are the habit that feeds the profitable categories. The model works only if cafes fund at least half the rewards, 10 to 15% of cafe users buy something else in the same month, and credits make the Pass worth buying. Below 8% cross-sell, the vertical is a cost centre and we rethink it." },
      ],
    },
    {
      id: "execution",
      title: "How we'd run",
      accent: "the pilot.",
      blocks: [
        { t: "p", text: "One pod of about eight people, reporting to the District business head, borrowing from shared teams rather than building new ones. A 90-day plan with a hard go/no-go at week 12." },
        {
          t: "table",
          heading: "90-day plan",
          columns: ["Weeks", "Focus", "Done when"],
          rows: [
            ["1-2", "Set up", "Four pilot neighbourhoods chosen; 40 cafes shortlisted; metrics agreed with finance"],
            ["3-4", "Build and sign", "MVP in internal testing; 25 cafes live per city"],
            ["5-6", "Soft launch", "Cafe mode live in pilot areas; first quiet-hours offers running"],
            ["7-10", "Learn and adjust", "Weekly experiments on rewards, vibe filters and 'tonight, nearby'"],
            ["11-12", "Decide", "Go/no-go review with the CEO on the criteria below"],
          ],
        },
        { t: "steps", heading: "The OKRs", items: [
          { title: "Prove cafes create a weekly habit", text: "25% of cafe-mode users make 3+ cafe visits a month; District opens per user up 30% versus control areas." },
          { title: "Prove cafes want in", text: "100 cafes live across both cities; 60% run a quiet-hours offer and 80% are still active at week 12." },
          { title: "Prove cafes pay for themselves", text: "12% of cafe users buy a movie, event or dining booking in the same month; contribution per cafe user positive by week 12." },
        ] },
        {
          t: "scenario",
          title: "Go / no-go at week 12",
          catch: "Scale to four more cities if habit, cafe retention and cross-sell targets are all met.",
          fix: "Change course if habit works but cross-sell doesn't: test tighter Pass bundling for one more quarter.",
          user: "Stop if fewer than 15% of users make 3+ visits a month, or fewer than 60% of cafes stay active.",
        },
      ],
    },
    {
      id: "choices",
      title: "What I chose",
      accent: "not to do.",
      blocks: [
        { t: "list", items: [
          "Deep discounts to buy cafe traffic. It works for a quarter and then trains users to wait for offers.",
          "Chain-wide deals first. Starbucks and Third Wave have their own apps; independents need us more and have no alternative.",
          "Our own billing system for cafes. Integrate with what they already use; competing with their billing provider makes enemies.",
          "More cities before the habit is proven. Two cities, four neighbourhoods, one quarter.",
        ] },
        { t: "callout", label: "Sources", text: "District and Eternal quarterly filings (Inc42, Storyboard18, Upstox, MediaNama); India coffee-shop market data (World Coffee Portal, IMARC, Nexdigm). Unit-economics figures are my own assumptions, to be replaced with pilot data." },
      ],
    },
  ],
};

// goSTOPS JAS 90: a GTM strategy deck.
export const gostops: ProductCase = {
  id: "gostops",
  number: "04",
  year: "2026",
  headline: "Beating hospitality's",
  accent: "off-season.",
  tags: ["GTM Strategy", "Hospitality", "Pricing"],
  summary:
    "July to September is the structural off-season for hostels, and discounts only erode margin. I designed goSTOPS JAS 90: one seasonal layer that monetises the same beds through four travel occasions, and modelled an ₹8 to 11 Cr revenue upside.",
  kind: "GTM strategy deck",
  period: "2026",
  focus: "goSTOPS JAS 90",
  format: "deck",
  cover: "/cases/gostops/01.webp",
  coverAlt: "goSTOPS JAS 90 GTM strategy, title slide",
  slides: slideList("gostops", 10, "goSTOPS JAS 90"),
  tools: ["GTM strategy", "Segmentation", "7P marketing mix", "Revenue modelling"],
  sections: [
    {
      id: "brief",
      title: "The",
      accent: "brief.",
      blocks: [
        { t: "p", text: "Hospitality is seasonal, and goSTOPS is no exception: July, August and September are structurally slow for footfall and occupancy. The easy answers, discounts and generic off-season banners, erode margin and build nothing lasting. The task was to design an initiative that manufactures demand in that quarter instead." },
        { t: "p", text: "I built the full go-to-market: a need-gap read, a 5C market scan, segmentation and targeting, positioning, a 7P operating design, the consumer decision journey and the financial logic underneath." },
        { t: "callout", label: "The solution", text: "goSTOPS JAS 90: one seasonal layer over the same beds, monetised through four travel occasions across the week. Weekenders acquire demand, workations fill weekdays, group takeovers fill blocks, and creator stays build proof. One brand, one seasonal calendar, multiple reasons to travel." },
        { t: "callout", label: "The prize is utilisation", text: "Starting from the problem's own data, over roughly 7,000 beds across 92 JAS days: lifting RevPAB from ₹300 to ₹425 to 475 closes a 40 to 50 point utilisation gap and adds ₹8 to 11 Cr of bed revenue, on a first-season spend of ₹2.9 to 4 Cr. I flagged validating property-level cost of goods before claiming profit ROI." },
      ],
    },
  ],
};

// Luna: a from-scratch new-category GTM deck.
export const luna: ProductCase = {
  id: "luna",
  number: "05",
  year: "2026",
  headline: "A new category, built",
  accent: "from scratch.",
  tags: ["GTM Strategy", "Consumer", "Research"],
  summary:
    "The brief was to build a go-to-market for a brand new product category. I chose hormonal wellness and designed Luna: India's first clinically-dosed ready-to-drink for hormonal balance, taken from a need gap through research, segmentation, pricing and a launch plan to 10,000 subscribers.",
  kind: "New-category GTM deck",
  period: "2026",
  focus: "Luna",
  format: "deck",
  cover: "/cases/luna/01.webp",
  coverAlt: "Luna GTM strategy, title slide",
  slides: slideList("luna", 16, "Luna"),
  tools: ["Need-gap analysis", "K-means segmentation", "STP", "Unit economics"],
  sections: [
    {
      id: "brief",
      title: "The",
      accent: "brief.",
      blocks: [
        { t: "p", text: "Design a go-to-market for a product category that does not exist yet. I chose hormonal wellness: 50 to 80 million Indian women live with PCOS, a condition managed every day and cured never. Myo-inositol works, but it comes as pills and powders that are hard to stick with, and 48% of diagnosed women in my research could not keep up their supplements. The format is broken, not the intent." },
        { t: "p", text: "Luna is the product I designed to fix that: India's first clinically-dosed ready-to-drink for hormonal balance, a moon-phase range of four flavours at the dose used in trials, sugar-free and under 30 kcal." },
        { t: "callout", label: "The full distance", text: "I ran primary research (surveys plus 20 to 25 interviews), a K-means segmentation into three attitude-based segments (validated with PCA and a silhouette score), STP with a ₹16,000 Cr TAM narrowing to a ₹32 Cr beachhead, unit economics at a ₹129 bottle and 64% gross margin, a doctor-led channel plan, and a launch roadmap from zero to 10,000 subscribers." },
        { t: "callout", label: "The sell-point I'd defend", text: "Doctors as the primary channel, not paid ads. Gynaecologists and dermatologists recommend, patients convert, and customer acquisition cost stays under a third of lifetime value. Positioned as 'for every phase you're in', never as a PCOS label." },
      ],
    },
  ],
};
