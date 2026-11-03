/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  PORTFOLIO_PROJECTS,
  PortfolioProject,
  SINGLE_FILE_HTML_SOURCE
} from './portfolioData';

export default function App() {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'messenger' | 'whatsapp' | 'full'>('all');
  const [activeModalProject, setActiveModalProject] = useState<PortfolioProject | null>(null);
  const [showHtmlModal, setShowHtmlModal] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Contact Form State
  const [formData, setFormData] = useState({
    name: '',
    businessLink: '',
    platform: 'Both',
    message: ''
  });
  const [formError, setFormError] = useState('');
  const [submittedSummary, setSubmittedSummary] = useState<{
    mailtoHref: string;
    whatsappHref: string;
    formattedBody: string;
  } | null>(null);
  const [copiedInquiry, setCopiedInquiry] = useState(false);

  // Close modals on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModalProject(null);
        setShowHtmlModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filteredProjects =
    selectedFilter === 'all'
      ? PORTFOLIO_PROJECTS
      : PORTFOLIO_PROJECTS.filter((p) => p.filterKey === selectedFilter);

  const buildInquiryPayloads = () => {
    const cleanName = formData.name.trim();
    const cleanLink = formData.businessLink.trim();
    const cleanPlatform = formData.platform;
    const cleanMsg = formData.message.trim();

    const subject = `Automation Project Inquiry - ${cleanName} (${cleanPlatform})`;
    const formattedBody = [
      `Client Name: ${cleanName}`,
      `Business Page / Website: ${cleanLink}`,
      `Platform Needed: ${cleanPlatform}`,
      ``,
      `Project Requirement / Message:`,
      cleanMsg
    ].join('\n');

    const mailtoHref = `mailto:pksfreelance@gmail.com?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(formattedBody)}`;

    const whatsappText = `Hello PKS Automation,\n\nI would like to discuss an automation project:\n\n${formattedBody}`;
    const whatsappHref = `https://wa.me/8801777349749?text=${encodeURIComponent(whatsappText)}`;

    return { mailtoHref, whatsappHref, formattedBody };
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.businessLink.trim() || !formData.message.trim()) {
      setFormError('Please fill out your Name, Business Page/Website Link, and Requirement details.');
      return;
    }
    setFormError('');
    const payloads = buildInquiryPayloads();
    setSubmittedSummary(payloads);

    // Trigger default mailto navigation via anchor click
    const link = document.createElement('a');
    link.href = payloads.mailtoHref;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText('pksfreelance@gmail.com');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  const handleCopyInquiry = () => {
    if (!submittedSummary) return;
    navigator.clipboard?.writeText(submittedSummary.formattedBody);
    setCopiedInquiry(true);
    setTimeout(() => setCopiedInquiry(false), 2000);
  };

  const handleCopyStandaloneHtml = () => {
    navigator.clipboard?.writeText(SINGLE_FILE_HTML_SOURCE);
    setCopiedHtml(true);
    setTimeout(() => setCopiedHtml(false), 2500);
  };

  const handleDownloadStandaloneHtml = () => {
    const blob = new Blob([SINGLE_FILE_HTML_SOURCE], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleSelectProjectForInquiry = (project: PortfolioProject) => {
    const mappedPlatform =
      project.filterKey === 'messenger'
        ? 'Facebook'
        : project.filterKey === 'whatsapp'
        ? 'WhatsApp'
        : 'Both';
    setFormData((prev) => ({
      ...prev,
      platform: mappedPlatform,
      message: `I am interested in a workflow similar to "${project.title}" (${project.categoryTag}). Please let me know the setup timeline and requirements.`
    }));
    setActiveModalProject(null);
    const contactEl = document.getElementById('contact');
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id="top" className="min-h-screen bg-[#FFFFFF] text-[#212529] flex flex-col">
      {/* 1. TOP NAVIGATION BAR (Strict 3-Zone Contract, Classic 1px #DEE2E6 Bottom Border) */}
      <header className="sticky top-0 z-40 bg-[#FFFFFF] border-b border-[#DEE2E6]">
        <div className="max-w-[1040px] mx-auto px-5 h-16 flex items-center justify-between gap-8">
          {/* Zone 1: Single text element wordmark */}
          <a
            href="#top"
            className="font-display text-[17px] font-bold tracking-tight text-[#212529] hover:text-[#0056B3] transition-colors whitespace-nowrap shrink-0"
          >
            PKS Automation | AI &amp; Messaging Solutions
          </a>

          {/* Zone 2: 5 concise single-line text anchor links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-6 text-[15px] font-medium text-[#212529]">
            <a
              href="#about"
              className="hover:text-[#0056B3] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              About
            </a>
            <a
              href="#services"
              className="hover:text-[#0056B3] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Services
            </a>
            <a
              href="#portfolio"
              className="hover:text-[#0056B3] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Portfolio
            </a>
            <a
              href="#how-it-works"
              className="hover:text-[#0056B3] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              How It Works
            </a>
            <a
              href="#contact"
              className="hover:text-[#0056B3] hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0"
            >
              Contact
            </a>
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="flex items-center shrink-0">
            <a
              href="#contact"
              className="px-4 py-2 text-[14px] font-semibold text-white bg-[#0056B3] hover:bg-[#004494] border border-[#0056B3] rounded-[4px] transition-colors whitespace-nowrap shrink-0"
            >
              Get in Touch
            </a>
          </div>
        </div>

        {/* Mobile Secondary Anchor Strip for Narrow Viewports */}
        <nav
          aria-label="Mobile Navigation"
          className="md:hidden border-t border-[#DEE2E6] bg-[#F8F9FA] px-5 py-2 flex items-center gap-5 overflow-x-auto text-[14px] font-medium text-[#212529]"
        >
          <a href="#about" className="hover:text-[#0056B3] whitespace-nowrap shrink-0">
            About
          </a>
          <a href="#services" className="hover:text-[#0056B3] whitespace-nowrap shrink-0">
            Services
          </a>
          <a href="#portfolio" className="hover:text-[#0056B3] whitespace-nowrap shrink-0">
            Portfolio
          </a>
          <a href="#how-it-works" className="hover:text-[#0056B3] whitespace-nowrap shrink-0">
            How It Works
          </a>
          <a href="#contact" className="hover:text-[#0056B3] whitespace-nowrap shrink-0">
            Contact
          </a>
        </nav>
      </header>

      <main className="flex-1">
        {/* 2. HERO SECTION (Light Gray #F8F9FA background with 1px solid #DEE2E6 bottom border) */}
        <section className="bg-[#F8F9FA] border-b border-[#DEE2E6] py-14 md:py-16">
          <div className="max-w-[1040px] mx-auto px-5">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              {/* Left Column: Core Value Proposition & Classic Rectangular CTAs */}
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <p className="text-[13px] font-semibold text-[#0056B3] mb-2.5">
                    AI Automation &amp; Chatbot Specialist &middot; Based in Bangladesh &middot; Serving Local &amp; Global Clients
                  </p>
                  <h1
                    className="font-display text-[32px] sm:text-[38px] font-bold text-[#212529] leading-[1.2] tracking-tight mb-4"
                    style={{ textWrap: 'balance' } as React.CSSProperties}
                  >
                    Practical Facebook &amp; WhatsApp Automation for Businesses
                  </h1>
                  <p className="text-[17px] text-[#6C757D] leading-[1.6] mb-7 max-w-[62ch]">
                    Helping businesses automate customer support, instant FAQ responses, order tracking, and lead qualification using reliable AI chatbot workflows.
                  </p>
                </div>

                <div>
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <a
                      href="#portfolio"
                      className="px-5 py-2.5 text-[15px] font-semibold text-white bg-[#0056B3] hover:bg-[#004494] border border-[#0056B3] rounded-[4px] transition-colors whitespace-nowrap shrink-0"
                    >
                      View Sample Projects
                    </a>
                    <a
                      href="#contact"
                      className="px-5 py-2.5 text-[15px] font-semibold text-[#0056B3] bg-[#FFFFFF] hover:bg-[#EBF3FA] border border-[#0056B3] rounded-[4px] transition-colors whitespace-nowrap shrink-0"
                    >
                      Contact Me
                    </a>
                  </div>

                  <p className="text-[13px] text-[#6C757D]">
                    Supported Languages: English &middot; বাংলা (Bangla Script) &middot; Banglish (Phonetic Romanized Bangla)
                  </p>
                </div>
              </div>

              {/* Right Column: Classic Architectural Workflow Schematic Card */}
              <div className="lg:col-span-5">
                <div className="h-full bg-[#FFFFFF] border border-[#DEE2E6] rounded-[4px] p-5 flex flex-col justify-between">
                  <div>
                    <div className="pb-3 mb-3.5 border-b border-[#DEE2E6] flex items-center justify-between text-[13px]">
                      <span className="font-semibold text-[#212529]">Standard Webhook Architecture</span>
                      <span className="font-mono text-[#6C757D] tabular-nums">Meta API + Sheets</span>
                    </div>

                    <ol className="space-y-2.5 text-[13.5px]">
                      <li className="p-2.5 bg-[#F8F9FA] border border-[#DEE2E6] rounded-[4px]">
                        <div className="font-semibold text-[#212529]">
                          1. Customer Message / Comment Trigger
                        </div>
                        <div className="text-[#6C757D] text-[12.5px] mt-0.5">
                          FB Post Comment (&ldquo;Price koto?&rdquo;) or WhatsApp Business message received.
                        </div>
                      </li>

                      <li className="p-2.5 bg-[#F8F9FA] border border-[#DEE2E6] rounded-[4px]">
                        <div className="font-semibold text-[#212529]">
                          2. Webhook &amp; Custom Knowledge Check
                        </div>
                        <div className="text-[#6C757D] text-[12.5px] mt-0.5">
                          Queries your verified PDF price list, FAQ doc, or live Google Sheets inventory.
                        </div>
                      </li>

                      <li className="p-2.5 bg-[#F8F9FA] border border-[#DEE2E6] rounded-[4px]">
                        <div className="font-semibold text-[#212529]">
                          3. Instant Reply, Order Log &amp; Human Handoff
                        </div>
                        <div className="text-[#6C757D] text-[12.5px] mt-0.5">
                          Sends accurate answer in &lt;10s, logs order/lead row, or alerts human agent.
                        </div>
                      </li>
                    </ol>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#DEE2E6] flex items-center justify-between text-[12.5px] text-[#6C757D]">
                    <span>Zero Monthly Bloat &middot; Clean Handover</span>
                    <a href="#how-it-works" className="text-[#0056B3] font-semibold hover:underline">
                      See 4-Step Process &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Full-Width 4-Column Quantitative Proof Bar Below Hero Split */}
            <div className="mt-8 bg-[#FFFFFF] border border-[#DEE2E6] rounded-[4px] p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              <div className="sm:border-r sm:border-[#DEE2E6] sm:pr-4">
                <div className="font-display text-[22px] font-bold text-[#0056B3] tabular-nums">
                  &lt; 10 Seconds
                </div>
                <div className="text-[13px] text-[#6C757D] mt-0.5">
                  Average automated reply speed for comments &amp; inbox queries
                </div>
              </div>

              <div className="lg:border-r lg:border-[#DEE2E6] lg:pr-4">
                <div className="font-display text-[22px] font-bold text-[#0056B3] tabular-nums">
                  75% – 85%
                </div>
                <div className="text-[13px] text-[#6C757D] mt-0.5">
                  Routine FAQs, price checks &amp; serials handled without staff delay
                </div>
              </div>

              <div className="sm:border-r sm:border-[#DEE2E6] sm:pr-4">
                <div className="font-display text-[22px] font-bold text-[#0056B3] tabular-nums">
                  EN / BN / Banglish
                </div>
                <div className="text-[13px] text-[#6C757D] mt-0.5">
                  Trained to understand how local &amp; international buyers actually type
                </div>
              </div>

              <div>
                <div className="font-display text-[22px] font-bold text-[#0056B3] tabular-nums">
                  100% Grounded
                </div>
                <div className="text-[13px] text-[#6C757D] mt-0.5">
                  Answers strictly from your approved PDFs, catalogs &amp; Google Sheets
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ABOUT SECTION (#about - Pure White #FFFFFF background with 1px solid #DEE2E6 bottom border) */}
        <section id="about" className="bg-[#FFFFFF] border-b border-[#DEE2E6] py-14">
          <div className="max-w-[1040px] mx-auto px-5">
            <div className="mb-8">
              <p className="text-[13px] font-semibold text-[#0056B3] mb-1">
                About PKS Automation
              </p>
              <h2 className="font-display text-[26px] font-bold text-[#212529] tracking-tight">
                Dependable Messaging Workflows Built for Real Business Operations
              </h2>
              <p className="text-[15.5px] text-[#6C757D] mt-1.5 max-w-[72ch]">
                I work with e-commerce brands, F-Commerce pages, healthcare clinics, restaurants, and service agencies in Bangladesh and internationally to replace slow manual inbox replies with structured, accurate automation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#F8F9FA] border border-[#DEE2E6] rounded-[4px] p-6">
                <h3 className="font-display text-[18px] font-bold text-[#212529] mb-2.5">
                  The Problem with Unmanaged Business Inboxes
                </h3>
                <p className="text-[15px] text-[#6C757D] leading-[1.6] mb-3">
                  When a business runs Facebook ads or shares new products, hundreds of prospective customers ask the same 10–15 questions: item price, size availability, delivery charges inside/outside Dhaka, appointment slots, or order tracking status.
                </p>
                <p className="text-[15px] text-[#6C757D] leading-[1.6]">
                  If your moderators take 2 to 4 hours to reply—or miss messages overnight—customers move on to a competitor. Rigid button-only bots also fail when customers type natural questions in Banglish.
                </p>
              </div>

              <div className="bg-[#F8F9FA] border border-[#DEE2E6] rounded-[4px] p-6">
                <h3 className="font-display text-[18px] font-bold text-[#212529] mb-2.5">
                  A Practical, Rule-Backed AI Approach
                </h3>
                <p className="text-[15px] text-[#6C757D] leading-[1.6] mb-3">
                  Rather than fragile, over-complicated software, I build clean webhook automations connected directly to your official Facebook Page, WhatsApp Business number, and Google Sheets.
                </p>
                <p className="text-[15px] text-[#6C757D] leading-[1.6]">
                  Every chatbot is strictly grounded in your own business documents, PDFs, and live spreadsheets—and includes a reliable human handoff trigger so your staff can step in immediately for complex negotiations or special requests.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* 3. SERVICES MODULE (#services - 3-Column Classic Box Grid on #F8F9FA) */}
        <section id="services" className="bg-[#F8F9FA] border-b border-[#DEE2E6] py-14">
          <div className="max-w-[1040px] mx-auto px-5">
            <div className="mb-8">
              <p className="text-[13px] font-semibold text-[#0056B3] mb-1">
                What I Build
              </p>
              <h2 className="font-display text-[26px] font-bold text-[#212529] tracking-tight">
                Core Messaging &amp; Chatbot Services
              </h2>
              <p className="text-[15.5px] text-[#6C757D] mt-1.5 max-w-[70ch]">
                Straightforward automation modules designed to reduce manual customer support workload and capture more confirmed orders and leads.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Service 1 */}
              <div className="bg-[#FFFFFF] border border-[#DEE2E6] rounded-[4px] p-6 flex flex-col justify-between">
                <div>
                  <div className="text-[13px] font-mono font-semibold text-[#0056B3] mb-2">
                    Service 01 &middot; Meta Graph API
                  </div>
                  <h3 className="font-display text-[19px] font-bold text-[#212529] mb-3">
                    Facebook Messenger Automation
                  </h3>
                  <p className="text-[15px] text-[#6C757D] leading-[1.6] mb-4">
                    24/7 automated comment replies, inbox support, product catalog browsing, and instant customer query handling.
                  </p>
                  <ul className="space-y-1.5 text-[14px] text-[#212529] border-t border-[#DEE2E6] pt-4">
                    <li>&bull; Auto-reply to post comments + private inbox DM</li>
                    <li>&bull; Live size, stock &amp; price check via Google Sheets</li>
                    <li>&bull; Cash-on-Delivery (COD) address &amp; phone capture</li>
                    <li>&bull; Comment moderation &amp; human agent handoff</li>
                  </ul>
                </div>
                <div className="mt-5 pt-3 border-t border-[#DEE2E6]">
                  <a
                    href="#contact"
                    className="text-[14px] font-semibold text-[#0056B3] hover:underline"
                  >
                    Inquire about Messenger Setup &rarr;
                  </a>
                </div>
              </div>

              {/* Service 2 */}
              <div className="bg-[#FFFFFF] border border-[#DEE2E6] rounded-[4px] p-6 flex flex-col justify-between">
                <div>
                  <div className="text-[13px] font-mono font-semibold text-[#0056B3] mb-2">
                    Service 02 &middot; WhatsApp Cloud API
                  </div>
                  <h3 className="font-display text-[19px] font-bold text-[#212529] mb-3">
                    WhatsApp Business Chatbots
                  </h3>
                  <p className="text-[15px] text-[#6C757D] leading-[1.6] mb-4">
                    Automated FAQ handling, appointment booking, order confirmation messages, and smart escalation to human agents.
                  </p>
                  <ul className="space-y-1.5 text-[14px] text-[#212529] border-t border-[#DEE2E6] pt-4">
                    <li>&bull; Automated appointment &amp; doctor serial booking</li>
                    <li>&bull; Order status tracking &amp; dispatch notifications</li>
                    <li>&bull; Lead qualification &amp; brochure PDF delivery</li>
                    <li>&bull; Instant escalation to live WhatsApp operator</li>
                  </ul>
                </div>
                <div className="mt-5 pt-3 border-t border-[#DEE2E6]">
                  <a
                    href="#contact"
                    className="text-[14px] font-semibold text-[#0056B3] hover:underline"
                  >
                    Inquire about WhatsApp Setup &rarr;
                  </a>
                </div>
              </div>

              {/* Service 3 */}
              <div className="bg-[#FFFFFF] border border-[#DEE2E6] rounded-[4px] p-6 flex flex-col justify-between">
                <div>
                  <div className="text-[13px] font-mono font-semibold text-[#0056B3] mb-2">
                    Service 03 &middot; Document Knowledge Base
                  </div>
                  <h3 className="font-display text-[19px] font-bold text-[#212529] mb-3">
                    Custom AI Support &amp; FAQ Agents
                  </h3>
                  <p className="text-[15px] text-[#6C757D] leading-[1.6] mb-4">
                    Training chatbots on custom business documents, PDFs, and price lists so they answer customer questions accurately in natural language (English &amp; Bangla/Banglish support).
                  </p>
                  <ul className="space-y-1.5 text-[14px] text-[#212529] border-t border-[#DEE2E6] pt-4">
                    <li>&bull; Ingestion of PDFs, menus, rate cards &amp; policy docs</li>
                    <li>&bull; Accurate English, বাংলা, and Banglish responses</li>
                    <li>&bull; Strict anti-hallucination guardrails on pricing</li>
                    <li>&bull; Easy knowledge updates via Google Docs/Sheets</li>
                  </ul>
                </div>
                <div className="mt-5 pt-3 border-t border-[#DEE2E6]">
                  <a
                    href="#contact"
                    className="text-[14px] font-semibold text-[#0056B3] hover:underline"
                  >
                    Inquire about Custom AI Agent &rarr;
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 4. STANDARD PORTFOLIO DETAILS MODULE (#portfolio - Filterable Case-Study Showcase on #FFFFFF) */}
        <section id="portfolio" className="bg-[#FFFFFF] border-b border-[#DEE2E6] py-14">
          <div className="max-w-[1040px] mx-auto px-5">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
              <div>
                <p className="text-[13px] font-semibold text-[#0056B3] mb-1">
                  Case Studies &amp; Sample Workflows
                </p>
                <h2 className="font-display text-[26px] font-bold text-[#212529] tracking-tight">
                  Portfolio: Practical Automation Implementations
                </h2>
                <p className="text-[15.5px] text-[#6C757D] mt-1.5 max-w-[66ch]">
                  Explore 4 detailed automation setups across retail, healthcare, food delivery, and real estate. Click &ldquo;View Workflow Details&rdquo; on any project to inspect the step-by-step webhook logic.
                </p>
              </div>

              {/* Interactive Filter Controls (Classic Segmented Rectangular Buttons) */}
              <div
                role="group"
                aria-label="Filter projects by category"
                className="flex flex-wrap items-center gap-1.5 shrink-0"
              >
                <button
                  type="button"
                  onClick={() => setSelectedFilter('all')}
                  className={`px-3.5 py-2 text-[13.5px] font-semibold rounded-[4px] border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedFilter === 'all'
                      ? 'bg-[#0056B3] text-white border-[#0056B3]'
                      : 'bg-[#F8F9FA] text-[#212529] border-[#DEE2E6] hover:bg-[#E9ECEF]'
                  }`}
                >
                  All Projects ({PORTFOLIO_PROJECTS.length})
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFilter('messenger')}
                  className={`px-3.5 py-2 text-[13.5px] font-semibold rounded-[4px] border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedFilter === 'messenger'
                      ? 'bg-[#0056B3] text-white border-[#0056B3]'
                      : 'bg-[#F8F9FA] text-[#212529] border-[#DEE2E6] hover:bg-[#E9ECEF]'
                  }`}
                >
                  [FB Messenger]
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFilter('whatsapp')}
                  className={`px-3.5 py-2 text-[13.5px] font-semibold rounded-[4px] border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedFilter === 'whatsapp'
                      ? 'bg-[#0056B3] text-white border-[#0056B3]'
                      : 'bg-[#F8F9FA] text-[#212529] border-[#DEE2E6] hover:bg-[#E9ECEF]'
                  }`}
                >
                  [WhatsApp Bot]
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFilter('full')}
                  className={`px-3.5 py-2 text-[13.5px] font-semibold rounded-[4px] border transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    selectedFilter === 'full'
                      ? 'bg-[#0056B3] text-white border-[#0056B3]'
                      : 'bg-[#F8F9FA] text-[#212529] border-[#DEE2E6] hover:bg-[#E9ECEF]'
                  }`}
                >
                  [Full Support System]
                </button>
              </div>
            </div>

            {/* 2-Column Case Study Box Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <article
                  key={project.id}
                  className="bg-[#FFFFFF] border border-[#DEE2E6] rounded-[4px] p-6 flex flex-col justify-between"
                >
                  <div>
                    {/* Unboxed Metadata Line with Typographic Separators */}
                    <div className="flex flex-wrap items-center gap-2 text-[13px] mb-2">
                      <span className="font-mono font-semibold text-[#0056B3]">
                        {project.categoryTag}
                      </span>
                      <span aria-hidden="true" className="text-[#6C757D]">
                        &middot;
                      </span>
                      <span className="font-semibold text-[#212529]">
                        {project.clientIndustry}
                      </span>
                    </div>

                    {/* Project Title */}
                    <h3 className="font-display text-[20px] font-bold text-[#212529] leading-[1.3] mb-4 pb-3 border-b border-[#DEE2E6]">
                      {project.title}
                    </h3>

                    {/* Client / Industry */}
                    <div className="mb-3 text-[14.5px] leading-[1.55]">
                      <strong className="text-[#212529]">Client / Industry: </strong>
                      <span className="text-[#6C757D]">
                        {project.clientIndustry} ({project.clientLocation})
                      </span>
                    </div>

                    {/* The Problem */}
                    <div className="mb-3 text-[14.5px] leading-[1.55]">
                      <strong className="text-[#212529]">The Problem: </strong>
                      <span className="text-[#6C757D]">{project.problem}</span>
                    </div>

                    {/* The Automated Solution */}
                    <div className="mb-3.5 text-[14.5px] leading-[1.55]">
                      <strong className="text-[#212529]">The Automated Solution: </strong>
                      <span className="text-[#6C757D]">{project.solution}</span>
                    </div>

                    {/* Key Features Implemented */}
                    <div className="mb-4">
                      <strong className="block text-[14.5px] text-[#212529] mb-1.5">
                        Key Features Implemented:
                      </strong>
                      <ul className="list-disc pl-5 space-y-1 text-[14px] text-[#212529] leading-[1.5]">
                        {project.keyFeatures.map((feat, idx) => (
                          <li key={idx}>{feat}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    {/* Result / Impact Box */}
                    <div className="bg-[#F8F9FA] border border-[#DEE2E6] rounded-[4px] p-3.5 mb-4 text-[14px] leading-[1.5] tabular-nums">
                      <strong className="text-[#212529]">Result / Impact: </strong>
                      <span className="text-[#212529]">{project.resultImpact}</span>
                    </div>

                    {/* Action Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-[#DEE2E6]">
                      <span className="text-[12.5px] font-mono text-[#6C757D] tabular-nums">
                        {project.primaryMetric} &middot; {project.secondaryMetric}
                      </span>

                      <button
                        type="button"
                        onClick={() => setActiveModalProject(project)}
                        className="px-4 py-2 text-[14px] font-semibold text-[#0056B3] bg-[#FFFFFF] hover:bg-[#EBF3FA] border border-[#0056B3] rounded-[4px] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                      >
                        View Workflow Details
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* 5. "HOW I WORK" SECTION (#how-it-works - Simple 4-Step Process on #F8F9FA) */}
        <section id="how-it-works" className="bg-[#F8F9FA] border-b border-[#DEE2E6] py-14">
          <div className="max-w-[1040px] mx-auto px-5">
            <div className="mb-8">
              <p className="text-[13px] font-semibold text-[#0056B3] mb-1">
                Project Delivery Workflow
              </p>
              <h2 className="font-display text-[26px] font-bold text-[#212529] tracking-tight">
                How I Work (Simple 4-Step Process)
              </h2>
              <p className="text-[15.5px] text-[#6C757D] mt-1.5 max-w-[70ch]">
                Every automation setup follows a structured, transparent 4-stage process so your team stays in full control of customer communications.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Step 1 */}
              <div className="bg-[#FFFFFF] border border-[#DEE2E6] rounded-[4px] p-5 flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[13px] font-semibold text-[#0056B3] mb-2 tabular-nums">
                    Step 01 of 04
                  </div>
                  <h3 className="font-display text-[17px] font-bold text-[#212529] mb-2.5">
                    1. Requirement &amp; FAQ Collection
                  </h3>
                  <p className="text-[14.5px] text-[#6C757D] leading-[1.55]">
                    We review your Facebook Page or WhatsApp flow, gather your top 20–50 customer FAQs, product price lists, PDFs, and Google Sheets column requirements.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#DEE2E6] text-[12.5px] text-[#6C757D] tabular-nums">
                  Timeline: Day 1 – Day 2
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-[#FFFFFF] border border-[#DEE2E6] rounded-[4px] p-5 flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[13px] font-semibold text-[#0056B3] mb-2 tabular-nums">
                    Step 02 of 04
                  </div>
                  <h3 className="font-display text-[17px] font-bold text-[#212529] mb-2.5">
                    2. Workflow &amp; Chatbot Setup
                  </h3>
                  <p className="text-[14.5px] text-[#6C757D] leading-[1.55]">
                    I configure the official webhook routes, build the comment/inbox reply flows, index your custom PDFs for English/Bangla/Banglish queries, and link Google Sheets.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#DEE2E6] text-[12.5px] text-[#6C757D] tabular-nums">
                  Timeline: Day 3 – Day 5
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-[#FFFFFF] border border-[#DEE2E6] rounded-[4px] p-5 flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[13px] font-semibold text-[#0056B3] mb-2 tabular-nums">
                    Step 03 of 04
                  </div>
                  <h3 className="font-display text-[17px] font-bold text-[#212529] mb-2.5">
                    3. Testing on Live Page/Number
                  </h3>
                  <p className="text-[14.5px] text-[#6C757D] leading-[1.55]">
                    We run realistic customer test messages on your live Facebook Page or WhatsApp Business number—verifying pricing accuracy, order capture, and human handoff triggers.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#DEE2E6] text-[12.5px] text-[#6C757D] tabular-nums">
                  Timeline: Day 6
                </div>
              </div>

              {/* Step 4 */}
              <div className="bg-[#FFFFFF] border border-[#DEE2E6] rounded-[4px] p-5 flex flex-col justify-between">
                <div>
                  <div className="font-mono text-[13px] font-semibold text-[#0056B3] mb-2 tabular-nums">
                    Step 04 of 04
                  </div>
                  <h3 className="font-display text-[17px] font-bold text-[#212529] mb-2.5">
                    4. Handover &amp; Ongoing Support
                  </h3>
                  <p className="text-[14.5px] text-[#6C757D] leading-[1.55]">
                    You receive full ownership of the connected spreadsheets and workflows, a simple walkthrough for your moderators, and ongoing maintenance support whenever your catalog changes.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#DEE2E6] text-[12.5px] text-[#6C757D] tabular-nums">
                  Timeline: Day 7 &amp; Post-Launch
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 6. CONTACT & INQUIRY SECTION (#contact - Clean 2-Column Layout on #FFFFFF) */}
        <section id="contact" className="bg-[#FFFFFF] border-b border-[#DEE2E6] py-14">
          <div className="max-w-[1040px] mx-auto px-5">
            <div className="mb-8">
              <p className="text-[13px] font-semibold text-[#0056B3] mb-1">
                Direct Contact &amp; Project Inquiry
              </p>
              <h2 className="font-display text-[26px] font-bold text-[#212529] tracking-tight">
                Discuss Your Facebook or WhatsApp Automation Needs
              </h2>
              <p className="text-[15.5px] text-[#6C757D] mt-1.5 max-w-[70ch]">
                Reach out directly via WhatsApp, phone, or email—or use the form on the right to send your page link and automation requirements.
              </p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left Column: Direct Contact Info */}
              <div className="lg:col-span-5 bg-[#F8F9FA] border border-[#DEE2E6] rounded-[4px] p-6">
                <h3 className="font-display text-[19px] font-bold text-[#212529] mb-4 pb-3 border-b border-[#DEE2E6]">
                  Direct Contact Details
                </h3>

                <div className="space-y-4 text-[15px]">
                  {/* Email */}
                  <div>
                    <div className="text-[13px] font-semibold text-[#6C757D] mb-0.5">
                      Email Address
                    </div>
                    <div className="flex flex-wrap items-center gap-2.5">
                      <a
                        href="mailto:pksfreelance@gmail.com"
                        className="font-semibold text-[#0056B3] hover:underline break-all"
                      >
                        pksfreelance@gmail.com
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="px-2 py-0.5 text-[12px] font-medium text-[#212529] bg-[#FFFFFF] hover:bg-[#E9ECEF] border border-[#DEE2E6] rounded-[4px] cursor-pointer whitespace-nowrap shrink-0"
                      >
                        {copiedEmail ? 'Copied!' : 'Copy Email'}
                      </button>
                    </div>
                  </div>

                  {/* Phone / WhatsApp */}
                  <div>
                    <div className="text-[13px] font-semibold text-[#6C757D] mb-0.5">
                      Phone / WhatsApp
                    </div>
                    <div className="font-semibold text-[#212529] tabular-nums">
                      <a href="tel:+8801777349749" className="text-[#0056B3] hover:underline">
                        +880 1777-349749
                      </a>
                      <span className="text-[#6C757D] mx-1.5">/</span>
                      <a href="tel:+01777349749" className="text-[#0056B3] hover:underline">
                        +01777349749
                      </a>
                    </div>
                    <div className="mt-3">
                      <a
                        href="https://wa.me/8801777349749"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block px-4 py-2.5 text-[14px] font-semibold text-white bg-[#0056B3] hover:bg-[#004494] border border-[#0056B3] rounded-[4px] transition-colors whitespace-nowrap shrink-0"
                      >
                        Chat on WhatsApp (+880 1777-349749)
                      </a>
                    </div>
                  </div>

                  {/* Location */}
                  <div className="pt-3 border-t border-[#DEE2E6]">
                    <div className="text-[13px] font-semibold text-[#6C757D] mb-0.5">
                      Location
                    </div>
                    <div className="text-[#212529]">
                      Bangladesh (Serving clients locally &amp; globally)
                    </div>
                  </div>

                  {/* Working Hours / Availability */}
                  <div className="pt-3 border-t border-[#DEE2E6]">
                    <div className="text-[13px] font-semibold text-[#6C757D] mb-0.5">
                      Working Hours &amp; Availability
                    </div>
                    <div className="text-[14px] text-[#6C757D] leading-[1.55]">
                      Saturday – Thursday: 10:00 AM – 10:00 PM (BST / GMT+6).<br />
                      Typical response time on WhatsApp &amp; Email is under 2 hours. Flexible call scheduling available for UK, EU, US, and Middle East clients.
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Simple Classic HTML Contact Form */}
              <div className="lg:col-span-7 bg-[#FFFFFF] border border-[#DEE2E6] rounded-[4px] p-6">
                <h3 className="font-display text-[19px] font-bold text-[#212529] mb-4 pb-3 border-b border-[#DEE2E6]">
                  Send an Automation Inquiry
                </h3>

                <form onSubmit={handleFormSubmit} noValidate className="space-y-4">
                  <div>
                    <label
                      htmlFor="inquiry-name"
                      className="block text-[14px] font-semibold text-[#212529] mb-1.5"
                    >
                      Your Name <span className="text-[#0056B3]">*</span>
                    </label>
                    <input
                      id="inquiry-name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g., Tanvir Ahmed"
                      className="w-full px-3 py-2 text-[15px] text-[#212529] bg-[#FFFFFF] border border-[#DEE2E6] rounded-[4px] focus:outline-none focus:border-[#0056B3]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-link"
                      className="block text-[14px] font-semibold text-[#212529] mb-1.5"
                    >
                      Business Page / Website Link <span className="text-[#0056B3]">*</span>
                    </label>
                    <input
                      id="inquiry-link"
                      type="text"
                      required
                      value={formData.businessLink}
                      onChange={(e) => setFormData({ ...formData, businessLink: e.target.value })}
                      placeholder="e.g., https://facebook.com/yourpage or yourwebsite.com"
                      className="w-full px-3 py-2 text-[15px] text-[#212529] bg-[#FFFFFF] border border-[#DEE2E6] rounded-[4px] focus:outline-none focus:border-[#0056B3]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-platform"
                      className="block text-[14px] font-semibold text-[#212529] mb-1.5"
                    >
                      Platform Needed <span className="text-[#0056B3]">*</span>
                    </label>
                    <select
                      id="inquiry-platform"
                      value={formData.platform}
                      onChange={(e) => setFormData({ ...formData, platform: e.target.value })}
                      className="w-full px-3 py-2 text-[15px] text-[#212529] bg-[#FFFFFF] border border-[#DEE2E6] rounded-[4px] focus:outline-none focus:border-[#0056B3]"
                    >
                      <option value="Facebook">Facebook</option>
                      <option value="WhatsApp">WhatsApp</option>
                      <option value="Both">Both (Facebook &amp; WhatsApp)</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="inquiry-message"
                      className="block text-[14px] font-semibold text-[#212529] mb-1.5"
                    >
                      Message / Requirement <span className="text-[#0056B3]">*</span>
                    </label>
                    <textarea
                      id="inquiry-message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Briefly describe what you want to automate (e.g., auto reply to post comments, FAQ chatbot trained on PDF price list, Google Sheets order logging)..."
                      className="w-full px-3 py-2 text-[15px] text-[#212529] bg-[#FFFFFF] border border-[#DEE2E6] rounded-[4px] focus:outline-none focus:border-[#0056B3]"
                    />
                  </div>

                  {formError && (
                    <div
                      role="alert"
                      className="p-3 text-[13.5px] text-[#212529] bg-[#F8F9FA] border border-[#DEE2E6] rounded-[4px]"
                    >
                      <strong>Required Fields Missing:</strong> {formError}
                    </div>
                  )}

                  <div className="pt-1 flex flex-wrap items-center gap-3">
                    <button
                      type="submit"
                      className="px-5 py-2.5 text-[15px] font-semibold text-white bg-[#0056B3] hover:bg-[#004494] border border-[#0056B3] rounded-[4px] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Send Inquiry
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        if (!formData.name.trim() || !formData.businessLink.trim() || !formData.message.trim()) {
                          setFormError('Please fill out your Name, Business Page/Website Link, and Requirement details first.');
                          return;
                        }
                        setFormError('');
                        const payloads = buildInquiryPayloads();
                        setSubmittedSummary(payloads);
                      }}
                      className="px-4 py-2.5 text-[14px] font-semibold text-[#0056B3] bg-[#FFFFFF] hover:bg-[#EBF3FA] border border-[#0056B3] rounded-[4px] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Prepare WhatsApp Message
                    </button>
                  </div>
                </form>

                {/* Static-Friendly Submission Confirmation Panel (Works on Vercel & Inside Preview Frames) */}
                {submittedSummary && (
                  <div className="mt-5 p-4 bg-[#F8F9FA] border border-[#DEE2E6] rounded-[4px]">
                    <div className="text-[14px] font-bold text-[#212529] mb-1">
                      Inquiry Formatted &amp; Ready to Send
                    </div>
                    <p className="text-[13.5px] text-[#6C757D] mb-3">
                      Choose your preferred channel below to send this pre-filled inquiry directly to PKS Automation:
                    </p>
                    <div className="flex flex-wrap items-center gap-2.5 mb-3">
                      <a
                        href={submittedSummary.mailtoHref}
                        className="px-3.5 py-2 text-[13.5px] font-semibold text-white bg-[#0056B3] hover:bg-[#004494] rounded-[4px] whitespace-nowrap shrink-0"
                      >
                        Open in Email Client (pksfreelance@gmail.com)
                      </a>
                      <a
                        href={submittedSummary.whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3.5 py-2 text-[13.5px] font-semibold text-[#0056B3] bg-[#FFFFFF] hover:bg-[#EBF3FA] border border-[#0056B3] rounded-[4px] whitespace-nowrap shrink-0"
                      >
                        Send via WhatsApp (+880 1777-349749)
                      </a>
                      <button
                        type="button"
                        onClick={handleCopyInquiry}
                        className="px-3 py-2 text-[13px] font-medium text-[#212529] bg-[#FFFFFF] hover:bg-[#E9ECEF] border border-[#DEE2E6] rounded-[4px] cursor-pointer whitespace-nowrap shrink-0"
                      >
                        {copiedInquiry ? 'Copied Text!' : 'Copy Inquiry Text'}
                      </button>
                    </div>
                    <pre className="p-2.5 bg-[#FFFFFF] border border-[#DEE2E6] rounded-[4px] text-[12.5px] text-[#212529] whitespace-pre-wrap overflow-x-auto">
                      {submittedSummary.formattedBody}
                    </pre>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 7. FOOTER (Simple Copyright Line, Quick Links, Direct Contact Summary & Single-File HTML Export) */}
      <footer className="bg-[#F8F9FA] py-9 text-[14px] text-[#6C757D]">
        <div className="max-w-[1040px] mx-auto px-5">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-[#DEE2E6]">
            <div>
              <div className="font-display text-[16px] font-bold text-[#212529] mb-1">
                PKS Automation | AI &amp; Messaging Solutions
              </div>
              <p className="text-[13.5px] text-[#6C757D]">
                Practical Facebook Messenger &amp; WhatsApp Business Chatbot Specialist &middot; Bangladesh
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-5 text-[14px] font-medium text-[#212529]">
              <a href="#about" className="hover:text-[#0056B3] hover:underline whitespace-nowrap">
                About
              </a>
              <a href="#services" className="hover:text-[#0056B3] hover:underline whitespace-nowrap">
                Services
              </a>
              <a href="#portfolio" className="hover:text-[#0056B3] hover:underline whitespace-nowrap">
                Portfolio
              </a>
              <a href="#how-it-works" className="hover:text-[#0056B3] hover:underline whitespace-nowrap">
                How It Works
              </a>
              <a href="#contact" className="hover:text-[#0056B3] hover:underline whitespace-nowrap">
                Contact
              </a>
              <button
                type="button"
                onClick={() => setShowHtmlModal(true)}
                className="text-[13px] font-semibold text-[#0056B3] hover:underline cursor-pointer whitespace-nowrap"
              >
                Single-File index.html
              </button>
            </div>
          </div>

          <div className="pt-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[13px]">
            <div>
              &copy; {new Date().getFullYear()} PKS Automation. All rights reserved.
            </div>
            <div className="flex flex-wrap items-center gap-2 tabular-nums">
              <span>
                Email:{' '}
                <a href="mailto:pksfreelance@gmail.com" className="text-[#0056B3] hover:underline">
                  pksfreelance@gmail.com
                </a>
              </span>
              <span aria-hidden="true">&middot;</span>
              <span>
                WhatsApp:{' '}
                <a
                  href="https://wa.me/8801777349749"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0056B3] hover:underline"
                >
                  +880 1777-349749
                </a>
              </span>
            </div>
          </div>
        </div>
      </footer>

      {/* CLASSIC WORKFLOW DETAILS MODAL POPUP */}
      {activeModalProject && (
        <div
          className="fixed inset-0 z-50 bg-[#212529]/60 flex items-center justify-center p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveModalProject(null);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="workflow-modal-title"
            className="bg-[#FFFFFF] border border-[#DEE2E6] rounded-[4px] max-w-[760px] w-full max-h-[90vh] flex flex-col overflow-hidden"
          >
            {/* Modal Header */}
            <div className="px-6 py-4 bg-[#F8F9FA] border-b border-[#DEE2E6] flex items-center justify-between gap-4">
              <div>
                <div className="text-[12.5px] font-mono font-semibold text-[#0056B3]">
                  {activeModalProject.categoryTag} &middot; {activeModalProject.clientIndustry}
                </div>
                <h3
                  id="workflow-modal-title"
                  className="font-display text-[19px] font-bold text-[#212529] mt-0.5"
                >
                  {activeModalProject.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setActiveModalProject(null)}
                className="px-3 py-1.5 text-[13.5px] font-semibold text-[#212529] bg-[#FFFFFF] hover:bg-[#E9ECEF] border border-[#DEE2E6] rounded-[4px] cursor-pointer whitespace-nowrap shrink-0"
              >
                Close &times;
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6">
              {/* High-Level Logic Flow Bar */}
              <div className="p-4 bg-[#F8F9FA] border border-[#DEE2E6] rounded-[4px]">
                <div className="text-[12.5px] font-semibold text-[#6C757D] mb-1">
                  End-to-End Automation Logic Flow:
                </div>
                <div className="font-mono text-[13.5px] text-[#0056B3] font-semibold">
                  {activeModalProject.workflowSummary}
                </div>
                <div className="text-[12.5px] text-[#6C757D] mt-2 pt-2 border-t border-[#DEE2E6]">
                  <strong>Integration Stack:</strong> {activeModalProject.stackUsed}
                </div>
              </div>

              {/* 4 Step-by-Step Logic Boxes */}
              <div>
                <h4 className="font-display text-[16px] font-bold text-[#212529] mb-3">
                  Step-by-Step Webhook &amp; AI Workflow Execution
                </h4>
                <div className="space-y-3">
                  {activeModalProject.workflowSteps.map((step) => (
                    <div
                      key={step.stepNumber}
                      className="p-4 bg-[#FFFFFF] border border-[#DEE2E6] rounded-[4px]"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
                        <span className="text-[14.5px] font-bold text-[#212529]">
                          Step {step.stepNumber} ({step.stage}): {step.title}
                        </span>
                        <span className="font-mono text-[12px] text-[#0056B3]">
                          {step.technicalNote}
                        </span>
                      </div>
                      <p className="text-[14px] text-[#6C757D] leading-[1.55]">
                        {step.detail}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Live Conversation Transcript */}
              <div>
                <h4 className="font-display text-[16px] font-bold text-[#212529] mb-3">
                  Sample Live Conversation Log (Banglish / English)
                </h4>
                <div className="bg-[#F8F9FA] border border-[#DEE2E6] rounded-[4px] p-4 space-y-3">
                  {activeModalProject.sampleConversation.map((turn, index) => (
                    <div
                      key={index}
                      className="p-3 bg-[#FFFFFF] border border-[#DEE2E6] rounded-[4px] text-[13.5px]"
                    >
                      <div className="flex items-center justify-between text-[12px] mb-1">
                        <strong
                          className={
                            turn.sender === 'Bot' ? 'text-[#0056B3]' : 'text-[#212529]'
                          }
                        >
                          {turn.sender === 'Bot'
                            ? 'Automated AI Assistant'
                            : 'Customer Message'}
                        </strong>
                        <span className="font-mono text-[#6C757D] tabular-nums">
                          {turn.time}
                        </span>
                      </div>
                      <div className="text-[#212529] leading-[1.5]">{turn.message}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="px-6 py-3.5 bg-[#F8F9FA] border-t border-[#DEE2E6] flex flex-wrap items-center justify-between gap-3">
              <div className="text-[13px] font-semibold text-[#212529] tabular-nums">
                Verified Result: {activeModalProject.primaryMetric} &middot; {activeModalProject.secondaryMetric}
              </div>
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleSelectProjectForInquiry(activeModalProject)}
                  className="px-4 py-2 text-[13.5px] font-semibold text-white bg-[#0056B3] hover:bg-[#004494] border border-[#0056B3] rounded-[4px] cursor-pointer whitespace-nowrap shrink-0"
                >
                  Request Similar Setup
                </button>
                <button
                  type="button"
                  onClick={() => setActiveModalProject(null)}
                  className="px-4 py-2 text-[13.5px] font-semibold text-[#212529] bg-[#FFFFFF] hover:bg-[#E9ECEF] border border-[#DEE2E6] rounded-[4px] cursor-pointer whitespace-nowrap shrink-0"
                >
                  Close Window
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SINGLE-FILE STATIC HTML EXPORT MODAL */}
      {showHtmlModal && (
        <div
          className="fixed inset-0 z-50 bg-[#212529]/60 flex items-center justify-center p-4 overflow-y-auto"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowHtmlModal(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="html-export-modal-title"
            className="bg-[#FFFFFF] border border-[#DEE2E6] rounded-[4px] max-w-[820px] w-full max-h-[90vh] flex flex-col overflow-hidden"
          >
            <div className="px-6 py-4 bg-[#F8F9FA] border-b border-[#DEE2E6] flex items-center justify-between gap-4">
              <div>
                <h3
                  id="html-export-modal-title"
                  className="font-display text-[18px] font-bold text-[#212529]"
                >
                  Single-File Static index.html (Zero-Build Vercel &amp; GitHub Pages Ready)
                </h3>
                <p className="text-[13px] text-[#6C757D]">
                  Complete self-contained HTML5, CSS3 &lt;style&gt;, and vanilla JS &lt;script&gt; in a single file.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowHtmlModal(false)}
                className="px-3 py-1.5 text-[13.5px] font-semibold text-[#212529] bg-[#FFFFFF] hover:bg-[#E9ECEF] border border-[#DEE2E6] rounded-[4px] cursor-pointer whitespace-nowrap shrink-0"
              >
                Close &times;
              </button>
            </div>

            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <button
                  type="button"
                  onClick={handleCopyStandaloneHtml}
                  className="px-4 py-2 text-[13.5px] font-semibold text-white bg-[#0056B3] hover:bg-[#004494] border border-[#0056B3] rounded-[4px] cursor-pointer whitespace-nowrap shrink-0"
                >
                  {copiedHtml ? 'Copied Complete index.html!' : 'Copy Full index.html Code'}
                </button>
                <button
                  type="button"
                  onClick={handleDownloadStandaloneHtml}
                  className="px-4 py-2 text-[13.5px] font-semibold text-[#0056B3] bg-[#FFFFFF] hover:bg-[#EBF3FA] border border-[#0056B3] rounded-[4px] cursor-pointer whitespace-nowrap shrink-0"
                >
                  Download index.html File
                </button>
              </div>

              <pre className="p-4 bg-[#F8F9FA] border border-[#DEE2E6] rounded-[4px] text-[12px] text-[#212529] overflow-x-auto max-h-[52vh] leading-[1.45]">
                <code>{SINGLE_FILE_HTML_SOURCE}</code>
              </pre>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
