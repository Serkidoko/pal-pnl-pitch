"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const TOTAL_SLIDES = 14;

type SlideProps = {
  index: number;
  id: string;
  eyebrow: string;
  title: string;
  children: React.ReactNode;
  source?: React.ReactNode;
  register: (index: number, node: HTMLElement | null) => void;
};

function Slide({ index, id, eyebrow, title, children, source, register }: SlideProps) {
  return (
    <section
      id={id}
      className="slide"
      aria-label={`Slide ${index + 1} of ${TOTAL_SLIDES}: ${title}`}
      ref={(node) => register(index, node)}
    >
      <div className="slide-inner">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <div className="slide-body">{children}</div>
        <footer className="slide-footer">
          <span>{source}</span>
          <span>{String(index + 1).padStart(2, "0")}</span>
        </footer>
      </div>
    </section>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return <span className="tag">{children}</span>;
}

function MetricCard({ value, label, detail }: { value: string; label: string; detail: string }) {
  return (
    <article className="metric-card">
      <strong className="metric-value">{value}</strong>
      <h2>{label}</h2>
      <p>{detail}</p>
    </article>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="clean-list">
      {items.map((item) => <li key={item}>{item}</li>)}
    </ul>
  );
}

export default function Home() {
  const deckRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  const register = useCallback((index: number, node: HTMLElement | null) => {
    slideRefs.current[index] = node;
  }, []);

  const goTo = useCallback((index: number) => {
    const next = Math.max(0, Math.min(TOTAL_SLIDES - 1, index));
    slideRefs.current[next]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "start" });
  }, []);

  useEffect(() => {
    const root = deckRef.current;
    if (!root) return;
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = slideRefs.current.indexOf(visible.target as HTMLElement);
        if (index >= 0) {
          setActive(index);
          const id = slideRefs.current[index]?.id;
          if (id) history.replaceState(null, "", `#${id}`);
        }
      },
      { root, threshold: [0.55, 0.72, 0.9] },
    );
    slideRefs.current.forEach((slide) => slide && observer.observe(slide));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const index = slideRefs.current.findIndex((slide) => slide?.id === hash);
    if (index >= 0) requestAnimationFrame(() => goTo(index));
  }, [goTo]);

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) return;
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(event.key)) {
        event.preventDefault();
        goTo(active + 1);
      } else if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)) {
        event.preventDefault();
        goTo(active - 1);
      } else if (event.key === "Home") {
        event.preventDefault();
        goTo(0);
      } else if (event.key === "End") {
        event.preventDefault();
        goTo(TOTAL_SLIDES - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, goTo]);

  const toggleFullscreen = async () => {
    if (!document.fullscreenElement) await document.documentElement.requestFullscreen?.();
    else await document.exitFullscreen?.();
  };

  return (
    <main className="presentation-shell">
      <header className="deck-chrome">
        <button className="brand-button" onClick={() => goTo(0)} aria-label="Go to first slide">
          <span className="brand-mark" /> PAL
        </button>
        <div className="deck-actions">
          <span className="counter" aria-live="polite">
            {String(active + 1).padStart(2, "0")} / {TOTAL_SLIDES}
          </span>
          <button className="text-button" onClick={toggleFullscreen}>Fullscreen</button>
        </div>
      </header>

      <div className="deck" ref={deckRef}>
        <Slide index={0} id="opening" eyebrow="PAL × PROFESSIONAL SERVICES" title="Turn expert delivery into a scalable margin engine" register={register}>
          <div className="opening-copy">
            <p>Decision deck for the GM of a $50M B2B digital-transformation consulting unit</p>
            <span>Illustrative business case · 17 July 2026</span>
          </div>
          <div className="opening-wordmark">PAL</div>
        </Slide>

        <Slide index={1} id="decision-thesis" eyebrow="DECISION THESIS" title="A 90-day lighthouse can unlock a $2.60M annual value run-rate" register={register}
          source="Illustrative model; validate baselines and conversion rates during the lighthouse.">
          <p className="lede">Codify three repeatable workflows as governed agent teams—then monetize the time, speed and IP they create.</p>
          <div className="metric-grid three">
            <MetricCard value="$1.35M" label="billable capacity monetized" detail="180 billable FTEs × 2 hrs/week × 52 × $180/hr × 40% conversion" />
            <MetricCard value="$0.80M" label="recurring portal revenue" detail="10 priority accounts × $80K modeled annual contract value" />
            <MetricCard value="$0.45M" label="cost avoidance" detail="Lower pursuit effort, rework and knowledge-search time" />
          </div>
        </Slide>

        <Slide index={2} id="pnl-problem" eyebrow="P&L PROBLEM" title="Four leakage points keep expertise from compounding" register={register}
          source="Week-one hypotheses to baseline—not claims about the current operation.">
          <div className="leakage-grid">
            {[
              ["SELL", "Pursuit debt", "Senior SMEs rebuild credentials, proof points and RFP answers for every bid.", "BASELINE", "8-day proposal cycle"],
              ["DELIVER", "Delivery drag", "Teams repeatedly research, synthesize and format first drafts.", "VALUE HYPOTHESIS", "2 hrs/FTE/week"],
              ["ASSURE", "Rework tax", "QA happens late; methods and evidence trails vary by project.", "PILOT TARGET", "30% less rework"],
              ["EXPAND", "IP leakage", "Insights stay in files instead of becoming paid, client-facing products.", "MODELED UPSIDE", "$800K attach ARR"],
            ].map(([tag, heading, copy, label, value]) => (
              <article className="leakage-card" key={heading}>
                <Tag>{tag}</Tag><h2>{heading}</h2><p>{copy}</p><small>{label}</small><strong>{value}</strong>
              </article>
            ))}
          </div>
          <div className="dark-ribbon">P&L symptoms → utilization pressure · slower bids · inconsistent realization · no recurring attach revenue</div>
        </Slide>

        <Slide index={3} id="economic-engine" eyebrow="ECONOMIC ENGINE" title="Two reclaimed hours per billable FTE create $3.37M of delivery capacity" register={register}
          source="PAL value model; illustrative assumptions to validate in days 0–30.">
          <div className="formula" aria-label="180 billable FTEs times 2 hours per week times 52 weeks times 180 dollars per hour equals 3.37 million dollars">
            {[ ["180", "billable FTEs"], ["2", "hrs / week"], ["52", "weeks"], ["$180", "realized $ / hour"], ["$3.37M", "annual capacity"] ].map(([value, label], i) => (
              <div className="formula-part" key={value}>
                {i > 0 && <span className="operator">{i === 4 ? "=" : "×"}</span>}
                <strong>{value}</strong><small>{label}</small>
              </div>
            ))}
          </div>
          <div className="value-ribbon"><strong>40% monetized</strong><span>→</span><strong>$1.35M annual revenue capacity</strong></div>
          <div className="split-notes">
            <article><h2>Conservative conversion</h2><p>The unmonetized 60% may improve speed, coverage, quality or work-life—but is not counted as revenue.</p></article>
            <article><h2>Instrument the work</h2><p>Time-to-first-draft · edit distance · senior review hours · realized utilization</p></article>
          </div>
        </Slide>

        <Slide index={4} id="why-pal" eyebrow="WHY PAL" title="PAL captures how top performers work—and deploys it as governed digital labor" register={register}
          source={<><a href="https://mindpal.space/" target="_blank" rel="noreferrer">MindPal</a> · <a href="https://docs.mindpal.space/workflow" target="_blank" rel="noreferrer">workflow documentation</a></>}>
          <p className="lede">One platform spans the knowledge, orchestration and delivery layers required to operationalize expertise.</p>
          <div className="layer-grid">
            <article><Tag>1 / ENCODE</Tag><h2>Knowledge</h2><BulletList items={["Frameworks and SOPs", "Files, websites, structured data", "Brand voice and response templates", "Role and context rules"]} /></article>
            <article><Tag>2 / ORCHESTRATE</Tag><h2>Agent teams</h2><BulletList items={["Specialized agent nodes", "Evaluator–optimizer loops", "Gates and human checkpoints", "Code, routing and reusable subflows"]} /></article>
            <article><Tag>3 / DELIVER</Tag><h2>Experiences</h2><BulletList items={["Internal workspace", "Embedded tools and forms", "Branded client portals", "Public API, webhooks and schedules"]} /></article>
          </div>
          <div className="dark-ribbon three-beat"><span>Proposal speed</span><b>→</b><span>Delivery margin</span><b>→</b><span>Recurring client revenue</span></div>
        </Slide>

        <Slide index={5} id="pursuit-architect" eyebrow="ACQUISITION" title="Use case 1 — Pursuit Architect cuts proposal cycle from 8 days to 3" register={register}
          source="Targets are illustrative and must be measured against the BU’s week-one baseline.">
          <p className="lede muted">Pilot target: increase bid throughput without adding presales headcount.</p>
          <div className="layer-grid use-case-grid">
            <article><Tag>INPUTS</Tag><BulletList items={["RFP and account brief", "Rate card and CVs", "Case studies and proof points", "Qualification rules and win themes"]} /></article>
            <article><Tag>AGENT TEAM</Tag><BulletList items={["Qualify and score", "Retrieve evidence", "Draft section owners", "Red-team against rubric"]} /></article>
            <article><Tag>OUTPUTS</Tag><BulletList items={["Compliant proposal", "Executive summary", "Assumptions and evidence log", "Reusable win-theme library"]} /></article>
          </div>
          <div className="process-line"><span>QUALIFY</span><span>RESEARCH</span><span>DRAFT</span><span>RED-TEAM</span></div>
          <div className="target-ribbon"><span><strong>–60%</strong> cycle time</span><span><strong>–50%</strong> senior pursuit hours</span><span><b>MORE BIDS</b> same team</span></div>
        </Slide>

        <Slide index={6} id="delivery-copilot" eyebrow="DELIVERY" title="Use case 2 — Delivery Copilot returns 18,720 expert hours per year" register={register}
          source="Workflow uses agent, evaluator–optimizer and supervised-run patterns.">
          <div className="delivery-layout">
            <article className="hours-card"><strong>18,720</strong><h2>hours returned / year</h2><hr /><p><b>180 FTEs</b> × <b>2 hrs/week</b><br />× <b>52 weeks</b></p><small>First drafts · status reports · evidence trails · interview synthesis</small></article>
            <div className="agent-flow"><h2>SOW + client data + methodology</h2><span className="down">↓</span><div className="flow-row"><b>Research & analyze</b><i>→</i><b>Draft artifacts</b><i>→</i><b>Check evidence</b></div><span className="down">↓</span><div className="evaluator"><b>Evaluator checks rubric, sources and completeness</b><span>Human owner edits or approves before client delivery</span></div><span className="down">↓</span><div className="approved">Approved deliverable + reusable learning</div></div>
          </div>
          <div className="target-ribbon"><span><b>PILOT TARGETS</b></span><span>2.0 hrs/FTE/week reclaimed</span><span>30% less rework</span><span>same client standards</span></div>
        </Slide>

        <Slide index={7} id="expertise-portal" eyebrow="EXPANSION" title="Use case 3 — Expertise Portal turns delivery IP into an $800K recurring offer" register={register}
          source={<><a href="https://docs.mindpal.space/guides/embedding" target="_blank" rel="noreferrer">Embedding</a> · <a href="https://docs.mindpal.space/guides/audience-memory" target="_blank" rel="noreferrer">audience memory</a></>}>
          <div className="portal-layout">
            <div className="portal-mockup"><div className="portal-head"><span className="status-dot" /> CLIENT EXPERTISE PORTAL <small>Acme transformation advisor</small></div><div className="question">How should we sequence the next 90 days?</div><div className="answer"><b>Start with the two workstreams that unblock value: operating model and data readiness.</b><span>I used your transformation roadmap, governance playbook and the latest steering notes. Open the evidence trail or generate a 90-day plan.</span></div><p>Branded · personalized · governed · available 24/7</p></div>
            <div className="portal-economics"><div className="portal-math"><strong>10 accounts</strong><span>×</span><strong>$80K ACV</strong></div><h2>$800K modeled ARR</h2>{[["LAND", "Include 60 days after project close"], ["EXPAND", "Convert to paid expertise portal"], ["RENEW", "Add modules from usage insights"]].map(([a,b]) => <article key={a}><small>{a}</small><b>{b}</b></article>)}</div>
          </div>
        </Slide>

        <Slide index={8} id="operating-flywheel" eyebrow="OPERATING FLYWHEEL" title="The three agents reinforce acquisition, delivery and expansion" register={register}>
          <p className="lede muted">Each workflow produces both an immediate P&L result and reusable knowledge for the next workflow.</p>
          <div className="flywheel-grid">
            {[["Pursuit Architect", "Wins work faster", "Proposal cycle · Senior pursuit hours"], ["Delivery Copilot", "Expands throughput", "Hours returned · Rework and realization"], ["Expertise Portal", "Creates attach revenue", "Annual contract value · Active client users"]].map(([a,b,c], i) => <article key={a}><span className="blue-dot" /><h2>{a}</h2><h3>{b}</h3><p><small>KPI</small>{c}</p>{i < 2 && <i>→</i>}</article>)}
          </div>
          <div className="flywheel-ribbon"><small>USAGE SIGNALS</small><b>better templates → stronger evidence → sharper methods → higher win rate on the next pursuit</b><span>The flywheel compounds only when outputs, edits and proof points are captured—not when AI lives in ad-hoc chats.</span></div>
        </Slide>

        <Slide index={9} id="value-case" eyebrow="VALUE CASE" title="The modeled upside is $2.60M of annual value and $1.82M of EBITDA" register={register}
          source="Illustrative: 60% contribution on capacity revenue, 70% on portal revenue; excludes unmonetized time.">
          <div className="value-layout">
            <div className="bar-chart" aria-label="Annual value by lever: capacity 1.35 million dollars, portal 0.8 million dollars, cost avoidance 0.45 million dollars"><small>ANNUAL VALUE BY LEVER · $M</small><div className="bars"><div><b style={{ height: "90%" }}><span>$1.35M</span></b><em>Capacity</em></div><div><b style={{ height: "53%" }}><span>$0.80M</span></b><em>Portal</em></div><div><b style={{ height: "30%" }}><span>$0.45M</span></b><em>Cost avoidance</em></div></div></div>
            <div className="value-stats"><article><strong>$1.82M</strong><h2>modeled EBITDA</h2><p>$0.81M capacity + $0.56M portal + $0.45M cost avoidance</p></article><article><strong>+3.6 pts</strong><h2>EBITDA margin</h2><p>$1.82M ÷ $50M BU revenue</p></article><article><strong className="blue">5.2×</strong><h2>first-year EBITDA ROI</h2><p>$1.82M EBITDA ÷ $350K program investment</p></article></div>
          </div>
        </Slide>

        <Slide index={10} id="evidence" eyebrow="EVIDENCE" title="Traction lowers platform risk; the lighthouse proves our P&L case" register={register}
          source={<><a href="https://mindpal.space/customer-success" target="_blank" rel="noreferrer">Customer success</a> · <a href="https://www.indiehackers.com/post/hitting-500k-arr-in-two-years-by-staying-close-to-her-customers-S0ugOp2P1tjxWacN3A7V" target="_blank" rel="noreferrer">Indie Hackers, 15 May 2025</a></>}>
          <p className="lede muted">External traction lowers platform risk. It does not replace a measured business case in this BU.</p>
          <div className="metric-grid four"><MetricCard value="50K+" label="builders" detail="MindPal homepage, self-reported" /><MetricCard value="3K+" label="businesses" detail="MindPal customer-success page, self-reported" /><MetricCard value="1K+" label="free workflows" detail="MindPal template gallery, self-reported" /><MetricCard value="$500K" label="ARR in <2 years" detail="Founder-disclosed in Indie Hackers" /></div>
          <div className="dark-ribbon">Investment posture: trust the platform enough to test—trust only instrumented outcomes enough to scale.</div>
        </Slide>

        <Slide index={11} id="risk-control" eyebrow="RISK & CONTROL" title="Governed digital labor is the operating model—not a feature checklist" register={register}
          source={<><a href="https://mindpal.space/data-security" target="_blank" rel="noreferrer">MindPal Data Security</a> · MindPal workflow, user-ID and rate-limit documentation</>}>
          <p className="lede muted">Controls sit inside each workflow, with named human owners and measurable exit criteria.</p>
          <div className="control-grid">{[["DATA", "No training on uploaded data; encryption in transit and at rest; enterprise DPA available."], ["ACCESS", "Member management, custom user IDs, rate limits and least-privilege integration design."], ["QUALITY", "Evaluator–optimizer, gates, supervised runs and human approval before consequential outputs."], ["OPERATIONS", "Public API, webhooks, schedules, usage limits and run-level visibility for controlled scale."]].map(([a,b]) => <article key={a}><Tag>{a}</Tag><p>{b}</p></article>)}</div>
          <div className="prelive"><small>PRE-LIVE GATES</small><b>DPA · data map · role design · retention · human approval · incident path</b></div>
        </Slide>

        <Slide index={12} id="rollout" eyebrow="ROLLOUT" title="Prove value in 90 days; scale only when the metrics clear the bar" register={register}
          source="Core team: BU sponsor + 3 workflow owners + IT/security + PAL engineer/change lead.">
          <div className="timeline-grid">{[
            ["DAYS 0–30", "DESIGN", ["Baseline economics and 3 workflows", "Map data, access and controls", "Build v1 and acceptance rubrics"], "GATE 1", "Security signoff + ≥80% task-eval pass"],
            ["DAYS 31–60", "PROVE", ["25 users on live internal work", "Weekly QA and value dashboard", "Refine knowledge and evaluators"], "GATE 2", "≥70% WAU + ≥95% QA pass"],
            ["DAYS 61–90", "SCALE DECISION", ["2 portal design-partner accounts", "Validate ACV, usage and time saved", "Final ROI + scale/no-scale review"], "GATE 3", "≥$1M annualized value + zero critical incidents"],
          ].map(([days, heading, items, gate, condition]) => <article key={String(days)}><Tag>{String(days)}</Tag><h2>{String(heading)}</h2><BulletList items={items as string[]} /><small>{String(gate)}</small><b>{String(condition)}</b></article>)}</div>
          <div className="timeline-line"><span>DAY 0</span><span>DAY 30</span><span>DAY 60</span><span>DAY 90</span></div>
        </Slide>

        <Slide index={13} id="ask" eyebrow="THE ASK" title="Approve $150K now; scale only if the day-90 gates are met" register={register}
          source="Turn expertise from a headcount constraint into a compounding P&L asset.">
          <div className="ask-grid"><article><Tag>APPROVE TODAY</Tag><strong>$150K</strong><h2>90-day pilot budget</h2><BulletList items={["GM sponsor and weekly steering", "3 workflow owners + 25 pilot users", "Sanitized knowledge and integration access", "2 client design-partner introductions"]} /></article><article><Tag>PAL COMMITS</Tag><div className="commit"><strong>3</strong><h2>production-grade agent workflows</h2></div><BulletList items={["Governance pack and evaluation suite", "Weekly P&L dashboard", "Client portal prototype", "Scale/no-scale recommendation on day 90"]} /></article></div>
          <div className="final-ribbon"><div><strong>Release the $200K scale tranche only if the gates are met.</strong><span>200 users · 3 more workflows · portal launch</span></div><button onClick={() => window.location.href = "mailto:?subject=PAL%2090-day%20lighthouse&body=I%20would%20like%20to%20discuss%20the%20PAL%2090-day%20lighthouse."}>DECIDE NOW</button></div>
        </Slide>
      </div>

      <nav className="deck-nav" aria-label="Slide navigation">
        <button onClick={() => goTo(active - 1)} disabled={active === 0} aria-label="Previous slide">←</button>
        <div className="progress-track" aria-hidden="true"><span style={{ width: `${((active + 1) / TOTAL_SLIDES) * 100}%` }} /></div>
        <button onClick={() => goTo(active + 1)} disabled={active === TOTAL_SLIDES - 1} aria-label="Next slide">→</button>
      </nav>
    </main>
  );
}
