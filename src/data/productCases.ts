export type Block =
  | { t: "p"; text: string }
  | { t: "list"; items: string[] }
  | { t: "steps"; heading?: string; items: { title: string; text: string }[] }
  | { t: "table"; heading?: string; columns: string[]; rows: string[][] }
  | { t: "callout"; label: string; text: string }
  | {
      t: "scenario";
      title: string;
      catch: string;
      fix: string;
      user: string;
      columns?: string[];
      rows?: string[][];
    }
  | { t: "screens" };

export type Section = { id: string; title: string; accent: string; blocks: Block[] };

export type Screen = { file: string; name: string; job: string; choice: string };

export type ProductCase = {
  id: string;
  number: string;
  year: string;
  headline: string;
  accent: string;
  tags: string[];
  summary: string;
  kind: string;
  period: string;
  focus: string;
  figmaUrl: string;
  tools: string[];
  collage: { main: string; left: string; right: string };
  screens: Screen[];
  sections: Section[];
};

const creditlink: ProductCase = {
  id: "creditlink",
  number: "01",
  year: "2026",
  headline: "Giving first-time borrowers a credit line inside the",
  accent: "UPI app they already trust.",
  tags: ["Concept design", "FinTech", "Credit on UPI"],
  summary:
    "A small bank credit line that lives inside the UPI app, so people with no credit card can pay a shop today and settle next month. I designed it end to end: eligibility, first spend, repayment, edge cases and the money flow underneath.",
  kind: "Personal case study",
  period: "2026",
  focus: "Credit on UPI for new-to-credit users",
  figmaUrl: "https://www.figma.com/design/67PaM6JTHcOifc0n4JoeY6",
  tools: ["Figma", "Product strategy", "Unit economics", "Systems design"],
  collage: {
    main: "/cases/creditlink/05-live.webp",
    left: "/cases/creditlink/03-offer.webp",
    right: "/cases/creditlink/06-pay.webp",
  },
  screens: [
    { file: "01-home", name: "Home: offer entry", job: "Get a curious tap", choice: "Says \"won't affect your credit score\" to remove the main fear." },
    { file: "02-consent", name: "Consent", job: "Get informed, itemised consent", choice: "All three boxes start unticked; names the lender and says we never hold money." },
    { file: "03-offer", name: "Offer and Key Fact Statement", job: "Make cost clear before signing", choice: "Every cost sits above the button, and \"Not now\" gets equal weight." },
    { file: "04-esign", name: "E-sign with OTP", job: "Make signing deliberate", choice: "A separate agreement checkbox; an OTP alone isn't informed consent." },
    { file: "05-live", name: "Credit line live", job: "Make an invisible product feel real", choice: "Card visual plus a three-step checklist; the main button goes straight to Scan." },
    { file: "06-pay", name: "Pay: choose source", job: "Make credit a one-tap choice", choice: "Shows available limit and interest-free date on the option itself." },
    { file: "07-processing", name: "Processing", job: "Stop double payments", choice: "Amber, not red; \"Please don't pay again\", with an update time." },
    { file: "08-success", name: "Success", job: "Close the loop and build the habit", choice: "The next action is setting up auto-repay." },
    { file: "09-bill", name: "Bill and repay", job: "Make repayment easy", choice: "Pay full is primary; minimum due is visible but secondary." },
    { file: "10-decline", name: "Decline", job: "Turn a no into a not yet", choice: "Plain reason, what helps next time, and an opt-in 90-day reminder." },
  ],
  sections: [
    {
      id: "idea",
      title: "The",
      accent: "idea.",
      blocks: [
        { t: "p", text: "Most people I know pay for chai, groceries and auto rides on UPI. Very few of them have a credit card. That gap is the whole idea behind CreditLink: a small bank credit line that sits inside the UPI app people already use, so they can pay a shop today and settle up next month." },
        { t: "p", text: "Checking your limit takes about two minutes. Once it's live, paying on credit is the same scan-and-PIN flow as always. You just pick a different source." },
        { t: "callout", label: "The calls I'd defend hardest", text: "Score new-to-credit users on their bank statements instead of turning them away. Keep it to merchant payments only. And when a payment's status is unclear, say it's processing rather than flashing a \"Failed\" that makes people pay twice." },
        { t: "callout", label: "What I'd hold myself to in six months", text: "10% of eligible users activating within 30 days, half of them spending within a week, and 30+ days past due staying under 3%. These are my own assumptions; the thinking is in the metrics section." },
      ],
    },
    {
      id: "problem",
      title: "The",
      accent: "problem.",
      blocks: [
        { t: "p", text: "The brief I set myself: design a credit line on UPI for people borrowing for the first time, end to end. That means eligibility, activation, the first spend, repayment, and what happens when someone doesn't pay, plus the tech and money flows underneath." },
        { t: "p", text: "UPI has already won small payments. What it hasn't touched is credit at the counter, which today still means a credit card most UPI users don't have. That changed on paper in September 2023, when the RBI let banks plug pre-sanctioned credit lines into UPI. The rails exist now. What's missing is a way to say yes to people with no credit history, and an experience they'd actually trust." },
        { t: "list", items: [
          "Banks can link a credit line to UPI just like a savings account, and NPCI treats the payment as a normal merchant transaction.",
          "Account Aggregators mean someone with no bureau record can still show six months of salary credits and spending, with their consent.",
          "Nobody has to learn anything new. People already scan QR codes all day; only the source of money changes.",
        ] },
      ],
    },
    {
      id: "users",
      title: "Who it's",
      accent: "for.",
      blocks: [
        { t: "table", columns: ["Segment", "Who", "Job to be done", "Main risk"], rows: [
          ["New-to-credit salaried", "22 to 30, first job, steady UPI inflows", "Smooth spends between salary dates", "Thin data, over-borrowing"],
          ["Gig and self-employed", "Delivery partners, small traders", "Buy stock or fuel before a payout lands", "Irregular income"],
          ["Thin-file credit card avoiders", "Have a bureau record, no card", "Interest-free float without a card", "Low engagement"],
        ] },
        { t: "p", text: "My rough top-down number is about 3.7 crore users we could realistically serve. Two of the inputs are my own guesses, so I've flagged them. Before sharing this widely I'd check the credit-penetration figure against a CIBIL or Experian report." },
        { t: "table", columns: ["Input", "Value", "Type"], rows: [
          ["UPI users onboarded (June 2026)", "55.49 crore", "Sourced (NPCI via Finance Ministry)"],
          ["Active UPI users", "~35 crore", "Sourced (secondary)"],
          ["% with no credit product", "70%", "Assumption"],
          ["% eligible after underwriting", "15%", "Assumption"],
          ["Serviceable users", "35 crore × 70% × 15% ≈ 3.7 crore", "Calculated"],
        ] },
      ],
    },
    {
      id: "flows",
      title: "Three",
      accent: "flows.",
      blocks: [
        { t: "steps", items: [
          { title: "Getting a limit", text: "The user taps the banner and we fill in what we already know from their UPI profile, so the only real step is consent. Then it splits: anyone with a bureau record is scored the usual way, everyone else on their bank statements. The bank makes the call, the user reads the Key Fact Statement, signs with an OTP and sets a PIN." },
          { title: "The first spend", text: "Scan, amount, pick credit as the source. Before we ever ask for a PIN we check two things: is this a shop rather than a friend, and is there enough limit left? After the PIN, the payment goes through, fails cleanly, or sits in processing while the bank makes up its mind." },
          { title: "Paying it back", text: "A statement, a few reminders, and easy ways to pay. If someone misses a date we don't jump straight to the bureau. The line freezes first, and reporting only starts at 30 days past due." },
        ] },
        { t: "table", heading: "Decisions I'd defend", columns: ["Decision", "Factor", "Reasoning"], rows: [
          ["Pre-fill from the UPI profile before asking anything", "Speed", "We already know their mobile, bank account and name. Asking again just loses people."],
          ["Bureau first, Account Aggregator only on no-hit", "Cost and speed", "A bureau pull is cheap and instant. The AA route adds another consent step, so I only use it when there's no bureau record to go on."],
          ["One consent screen for bureau, AA and PAN", "Compliance and conversion", "Consent has to be explicit and itemised, but that doesn't need three screens. One screen with three clear items is honest and quicker."],
          ["The bank underwrites; we only pass features", "Compliance", "The RBI's digital lending rules are clear that the lender decides. We pass on the data; the bank says yes or no."],
          ["Key Fact Statement before acceptance, not after", "Compliance and trust", "It's mandatory anyway, and putting the APR and fees in plain view up front saves a lot of angry support tickets later."],
          ["Merchant payments only, blocked before the PIN", "Compliance and risk", "Credit lines on UPI are meant for paying shops. Catching a P2P attempt early beats failing it after someone has typed their PIN."],
          ["Show \"Processing\", never \"Failed\", on deemed or timeout", "Trust", "\"Failed\" makes people pay again. Hiding the retry button and giving a clear time stops double payments."],
          ["Freeze the line at 1 day past due, report only at 30+", "Engagement and fairness", "A freeze limits the damage straight away. A bureau mark stays with someone for years, so it should come later."],
        ] },
      ],
    },
    {
      id: "screens",
      title: "The ten",
      accent: "screens.",
      blocks: [
        { t: "p", text: "Ten screens carry the whole journey. I sketched each one as a low-fidelity wireframe first, with numbered design notes beside it, then took it to high fidelity. Pick a screen to see the job it does and the choice worth defending." },
        { t: "screens" },
        { t: "table", heading: "Key Fact Statement values used in the mockups", columns: ["Field", "Value", "Basis"], rows: [
          ["Credit limit", "₹25,000", "Half of the ₹50,000 cap HDFC and ICICI offer; suits new-to-credit users"],
          ["Interest-free period", "Up to 30 days", "Benchmark: Paytm Postpaid with Suryoday Bank"],
          ["Interest after due date", "16% p.a.", "Assumption; Karnataka Bank charges 12% p.a. fixed, raised for new-to-credit risk"],
          ["APR", "~18%", "Assumption: interest plus processing fee, annualised"],
          ["Joining / annual fee", "₹149 one-time / ₹0", "Benchmark: HDFC's ₹149 one-time processing fee"],
          ["Late fee", "₹100 / ₹300 / ₹500 by outstanding", "Assumption, modelled on card late-fee slabs"],
          ["Cooling-off period", "3 days", "Above the 1-day minimum in RBI Digital Lending Directions, 2025"],
        ] },
      ],
    },
    {
      id: "architecture",
      title: "Under the",
      accent: "hood.",
      blocks: [
        { t: "p", text: "We run the UPI app and act as the bank's lending service provider. In plain terms, the bank owns the loans and the risk. We own everything the user sees, the rules around it, and making sure the numbers match at the end of the day." },
        { t: "table", heading: "Architecture layers", columns: ["Layer", "Components", "Why it exists"], rows: [
          ["Client", "Mobile app with NPCI UPI SDK, merchant QR, push/SMS/WhatsApp", "PIN entry must happen inside NPCI's secure library"],
          ["Edge", "API gateway with device and SIM binding", "UPI requires the device and SIM to be bound to the user"],
          ["Core services", "Onboarding and consent, eligibility engine, credit line service, UPI payments, partner adaptors, ledger, collections, risk, recon, notifications", "Each owns one state; they talk through events, not shared tables"],
          ["Events", "Kafka topics such as loan.approved, txn.authorised, txn.reversed, bill.generated", "Recon and notifications react to facts without coupling"],
          ["Data", "Postgres double-entry ledger, Redis limit cache, data lake, immutable audit log, document vault", "Limits must be checked in milliseconds; KFS and consents must be retrievable for audit"],
          ["External", "Lending bank (LOS, LMS, core banking), PSP bank, NPCI, bureaus, Account Aggregator, CKYC, e-sign", "Every regulated step is done by a regulated entity"],
        ] },
        { t: "steps", heading: "Money flow for one ₹2,000 spend", items: [
          { title: "User pays", text: "They pay from the credit line with their UPI PIN." },
          { title: "Request routed", text: "Our app sends the request to the PSP bank, which routes it to NPCI." },
          { title: "Issuer approves", text: "NPCI asks the issuer bank to debit the credit line; the issuer approves and uses ₹2,000 of the limit." },
          { title: "Merchant credited", text: "NPCI credits the merchant's bank, then success flows back to the user." },
          { title: "Settlement", text: "Later, the issuer sends us a utilisation webhook and settles with the merchant's bank through RBI settlement cycles." },
        ] },
        { t: "callout", label: "The important bit", text: "Money never passes through us. It goes straight from the issuing bank to the merchant's bank, which is exactly what the digital lending rules ask for. Our ledger just mirrors the bank's loan system, and we reconcile the two every night." },
      ],
    },
    {
      id: "edge",
      title: "When things",
      accent: "break.",
      blocks: [
        { t: "scenario", title: "Spend approved, but our ledger never got the utilisation webhook",
          catch: "The moment NPCI confirms success, we put a hold on our own ledger without waiting for the bank. The webhook is only confirmation. If a hold sits unconfirmed for 15 minutes we get an alert, and the nightly recon compares NPCI, the bank and our ledger line by line anyway.",
          fix: "We do, since it's our ledger. If the numbers ever disagree, the bank's wins because theirs is the official record.",
          user: "Nothing unusual. Their available limit already dropped when we wrote the hold.",
          columns: ["Moment", "Issuer loan system (used)", "Our ledger (used)", "Available to user"],
          rows: [
            ["Before", "₹0", "₹0", "₹25,000"],
            ["NPCI success", "₹2,000", "₹2,000 hold", "₹23,000"],
            ["Webhook missing at 15 min", "₹2,000", "₹2,000 hold, flagged", "₹23,000"],
            ["Recon or webhook retry", "₹2,000", "₹2,000 posted", "₹23,000"],
          ] },
        { t: "scenario", title: "Merchant dispute after the bill is generated",
          catch: "The user raises it in the app and we file a UDIR complaint through our PSP bank.",
          fix: "The merchant's bank investigates. Meanwhile the issuer can leave the disputed amount out of the minimum due.",
          user: "The bill marks ₹2,000 as under dispute and says it won't count towards late fees. If they win, the money comes back and so does the limit." },
        { t: "scenario", title: "Over-limit because of a timing lag",
          catch: "Two payments land within seconds of each other (₹15,000 and ₹10,000) against an available ₹23,000. The limit check and the hold happen in one atomic step on the limit cache, so the second payment sees only ₹8,000 left and is stopped before the PIN.",
          fix: "If the bank approves both anyway, which is unlikely since it runs its own limit check, we freeze new spends, waive any over-limit fee (it was our system, not the user), and the bank absorbs it under the partnership terms.",
          user: "A clear message that the amount is above their available limit, before they enter a PIN." },
      ],
    },
    {
      id: "metrics",
      title: "Metrics and",
      accent: "economics.",
      blocks: [
        { t: "table", heading: "Metrics (targets are my assumptions)", columns: ["Type", "Metric", "Target (assumption)"], rows: [
          ["North Star", "Monthly active credit spenders who repay on time", "1 lakh by month 6"],
          ["Input", "Banner tap → limit check started", "30%"],
          ["Input", "Approved → activated (PIN set)", "60%"],
          ["Input", "Activated → first spend within 7 days", "50%"],
          ["Input", "Users on UPI Autopay", "40%"],
          ["Guardrail", "30+ days past due, by cohort month 6", "under 3%"],
          ["Guardrail", "Payments stuck in \"Processing\" past the promised time", "under 0.1%"],
        ] },
        { t: "p", text: "Why these: offer banners usually convert in single digits, and consent plus e-sign adds real friction, so 10% activation feels honest rather than optimistic. A first spend within a week is the real habit test. And 3% is a cautious ceiling for small unsecured loans to first-time borrowers." },
        { t: "table", heading: "Unit economics per active user per month", columns: ["Line", "Who earns or pays", "Value", "Type"], rows: [
          ["Merchant interchange", "Issuer gets 100%; networks, banks and NPCI get 5 to 15 bps", "~1.2% of spend", "Reported; confirm in the NPCI circular"],
          ["Interest on revolved balances", "Issuer, shared with us per agreement", "16% p.a.", "Assumption"],
          ["Late fees", "Issuer", "₹100 to 500 per event", "Assumption"],
          ["Bureau and AA pull cost", "Us, at onboarding", "₹30 to 60 per check", "Assumption; get quotes"],
          ["Expected credit loss", "Issuer; we cover up to the DLG cap", "3 to 5% of book", "Assumption"],
          ["Default loss guarantee cap", "Us, if we offer DLG", "Max 5% of disbursed portfolio", "Sourced (RBI 2025)"],
          ["Servicing (SMS, support, recon)", "Us", "₹10 to 15 per active user per month", "Assumption"],
        ] },
        { t: "p", text: "Here's what one active user looks like in a month. They spend ₹4,000, which earns about ₹48 in interchange at 1.2%. If roughly 30% of users carry a ₹3,000 balance at 16% a year, that's another ₹12 on average. So about ₹60 comes in. Take off ₹12 for servicing and around ₹13 for expected losses (4% a year on ₹4,000), and roughly ₹35 is left for the bank and us to split. This is also why credit on UPI was slow to take off: until NPCI fixed interchange, nobody could make the interest-free version pay for itself." },
      ],
    },
    {
      id: "scope",
      title: "What I chose",
      accent: "not to build.",
      blocks: [
        { t: "list", items: [
          "Credit for P2P transfers. It isn't allowed on credit lines, and cash-like use is where defaults come from.",
          "EMI conversion in v1. Users will ask for it, but it's a second product with its own KFS. I'd rather ship it in v2, once we've seen how people repay.",
          "Our own lending licence. An NBFC licence is slow and eats capital. Partnering with a bank lets us test demand first.",
          "Rewards on spends. They attract people chasing points, not people who repay. I'd reward paying on time instead.",
        ] },
      ],
    },
  ],
};

const raktaa: ProductCase = {
  id: "raktaa",
  number: "02",
  year: "2026",
  headline: "Redesigning NRI mutual fund KYC, from a week of paperwork to",
  accent: "one sitting.",
  tags: ["Teardown", "Redesign", "NRI investing"],
  summary:
    "I tore down four ways NRIs onboard to Indian mutual funds, then redesigned the journey into one sitting on a phone: a video call instead of attested copies, and KYC validated within hours where the rules allow.",
  kind: "Product teardown and redesign",
  period: "2026",
  focus: "Mutual fund onboarding for NRIs",
  figmaUrl: "https://www.figma.com/design/7qk457TGC8siNTSDC9Nk2X",
  tools: ["Figma", "Competitive teardown", "Friction mapping", "Systems design"],
  collage: {
    main: "/cases/raktaa/09-status.webp",
    left: "/cases/raktaa/02-checklist.webp",
    right: "/cases/raktaa/04-address.webp",
  },
  screens: [
    { file: "01-residency", name: "Where do you live?", job: "Set up the whole journey", choice: "Country first; US and Canada users see what's possible right away." },
    { file: "02-checklist", name: "Your checklist", job: "Gather everything in one go", choice: "Tailored to the country, with a time estimate and examples of valid proofs." },
    { file: "03-passport", name: "Scan passport", job: "Fill in identity without typing", choice: "Reads the passport and asks the user to confirm, not retype." },
    { file: "04-address", name: "Overseas address proof", job: "Avoid the number-one rejection", choice: "Checks date, language and name match on the spot, with a clear fix." },
    { file: "05-tax", name: "Tax residency (FATCA/CRS)", job: "Remove fear from a jargon form", choice: "Shows what a tax ID looks like for their country." },
    { file: "06-bank", name: "Link NRE / NRO account", job: "Make repatriation a conscious choice", choice: "One-line difference between NRE and NRO; penny-drop check." },
    { file: "07-video", name: "Video verification", job: "Replace attestation", choice: "Now or later, with slots shown in the user's own time zone." },
    { file: "08-review", name: "Review and submit", job: "Catch mistakes before the KRA does", choice: "Everything on one page with edit links." },
    { file: "09-status", name: "KYC status", job: "Kill the silence", choice: "Stages, timestamps and an ETA in the user's time zone." },
    { file: "10-sip", name: "Start your first SIP", job: "Turn KYC into an investment", choice: "Only funds open to their country; repatriable tag on the folio." },
  ],
  sections: [
    {
      id: "idea",
      title: "The",
      accent: "idea.",
      blocks: [
        { t: "p", text: "If you live in Dubai or London and want to start a ₹10,000 SIP in an Indian mutual fund, you'll probably spend more time on paperwork than on picking the fund. Passport copies, an overseas address proof that's \"less than three months old\", attestation by a notary or the embassy, a FATCA form, a cancelled NRE cheque, and then a wait of a week or more. In my earlier research on this space I estimated that 40 to 60% of NRIs give up somewhere along the way." },
        { t: "p", text: "I tore down four ways NRIs onboard today and redesigned the journey as Raktaa: one sitting of about 20 minutes on a phone, a video call instead of attested photocopies, and KYC validated within 2 working hours where the rules allow it." },
        { t: "callout", label: "The calls I'd defend hardest", text: "Ask for the country first and tailor everything after it. Catch a bad address proof on the phone instead of at the KRA a week later. Book the video KYC in the user's own time zone. And be honest with US and Canada residents up front about which funds they can actually buy." },
      ],
    },
    {
      id: "problem",
      title: "The",
      accent: "problem.",
      blocks: [
        { t: "p", text: "The brief I set myself: tear down how NRIs complete mutual fund KYC and make their first investment today, then redesign it end to end so a typical NRI can go from \"I want to invest\" to a validated KYC in one sitting and a couple of hours." },
        { t: "p", text: "NRIs want exposure to India, and mutual funds are the obvious route. But the KYC was designed for someone sitting in India with an Aadhaar-linked mobile. An NRI usually has a foreign SIM, documents in another country's format, and a nine-hour time difference." },
        { t: "p", text: "Here's what an NRI has to produce today: PAN, passport, visa or OCI card, overseas address proof, a photo, an NRE or NRO bank proof, and a FATCA/CRS declaration. Many AMCs still ask for the overseas documents to be attested by an Indian embassy, a notary, or an overseas branch of an Indian bank. Documents in a foreign language need a certified English translation. Approval has traditionally taken around a week." },
        { t: "p", text: "The good news is that the rails have moved. Several KRAs and platforms now let NRIs upload documents, sign the FATCA form and do in-person verification over a video call, without visiting India. The process is possible online; it just isn't designed for the person going through it." },
      ],
    },
    {
      id: "users",
      title: "Who I designed",
      accent: "for.",
      blocks: [
        { t: "table", columns: ["Segment", "Who", "What they want", "What trips them up"], rows: [
          ["Gulf salaried", "UAE, Saudi, Qatar; NRE account already open", "Start a SIP quickly from salary", "Address proof in Arabic, employer-provided housing"],
          ["UK, Europe, Singapore professionals", "Mid-career, investing for parents or a return to India", "Repatriable, direct plans", "Attestation and courier, tax residency forms"],
          ["US and Canada residents", "Large, high-income group", "Any Indian mutual fund at all", "Many platforms and AMCs don't accept them because of FATCA"],
          ["Residents turning NRI", "Moved abroad, already have folios", "Update status without breaking SIPs", "KYC modification, changing resident to NRE/NRO bank"],
        ] },
        { t: "p", text: "Sizing, from my own earlier research, not verified market data, so treat these as assumptions to check: 3 crore+ NRIs worldwide, ₹8 to 10 lakh crore of annual inflows to India, 5 to 8% of which reaches mutual funds." },
      ],
    },
    {
      id: "teardown",
      title: "The",
      accent: "teardown.",
      blocks: [
        { t: "p", text: "I looked at four routes an NRI might take today, based on public information and the platforms' own help-centre pages as of October 2026. NRI support changes often, so treat this as a snapshot." },
        { t: "table", columns: ["Route", "How KYC works", "US / Canada", "Where it breaks", "What it does well"], rows: [
          ["Kuvera", "Online upload, FATCA form, video verification", "Not accepted", "Rejections from address-proof mismatches; little guidance on what a valid proof looks like", "Free direct plans, built with NRIs in mind"],
          ["Zerodha Coin", "Needs a trading and NRI account first", "Mutual funds blocked for US/Canada", "Two accounts before your first SIP; heavy for someone who only wants funds", "One place for stocks and funds"],
          ["SBNRI", "Distributor-led, with human hand-holding", "Supported for some funds", "Regular plans, so higher costs; relies on manual handling", "Works for US/Canada, which most others don't"],
          ["AMC direct, via CAMS / KFintech", "Upload or courier attested copies; video verification in some cases", "Varies by AMC, often extra paperwork", "Every AMC is a separate journey; attestation and courier for many", "Direct plans and no middleman"],
        ] },
        { t: "table", heading: "Friction map (drop-off ratings are hypotheses from desk research)", columns: ["Step", "What the user has to do", "Drop-off risk", "Why"], rows: [
          ["1 · Find a platform that accepts you", "Search, sign up, discover it doesn't serve your country", "High for US/Canada", "The no comes late, after effort"],
          ["2 · Gather documents", "Passport, visa or OCI, overseas address proof, PAN, NRE cheque", "High", "No single checklist; rules differ by country"],
          ["3 · Address proof", "Find a recent bill in English with a matching name and address", "Very high", "Most rejections start here, and you find out days later"],
          ["4 · Attestation", "Notary, embassy or Indian bank branch abroad", "High", "An in-person trip in a foreign city"],
          ["5 · FATCA / CRS", "Tax residency country, foreign tax ID", "Medium", "Jargon; users fear getting it wrong"],
          ["6 · Verification", "Video call or courier", "Medium", "Indian business hours vs. the user's time zone"],
          ["7 · Wait for KRA", "Days of silence", "Medium", "No status, no ETA, so people forget or give up"],
        ] },
        { t: "callout", label: "What I took from it", text: "The rules aren't the main problem. Most of the pain comes from three design choices: telling people about country restrictions too late, checking documents too late, and leaving them in silence after they submit." },
      ],
    },
    {
      id: "flows",
      title: "Three",
      accent: "flows.",
      blocks: [
        { t: "steps", items: [
          { title: "Residency and documents", text: "The first question is where you live. That one answer sets the checklist, the address proofs we accept, the FATCA questions and the funds you'll be able to buy. Then the user scans their passport, uploads an address proof that we check on the spot, fills FATCA/CRS, and links an NRE or NRO account with a penny-drop test." },
          { title: "Verification and KRA", text: "The user does the video verification now or books a slot in their own time zone. A trained agent checks the passport live, the user reviews and submits, and we upload to the KRA. If the KRA puts the record on hold, we tell the user exactly what to fix." },
          { title: "First investment", text: "Only funds that accept the user's country are shown. They pay from their NRE or NRO account, the order goes through the exchange platform to the fund house, units are allotted, and the folio is tagged repatriable or not." },
        ] },
        { t: "table", heading: "Decisions I'd defend", columns: ["Decision", "Factor", "Reasoning"], rows: [
          ["Ask for the country of residence first", "Honesty and effort", "It decides almost everything else. A US resident should hear about restrictions in the first ten seconds, not after uploading a passport."],
          ["Personalised checklist before any upload", "Drop-off", "People abandon when they discover a missing document halfway. Showing the full list up front lets them gather everything in one go."],
          ["Check address proof on the phone", "Rejections", "Most KRA rejections start with the address proof. Checking date, language and name match while the user is still in the app beats finding out a week later."],
          ["Video verification instead of attested copies", "Time and cost", "A video call replaces the notary or embassy trip. Booking happens in the user's time zone, with evening slots for Gulf users."],
          ["Plain-language FATCA with examples", "Fear of mistakes", "Users worry that a wrong tax form will cause trouble. Show what a TIN looks like for their country and explain why it's asked."],
          ["Explain NRE vs. NRO in one line", "Long-term trust", "Whether money can go back abroad depends on this choice. Users should pick it knowingly, not discover it at redemption."],
          ["A status tracker with an ETA", "Silence", "The wait is where people give up. Each stage shows a timestamp and the next expected update, in the user's time zone."],
        ] },
      ],
    },
    {
      id: "screens",
      title: "The ten",
      accent: "screens.",
      blocks: [
        { t: "p", text: "Ten screens carry the redesigned journey. I started with low-fidelity wireframes and numbered design notes, then built high-fidelity mockups. Pick a screen to see its job and the choice worth defending." },
        { t: "screens" },
      ],
    },
    {
      id: "architecture",
      title: "Under the",
      accent: "hood.",
      blocks: [
        { t: "p", text: "Raktaa is an onboarding and distribution layer. The KRA holds the KYC record, the fund house holds the money, and the registrar keeps the unit records. We own the journey, the checks before submission, and keeping the user informed." },
        { t: "table", heading: "Architecture layers", columns: ["Layer", "Components", "Why it exists"], rows: [
          ["Client", "Mobile and web app, camera capture, push and email", "NRIs switch between phone and laptop; email matters more than SMS on a foreign number"],
          ["Edge", "API gateway, auth, device binding", "Secure sessions for people logging in from many countries"],
          ["Core services", "Residency rules engine, document capture and OCR, address-proof validator, FATCA/CRS module, video verification scheduler, sanctions and AML screening, KRA connector, bank verification, order service, status tracker, notifications", "Each step of the journey has one owner, so a rule change for one country doesn't touch the rest"],
          ["Data", "Encrypted document vault in India, Postgres for applications, audit log, rules config per country", "Personal data stays in India; every decision is traceable"],
          ["External", "KRAs, CKYC, video verification provider, sanctions lists, Indian banks for penny drop, exchange order platforms (BSE StAR MF, MFU), registrars (CAMS, KFintech), fund houses", "Every regulated step is done by a regulated entity"],
        ] },
        { t: "steps", heading: "Money flow for one ₹10,000 SIP", items: [
          { title: "Mandate approved", text: "The user approves the SIP mandate or payment from their NRE or NRO account." },
          { title: "Order placed", text: "The order goes through the exchange platform to the fund house." },
          { title: "Money moves", text: "Money moves from the user's bank to the fund house's collection account through the exchange's clearing." },
          { title: "Units allotted", text: "The registrar allots units at that day's NAV and updates the folio, tagged repatriable or non-repatriable based on the account." },
          { title: "Redemption", text: "The fund house pays back only to the registered NRE or NRO account, after deducting TDS." },
        ] },
        { t: "callout", label: "The important bit", text: "Money never sits with us. We pass orders and track status; the bank, exchange and fund house move the money." },
      ],
    },
    {
      id: "edge",
      title: "When things",
      accent: "break.",
      blocks: [
        { t: "scenario", title: "The KRA puts the KYC on hold for an address mismatch",
          catch: "The KRA connector polls status and receives a hold with a reason code. We map each code to a plain-English message.",
          fix: "The user, with our help. We show the two addresses side by side and highlight the difference.",
          user: "\"Your address needs one fix\", with a one-tap way to correct the form or upload a different proof. No need to redo the video call.",
          columns: ["Moment", "KRA status", "What the app shows"],
          rows: [
            ["Submitted", "Under process", "\"With the KRA · usually under 2 working hours\""],
            ["Flagged", "On hold: address mismatch", "\"One fix needed\", with both addresses side by side"],
            ["Re-submitted", "Under process", "\"Fixed · back with the KRA\""],
            ["Validated", "Validated", "\"You're ready to invest\""],
          ] },
        { t: "scenario", title: "A US resident finds out after KYC that most funds won't take them",
          catch: "This is the most common bad surprise today, and we design it out. Country is the first question. US and Canada users see a clear note before any upload and an estimated number of funds open to them.",
          fix: "If they still go ahead, the fund list only shows schemes that accept their country, so they never hit a rejection at checkout.",
          user: "\"Funds open to US residents\", with an honest count and a link explaining why." },
        { t: "scenario", title: "A resident moves abroad and becomes an NRI",
          catch: "The user tells us, or a payment fails from a closed resident account. They already have folios and running SIPs from their resident bank account.",
          fix: "We guide a KYC modification (status change, overseas address) and a bank mandate change to NRE or NRO; the fund house updates the folios.",
          user: "A checklist of each folio and SIP with its status, so nothing silently stops." },
      ],
    },
    {
      id: "metrics",
      title: "Metrics and",
      accent: "model.",
      blocks: [
        { t: "table", heading: "Metrics (targets are my assumptions)", columns: ["Type", "Metric", "Target (assumption)"], rows: [
          ["North Star", "NRIs with a validated KYC who start a SIP within 7 days", "5,000 a month by month 6"],
          ["Input", "Started → submitted for KYC", "60%"],
          ["Input", "Address proof accepted first time", "85%"],
          ["Input", "Video verification completed within 24 hours of booking", "80%"],
          ["Input", "Submitted → KRA validated within 2 working hours", "70% (where the video and digital route applies)"],
          ["Guardrail", "KRA rejections after our checks", "under 5%"],
          ["Guardrail", "Support tickets per 100 applications", "under 10"],
        ] },
        { t: "p", text: "Why these: the friction map says address proof and silence are the big killers, so I measure first-time acceptance and time to validation directly. The 2-hour target only applies where a fully digital route is available; courier cases are tracked separately so they don't hide inside an average." },
        { t: "table", heading: "Business model, from my earlier research (ranges are assumptions)", columns: ["Stream", "Model", "Range (assumption)"], rows: [
          ["Per application (B2B)", "Fund houses or banks pay per completed NRI KYC", "₹500 to 1,000 per application"],
          ["Distribution", "Trail commission on regular plans, or an advisory fee on direct plans", "0.5 to 1% of AUM"],
          ["Licensing", "White-label onboarding inside a fund house or bank app", "₹25 to 60 lakh a year per partner"],
        ] },
        { t: "p", text: "The B2B route is where I'd start. Fund houses already lose these investors to friction, and a white-label flow inside their own app avoids building consumer trust from zero." },
      ],
    },
    {
      id: "scope",
      title: "What I chose",
      accent: "not to build.",
      blocks: [
        { t: "list", items: [
          "Our own KRA or regulated entity. Slow and unnecessary. Integrating with existing KRAs gets the same result.",
          "US/Canada as a launch market. Too few funds accept them. Start with the Gulf, UK and Singapore, and add US/Canada with partner fund houses later.",
          "Stocks and PIS accounts in v1. A different regulatory path. Funds first.",
          "Tax filing for NRIs. Valuable, but a separate product. Partner rather than build.",
        ] },
      ],
    },
  ],
};

export const productCases: ProductCase[] = [creditlink, raktaa];
