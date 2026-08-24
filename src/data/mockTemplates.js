export const mockTemplates = {
  saas: {
    name: "Atlas",
    description:
      "Modern SaaS analytics workspace.",
    accent: "#b7ff2a",
    preview: "saas",

    code: `import React from "react";

export default function Atlas() {
  const metrics = [
    ["Customers", "12,482", "+8.1%"],
    ["Activation", "64.8%", "+3.4%"],
    ["Churn", "1.82%", "-0.24%"],
  ];

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <header className="flex justify-between">
        <strong>Atlas</strong>
        <nav>Overview · Customers · Revenue</nav>
      </header>

      <section className="py-20">
        <span>MONTHLY RECURRING REVENUE</span>
        <h1>$284,921</h1>
        <p>+18.2% vs last month</p>
      </section>

      <section className="grid grid-cols-3 gap-4">
        {metrics.map(([label, value, change]) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{change}</small>
          </article>
        ))}
      </section>
    </main>
  );
}`,
  },

  crypto: {
    name: "Nova Capital",
    description:
      "Institutional digital asset intelligence terminal.",
    accent: "#b7ff2a",
    preview: "crypto",

    code: `import React from "react";

export default function NovaCapital() {
  const assets = [
    ["BTC", "$118,420", "+4.82%"],
    ["ETH", "$4,281", "+2.31%"],
    ["USDC", "$2.41M", "Stable"],
  ];

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <header className="flex justify-between">
        <strong>Nova Capital</strong>
        <nav>Markets · Portfolio · Research</nav>
      </header>

      <section className="py-20">
        <span>TOTAL PORTFOLIO VALUE</span>
        <h1>$8,421,904.28</h1>
        <p>+12.84% this month</p>
      </section>

      <section className="grid grid-cols-3 gap-4">
        {assets.map(([symbol, price, change]) => (
          <article key={symbol}>
            <span>{symbol}</span>
            <strong>{price}</strong>
            <small>{change}</small>
          </article>
        ))}
      </section>
    </main>
  );
}`,
  },

  security: {
    name: "Sentinel Security",
    description:
      "Cybersecurity command and incident intelligence center.",
    accent: "#b7ff2a",
    preview: "security",

    code: `import React from "react";

export default function Sentinel() {
  const signals = [
    ["Endpoints", "14,208", "98.4% healthy"],
    ["Incidents", "27", "6 investigating"],
    ["Risk score", "18.4", "Low exposure"],
  ];

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <header className="flex justify-between">
        <strong>Sentinel Security</strong>
        <nav>Overview · Incidents · Assets</nav>
      </header>

      <section className="py-20">
        <span>ACTIVE THREAT SURFACE</span>
        <h1>03 critical signals</h1>
        <p>99.98% systems operational</p>
      </section>

      <section className="grid grid-cols-3 gap-4">
        {signals.map(([label, value, status]) => (
          <article key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
            <small>{status}</small>
          </article>
        ))}
      </section>
    </main>
  );
}`,
  },
};

export function resolveTemplate(prompt = "") {
  const input = prompt.toLowerCase();

  if (
    /(crypto|bitcoin|ethereum|blockchain|trading|defi|wallet|token)/.test(
      input
    )
  ) {
    return mockTemplates.crypto;
  }

  if (
    /(security|cyber|threat|soc|incident|malware|zero trust|firewall|siem)/.test(
      input
    )
  ) {
    return mockTemplates.security;
  }

  return mockTemplates.saas;
}
