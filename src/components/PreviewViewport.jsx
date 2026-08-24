import React, { useMemo, useState } from "react";
import {
  Code2,
  ExternalLink,
  Maximize2,
  Minus,
  Monitor,
  MousePointer2,
  Plus,
  RotateCw,
  Smartphone,
  Tablet,
} from "lucide-react";

const palettes = {
  crypto: {
    title: "Nova Capital",
    tag: "MARKETS / OVERVIEW",
    metric: "$8,421,904.28",
    change: "+12.84% this month",
    cards: [
      ["BTC", "$118,420", "+4.82%"],
      ["ETH", "$4,281", "+2.31%"],
      ["USDC", "$2.41M", "Stable"],
    ],
  },

  security: {
    title: "Sentinel Security",
    tag: "THREAT OPERATIONS",
    metric: "03 critical signals",
    change: "99.98% systems operational",
    cards: [
      ["Endpoints", "14,208", "98.4% healthy"],
      ["Incidents", "27", "6 investigating"],
      ["Risk score", "18.4", "Low exposure"],
    ],
  },

  saas: {
    title: "Atlas",
    tag: "GROWTH / OVERVIEW",
    metric: "$284,921",
    change: "+18.2% vs last month",
    cards: [
      ["Customers", "12,482", "+8.1%"],
      ["Activation", "64.8%", "+3.4%"],
      ["Churn", "1.82%", "-0.24%"],
    ],
  },
};

export default function PreviewViewport({
  template,
  mode,
  setMode,
}) {
  const [device, setDevice] = useState("desktop");
  const [zoom, setZoom] = useState(100);

  const data = useMemo(
    () =>
      palettes[template.preview] ||
      palettes.saas,
    [template]
  );

  if (mode === "code") {
    return (
      <section className="flex-1 min-w-0 bg-[#050506] flex flex-col">

        <Toolbar
          device={device}
          setDevice={setDevice}
          zoom={zoom}
          setZoom={setZoom}
          mode={mode}
          setMode={setMode}
        />

        <div className="flex-1 overflow-auto p-6">

          <div className="
            max-w-5xl
            mx-auto
            rounded-xl
            border
            border-[#1e1e21]
            bg-[#09090b]
            overflow-hidden
            shadow-2xl
          ">

            <div className="
              h-10
              px-4
              border-b
              border-[#1e1e21]
              flex
              items-center
              justify-between
            ">

              <div className="flex items-center gap-2">
                <Code2
                  size={12}
                  className="text-[#ff1232]"
                />

                <span className="text-[10px] text-zinc-500 font-mono">
                  src/App.jsx
                </span>
              </div>

              <span className="text-[9px] text-zinc-700 tracking-widest">
                GENERATED SOURCE
              </span>

            </div>

            <pre className="
              p-5
              text-[11px]
              leading-5
              font-mono
              text-zinc-400
              overflow-auto
              whitespace-pre-wrap
            ">
              <code>
                {template.code}
              </code>
            </pre>

          </div>

        </div>

      </section>
    );
  }

  return (
    <section className="
      flex-1
      min-w-0
      bg-[#020203]
      flex
      flex-col
      technical-grid
    ">

      <Toolbar
        device={device}
        setDevice={setDevice}
        zoom={zoom}
        setZoom={setZoom}
        mode={mode}
        setMode={setMode}
      />

      <div className="
        flex-1
        overflow-auto
        p-5
        md:p-8
        flex
        justify-center
      ">

        <div
          className={`
            transition-all
            duration-500
            ease-out

            ${
              device === "mobile"
                ? "w-[390px]"
                : device === "tablet"
                ? "w-[820px]"
                : "w-full max-w-[1240px]"
            }
          `}
        >

          <div
            className="
              rounded-2xl
              border
              border-[#28282d]
              bg-[#09090b]
              shadow-[0_30px_100px_rgba(0,0,0,.6)]
              overflow-hidden
            "
            style={{
              transform: `scale(${zoom / 100})`,
              transformOrigin: "top center",
            }}
          >

            <BrowserChrome data={data} />

            <div className="
              min-h-[620px]
              p-7
              md:p-10
              bg-[#080809]
            ">

              {/* PRODUCT HEADER */}

              <div className="
                flex
                justify-between
                items-center
                border-b
                border-[#1e1e21]
                pb-5
              ">

                <div className="font-semibold text-sm">
                  {data.title}
                </div>

                <div className="
                  text-[9px]
                  tracking-[.18em]
                  text-zinc-600
                ">
                  {data.tag}
                </div>

              </div>

              {/* HERO */}

              <div className="pt-12 pb-10">

                <div className="
                  text-[10px]
                  uppercase
                  tracking-[.18em]
                  text-zinc-600
                ">
                  Primary metric
                </div>

                <div className="
                  mt-3
                  text-4xl
                  md:text-5xl
                  font-semibold
                  tracking-[-.045em]
                ">
                  {data.metric}
                </div>

                <div className="mt-3 text-[10px] text-zinc-500">

                  <span className="text-[#ff1232]">
                    ●
                  </span>

                  {" "}
                  {data.change}

                </div>

              </div>

              {/* METRIC CARDS */}

              <div className="grid md:grid-cols-3 gap-3">

                {data.cards.map(
                  ([label, value, sub]) => (
                    <MetricCard
                      key={label}
                      label={label}
                      value={value}
                      sub={sub}
                    />
                  )
                )}

              </div>

              {/* GRAPH */}

              <div className="
                mt-4
                h-40
                rounded-xl
                border
                border-[#1e1e21]
                bg-[#0b0b0d]
                relative
                overflow-hidden
              ">

                <div className="
                  absolute
                  top-4
                  left-4
                  text-[9px]
                  uppercase
                  tracking-widest
                  text-zinc-700
                ">
                  Activity / 30 days
                </div>

                <svg
                  viewBox="0 0 1000 200"
                  preserveAspectRatio="none"
                  className="
                    absolute
                    inset-x-0
                    bottom-0
                    w-full
                    h-[80%]
                  "
                >
                  <defs>
                    <linearGradient
                      id="chartFill"
                      x1="0"
                      x2="0"
                      y1="0"
                      y2="1"
                    >
                      <stop
                        offset="0%"
                        stopColor="#ff1232"
                        stopOpacity=".12"
                      />

                      <stop
                        offset="100%"
                        stopColor="#ff1232"
                        stopOpacity="0"
                      />
                    </linearGradient>
                  </defs>

                  <path
                    d="
                      M0 170
                      C80 155
                      120 165
                      180 140
                      S280 155
                      340 120
                      S430 135
                      500 90
                      S590 110
                      660 70
                      S760 105
                      830 50
                      S930 65
                      1000 25
                      L1000 200
                      L0 200
                      Z
                    "
                    fill="url(#chartFill)"
                  />

                  <path
                    d="
                      M0 170
                      C80 155
                      120 165
                      180 140
                      S280 155
                      340 120
                      S430 135
                      500 90
                      S590 110
                      660 70
                      S760 105
                      830 50
                      S930 65
                      1000 25
                    "
                    fill="none"
                    stroke="#ff1232"
                    strokeOpacity=".65"
                    strokeWidth="2"
                    vectorEffect="non-scaling-stroke"
                  />
                </svg>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}

function BrowserChrome({ data }) {
  return (
    <div className="
      h-8
      border-b
      border-[#1e1e21]
      bg-[#08080a]
      flex
      items-center
      px-3
      gap-1.5
    ">

      <span className="w-2 h-2 rounded-full bg-[#252529]" />
      <span className="w-2 h-2 rounded-full bg-[#252529]" />
      <span className="w-2 h-2 rounded-full bg-[#252529]" />

      <div className="
        mx-auto
        px-4
        py-1
        rounded-md
        bg-[#101012]
        text-[8px]
        text-zinc-700
      ">
        aurora.local /{" "}
        {data.title
          .toLowerCase()
          .replaceAll(" ", "-")}
      </div>

      <ExternalLink
        size={10}
        className="text-zinc-700"
      />

    </div>
  );
}

function MetricCard({
  label,
  value,
  sub,
}) {
  return (
    <div className="
      rounded-xl
      border
      border-[#1e1e21]
      bg-[#0d0d0f]
      p-5
      hover:border-[#323237]
      transition-colors
    ">

      <div className="text-[10px] text-zinc-600">
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
  );
}

function Toolbar({
  device,
  setDevice,
  zoom,
  setZoom,
  mode,
  setMode,
}) {
  return (
    <div className="
      h-11
      shrink-0
      border-b
      border-[#1e1e21]
      bg-[#060607]/95
      backdrop-blur-xl
      flex
      items-center
      justify-between
      px-3
    ">

      <div className="flex items-center gap-1">

        <button
          onClick={() => setMode("preview")}
          className={`
            px-2.5
            h-7
            rounded-md
            text-[10px]
            flex
            items-center
            gap-1.5

            ${
              mode === "preview"
                ? "bg-[#151518] text-white"
                : "text-zinc-600 hover:text-zinc-300"
            }
          `}
        >
          <MousePointer2 size={11} />
          Canvas
        </button>

        <button
          onClick={() => setMode("code")}
          className={`
            px-2.5
            h-7
            rounded-md
            text-[10px]
            flex
            items-center
            gap-1.5

            ${
              mode === "code"
                ? "bg-[#151518] text-white"
                : "text-zinc-600 hover:text-zinc-300"
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
        ].map(([Icon, id]) => (
          <button
            key={id}
            onClick={() => setDevice(id)}
            className={`
              w-7
              h-7
              grid
              place-items-center
              rounded-md

              ${
                device === id
                  ? "bg-[#151518] text-white"
                  : "text-zinc-700 hover:text-zinc-300"
              }
            `}
          >
            <Icon size={12} />
          </button>
        ))}

        <div className="w-px h-4 bg-[#1e1e21] mx-1" />

        <button
          onClick={() =>
            setZoom(
              Math.max(
                60,
                zoom - 10
              )
            )
          }
          className="w-7 h-7 grid place-items-center text-zinc-600 hover:text-white"
        >
          <Minus size={12} />
        </button>

        <span className="
          w-9
          text-center
          text-[9px]
          text-zinc-600
        ">
          {zoom}%
        </span>

        <button
          onClick={() =>
            setZoom(
              Math.min(
                120,
                zoom + 10
              )
            )
          }
          className="w-7 h-7 grid place-items-center text-zinc-600 hover:text-white"
        >
          <Plus size={12} />
        </button>

        <button className="w-7 h-7 grid place-items-center text-zinc-600 hover:text-white">
          <RotateCw size={12} />
        </button>

        <button className="w-7 h-7 grid place-items-center text-zinc-600 hover:text-white">
          <Maximize2 size={12} />
        </button>

      </div>

    </div>
  );
      }
