export interface WorkflowStep {
  stepNumber: string;
  stage: string;
  title: string;
  detail: string;
  technicalNote: string;
}

export interface ChatTurn {
  sender: 'Customer' | 'Bot' | 'System';
  time: string;
  message: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  categoryTag: '[FB Messenger]' | '[WhatsApp Bot]' | '[Full Support System]';
  filterKey: 'messenger' | 'whatsapp' | 'full';
  clientIndustry: string;
  clientLocation: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  resultImpact: string;
  primaryMetric: string;
  secondaryMetric: string;
  workflowSummary: string;
  workflowSteps: WorkflowStep[];
  sampleConversation: ChatTurn[];
  stackUsed: string;
}

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: 'dhaka-stylemart',
    title: 'Automated F-Commerce Comment-to-Inbox & Order Logging System',
    categoryTag: '[FB Messenger]',
    filterKey: 'messenger',
    clientIndustry: 'E-Commerce & F-Commerce Retail (Apparel & Lifestyle Store)',
    clientLocation: 'Dhaka, Bangladesh',
    problem:
      'During new collection launches and boosted Facebook posts, the page received 600+ daily comments and inbox messages asking "Price koto?", "Size hobe?", and "Delivery charge koto?". Manual replies took 3–4 hours, leading to lost impulse buyers.',
    solution:
      'Configured a Meta Graph API webhook listener connected to an automated comment-to-inbox responder, a live Google Sheets product catalog lookup, and an AI FAQ assistant trained on store policies in both English and Banglish.',
    keyFeatures: [
      'Auto-reply to public post comments + instant private Messenger DM with product photo, price, and available sizes',
      'Live Google Sheets inventory lookup for size/color stock verification in natural Banglish and English',
      'Automated delivery charge calculation (Inside Dhaka: 70 BDT / Outside Dhaka: 130 BDT) and Cash-on-Delivery order capture',
      'Instant human handoff trigger when a customer requests wholesale pricing, exchanges, or urgent complaint support'
    ],
    resultImpact:
      'Reduced average response time from 3.5 hours to under 8 seconds; handled 84% of routine price and stock inquiries automatically and increased confirmed Cash-on-Delivery orders by 38%.',
    primaryMetric: '< 8 sec response time',
    secondaryMetric: '84% FAQs automated',
    workflowSummary:
      'FB Post Comment / Inbox Trigger -> Meta Graph Webhook -> Product SKU & Sheet Lookup -> AI Banglish Intent Check -> Instant Reply & Order Row Append',
    stackUsed: 'Meta Messenger API · Webhook Router · OpenAI / Gemini Knowledge Base · Google Sheets API',
    workflowSteps: [
      {
        stepNumber: '01',
        stage: 'Trigger',
        title: 'Customer Comments on Post or Sends Messenger Message',
        detail:
          'Customer comments "Price koto bhai?" on a promotional post with Post ID #88412 or sends an inbox message with a product screenshot/code.',
        technicalNote: 'Event: feed_comment_add / messages_webhook (Meta Graph API v19.0)'
      },
      {
        stepNumber: '02',
        stage: 'Webhook & Context Match',
        title: 'Post ID Mapping & Product Catalog Lookup',
        detail:
          'Webhook extracts the Post ID or SKU keyword, queries the Google Sheets Product Catalog, and retrieves the exact item price, fabric details, and live stock per size (M, L, XL, XXL).',
        technicalNote: 'GET Sheets Range: Catalog!A2:H150 (Latency ~320ms)'
      },
      {
        stepNumber: '03',
        stage: 'AI Knowledge Check',
        title: 'Bilingual / Banglish Query Understanding',
        detail:
          'If the user asks natural questions like "Mirpur e kalker moddhe delivery pabo?" or "Exchange policy ki?", the AI agent checks the verified store policy document and replies in polite Banglish or English.',
        technicalNote: 'Strict grounded prompt: Zero hallucinated discounts; falls back to human agent if unsure.'
      },
      {
        stepNumber: '04',
        stage: 'Reply & Sheet Update',
        title: 'Order Confirmation & Google Sheets Row Logging',
        detail:
          'Collects customer Name, Phone Number (validated 11-digit BD format), Full Address, and Size, then appends a new row to the "Confirmed_Orders" Google Sheet and sends an Order ID receipt in Messenger.',
        technicalNote: 'POST Sheets Append -> Triggers Telegram/WhatsApp alert for packing team.'
      }
    ],
    sampleConversation: [
      {
        sender: 'Customer',
        time: '08:14:02 PM',
        message: 'Bhai black linen panjabi tar price koto? XL size available ache?'
      },
      {
        sender: 'Bot',
        time: '08:14:08 PM',
        message:
          'Assalamu Alaikum! Premium Black Textured Linen Panjabi (Code: LP-204) er price 1,450 BDT. Haa bhai, XL size ekhon stock-e available ache (Chest 44"). Apni ki order confirm korte chan?'
      },
      {
        sender: 'Customer',
        time: '08:14:45 PM',
        message: 'Uttara sector 7 e delivery charge koto ar kobe pabo?'
      },
      {
        sender: 'Bot',
        time: '08:14:51 PM',
        message:
          'Uttara (Inside Dhaka) delivery charge 70 BDT. Total payable: 1,520 BDT (Cash on Delivery). Aaj raat 10tar age confirm korle agamikalker moddhei delivery paben InshaAllah. Order korte apnar Name, Mobile Number, ebong House/Road address-ti likhe din.'
      }
    ]
  },
  {
    id: 'medcare-clinic',
    title: 'WhatsApp Patient Appointment Booking & Lab Report Desk',
    categoryTag: '[WhatsApp Bot]',
    filterKey: 'whatsapp',
    clientIndustry: 'Healthcare Clinic & Diagnostic Center',
    clientLocation: 'Chattogram, Bangladesh',
    problem:
      'Receptionists spent over 5 hours every day answering repetitive phone calls and WhatsApp messages about specialist doctor chamber timings, consultation fees, and fasting rules for blood tests.',
    solution:
      'Implemented an official WhatsApp Business Cloud API chatbot linked to a live doctor roster spreadsheet and a custom PDF knowledge base covering 180+ diagnostic tests and preparation instructions.',
    keyFeatures: [
      '24/7 interactive doctor chamber schedule lookup by medical department (Cardiology, Medicine, Pediatrics, ENT)',
      'Custom PDF ingestion of diagnostic price list and pre-test preparation guidelines (English & Bangla support)',
      'Automated patient serial booking with instant WhatsApp confirmation slip and 3-hour pre-appointment reminder',
      'Smart escalation to front-desk human operator when patients upload prescription photos or report urgent symptoms'
    ],
    resultImpact:
      'Reduced front-desk phone & manual chat load by 65%; cut patient inquiry response time from 2.5 hours to 6 seconds and booked 420+ monthly appointments automatically.',
    primaryMetric: '65% fewer manual calls',
    secondaryMetric: '420+ monthly bookings',
    workflowSummary:
      'WhatsApp Inbound Message -> Cloud API Webhook -> PDF Test Guide / Roster Check -> Serial Allocation -> Patient Confirmation & Reception Sheet Sync',
    stackUsed: 'WhatsApp Business Cloud API · Document RAG Index · Google Sheets Roster · Node.js Webhook',
    workflowSteps: [
      {
        stepNumber: '01',
        stage: 'Trigger',
        title: 'Patient Messages Official WhatsApp Number',
        detail:
          'Patient sends a message in English, Bangla, or Banglish asking for a specialist appointment or diagnostic test price/preparation rule.',
        technicalNote: 'WhatsApp Cloud API Webhook POST /webhook/whatsapp'
      },
      {
        stepNumber: '02',
        stage: 'Webhook & Intent Routing',
        title: 'Classify Inquiry: Doctor Serial vs. Lab Test FAQ vs. Human Help',
        detail:
          'Router identifies whether the patient wants to check a doctor schedule, ask about lab test pricing/fasting, or speak to reception.',
        technicalNote: 'Deterministic menu selection + natural language intent router.'
      },
      {
        stepNumber: '03',
        stage: 'AI Knowledge & Roster Check',
        title: 'Query Live Doctor Schedule or Clinic PDF Manual',
        detail:
          'Retrieves real-time available serial slots from the clinic Google Sheet or extracts exact fasting instructions and BDT test rates from the approved diagnostic PDF.',
        technicalNote: 'Strict medical disclaimer enforced; zero diagnostic advice given.'
      },
      {
        stepNumber: '04',
        stage: 'Reply & Sheet Update',
        title: 'Write Patient Serial to Reception Sheet & Send Token',
        detail:
          'Records Patient Name, Age, Phone, Doctor Name, and Date in the front-desk sheet and sends a formatted WhatsApp booking token to the patient.',
        technicalNote: 'Row locked & serial incremented atomically; scheduled reminder queued.'
      }
    ],
    sampleConversation: [
      {
        sender: 'Customer',
        time: '10:22:10 AM',
        message: 'Dr. Mahmudul Hasan (Cardiology) ki ajke bosben? Serial nite chai.'
      },
      {
        sender: 'Bot',
        time: '10:22:15 AM',
        message:
          'Ji, Prof. Dr. Mahmudul Hasan (Cardiology) ajke Bikul 5:00 PM – Raat 9:00 PM porjonto chamber korben. Consultation Fee: 1,000 BDT. Ajker jonno Serial #14 theke #22 khali ache. Serial book korte Patient-er Name, Age ebong Mobile Number likhun.'
      },
      {
        sender: 'Customer',
        time: '10:23:02 AM',
        message: 'Lipid profile test er jonno koto ghonta na kheye thakte hobe ar price koto?'
      },
      {
        sender: 'Bot',
        time: '10:23:07 AM',
        message:
          'Fasting Lipid Profile test-er jonno 10 theke 12 ghonta fasting (khabar chara, sudhu sada pani pan kora jabe) thakte hobe. Test Charge: 850 BDT. Sample collection somoy: Sokal 7:30 AM – Dupur 12:00 PM.'
      }
    ]
  },
  {
    id: 'spiceroute-kitchen',
    title: 'Multi-Channel Restaurant Menu, Order & Live Delivery Tracker',
    categoryTag: '[Full Support System]',
    filterKey: 'full',
    clientIndustry: 'Local Restaurant & Cloud Kitchen Delivery',
    clientLocation: 'Dhanmondi & Gulshan, Dhaka',
    problem:
      'Peak lunch and dinner hours overwhelmed staff managing Facebook Messenger and WhatsApp simultaneously. Customers waited 20+ minutes to confirm family platters or check where their delivery rider was.',
    solution:
      'Connected both Facebook Messenger and WhatsApp Business into a unified automation workflow featuring PDF menu/platter ingestion, delivery zone verification, and two-way Google Sheets kitchen status alerts.',
    keyFeatures: [
      'PDF menu & party platter catalog ingestion answering portion size, spice preference, and combo pricing questions',
      'Automated delivery coverage check across 14 Dhaka neighborhoods with instant minimum-order validation',
      'Two-way Google Sheets sync: changing order status to "Dispatched" automatically sends rider phone number on WhatsApp',
      'Instant human handoff trigger for custom catering inquiries, allergies, or late-order escalations'
    ],
    resultImpact:
      'Reduced order confirmation time from 22 minutes to under 10 seconds; automated 78% of "Where is my order?" inquiries with zero missed kitchen tickets.',
    primaryMetric: '< 10 sec order confirmation',
    secondaryMetric: '78% status queries automated',
    workflowSummary:
      'Messenger / WhatsApp Trigger -> Unified Order Webhook -> Menu PDF & Zone Check -> Kitchen Sheet Ticket -> Two-Way Dispatch Notification',
    stackUsed: 'WhatsApp API · Messenger API · Google Sheets Apps Script Webhook · Custom PDF Menu Agent',
    workflowSteps: [
      {
        stepNumber: '01',
        stage: 'Trigger',
        title: 'Customer Inquires About Menu or Existing Order Status',
        detail:
          'Customer messages on WhatsApp or Facebook Messenger asking about family platters, current BOGO offers, or tracking an active order.',
        technicalNote: 'Unified webhook handler normalizing Messenger PSID & WhatsApp WA_ID.'
      },
      {
        stepNumber: '02',
        stage: 'Webhook & Order Lookup',
        title: 'Check Active Orders Sheet by Phone Number',
        detail:
          'If the customer asks about delivery status, the webhook matches their phone number against today’s Kitchen Sheet and reads the current stage (Preparing / Packed / Out with Rider).',
        technicalNote: 'Lookup key: Normalized BD mobile (+8801XXXXXXXXX).'
      },
      {
        stepNumber: '03',
        stage: 'AI Knowledge Check',
        title: 'PDF Menu & Combo Recommendation Engine',
        detail:
          'Answers specific questions such as "4 joner jonno kon platter ta bhalo hobe?" using exact items and prices from the restaurant PDF menu.',
        technicalNote: 'Context-grounded on current monthly menu PDF & active promo codes.'
      },
      {
        stepNumber: '04',
        stage: 'Reply & Sheet Update',
        title: 'Kitchen Ticket Creation & Automated Dispatch Alert',
        detail:
          'Logs confirmed orders directly to the kitchen display sheet. When kitchen staff switch column G to "Dispatched", an Apps Script webhook pushes an automatic WhatsApp alert with the rider contact.',
        technicalNote: 'Bi-directional webhook between Google Sheets and WhatsApp Cloud API.'
      }
    ],
    sampleConversation: [
      {
        sender: 'Customer',
        time: '07:45:12 PM',
        message: '4 joner family dinner er jonno platter ache? Sathe ki ki thakbe?'
      },
      {
        sender: 'Bot',
        time: '07:45:18 PM',
        message:
          'Haa! Amader "Royal Mughlai Family Platter (Serves 4)" ache — Price: 2,190 BDT. Ete thakche: 4 pcs Chicken Roast, 4 pcs Mutton Rezala, Full Chinigura Polao, 4 pcs Borhani, ebong Firni. Dhanmondi/Lalmatia area-te delivery time 35–45 mins.'
      },
      {
        sender: 'Customer',
        time: '08:25:00 PM',
        message: 'Amar order #SR-409 ta kothay ekhon?'
      },
      {
        sender: 'Bot',
        time: '08:25:05 PM',
        message:
          'Order #SR-409 er status: [Out for Delivery - 8:21 PM]. Rider Kamal Hossain (+8801711-XXXXXX) apnar address-er uddeshe roana diyechen. Anumanik 12–15 minute-er moddhe pouche jaben.'
      }
    ]
  },
  {
    id: 'primenest-agency',
    title: 'Real Estate & Consultancy Lead Qualification + Document FAQ Bot',
    categoryTag: '[WhatsApp Bot]',
    filterKey: 'whatsapp',
    clientIndustry: 'Real Estate Developer & Service Consultancy Agency',
    clientLocation: 'Banani, Dhaka (Serving Local & NRB Clients)',
    problem:
      'Facebook lead ads generated 150+ daily WhatsApp and Messenger inquiries, but 75% were casual browsers asking basic brochure questions, leaving senior sales consultants exhausted and slow to call serious buyers.',
    solution:
      'Built a structured WhatsApp & Messenger lead qualification workflow paired with a custom AI knowledge agent trained on project brochures, floor plans, EMI schedules, and legal document checklists.',
    keyFeatures: [
      'Custom AI agent trained on PDF project brochures, katha/sqft pricing tables, and bank loan/installment FAQs',
      'Structured 4-step lead qualification flow (Preferred Area, Budget Range, Purchase Timeline, Phone Verification)',
      'Automated PDF brochure delivery on WhatsApp immediately after qualification',
      'Real-time Google Sheets CRM logging with instant WhatsApp notification to the assigned senior consultant for high-intent leads'
    ],
    resultImpact:
      'Reduced first-response time from 3 hours to 5 seconds; handled 80% of brochure & installment FAQs automatically and increased qualified site-visit bookings by 2.4x.',
    primaryMetric: '5 sec lead response',
    secondaryMetric: '2.4x site visit bookings',
    workflowSummary:
      'Ad Click to WhatsApp/Messenger -> Webhook Qualification Flow -> Brochure PDF RAG -> Lead Score Calculation -> CRM Sheet + Consultant Handoff',
    stackUsed: 'WhatsApp Business API · Facebook Lead Ads Webhook · PDF Knowledge Base · Google Sheets CRM',
    workflowSteps: [
      {
        stepNumber: '01',
        stage: 'Trigger',
        title: 'Lead Clicks "Send WhatsApp Message" Ad or Website CTA',
        detail:
          'Prospective buyer (local or Non-Resident Bangladeshi in UK/USA/Middle East) initiates a chat from a property campaign ad at any hour.',
        technicalNote: 'Captures referral ad_id, campaign source, and user phone number.'
      },
      {
        stepNumber: '02',
        stage: 'Webhook & Qualification',
        title: 'Conversational 4-Point Qualification Sequence',
        detail:
          'Bot politely asks preferred apartment size (e.g., 1650 sqft vs 2200 sqft), preferred location, payment mode (Cash / Bank EMI), and target handover timeline.',
        technicalNote: 'State machine persisted per phone number; supports English & Banglish.'
      },
      {
        stepNumber: '03',
        stage: 'AI Knowledge Check',
        title: 'Instant Answers from Project Brochure & Payment Schedule PDF',
        detail:
          'Answers detailed buyer questions about RAJUK approval status, parking allocation, down payment percentage, and monthly installment duration.',
        technicalNote: 'Retrieves exact figures from verified project datasheet PDF.'
      },
      {
        stepNumber: '04',
        stage: 'Reply & Sheet Update',
        title: 'Send PDF Brochure + Log Qualified Lead + Notify Sales Agent',
        detail:
          'Sends the official floor-plan PDF on WhatsApp, writes the scored lead row into Google Sheets CRM, and triggers an instant alert to the human sales closer.',
        technicalNote: 'High-intent leads flagged as [PRIORITY - SITE VISIT REQUESTED].'
      }
    ],
    sampleConversation: [
      {
        sender: 'Customer',
        time: '11:40:15 PM',
        message: 'Hello, I saw your ad for the Bashundhara Block-I 3BHK project. What is the square feet and installment plan?'
      },
      {
        sender: 'Bot',
        time: '11:40:21 PM',
        message:
          'Hello! Welcome to PrimeNest Properties. Our Bashundhara Block-I South-Facing project offers 1,850 sq.ft. (3 Bed, 3 Bath, 3 Belconies, 1 Car Parking). Booking money is 10%, Down Payment is 20%, and the balance is payable across 36 monthly installments until handover. Would you like me to send the Floor Plan PDF here on WhatsApp?'
      },
      {
        sender: 'Customer',
        time: '11:41:05 PM',
        message: 'Yes please send the PDF. Also can I schedule a site visit this Friday morning?'
      },
      {
        sender: 'Bot',
        time: '11:41:11 PM',
        message:
          'I have just shared the Floor Plan & Price Breakdown PDF above. I have also logged your Friday 10:30 AM site visit request and notified Senior Consultant Tanvir Ahmed (+88017XX-XXXXXX), who will call you tomorrow at 10:00 AM to confirm gate pass details.'
      }
    ]
  }
];

export const SINGLE_FILE_HTML_SOURCE = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>PKS Automation | AI &amp; Messaging Solutions</title>
  <meta name="description" content="Practical Facebook &amp; WhatsApp Automation for Businesses. Helping businesses automate customer support, instant FAQ responses, order tracking, and lead qualification using reliable AI chatbot workflows." />
  <style>
    /* 2018-2020 Classic Hand-Coded Web Stylesheet */
    *, *::before, *::after {
      box-sizing: border-box;
    }
    html {
      scroll-behavior: smooth;
    }
    body {
      margin: 0;
      padding: 0;
      font-family: system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
      font-size: 16px;
      line-height: 1.6;
      color: #212529;
      background-color: #FFFFFF;
    }
    a {
      color: #0056B3;
      text-decoration: none;
    }
    a:hover {
      color: #003d82;
      text-decoration: underline;
    }
    .container {
      max-width: 1020px;
      margin: 0 auto;
      padding: 0 20px;
    }
    /* Top Navbar */
    .navbar {
      background-color: #FFFFFF;
      border-bottom: 1px solid #DEE2E6;
      position: sticky;
      top: 0;
      z-index: 100;
    }
    .navbar-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      min-height: 64px;
      gap: 20px;
      flex-wrap: wrap;
      padding: 10px 0;
    }
    .brand {
      font-size: 18px;
      font-weight: 700;
      color: #212529;
      text-decoration: none;
    }
    .brand:hover {
      color: #0056B3;
      text-decoration: none;
    }
    .nav-links {
      display: flex;
      gap: 22px;
      list-style: none;
      margin: 0;
      padding: 0;
      flex-wrap: wrap;
    }
    .nav-links a {
      color: #212529;
      font-size: 15px;
      font-weight: 500;
    }
    .nav-links a:hover {
      color: #0056B3;
    }
    /* Buttons */
    .btn {
      display: inline-block;
      padding: 10px 20px;
      font-size: 15px;
      font-weight: 600;
      line-height: 1.4;
      text-align: center;
      border-radius: 4px;
      border: 1px solid transparent;
      cursor: pointer;
      text-decoration: none !important;
      transition: background-color 0.15s ease, border-color 0.15s ease, color 0.15s ease;
    }
    .btn-primary {
      background-color: #0056B3;
      border-color: #0056B3;
      color: #FFFFFF !important;
    }
    .btn-primary:hover {
      background-color: #004494;
      border-color: #003d82;
    }
    .btn-outline {
      background-color: #FFFFFF;
      border-color: #0056B3;
      color: #0056B3 !important;
    }
    .btn-outline:hover {
      background-color: #F1F6FC;
    }
    .btn-sm {
      padding: 7px 14px;
      font-size: 14px;
    }
    /* Sections */
    .section {
      padding: 60px 0;
      border-bottom: 1px solid #DEE2E6;
    }
    .bg-light {
      background-color: #F8F9FA;
    }
    .bg-white {
      background-color: #FFFFFF;
    }
    .section-header {
      margin-bottom: 32px;
    }
    .section-title {
      font-size: 28px;
      font-weight: 700;
      margin: 0 0 8px 0;
      color: #212529;
    }
    .section-subtitle {
      font-size: 16px;
      color: #6C757D;
      margin: 0;
      max-width: 740px;
    }
    /* Hero */
    .hero {
      padding: 64px 0 48px 0;
      background-color: #F8F9FA;
      border-bottom: 1px solid #DEE2E6;
    }
    .hero-kicker {
      font-size: 13px;
      font-weight: 600;
      color: #0056B3;
      margin-bottom: 10px;
    }
    .hero h1 {
      font-size: 36px;
      line-height: 1.25;
      margin: 0 0 16px 0;
      color: #212529;
      max-width: 780px;
    }
    .hero p {
      font-size: 18px;
      color: #6C757D;
      margin: 0 0 26px 0;
      max-width: 740px;
    }
    .hero-actions {
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
      margin-bottom: 36px;
    }
    .metrics-strip {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
      background: #FFFFFF;
      border: 1px solid #DEE2E6;
      border-radius: 4px;
      padding: 18px 20px;
    }
    .metric-item strong {
      display: block;
      font-size: 22px;
      color: #0056B3;
      font-variant-numeric: tabular-nums;
    }
    .metric-item span {
      font-size: 13px;
      color: #6C757D;
    }
    /* Grid & Cards */
    .grid-3 {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 20px;
    }
    .grid-2 {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 24px;
    }
    .grid-4 {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 16px;
    }
    .card {
      background-color: #FFFFFF;
      border: 1px solid #DEE2E6;
      border-radius: 4px;
      padding: 24px;
    }
    .card h3 {
      margin: 0 0 10px 0;
      font-size: 19px;
      color: #212529;
    }
    .card p {
      margin: 0;
      color: #6C757D;
      font-size: 15px;
    }
    /* Filter Tabs */
    .filter-bar {
      display: flex;
      gap: 8px;
      margin-bottom: 24px;
      flex-wrap: wrap;
    }
    .filter-btn {
      padding: 7px 14px;
      font-size: 14px;
      font-weight: 600;
      background: #FFFFFF;
      color: #212529;
      border: 1px solid #DEE2E6;
      border-radius: 4px;
      cursor: pointer;
    }
    .filter-btn.active {
      background: #0056B3;
      color: #FFFFFF;
      border-color: #0056B3;
    }
    /* Case Study Box */
    .case-box {
      background: #FFFFFF;
      border: 1px solid #DEE2E6;
      border-radius: 4px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
    }
    .case-meta {
      font-size: 13px;
      color: #0056B3;
      font-weight: 600;
      margin-bottom: 8px;
    }
    .case-title {
      font-size: 20px;
      font-weight: 700;
      margin: 0 0 14px 0;
      color: #212529;
    }
    .case-field {
      margin-bottom: 12px;
      font-size: 14.5px;
    }
    .case-field strong {
      color: #212529;
    }
    .case-list {
      margin: 6px 0 14px 0;
      padding-left: 18px;
      color: #212529;
      font-size: 14px;
    }
    .case-list li {
      margin-bottom: 4px;
    }
    .case-impact {
      background: #F8F9FA;
      border: 1px solid #DEE2E6;
      border-radius: 4px;
      padding: 12px 14px;
      font-size: 14px;
      margin-bottom: 16px;
    }
    /* Contact Form */
    .form-group {
      margin-bottom: 16px;
    }
    .form-label {
      display: block;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 6px;
      color: #212529;
    }
    .form-control {
      width: 100%;
      padding: 10px 12px;
      font-size: 15px;
      font-family: inherit;
      color: #212529;
      background-color: #FFFFFF;
      border: 1px solid #DEE2E6;
      border-radius: 4px;
    }
    .form-control:focus {
      outline: none;
      border-color: #0056B3;
    }
    /* Modal */
    .modal-backdrop {
      display: none;
      position: fixed;
      inset: 0;
      background: rgba(33, 37, 41, 0.6);
      z-index: 999;
      align-items: center;
      justify-content: center;
      padding: 20px;
    }
    .modal-backdrop.open {
      display: flex;
    }
    .modal-dialog {
      background: #FFFFFF;
      border: 1px solid #DEE2E6;
      border-radius: 4px;
      max-width: 720px;
      width: 100%;
      max-height: 90vh;
      overflow-y: auto;
    }
    .modal-header {
      padding: 16px 20px;
      border-bottom: 1px solid #DEE2E6;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background: #F8F9FA;
    }
    .modal-body {
      padding: 20px;
    }
    .modal-footer {
      padding: 14px 20px;
      border-top: 1px solid #DEE2E6;
      background: #F8F9FA;
      text-align: right;
    }
    .flow-step {
      border: 1px solid #DEE2E6;
      border-radius: 4px;
      padding: 12px 14px;
      margin-bottom: 10px;
      background: #FFFFFF;
    }
    /* Footer */
    .footer {
      padding: 36px 0;
      background: #F8F9FA;
      font-size: 14px;
      color: #6C757D;
    }
    @media (max-width: 768px) {
      .grid-3, .grid-2, .grid-4, .metrics-strip {
        grid-template-columns: 1fr;
      }
      .hero h1 {
        font-size: 28px;
      }
    }
  </style>
</head>
<body>

  <!-- 1. Top Navigation Bar -->
  <header class="navbar">
    <div class="container navbar-inner">
      <a href="#top" class="brand">PKS Automation | AI &amp; Messaging Solutions</a>
      <nav aria-label="Main Navigation">
        <ul class="nav-links">
          <li><a href="#about">About</a></li>
          <li><a href="#services">Services</a></li>
          <li><a href="#portfolio">Portfolio</a></li>
          <li><a href="#how-it-works">How It Works</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
      </nav>
    </div>
  </header>

  <!-- 2. Hero Section -->
  <section id="top" class="hero">
    <div class="container">
      <div class="hero-kicker">AI Automation &amp; Messaging Specialist · Bangladesh (Serving Local &amp; Global Clients)</div>
      <h1>Practical Facebook &amp; WhatsApp Automation for Businesses</h1>
      <p>Helping businesses automate customer support, instant FAQ responses, order tracking, and lead qualification using reliable AI chatbot workflows.</p>
      <div class="hero-actions">
        <a href="#portfolio" class="btn btn-primary">View Sample Projects</a>
        <a href="#contact" class="btn btn-outline">Contact Me</a>
      </div>
      <div class="metrics-strip">
        <div class="metric-item">
          <strong>&lt; 10 sec</strong>
          <span>Automated First Response Time</span>
        </div>
        <div class="metric-item">
          <strong>80%+</strong>
          <span>Routine FAQs Handled Automatically</span>
        </div>
        <div class="metric-item">
          <strong>EN + BN</strong>
          <span>English, Bangla &amp; Banglish Support</span>
        </div>
        <div class="metric-item">
          <strong>24 / 7</strong>
          <span>Webhook &amp; Google Sheets Logging</span>
        </div>
      </div>
    </div>
  </section>

  <!-- About Section -->
  <section id="about" class="section bg-white">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">About PKS Automation</h2>
        <p class="section-subtitle">Reliable, rule-backed AI messaging workflows built for real daily business operations—without unnecessary complexity.</p>
      </div>
      <div class="grid-2">
        <div class="card">
          <h3>Why Practical Messaging Automation Matters</h3>
          <p>Most businesses in Bangladesh and abroad lose qualified customers simply because inbox messages and post comments wait hours for a human reply. I build dependable Facebook Messenger and WhatsApp Business workflows that answer customer questions immediately, check live product/service data in Google Sheets, and hand over serious buyers to your team.</p>
        </div>
        <div class="card">
          <h3>Grounded in Your Real Business Data</h3>
          <p>Instead of generic scripted replies that frustrate buyers, each chatbot is trained strictly on your own PDFs, price lists, delivery rules, and schedules—understanding natural English, Bangla, and everyday Banglish queries accurately with a clear human escalation trigger whenever needed.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 3. Services Module -->
  <section id="services" class="section bg-light">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Core Automation Services</h2>
        <p class="section-subtitle">Focused, production-tested messaging systems tailored for e-commerce pages, clinics, restaurants, and service agencies.</p>
      </div>
      <div class="grid-3">
        <div class="card">
          <h3>01. Facebook Messenger Automation</h3>
          <p>24/7 automated comment replies, inbox support, product catalog browsing, and instant customer query handling. Automatically responds to "Price please" comments and guides buyers to confirm orders in the inbox.</p>
        </div>
        <div class="card">
          <h3>02. WhatsApp Business Chatbots</h3>
          <p>Automated FAQ handling, appointment booking, order confirmation messages, and smart escalation to human agents using reliable WhatsApp Business webhook integrations.</p>
        </div>
        <div class="card">
          <h3>03. Custom AI Support &amp; FAQ Agents</h3>
          <p>Training chatbots on custom business documents, PDFs, and price lists so they answer customer questions accurately in natural language (English &amp; Bangla/Banglish support).</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 4. Standard Portfolio Details Module -->
  <section id="portfolio" class="section bg-white">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Sample Automation Projects &amp; Case Studies</h2>
        <p class="section-subtitle">Review practical implementations showing the business problem, webhook architecture, features delivered, and measurable impact.</p>
      </div>

      <div class="filter-bar">
        <button class="filter-btn active" onclick="filterProjects('all', this)">All Projects (4)</button>
        <button class="filter-btn" onclick="filterProjects('messenger', this)">[FB Messenger]</button>
        <button class="filter-btn" onclick="filterProjects('whatsapp', this)">[WhatsApp Bot]</button>
        <button class="filter-btn" onclick="filterProjects('full', this)">[Full Support System]</button>
      </div>

      <div class="grid-2" id="portfolioGrid">
        <!-- Project 1 -->
        <article class="case-box" data-category="messenger">
          <div>
            <div class="case-meta">[FB Messenger] &middot; E-Commerce &amp; F-Commerce Retail</div>
            <h3 class="case-title">Automated F-Commerce Comment-to-Inbox &amp; Order System</h3>
            <div class="case-field"><strong>The Problem:</strong> During boosted campaigns, the page received 600+ daily comments and messages asking "Price koto?" and "Size hobe?", causing a 3.5-hour reply delay and lost sales.</div>
            <div class="case-field"><strong>The Automated Solution:</strong> Connected a Meta Graph API webhook to an auto-comment/inbox responder with live Google Sheets stock lookup and Banglish FAQ handling.</div>
            <div class="case-field"><strong>Key Features Implemented:</strong>
              <ul class="case-list">
                <li>Auto-reply to post comments + instant private DM with price &amp; size stock</li>
                <li>Google Sheets catalog ingestion for real-time size/color availability</li>
                <li>Inside/Outside Dhaka delivery calculation &amp; COD order logging</li>
                <li>Instant human handoff trigger for exchanges or bulk inquiries</li>
              </ul>
            </div>
          </div>
          <div>
            <div class="case-impact"><strong>Result / Impact:</strong> Reduced response time from 3.5 hours to under 8 seconds; handled 84% of routine FAQs automatically and boosted COD orders by 38%.</div>
            <button type="button" class="btn btn-outline btn-sm" onclick="openWorkflowModal(0)">View Workflow Details</button>
          </div>
        </article>

        <!-- Project 2 -->
        <article class="case-box" data-category="whatsapp">
          <div>
            <div class="case-meta">[WhatsApp Bot] &middot; Healthcare Clinic &amp; Diagnostic Center</div>
            <h3 class="case-title">WhatsApp Patient Appointment Booking &amp; Lab Report Desk</h3>
            <div class="case-field"><strong>The Problem:</strong> Reception staff spent 5+ hours daily answering repetitive calls and messages about specialist doctor chamber hours, consultation fees, and blood test fasting rules.</div>
            <div class="case-field"><strong>The Automated Solution:</strong> Built a WhatsApp Business webhook workflow integrated with a live doctor roster sheet and an AI retriever trained on the clinic's diagnostic test guide PDF.</div>
            <div class="case-field"><strong>Key Features Implemented:</strong>
              <ul class="case-list">
                <li>Interactive specialist chamber schedule lookup &amp; instant serial booking</li>
                <li>PDF test guide ingestion for lab pricing and fasting prerequisites</li>
                <li>Automated WhatsApp booking slip &amp; 3-hour pre-visit reminder</li>
                <li>Instant human handoff trigger for prescription uploads or emergencies</li>
              </ul>
            </div>
          </div>
          <div>
            <div class="case-impact"><strong>Result / Impact:</strong> Cut front-desk manual call volume by 65%; reduced response time from 2.5 hours to 6 seconds with 420+ monthly serials booked automatically.</div>
            <button type="button" class="btn btn-outline btn-sm" onclick="openWorkflowModal(1)">View Workflow Details</button>
          </div>
        </article>

        <!-- Project 3 -->
        <article class="case-box" data-category="full">
          <div>
            <div class="case-meta">[Full Support System] &middot; Local Restaurant &amp; Delivery</div>
            <h3 class="case-title">Multi-Channel Restaurant Menu, Order &amp; Delivery Tracker</h3>
            <div class="case-field"><strong>The Problem:</strong> Dinner rush overwhelmed staff handling Messenger and WhatsApp orders at once, resulting in 20+ minute confirmation delays and constant "Where is my order?" calls.</div>
            <div class="case-field"><strong>The Automated Solution:</strong> Unified Messenger and WhatsApp webhooks into a central order router with PDF menu ingestion, delivery zone verification, and two-way Google Sheets dispatch alerts.</div>
            <div class="case-field"><strong>Key Features Implemented:</strong>
              <ul class="case-list">
                <li>PDF menu &amp; family platter catalog ingestion (Bangla &amp; Banglish support)</li>
                <li>Automated Dhaka neighborhood coverage &amp; minimum-order validation</li>
                <li>Two-way Google Sheets sync sending rider contact when marked "Dispatched"</li>
                <li>Instant human handoff trigger for catering or delayed delivery support</li>
              </ul>
            </div>
          </div>
          <div>
            <div class="case-impact"><strong>Result / Impact:</strong> Reduced order confirmation time from 22 minutes to under 10 seconds; automated 78% of order status inquiries with zero missed kitchen tickets.</div>
            <button type="button" class="btn btn-outline btn-sm" onclick="openWorkflowModal(2)">View Workflow Details</button>
          </div>
        </article>

        <!-- Project 4 -->
        <article class="case-box" data-category="whatsapp">
          <div>
            <div class="case-meta">[WhatsApp Bot] &middot; Real Estate &amp; Service Agency</div>
            <h3 class="case-title">Real Estate &amp; Consultancy Lead Qualification + Brochure Bot</h3>
            <div class="case-field"><strong>The Problem:</strong> Paid campaigns generated 150+ daily inquiries, but sales agents wasted hours replying to basic brochure questions instead of calling qualified buyers.</div>
            <div class="case-field"><strong>The Automated Solution:</strong> Deployed an AI-assisted qualification funnel and document-trained FAQ assistant that answers brochure/installment questions and scores leads into Google Sheets CRM.</div>
            <div class="case-field"><strong>Key Features Implemented:</strong>
              <ul class="case-list">
                <li>Custom AI knowledge base trained on PDF brochures &amp; EMI payment tables</li>
                <li>4-question lead qualification flow (budget, location, timeline, phone)</li>
                <li>Automated floor-plan PDF delivery on WhatsApp after qualification</li>
                <li>Real-time Google Sheets CRM logging + instant sales consultant alert</li>
              </ul>
            </div>
          </div>
          <div>
            <div class="case-impact"><strong>Result / Impact:</strong> Reduced first response time from 3 hours to 5 seconds; filtered 80% of routine FAQ traffic and increased qualified site visits by 2.4x.</div>
            <button type="button" class="btn btn-outline btn-sm" onclick="openWorkflowModal(3)">View Workflow Details</button>
          </div>
        </article>
      </div>
    </div>
  </section>

  <!-- 5. How I Work -->
  <section id="how-it-works" class="section bg-light">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">How I Work (4-Step Process)</h2>
        <p class="section-subtitle">A straightforward, transparent setup process from initial FAQ collection to live testing and handover.</p>
      </div>
      <div class="grid-4">
        <div class="card">
          <h3>1. Requirement &amp; FAQ Collection</h3>
          <p>We review your Facebook page or WhatsApp flow, collect your top customer FAQs, product/service PDFs, price lists, and Google Sheets structure.</p>
        </div>
        <div class="card">
          <h3>2. Workflow &amp; Chatbot Setup</h3>
          <p>I configure the official webhook connections, build the automated reply logic, train the AI knowledge base on your documents, and set up human handoff rules.</p>
        </div>
        <div class="card">
          <h3>3. Testing on Live Page/Number</h3>
          <p>We test real English, Bangla, and Banglish customer scenarios together on your live page or WhatsApp number to verify accuracy and speed.</p>
        </div>
        <div class="card">
          <h3>4. Handover &amp; Ongoing Support</h3>
          <p>You receive full access to the connected Google Sheets and dashboard, a clear walkthrough guide, and dependable post-launch support.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- 6. Contact & Inquiry Section -->
  <section id="contact" class="section bg-white">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Contact &amp; Project Inquiry</h2>
        <p class="section-subtitle">Get in touch directly via WhatsApp, email, or the inquiry form below to discuss automating your business messaging.</p>
      </div>
      <div class="grid-2">
        <div class="card">
          <h3>Direct Contact Information</h3>
          <p style="margin-bottom: 18px;">Reach out directly for a quick discussion or live demo of any sample workflow.</p>
          <div class="case-field">
            <strong>Email:</strong><br />
            <a href="mailto:pksfreelance@gmail.com">pksfreelance@gmail.com</a>
          </div>
          <div class="case-field">
            <strong>Phone / WhatsApp:</strong><br />
            <a href="tel:+8801777349749">+880 1777-349749</a> / <a href="tel:+01777349749">+01777349749</a>
          </div>
          <div style="margin: 16px 0 20px 0;">
            <a href="https://wa.me/8801777349749" target="_blank" rel="noopener noreferrer" class="btn btn-primary">Chat on WhatsApp (+880 1777-349749)</a>
          </div>
          <div class="case-field">
            <strong>Location:</strong><br />
            Bangladesh (Serving clients locally &amp; globally)
          </div>
          <div class="case-field" style="margin-bottom: 0;">
            <strong>Working Hours / Availability:</strong><br />
            Saturday – Thursday: 10:00 AM – 10:00 PM (BST / GMT+6). Available for urgent support and international time zones by appointment.
          </div>
        </div>

        <div class="card">
          <h3>Send a Project Inquiry</h3>
          <form id="inquiryForm" onsubmit="handleInquirySubmit(event)">
            <div class="form-group">
              <label class="form-label" for="clientName">Your Name *</label>
              <input class="form-control" type="text" id="clientName" required placeholder="e.g., Tanvir Rahman" />
            </div>
            <div class="form-group">
              <label class="form-label" for="businessLink">Business Page / Website Link *</label>
              <input class="form-control" type="text" id="businessLink" required placeholder="e.g., facebook.com/yourpage or yourwebsite.com" />
            </div>
            <div class="form-group">
              <label class="form-label" for="platformNeeded">Platform Needed *</label>
              <select class="form-control" id="platformNeeded" required>
                <option value="Both (Facebook & WhatsApp)">Both (Facebook &amp; WhatsApp)</option>
                <option value="Facebook Messenger">Facebook</option>
                <option value="WhatsApp Business">WhatsApp</option>
              </select>
            </div>
            <div class="form-group">
              <label class="form-label" for="requirementMsg">Message / Requirement *</label>
              <textarea class="form-control" id="requirementMsg" rows="4" required placeholder="Briefly describe what you want to automate (e.g., auto comment reply, FAQ bot from PDF, order logging in Google Sheets)..."></textarea>
            </div>
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
              <button type="submit" class="btn btn-primary">Send Inquiry via Email</button>
              <button type="button" class="btn btn-outline" onclick="sendViaWhatsApp()">Send via WhatsApp</button>
            </div>
            <div id="formFeedback" style="display:none; margin-top:14px; padding:12px; background:#F8F9FA; border:1px solid #DEE2E6; border-radius:4px; font-size:14px;"></div>
          </form>
        </div>
      </div>
    </div>
  </section>

  <!-- 7. Footer -->
  <footer class="footer">
    <div class="container" style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:16px;">
      <div>
        <strong style="color:#212529;">PKS Automation | AI &amp; Messaging Solutions</strong><br />
        <span>&copy; 2026 PKS Automation. Based in Bangladesh &middot; Email: <a href="mailto:pksfreelance@gmail.com">pksfreelance@gmail.com</a> &middot; WhatsApp: <a href="https://wa.me/8801777349749">+880 1777-349749</a></span>
      </div>
      <div>
        <a href="#about">About</a> &middot;
        <a href="#services">Services</a> &middot;
        <a href="#portfolio">Portfolio</a> &middot;
        <a href="#how-it-works">How It Works</a> &middot;
        <a href="#contact">Contact</a>
      </div>
    </div>
  </footer>

  <!-- Classic Workflow Details Modal -->
  <div class="modal-backdrop" id="workflowModal" onclick="if(event.target === this) closeWorkflowModal()">
    <div class="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modalTitle">
      <div class="modal-header">
        <strong id="modalTitle" style="font-size:18px; color:#212529;">Workflow Details</strong>
        <button type="button" class="btn btn-outline btn-sm" onclick="closeWorkflowModal()">Close &times;</button>
      </div>
      <div class="modal-body" id="modalBody"></div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary btn-sm" onclick="closeWorkflowModal()">Close Window</button>
      </div>
    </div>
  </div>

  <script>
    var WORKFLOW_DATA = [
      {
        title: "Automated F-Commerce Comment-to-Inbox & Order System [FB Messenger]",
        flow: "Trigger (Post Comment / Inbox) -> Meta Graph Webhook -> Google Sheets Stock Check -> AI Banglish FAQ Check -> Auto-Reply & Order Row Append",
        steps: [
          "1. Trigger: Customer comments 'Price koto?' on a Facebook post or sends a product inquiry in Messenger.",
          "2. Webhook: Meta Graph API sends payload with Post ID and sender PSID to the automation webhook.",
          "3. Knowledge & Stock Lookup: System checks Google Sheets catalog for item price, sizes in stock, and delivery fees.",
          "4. Reply & Sheet Update: Sends instant comment reply + private Messenger DM, collects customer address/phone, and logs confirmed COD order to Google Sheets."
        ]
      },
      {
        title: "WhatsApp Patient Appointment Booking & Lab Report Desk [WhatsApp Bot]",
        flow: "Trigger (WhatsApp Message) -> Cloud API Webhook -> Doctor Roster / PDF Test Guide Check -> Serial Allocation -> Confirmation & Reminder",
        steps: [
          "1. Trigger: Patient messages the clinic's official WhatsApp number asking for a doctor serial or lab test cost.",
          "2. Webhook: WhatsApp Cloud API routes message to the intent classifier (Doctor Booking vs. Lab Test FAQ vs. Human Help).",
          "3. AI Knowledge Check: Queries live Google Sheets doctor roster or retrieves fasting/price details from the 120-page diagnostic PDF.",
          "4. Reply & Sheet Update: Assigns available serial number, logs patient details in reception sheet, and sends confirmation token on WhatsApp."
        ]
      },
      {
        title: "Multi-Channel Restaurant Menu, Order & Delivery Tracker [Full Support System]",
        flow: "Trigger (Messenger / WhatsApp) -> Unified Order Webhook -> PDF Menu & Zone Check -> Kitchen Ticket Sheet -> Two-Way Dispatch Alert",
        steps: [
          "1. Trigger: Customer asks about family platters or checks status of an existing order on Messenger or WhatsApp.",
          "2. Webhook: Normalizes customer phone/ID and checks active kitchen orders or routes to menu assistant.",
          "3. AI Knowledge Check: Answers platter portion, spice level, and delivery zone questions from the verified PDF menu.",
          "4. Reply & Sheet Update: Appends confirmed order to Kitchen Google Sheet; when staff mark 'Dispatched', sends automatic WhatsApp rider tracking alert."
        ]
      },
      {
        title: "Real Estate & Consultancy Lead Qualification + Brochure Bot [WhatsApp Bot]",
        flow: "Trigger (Ad Click to WhatsApp) -> Qualification Funnel -> Brochure PDF Knowledge Check -> Lead Scoring -> CRM Sheet & Agent Alert",
        steps: [
          "1. Trigger: Prospect clicks 'Send WhatsApp Message' on a Facebook property/service ad.",
          "2. Webhook: Starts 4-step qualification flow (preferred location, budget/EMI preference, timeline, phone verification).",
          "3. AI Knowledge Check: Answers detailed buyer questions from verified project brochures and payment schedule PDFs.",
          "4. Reply & Sheet Update: Delivers floor-plan PDF on WhatsApp, logs scored lead to Google Sheets CRM, and notifies the assigned senior consultant."
        ]
      }
    ];

    function filterProjects(category, btn) {
      var buttons = document.querySelectorAll('.filter-btn');
      for (var i = 0; i < buttons.length; i++) {
        buttons[i].classList.remove('active');
      }
      btn.classList.add('active');
      var cards = document.querySelectorAll('#portfolioGrid .case-box');
      for (var j = 0; j < cards.length; j++) {
        var cardCat = cards[j].getAttribute('data-category');
        cards[j].style.display = (category === 'all' || cardCat === category) ? 'flex' : 'none';
      }
    }

    function openWorkflowModal(index) {
      var item = WORKFLOW_DATA[index];
      document.getElementById('modalTitle').textContent = item.title;
      var html = '<div style="background:#F8F9FA; border:1px solid #DEE2E6; border-radius:4px; padding:12px; margin-bottom:16px; font-size:14px;"><strong>Step-by-Step Logic Flow:</strong><br/><code>' + item.flow + '</code></div>';
      for (var i = 0; i < item.steps.length; i++) {
        html += '<div class="flow-step">' + item.steps[i] + '</div>';
      }
      document.getElementById('modalBody').innerHTML = html;
      document.getElementById('workflowModal').classList.add('open');
    }

    function closeWorkflowModal() {
      document.getElementById('workflowModal').classList.remove('open');
    }

    function getFormSummary() {
      var name = document.getElementById('clientName').value.trim();
      var link = document.getElementById('businessLink').value.trim();
      var platform = document.getElementById('platformNeeded').value;
      var msg = document.getElementById('requirementMsg').value.trim();
      return {
        name: name,
        link: link,
        platform: platform,
        msg: msg,
        subject: 'Automation Inquiry from ' + name + ' (' + platform + ')',
        body: 'Name: ' + name + '\\nBusiness Page / Website: ' + link + '\\nPlatform Needed: ' + platform + '\\n\\nRequirement Details:\\n' + msg
      };
    }

    function handleInquirySubmit(e) {
      e.preventDefault();
      var data = getFormSummary();
      var mailtoUrl = 'mailto:pksfreelance@gmail.com?subject=' + encodeURIComponent(data.subject) + '&body=' + encodeURIComponent(data.body);
      var feedback = document.getElementById('formFeedback');
      feedback.style.display = 'block';
      feedback.innerHTML = '<strong>Inquiry Prepared:</strong> Opening your email client addressed to <strong>pksfreelance@gmail.com</strong>. You can also <a href="' + mailtoUrl + '">click here to open email</a>.';
      window.location.href = mailtoUrl;
    }

    function sendViaWhatsApp() {
      var form = document.getElementById('inquiryForm');
      if (!form.reportValidity()) return;
      var data = getFormSummary();
      var waUrl = 'https://wa.me/8801777349749?text=' + encodeURIComponent('Hello PKS Automation,\\n\\n' + data.body);
      window.open(waUrl, '_blank', 'noopener,noreferrer');
    }
  </script>
</body>
</html>`;
