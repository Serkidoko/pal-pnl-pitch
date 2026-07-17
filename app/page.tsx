const sources = {
  quickStart: "https://docs.mindpal.space/",
  knowledge: "https://docs.mindpal.space/agent/knowledge-sources",
  embedding: "https://docs.mindpal.space/guides/embedding",
  memory: "https://docs.mindpal.space/guides/audience-memory",
  brandVoice: "https://docs.mindpal.space/agent/brand-voice",
  privacy: "https://mindpal.space/privacy-policy",
  terms: "https://mindpal.space/terms-of-service",
} as const;

type SourceLinkProps = {
  href: string;
  children: React.ReactNode;
};

function SourceLink({ href, children }: SourceLinkProps) {
  return (
    <a className="source-link" href={href} target="_blank" rel="noreferrer">
      {children}<span aria-hidden="true">↗</span>
    </a>
  );
}

function SectionHeading({
  label,
  title,
  copy,
}: {
  label: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="section-heading">
      <p className="section-label">{label}</p>
      <h2>{title}</h2>
      <p>{copy}</p>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="PAL evidence-safe draft home">
          <span className="brand-mark" aria-hidden="true" />
          <span>PAL</span>
        </a>
        <nav aria-label="Page navigation">
          <a href="#capabilities">Verified capabilities</a>
          <a href="#measurement">Value model</a>
          <a href="#inputs">Inputs required</a>
        </nav>
        <span className="draft-badge">Evidence-safe draft</span>
      </header>

      <section className="hero" id="top">
        <div className="hero-copy">
          <p className="kicker">PAL FOR A CORPORATE P&amp;L</p>
          <h1>Evaluate AI against one real workflow—and one accountable P&amp;L.</h1>
          <p className="hero-intro">
            This working draft contains only product capabilities traceable to
            MindPal&apos;s official documentation. The target business unit, value case,
            use cases and commercial ask remain intentionally unfilled until the P&amp;L
            owner supplies or approves the evidence.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#capabilities">Review the evidence</a>
            <a className="secondary-action" href="#inputs">See what is still required</a>
          </div>
        </div>

        <aside className="accuracy-panel" aria-label="Accuracy commitments">
          <p className="panel-label">PUBLICATION STANDARD</p>
          <h2>Nothing is presented as true without a source.</h2>
          <ul>
            <li>No estimated savings or revenue</li>
            <li>No fictional customers or outcomes</li>
            <li>No generated product screenshots</li>
            <li>No assumed pilot budget or timeline</li>
          </ul>
          <p className="panel-note">
            Missing business information is shown as missing—not converted into a claim.
          </p>
        </aside>
      </section>

      <section className="identity-warning" aria-label="Product identity notice">
        <strong>Identity confirmation required</strong>
        <p>
          The supplied product links describe MindPal. The relationship between the
          name <b>PAL</b> and MindPal has not yet been confirmed, so this draft does not
          claim they are the same brand or legal product.
        </p>
      </section>

      <section className="content-section" id="capabilities">
        <SectionHeading
          label="01 · VERIFIED CAPABILITIES"
          title="What MindPal’s official documentation supports"
          copy="Each statement below is deliberately narrow. The links lead to the primary product documentation used for the statement."
        />

        <div className="capability-grid">
          <article className="capability-card">
            <span className="card-index">01</span>
            <h3>Agents and multi-agent workflows</h3>
            <p>
              MindPal documents a platform for building AI agents and multi-agent
              workflows, including information sharing through variables and human
              checkpoints for important decisions.
            </p>
            <SourceLink href={sources.quickStart}>Quick Start Guide</SourceLink>
          </article>

          <article className="capability-card">
            <span className="card-index">02</span>
            <h3>Organization-specific knowledge</h3>
            <p>
              Agents can be assigned knowledge sources made from uploaded files,
              websites or URLs, and editable notes. MindPal describes semantic retrieval
              of relevant content for agent responses.
            </p>
            <SourceLink href={sources.knowledge}>Knowledge Sources</SourceLink>
          </article>

          <article className="capability-card">
            <span className="card-index">03</span>
            <h3>Published and embedded experiences</h3>
            <p>
              Published chatbots and workflows can be shared by direct link or embedded
              into a website. The documentation describes appearance, access and
              security configuration options.
            </p>
            <SourceLink href={sources.embedding}>Embedding Guide</SourceLink>
          </article>

          <article className="capability-card">
            <span className="card-index">04</span>
            <h3>User-aware continuity</h3>
            <p>
              Audience Memory can use a custom user ID to recognize returning users and
              restore conversation or workflow history. Session context is documented as
              a separate mechanism for current user or account information.
            </p>
            <SourceLink href={sources.memory}>Audience Memory</SourceLink>
          </article>

          <article className="capability-card">
            <span className="card-index">05</span>
            <h3>Brand voice guidance</h3>
            <p>
              Brand Voice settings are documented as guidelines added to an agent&apos;s
              system prompt to help outputs follow an organization&apos;s communication style.
            </p>
            <SourceLink href={sources.brandVoice}>Brand Voice</SourceLink>
          </article>

          <article className="capability-card caution-card">
            <span className="card-index">06</span>
            <h3>AI output still requires review</h3>
            <p>
              MindPal&apos;s Terms state that AI outputs may contain inaccuracies, errors or
              omissions. This page therefore does not position PAL as an autonomous
              decision-maker for consequential P&amp;L actions.
            </p>
            <SourceLink href={sources.terms}>Terms of Service</SourceLink>
          </article>
        </div>

        <div className="capability-pattern" aria-label="Documented capability pattern, not a deployed workflow">
          <div>
            <small>BUSINESS INPUT</small>
            <strong>Files · URLs · instructions</strong>
          </div>
          <span aria-hidden="true">→</span>
          <div>
            <small>DOCUMENTED PLATFORM</small>
            <strong>Agents · workflow · variables</strong>
          </div>
          <span aria-hidden="true">→</span>
          <div>
            <small>CONTROL POINT</small>
            <strong>Human checkpoint</strong>
          </div>
          <span aria-hidden="true">→</span>
          <div>
            <small>OUTPUT</small>
            <strong>Defined by the P&amp;L owner</strong>
          </div>
        </div>
        <p className="diagram-note">
          Capability pattern assembled from the official Quick Start and Knowledge Sources documentation. It is not a deployed customer workflow.
        </p>
      </section>

      <section className="content-section measurement-section" id="measurement">
        <SectionHeading
          label="02 · VALUE MEASUREMENT"
          title="The business case will be calculated from approved baselines"
          copy="These formulas define how a pilot can be evaluated. They contain no assumed values and make no promise of outcome."
        />

        <div className="formula-grid">
          <article>
            <p className="formula-label">COST SAVED</p>
            <div className="formula-text">
              <strong>Verified labor removed</strong>
              <span>×</span>
              <strong>Approved loaded cost</strong>
            </div>
            <p>Requires a measured before/after time study and a finance-approved cost basis.</p>
          </article>
          <article>
            <p className="formula-label">REVENUE UNLOCKED</p>
            <div className="formula-text">
              <strong>Measured added throughput</strong>
              <span>×</span>
              <strong>Approved contribution per unit</strong>
            </div>
            <p>Requires evidence that the additional capacity converts into actual demand or sales.</p>
          </article>
          <article>
            <p className="formula-label">SPEED GAINED</p>
            <div className="formula-text">
              <strong>Baseline cycle time</strong>
              <span>−</span>
              <strong>Measured pilot cycle time</strong>
            </div>
            <p>Requires the same workflow boundary and quality standard before and after the pilot.</p>
          </article>
        </div>
      </section>

      <section className="content-section governance-section">
        <SectionHeading
          label="03 · CONTROL BEFORE SCALE"
          title="Separate documented platform statements from deployment decisions"
          copy="The P&L owner, security team and workflow owner must approve the operating controls; the platform documentation alone is not an enterprise risk assessment."
        />

        <div className="governance-grid">
          <article>
            <p className="panel-label">DOCUMENTED STATEMENTS</p>
            <h3>What the current MindPal policies say</h3>
            <ul>
              <li>Customer content is not used to train foundation models by default.</li>
              <li>The privacy policy describes AWS infrastructure and encryption controls.</li>
              <li>The policy identifies retention periods and third-party model providers.</li>
              <li>The Terms explicitly warn that AI outputs may be inaccurate.</li>
            </ul>
            <div className="source-row">
              <SourceLink href={sources.privacy}>Privacy Policy</SourceLink>
              <SourceLink href={sources.terms}>Terms of Service</SourceLink>
            </div>
            <p className="policy-date">Policies reviewed for this draft on 17 July 2026; verify again before procurement.</p>
          </article>

          <article className="proposed-controls">
            <p className="panel-label">PROPOSED P&amp;L GATES</p>
            <h3>What still needs owner approval</h3>
            <ul>
              <li>Named human owner for every consequential output</li>
              <li>Approved data scope, access roles and retention treatment</li>
              <li>Quality rubric and acceptance threshold for the selected workflow</li>
              <li>Incident path, audit evidence and scale/no-scale authority</li>
            </ul>
            <p className="proposal-note">These are proposed deployment requirements—not claims about current PAL functionality.</p>
          </article>
        </div>
      </section>

      <section className="content-section sequence-section">
        <SectionHeading
          label="04 · DECISION SEQUENCE"
          title="No scale decision before the baseline exists"
          copy="Duration, investment and thresholds will be added only after the business owner confirms them."
        />
        <ol className="sequence-list">
          <li><span>01</span><div><h3>Confirm the P&amp;L</h3><p>Name the unit, owner, priority, financial baseline and publication permissions.</p></div></li>
          <li><span>02</span><div><h3>Select one real workflow</h3><p>Document volume, cycle time, labor, quality, systems, data and accountable owner.</p></div></li>
          <li><span>03</span><div><h3>Run a measured pilot</h3><p>Compare the same workflow boundary and quality standard before and after deployment.</p></div></li>
          <li><span>04</span><div><h3>Make a finance-owned decision</h3><p>Scale only against thresholds approved before the pilot begins.</p></div></li>
        </ol>
      </section>

      <section className="input-section" id="inputs">
        <div>
          <p className="section-label">05 · INPUTS REQUIRED</p>
          <h2>The evidence needed to complete this P&amp;L landing page</h2>
          <p>
            Until these inputs are supplied, the final value proposition, workflow use
            cases and ask cannot be written accurately.
          </p>
        </div>
        <div className="input-grid">
          {[
            ["Product identity", "Official definition of PAL and its relationship to MindPal"],
            ["Named P&L", "Corporation, business unit, geography, currency and decision-maker"],
            ["Priority", "The measurable business problem and why it matters now"],
            ["Real workflows", "Two or three processes with owners, volume, time, cost and systems"],
            ["Approved economics", "Finance baselines and calculation rules allowed for publication"],
            ["Commercial decision", "Pilot scope, duration, budget, success gates and scale authority"],
            ["Evidence assets", "Approved logo, real product screenshots and customer proof"],
            ["Language", "Final page language, tone and publication audience"],
          ].map(([title, copy]) => (
            <article key={title}>
              <span aria-hidden="true" />
              <div><h3>{title}</h3><p>{copy}</p></div>
            </article>
          ))}
        </div>
      </section>

      <footer>
        <div className="footer-brand"><span className="brand-mark" aria-hidden="true" /> PAL</div>
        <p>Evidence-safe working draft · no business outcome claims · no fictional customer proof</p>
        <a href="#top">Back to top ↑</a>
      </footer>
    </main>
  );
}
