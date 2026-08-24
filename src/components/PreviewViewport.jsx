import React, {
  useMemo,
  useRef,
  useState,
} from "react";

import {
  ArrowLeft,
  Code2,
  ExternalLink,
  Maximize2,
  Minus,
  Monitor,
  RotateCcw,
  Smartphone,
  Tablet,
  Copy,
  Check,
} from "lucide-react";

export default function PreviewViewport({
  template,
  mode,
  setMode,
  onBack,
}) {
  const [device, setDevice] =
    useState("desktop");

  const [zoom, setZoom] =
    useState(100);

  const [copied, setCopied] =
    useState(false);

  const previewRef = useRef(null);

  const data = useMemo(() => {
    return template;
  }, [template]);

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(
        template.code
      );

      setCopied(true);

      setTimeout(
        () => setCopied(false),
        1400
      );
    } catch {
      // Clipboard unavailable.
    }
  };

  const reload = () => {
    if (previewRef.current) {
      previewRef.current.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <section className="
      h-full
      w-full
      bg-[#020203]
      flex
      flex-col
      technical-grid
    ">
      <div className="
        h-12
        shrink-0
        border-b
        border-white/[.06]
        bg-[#060607]/95
        backdrop-blur-xl
        flex
        items-center
        justify-between
        px-3
      ">
        <div className="flex items-center gap-1">
          <button
            onClick={onBack}
            className="
              w-8
              h-8
              rounded-lg
              grid
              place-items-center
              text-zinc-600
              hover:text-white
              hover:bg-white/[.04]
            "
          >
            <ArrowLeft size={14} />
          </button>

          <div className="h-4 w-px bg-white/[.06] mx-2" />

          <button
            onClick={() => setMode("preview")}
            className={`
              h-7
              px-3
              rounded-lg
              text-[10px]
              flex
              items-center
              gap-1.5
              ${
                mode === "preview"
                  ? "bg-white/[.07] text-white"
                  : "text-zinc-700 hover:text-zinc-300"
              }
            `}
          >
            <Monitor size={11} />
            Preview
          </button>

          <button
            onClick={() => setMode("code")}
            className={`
              h-7
              px-3
              rounded-lg
              text-[10px]
              flex
              items-center
              gap-1.5
              ${
                mode === "code"
                  ? "bg-white/[.07] text-white"
                  : "text-zinc-700 hover:text-zinc-300"
              }
            `}
          >
            <Code2 size={11} />
            Code
          </button>
        </div>

        <div className="flex items-center gap-1">
          {[
            [Monitor, "desktop"],
            [Tablet, "tablet"],
            [Smartphone, "mobile"],
          ].map(([Icon, value]) => (
            <button
              key={value}
              onClick={() =>
                setDevice(value)
              }
              className={`
                w-8
                h-8
                rounded-lg
                grid
                place-items-center
                ${
                  device === value
                    ? "bg-white/[.07] text-white"
                    : "text-zinc-700 hover:text-zinc-300"
                }
              `}
            >
              <Icon size={13} />
            </button>
          ))}

          <div className="h-4 w-px bg-white/[.06] mx-1" />

          <button
            onClick={() =>
              setZoom((value) =>
                Math.max(60, value - 10)
              )
            }
            className="w-8 h-8 grid place-items-center text-zinc-700 hover:text-white"
          >
            <Minus size={12} />
          </button>

          <span className="w-9 text-center text-[9px] text-zinc-600">
            {zoom}%
          </span>

          <button
            onClick={() =>
              setZoom((value) =>
                Math.min(120, value + 10)
              )
            }
            className="w-8 h-8 grid place-items-center text-zinc-700 hover:text-white"
          >
            +
          </button>

          <button
            onClick={reload}
            className="w-8 h-8 grid place-items-center text-zinc-700 hover:text-white"
          >
            <RotateCcw size={12} />
          </button>

          <button
            className="hidden sm:grid w-8 h-8 place-items-center text-zinc-700 hover:text-white"
          >
            <Maximize2 size={12} />
          </button>
        </div>
      </div>

      {mode === "code" ? (
        <CodeWorkspace
          template={template}
          copied={copied}
          onCopy={copyCode}
        />
      ) : (
        <div
          ref={previewRef}
          className="
            flex-1
            overflow-auto
            p-4
            md:p-8
            flex
            justify-center
            items-start
          "
        >
          <div
            className={`
              shrink-0
              transition-[width]
              duration-500
              ease-[cubic-bezier(.22,1,.36,1)]
              ${
                device === "mobile"
                  ? "w-[390px]"
                  : device === "tablet"
                  ? "w-[820px]"
                  : "w-full max-w-[1280px]"
              }
            `}
          >
            <div
              className="
                origin-top
                rounded-2xl
                overflow-hidden
                border
                border-white/[.1]
                bg-[#080809]
                shadow-[0_40px_120px_rgba(0,0,0,.6)]
              "
              style={{
                zoom: zoom / 100,
              }}
            >
              <BrowserChrome
                title={data.name}
              />

              <GeneratedSite
                template={template}
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function BrowserChrome({ title }) {
  return (
    <div className="
      h-9
      border-b
      border-white/[.06]
      bg-[#0b0b0d]
      flex
      items-center
      gap-1.5
      px-3
    ">
      <span className="w-2 h-2 rounded-full bg-[#242428]" />
      <span className="w-2 h-2 rounded-full bg-[#242428]" />
      <span className="w-2 h-2 rounded-full bg-[#242428]" />

      <div className="
        flex-1
        max-w-[520px]
        mx-auto
        h-6
        rounded-md
        bg-[#101012]
        flex
        items-center
        justify-center
        text-[8px]
        text-zinc-700
      ">
        localhost / {title.toLowerCase().replaceAll(" ", "-")}
      </div>

      <ExternalLink
        size={11}
        className="text-zinc-700"
      />
    </div>
  );
}

function GeneratedSite({ template }) {
  const isCrypto =
    template.preview === "crypto";

  const isSecurity =
    template.preview === "security";

  const title = template.name;

  return (
    <div className="
      min-h-[900px]
      bg-[#080809]
      text-white
      p-6
      md:p-10
    ">
      <header className="
        h-12
        flex
        items-center
        justify-between
        border-b
        border-white/[.06]
      ">
        <div className="font-semibold text-sm">
          {title}
        </div>

        <nav className="
          hidden
          md:flex
          gap-6
          text-[9px]
          text-zinc-600
        ">
          <span>Overview</span>
          <span>Analytics</span>
          <span>Activity</span>
          <span>Settings</span>
        </nav>

        <div className="
          w-7
          h-7
          rounded-full
          bg-[#b7ff2a]/[.08]
          border
          border-[#b7ff2a]/[.13]
        " />
      </header>

      <main className="pt-12">
        <div className="flex items-end justify-between gap-8">
          <div>
            <div className="text-[9px] uppercase tracking-[.2em] text-zinc-700">
              {isSecurity
                ? "Threat operations"
                : isCrypto
                ? "Markets / overview"
                : "Growth / overview"}
            </div>

            <h1 className="
              mt-4
              text-4xl
              md:text-6xl
              font-medium
              tracking-[-.055em]
            ">
              {isSecurity
                ? "03 critical signals"
                : isCrypto
                ? "$8,421,904"
                : "$284,921"}
            </h1>

            <div className="
              mt-3
              flex
              items-center
              gap-2
              text-[10px]
              text-zinc-600
            ">
              <span className="
                w-1.5
                h-1.5
                rounded-full
                bg-[#b7ff2a]
              />

              {isSecurity
                ? "99.98% systems operational"
                : isCrypto
                ? "+12.84% this month"
                : "+18.2% vs last month"}
            </div>
          </div>

          <button className="
            hidden
            sm:flex
            h-9
            px-4
            rounded-lg
            bg-[#b7ff2a]
            text-black
            text-[9px]
            font-semibold
          ">
            {isSecurity
              ? "Investigate"
              : "View details"}
          </button>
        </div>

        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-3
          mt-12
        ">
          {(isSecurity
            ? [
                ["Endpoints", "14,208", "98.4% healthy"],
                ["Incidents", "27", "6 investigating"],
                ["Risk score", "18.4", "Low exposure"],
              ]
            : isCrypto
            ? [
                ["BTC", "$118,420", "+4.82%"],
                ["ETH", "$4,281", "+2.31%"],
                ["USDC", "$2.41M", "Stable"],
              ]
            : [
                ["Customers", "12,482", "+8.1%"],
                ["Activation", "64.8%", "+3.4%"],
                ["Churn", "1.82%", "-0.24%"],
              ]
          ).map(([label, value, sub]) => (
            <div
              key={label}
              className="
                rounded-xl
                border
                border-white/[.07]
                bg-white/[.018]
                p-5
              "
            >
              <div className="text-[9px] text-zinc-700">
                {label}
              </div>

              <div className="
                mt-4
                text-2xl
                font-medium
                tracking-tight
              ">
                {value}
              </div>

              <div className="mt-2 text-[9px] text-zinc-600">
                {sub}
              </div>
            </div>
          ))}
        </div>

        <div className="
          mt-4
          rounded-xl
          border
          border-white/[.07]
          bg-white/[.015]
          overflow-hidden
        ">
          <div className="
            px-5
            py-4
            border-b
            border-white/[.06]
            text-[9px]
            uppercase
            tracking-[.18em]
            text-zinc-700
          ">
            {isSecurity
              ? "Threat activity"
              : "Performance"}
          </div>

          <div className="h-[310px] relative p-5">
            <div className="
              absolute
              inset-x-5
              bottom-8
              h-px
              bg-white/[.05]
            />

            <div className="
              absolute
              inset-x-5
              bottom-8
              h-[210px]
              bg-[linear-gradient(to_top,rgba(183,255,42,.025),transparent)]
              [clip-path:polygon(0_82%,8%_70%,17%_76%,27%_51%,38%_61%,49%_38%,59%_49%,70%_25%,81%_36%,91%_15%,100%_5%,100%_100%,0_100%)]
            " />

            <svg
              viewBox="0 0 1000 220"
              preserveAspectRatio="none"
              className="
                absolute
                inset-x-5
                bottom-8
                w-[calc(100%-40px)]
                h-[210px]
              "
            >
              <path
                d="M0 180 C90 160 120 170 190 140 S300 155 360 120 S470 130 530 90 S630 110 700 68 S800 92 860 45 S930 55 1000 20"
                fill="none"
                stroke="#b7ff2a"
                strokeOpacity=".7"
                strokeWidth="2"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>

        <div className="
          mt-4
          grid
          grid-cols-1
          md:grid-cols-2
          gap-4
        ">
          <div className="h-40 rounded-xl border border-white/[.07] bg-white/[.015]" />
          <div className="h-40 rounded-xl border border-white/[.07] bg-white/[.015]" />
        </div>
      </main>
    </div>
  );
}

function CodeWorkspace({
  template,
  copied,
  onCopy,
}) {
  return (
    <div className="
      flex-1
      overflow-auto
      p-4
      md:p-8
    ">
      <div className="
        max-w-[1100px]
        mx-auto
        rounded-2xl
        border
        border-white/[.07]
        bg-[#080809]
        overflow-hidden
        shadow-2xl
      ">
        <div className="
          h-11
          border-b
          border-white/[.06]
          px-4
          flex
          items-center
          justify-between
        ">
          <div className="flex items-center gap-2">
            <Code2
              size={13}
              className="text-[#b7ff2a]"
            />

            <span className="text-[9px] text-zinc-500 font-mono">
              generated/App.jsx
            </span>
          </div>

          <button
            onClick={onCopy}
            className="
              h-7
              px-2.5
              rounded-lg
              border
              border-white/[.06]
              text-[9px]
              text-zinc-600
              hover:text-white
              flex
              items-center
              gap-1.5
            "
          >
            {copied ? (
              <Check size={11} />
            ) : (
              <Copy size={11} />
            )}

            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <pre className="
          p-5
          md:p-7
          text-[11px]
          leading-6
          font-mono
          text-zinc-400
          overflow-auto
          whitespace-pre
        ">
          <code>{template.code}</code>
        </pre>
      </div>
    </div>
  );
        }
