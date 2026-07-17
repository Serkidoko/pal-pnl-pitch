"use client";

import { useEffect, useState } from "react";

const sources = {
  quickStart: "https://docs.mindpal.space/",
  knowledge: "https://docs.mindpal.space/agent/knowledge-sources",
  embedding: "https://docs.mindpal.space/guides/embedding",
  memory: "https://docs.mindpal.space/guides/audience-memory",
  brandVoice: "https://docs.mindpal.space/agent/brand-voice",
  privacy: "https://mindpal.space/privacy-policy",
  terms: "https://mindpal.space/terms-of-service",
} as const;

const navItems = [
  ["model", "Model"],
  ["platform", "Platform"],
  ["patterns", "Workflow patterns"],
  ["value", "Value"],
  ["pilot", "Pilot"],
] as const;

type SourceLinkProps = {
  href: string;
  children: React.ReactNode;
  light?: boolean;
};

function SourceLink({ href, children, light = false }: SourceLinkProps) {
  return (
    <a
      className={`source-link${light ? " source-link-light" : ""}`}
      href={href}
      target="_blank"
      rel="noreferrer"
    >
      <span>{children}</span>
      <span aria-hidden="true">↗</span>
    </a>
  );
}

function SectionIntro({
  number,
  label,
  title,
  copy,
  light = false,
}: {
  number: string;
  label: string;
  title: string;
  copy: string;
  light?: boolean;
}) {
  return (
    <div className={`section-intro${light ? " section-intro-light" : ""}`} data-reveal>
      <div className="section-index"><span>{number}</span><span>{label}</span></div>
      <div className="section-title-wrap">
        <h2>{title}</h2>
        <p>{copy}</p>
      </div>
    </div>
  );
}

function CheckMark() {
  return <span className="check-mark" aria-hidden="true">✓</span>;
}

export default function Home() {
  const [activeSection, setActiveSection] = useState("model");
  const [progress, setProgress] = useState(0);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("is-visible");
        });
      },
      { threshold: 0.13 },
    );
    revealItems.forEach((item) => revealObserver.observe(item));

    const sections = navItems
      .map(([id]) => document.getElementById(id))
      .filter((item): item is HTMLElement => Boolean(item));
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActiveSection(visible.target.id);
      },
      { rootMargin: "-30% 0px -55%", threshold: [0, 0.25, 0.6] },
    );
    sections.forEach((section) => sectionObserver.observe(section));

    let ticking = false;
    const updateScroll = () => {
      const top = window.scrollY;
      const available = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(available > 0 ? Math.min(100, (top / available) * 100) : 0);
      setScrolled(top > 24);
      ticking = false;
    };
    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateScroll);
      }
    };
    updateScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      revealObserver.disconnect();
      sectionObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <main id="top">
      <div className="scroll-progress" aria-hidden="true"><span style={{ transform: `scaleX(${progress / 100})` }} /></div>

      <header className={`site-header${scrolled ? " site-header-scrolled" : ""}`}>
        <a className="brand" href="#top" aria-label="PAL home">
          <span className="brand-symbol" aria-hidden="true"><i /><i /><i /></span>
          <span className="brand-copy"><strong>PAL</strong><small>MindPal</small></span>
        </a>
        <nav aria-label="Page navigation">
          {navItems.map(([id, label]) => (
            <a className={activeSection === id ? "active" : ""} href={`#${id}`} key={id}>{label}</a>
          ))}
        </nav>
        <a className="header-cta" href="#ask">Choose a workflow <span aria-hidden="true">↘</span></a>
      </header>

      <section className="hero">
        <div className="hero-grid" aria-hidden="true" />
        <div className="hero-orb hero-orb-one" aria-hidden="true" />
        <div className="hero-orb hero-orb-two" aria-hidden="true" />

        <div className="hero-content">
          <div className="hero-kicker" data-reveal>
            <span>A P&amp;L proposal</span>
            <i />
            <span>Presented by Vin Smart Future</span>
          </div>
          <h1 data-reveal>
            Put one business workflow on a
            <em> measurable operating path.</em>
          </h1>
          <p className="hero-copy" data-reveal>
            PAL—MindPal in this proposal—provides a platform for building AI agents and
            multi-agent workflows around business knowledge, tools and human checkpoints.
            Our proposal is simple: start with one P&amp;L-owned workflow, measure the baseline,
            and let verified results decide what scales.
          </p>
          <div className="hero-actions" data-reveal>
            <a className="button button-primary" href="#model">See the operating model <span aria-hidden="true">↓</span></a>
            <a className="button button-ghost" href="#evidence">Review official sources <span aria-hidden="true">↗</span></a>
          </div>
          <div className="truth-line" data-reveal>
            <span><CheckMark /> No assumed ROI</span>
            <span><CheckMark /> No fictional customer proof</span>
            <span><CheckMark /> Every platform claim sourced</span>
          </div>
        </div>

        <div className="hero-system" data-reveal aria-label="Documented PAL platform pattern, not a customer implementation">
          <div className="system-topline"><span>DOCUMENTED PLATFORM PATTERN</span><span className="live-dot">SOURCE-LED</span></div>
          <div className="system-stage system-stage-input">
            <small>BUSINESS CONTEXT</small>
            <strong>Files · websites · notes</strong>
            <span>Knowledge sources</span>
          </div>
          <div className="system-connector" aria-hidden="true"><i /></div>
          <div className="system-stage system-stage-core">
            <small>PAL WORKFLOW</small>
            <div className="agent-row">
              <span>Agent</span><b>+</b><span>Agent</span><b>+</b><span>Variables</span>
            </div>
            <strong>Multi-agent orchestration</strong>
          </div>
          <div className="system-connector" aria-hidden="true"><i /></div>
          <div className="system-lower-row">
            <div className="system-stage">
              <small>CONTROL</small>
              <strong>Human checkpoint</strong>
            </div>
            <div className="system-stage">
              <small>DELIVERY</small>
              <strong>Shared or embedded</strong>
            </div>
          </div>
          <div className="system-footnote">
            <span>Capability view—not a deployed customer workflow.</span>
            <SourceLink href={sources.quickStart} light>Official quick start</SourceLink>
          </div>
        </div>
      </section>

      <div className="platform-strip" aria-label="Verified PAL platform capabilities">
        <div><small>KNOWLEDGE</small><strong>Files · URLs · notes</strong></div>
        <div><small>ORCHESTRATION</small><strong>Agents · variables · checkpoints</strong></div>
        <div><small>DELIVERY</small><strong>Team use · direct link · embed</strong></div>
        <div><small>CONTINUITY</small><strong>Audience memory · session context</strong></div>
      </div>

      <section className="section section-model" id="model">
        <SectionIntro
          number="01"
          label="THE P&L MODEL"
          title="The unit owns the outcome. PAL operationalizes the workflow."
          copy="This is a proposed engagement model—not a claim about any customer’s current operation. It keeps the technology subordinate to a named business result."
        />

        <div className="operating-model" data-reveal>
          <article>
            <span className="model-number">1</span>
            <div><small>P&amp;L OWNER DEFINES</small><h3>The outcome</h3><p>Choose cost, revenue, speed, quality or risk—and approve the financial baseline used to measure it.</p></div>
          </article>
          <article>
            <span className="model-number">2</span>
            <div><small>WORKFLOW OWNER MAPS</small><h3>The work</h3><p>Fix the process boundary, input sources, current effort, quality standard and human decision points.</p></div>
          </article>
          <article>
            <span className="model-number">3</span>
            <div><small>PAL CONFIGURES</small><h3>The agent workflow</h3><p>Assign knowledge, agent roles, variables and checkpoints using capabilities documented by MindPal.</p></div>
          </article>
          <article>
            <span className="model-number">4</span>
            <div><small>FINANCE VERIFIES</small><h3>The result</h3><p>Compare the same workflow before and after. Scale only when the agreed metric clears the agreed threshold.</p></div>
          </article>
        </div>

        <div className="model-principle" data-reveal>
          <span>ONE P&amp;L</span><i>→</i><span>ONE WORKFLOW</span><i>→</i><span>ONE BASELINE</span><i>→</i><strong>ONE SCALE DECISION</strong>
        </div>
      </section>

      <section className="section section-platform" id="platform">
        <SectionIntro
          number="02"
          label="VERIFIED PLATFORM"
          title="The building blocks are documented. The business result must be earned."
          copy="PAL is MindPal in this proposal. The capabilities below are tied directly to MindPal’s official documentation; no customer outcome is inferred from them."
          light
        />

        <div className="platform-cards">
          <article data-reveal>
            <span className="platform-icon"><i /><i /><i /></span>
            <small>GROUND</small>
            <h3>Use business-specific knowledge</h3>
            <p>Assign uploaded files, websites or URLs, and editable notes as knowledge sources for agents.</p>
            <SourceLink href={sources.knowledge} light>Knowledge Sources</SourceLink>
          </article>
          <article data-reveal>
            <span className="platform-icon platform-icon-flow"><i /><i /><i /></span>
            <small>ORCHESTRATE</small>
            <h3>Coordinate agents as a workflow</h3>
            <p>MindPal documents multi-agent workflows, shared variables and human checkpoints for important decisions.</p>
            <SourceLink href={sources.quickStart} light>Quick Start Guide</SourceLink>
          </article>
          <article data-reveal>
            <span className="platform-icon platform-icon-publish"><i /><i /></span>
            <small>PUBLISH</small>
            <h3>Deliver where users already work</h3>
            <p>Published chatbots and workflows can be shared by link or embedded into a website or platform.</p>
            <SourceLink href={sources.embedding} light>Embedding Guide</SourceLink>
          </article>
          <article data-reveal>
            <span className="platform-icon platform-icon-memory"><i /><i /></span>
            <small>CONTINUE</small>
            <h3>Support returning-user context</h3>
            <p>Audience Memory and custom user IDs can restore prior conversation or workflow history for returning users.</p>
            <SourceLink href={sources.memory} light>Audience Memory</SourceLink>
          </article>
        </div>

        <div className="platform-boundary" data-reveal>
          <div><span>PLATFORM FACT</span><p>MindPal provides configurable agent, workflow, knowledge and publishing capabilities.</p></div>
          <div><span>BUSINESS HYPOTHESIS</span><p>A selected workflow may create value. The pilot must prove how much, for whom and under what controls.</p></div>
        </div>
      </section>

      <section className="section section-patterns" id="patterns">
        <SectionIntro
          number="03"
          label="CANDIDATE WORKFLOWS"
          title="Three credible patterns. The client chooses the real one."
          copy="These are proposed patterns assembled from documented PAL capabilities. They are not case studies, deployed customer solutions or promises of impact."
        />

        <div className="pattern-stack">
          <article className="pattern-card" data-reveal>
            <div className="pattern-header"><span>01</span><small>CANDIDATE PATTERN</small></div>
            <div className="pattern-copy"><h3>Knowledge to decision draft</h3><p>Use approved source material to research, synthesize and prepare a draft for a named human owner.</p></div>
            <div className="pattern-flow" aria-label="Approved sources to agent workflow to human review to decision draft">
              <span>Approved sources</span><i>→</i><span>Agent workflow</span><i>→</i><span>Human review</span><i>→</i><strong>Decision draft</strong>
            </div>
            <div className="pattern-measures"><small>MEASURE</small><span>Research effort</span><span>Cycle time</span><span>First-pass acceptance</span></div>
          </article>

          <article className="pattern-card" data-reveal>
            <div className="pattern-header"><span>02</span><small>CANDIDATE PATTERN</small></div>
            <div className="pattern-copy"><h3>Request to reviewed output</h3><p>Turn a structured business request into a routed, drafted and reviewed output with explicit checkpoints.</p></div>
            <div className="pattern-flow" aria-label="Structured request to specialized agents to control point to reviewed output">
              <span>Structured request</span><i>→</i><span>Specialized agents</span><i>→</i><span>Control point</span><i>→</i><strong>Reviewed output</strong>
            </div>
            <div className="pattern-measures"><small>MEASURE</small><span>Queue time</span><span>Manual touches</span><span>Quality pass rate</span></div>
          </article>

          <article className="pattern-card" data-reveal>
            <div className="pattern-header"><span>03</span><small>CANDIDATE PATTERN</small></div>
            <div className="pattern-copy"><h3>Published expert experience</h3><p>Publish or embed an approved chatbot or workflow, with user identity and history where configured.</p></div>
            <div className="pattern-flow" aria-label="Approved knowledge to published experience to user context to human handoff">
              <span>Approved knowledge</span><i>→</i><span>Published experience</span><i>→</i><span>User context</span><i>→</i><strong>Human handoff</strong>
            </div>
            <div className="pattern-measures"><small>MEASURE</small><span>Adoption</span><span>Completion</span><span>Handoff rate</span></div>
          </article>
        </div>
      </section>

      <section className="section section-value" id="value">
        <SectionIntro
          number="04"
          label="VALUE WITHOUT FICTION"
          title="No headline number until Finance approves the inputs."
          copy="The page does not estimate savings, revenue or ROI. It shows the exact measurement logic a P&L team can populate with its own baseline and observed pilot data."
          light
        />

        <div className="value-grid">
          <article data-reveal>
            <div className="value-top"><span>01</span><small>COST SAVED</small></div>
            <div className="formula"><strong>Measured hours removed</strong><i>×</i><strong>Approved loaded cost</strong></div>
            <p>Use a before/after time study and a Finance-approved cost basis. Do not count capacity as savings unless the cost is actually removed or avoided.</p>
          </article>
          <article data-reveal>
            <div className="value-top"><span>02</span><small>REVENUE UNLOCKED</small></div>
            <div className="formula"><strong>Verified added throughput</strong><i>×</i><strong>Contribution per unit</strong></div>
            <p>Count only throughput that converts into real demand, delivery or sales under an approved contribution rule.</p>
          </article>
          <article data-reveal>
            <div className="value-top"><span>03</span><small>SPEED GAINED</small></div>
            <div className="formula"><strong>Baseline cycle time</strong><i>−</i><strong>Pilot cycle time</strong></div>
            <p>Keep the workflow boundary, input class and quality standard constant before making the comparison.</p>
          </article>
        </div>

        <div className="value-scoreboard" data-reveal>
          <div><small>BASELINE</small><strong>Owner-approved</strong></div>
          <span>+</span>
          <div><small>PILOT</small><strong>Instrumented</strong></div>
          <span>+</span>
          <div><small>FINANCE RULE</small><strong>Explicit</strong></div>
          <span>=</span>
          <div className="scoreboard-result"><small>VALUE CASE</small><strong>Defensible</strong></div>
        </div>
      </section>

      <section className="section section-controls" id="controls">
        <SectionIntro
          number="05"
          label="CONTROL BEFORE SCALE"
          title="Platform policy is evidence—not a substitute for client approval."
          copy="MindPal’s current policies describe how the service handles data and AI output limitations. The client still owns its data classification, legal review, workflow controls and decision authority."
        />

        <div className="control-layout">
          <article className="control-facts" data-reveal>
            <p className="control-label">DOCUMENTED MINDPAL STATEMENTS</p>
            <h3>What the official policies state</h3>
            <ul>
              <li><CheckMark /><span>Customer content is not used to train foundation models by default.</span></li>
              <li><CheckMark /><span>The privacy policy describes AWS infrastructure, encryption and access controls.</span></li>
              <li><CheckMark /><span>The policy identifies retention periods and external model providers.</span></li>
              <li><CheckMark /><span>The Terms warn that AI output may contain inaccuracies, errors or omissions.</span></li>
            </ul>
            <div className="control-links"><SourceLink href={sources.privacy}>Privacy Policy</SourceLink><SourceLink href={sources.terms}>Terms of Service</SourceLink></div>
          </article>
          <article className="control-decisions" data-reveal>
            <p className="control-label">CLIENT DECISIONS REQUIRED</p>
            <h3>What must be agreed before live use</h3>
            <div className="decision-list">
              <span><b>01</b>Data scope and access roles</span>
              <span><b>02</b>Human owner and approval points</span>
              <span><b>03</b>Quality rubric and test set</span>
              <span><b>04</b>Retention and incident path</span>
              <span><b>05</b>Scale/no-scale authority</span>
            </div>
            <p>These are proposed enterprise deployment gates, not claims that PAL completes the client’s governance process.</p>
          </article>
        </div>
      </section>

      <section className="section section-pilot" id="pilot">
        <SectionIntro
          number="06"
          label="MEASURED PILOT"
          title="Start narrow. Instrument everything. Scale on evidence."
          copy="Duration, budget and success thresholds are intentionally left to the client and Vin Smart Future to agree. The sequence below is the proposed structure."
        />

        <div className="pilot-track" data-reveal>
          <article><span>DISCOVER</span><h3>Fix the baseline</h3><p>Name the P&amp;L outcome, workflow boundary, owner, current effort and quality standard.</p><small>EXIT EVIDENCE</small><b>Signed baseline</b></article>
          <i aria-hidden="true">→</i>
          <article><span>CONFIGURE</span><h3>Build the workflow</h3><p>Assign approved knowledge, agent roles, variables, tools and human checkpoints.</p><small>EXIT EVIDENCE</small><b>Testable PAL flow</b></article>
          <i aria-hidden="true">→</i>
          <article><span>EVALUATE</span><h3>Prove task quality</h3><p>Run representative cases against a client-approved rubric and policy review.</p><small>EXIT EVIDENCE</small><b>Accepted test record</b></article>
          <i aria-hidden="true">→</i>
          <article><span>DECIDE</span><h3>Measure live use</h3><p>Compare the agreed value metric and operating controls with the baseline.</p><small>EXIT EVIDENCE</small><b>Scale or stop</b></article>
        </div>
      </section>

      <section className="section section-evidence" id="evidence">
        <SectionIntro
          number="07"
          label="SOURCE LEDGER"
          title="Every platform statement can be checked at the source."
          copy="These links are the evidence boundary for this proposal. Candidate workflows, measurement formulas and pilot stages are Vin Smart Future’s proposed approach—not documented customer outcomes."
          light
        />
        <div className="evidence-grid">
          {[
            ["Platform overview", "Agents, workflows, variables, tools and human checkpoints", sources.quickStart],
            ["Knowledge Sources", "Files, URLs, notes and retrieval behavior", sources.knowledge],
            ["Embedding", "Published chatbots, workflows, links and website embeds", sources.embedding],
            ["Audience Memory", "Custom user identity and returning-user history", sources.memory],
            ["Brand Voice", "Guidelines for organization-specific communication style", sources.brandVoice],
            ["Privacy Policy", "Current statements on data, providers, retention and security", sources.privacy],
            ["Terms of Service", "AI output limitations and customer responsibilities", sources.terms],
          ].map(([title, copy, href], index) => (
            <a href={href} target="_blank" rel="noreferrer" key={title} data-reveal>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div><h3>{title}</h3><p>{copy}</p></div>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
        <p className="evidence-note">Sources reviewed 17 July 2026. Re-check current policy and contractual terms during procurement.</p>
      </section>

      <section className="section section-ask" id="ask">
        <div className="ask-grid" data-reveal>
          <div>
            <p className="ask-kicker">THE DECISION REQUEST</p>
            <h2>Choose one P&amp;L workflow.<br />Let the evidence decide.</h2>
            <p>Nominate a workflow that matters, has a named owner and can be measured against an approved baseline. PAL earns the right to scale only after the pilot proves value and control.</p>
          </div>
          <div className="ask-card">
            <small>BRING TO THE FIRST WORKING SESSION</small>
            <ul>
              <li><CheckMark />One P&amp;L outcome</li>
              <li><CheckMark />One workflow owner</li>
              <li><CheckMark />Representative source material</li>
              <li><CheckMark />A Finance-approved metric</li>
            </ul>
            <a className="button button-primary" href="#model">Review the model <span aria-hidden="true">↑</span></a>
          </div>
        </div>
      </section>

      <footer>
        <div className="footer-top">
          <a className="brand brand-footer" href="#top"><span className="brand-symbol" aria-hidden="true"><i /><i /><i /></span><span className="brand-copy"><strong>PAL</strong><small>MindPal</small></span></a>
          <span>Presented by Vin Smart Future</span>
          <a href="#top">Back to top ↑</a>
        </div>
        <div className="footer-bottom">
          <p>PAL refers to MindPal in this proposal. Platform claims link to official MindPal sources. Candidate workflows, pilot structure and measurement logic are proposals—not customer results or guaranteed outcomes.</p>
        </div>
      </footer>
    </main>
  );
}
