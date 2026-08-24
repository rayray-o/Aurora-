export const mockTemplates = {
  crypto: {
    name: "Nova Capital",

    description:
      "Institutional digital asset intelligence terminal.",

    accent: "#ff1232",

    preview: "crypto",

    code: `import React from "react";

export default function Dashboard() {
  return (
    <main className="dashboard">

      <header className="navigation">
        <span>Nova Capital</span>

        <nav>
          <span>Markets</span>
          <span>Portfolio</span>
          <span>Research</span>
        </nav>
      </header>

      <section className="hero">

        <p>Total portfolio value</p>

        <h1>
          $8,421,904.28
        </h1>

        <span className="positive">
          +12.84% this month
        </span>

      </section>

      <section className="metrics">

        <article>
          <span>BTC</span>
          <strong>$118,420</strong>
          <small>+4.82%</small>
        </article>

        <article>
          <span>ETH</span>
          <strong>$4,281</strong>
          <small>+2.31%</small>
        </article>

        <article>
          <span>USDC</span>
          <strong>$2.41M</strong>
          <small>Stable</small>
        </article>

      </section>

      <section className="chart">
        <span>Portfolio performance</span>
      </section>

    </main>
  );
}`,
  },

  security: {
    name: "Sentinel Security",

    description:
      "Cybersecurity command and incident intelligence center.",

    accent: "#ff1232",

    preview: "security",

    code: `import React from "react";

export default function Sentinel() {
  return (
    <main className="dashboard">

      <header className="navigation">
        <span>Sentinel Security</span>

        <nav>
          <span>Overview</span>
          <span>Incidents</span>
          <span>Assets</span>
        </nav>
      </header>

      <section className="hero">

        <p>Active threat surface</p>

        <h1>
          03 critical signals
        </h1>

        <span className="positive">
          99.98% systems operational
        </span>

      </section>

      <section className="metrics">

        <article>
          <span>Endpoints</span>
          <strong>14,208</strong>
          <small>98.4% healthy</small>
        </article>

        <article>
          <span>Incidents</span>
          <strong>27</strong>
          <small>6 investigating</small>
        </article>

        <article>
          <span>Risk score</span>
          <strong>18.4</strong>
          <small>Low exposure</small>
        </article>

      </section>

      <section className="chart">
        <span>Threat activity</span>
      </section>

    </main>
  );
}`,
  },

  saas: {
    name: "Atlas",

    description:
      "Clean analytics workspace for a modern SaaS company.",

    accent: "#ff1232",

    preview: "saas",

    code: `import React from "react";

export default function Atlas() {
  return (
    <main className="dashboard">

      <header className="navigation">
        <span>Atlas</span>

        <nav>
          <span>Overview</span>
          <span>Customers</span>
          <span>Revenue</span>
        </nav>
      </header>

      <section className="hero">

        <p>Monthly recurring revenue</p>

        <h1>
          $284,921
        </h1>

        <span className="positive">
          +18.2% vs last month
        </span>

      </section>

      <section className="metrics">

        <article>
          <span>Customers</span>
          <strong>12,482</strong>
          <small>+8.1%</small>
        </article>

        <article>
          <span>Activation</span>
          <strong>64.8%</strong>
          <small>+3.4%</small>
        </article>

        <article>
          <span>Churn</span>
          <strong>1.82%</strong>
          <small>-0.24%</small>
        </article>

      </section>

      <section className="chart">
        <span>Revenue performance</span>
      </section>

    </main>
  );
}`,
  },
};

export function resolveTemplate(prompt = "") {
  const input = prompt.toLowerCase();

  if (
    /(crypto|bitcoin|ethereum|blockchain|trading|defi)/.test(
      input
    )
  ) {
    return mockTemplates.crypto;
  }

  if (
    /(security|cyber|threat|soc|incident|malware|zero trust)/.test(
      input
    )
  ) {
    return mockTemplates.security;
  }

  return mockTemplates.saas;
}
