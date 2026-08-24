import React, { useMemo, useState } from "react";
import {
  Code2,
  Copy,
  Check,
  RefreshCw,
  ExternalLink,
  Monitor,
  Tablet,
  Smartphone,
  Maximize2,
  Minimize2,
  ChevronLeft,
  ChevronRight,
  Globe,
  Lock,
  RotateCw,
} from "lucide-react";

const GREEN = "#b7ff2a";

function DeviceIcon({ device }) {
  if (device === "mobile") {
    return <Smartphone size={13} />;
  }

  if (device === "tablet") {
    return <Tablet size={13} />;
  }

  return <Monitor size={13} />;
}

function DeviceButton({ active, device, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={[
        "h-7 px-2.5 rounded-md flex items-center gap-1.5",
        "text-[10px] transition-all duration-200",
        "border",
        active
          ? "border-white/[.12] bg-white/[.08] text-white"
          : "border-transparent text-zinc-600 hover:text-zinc-300 hover:bg-white/[.04]",
      ].join(" ")}
    >
      <DeviceIcon device={device} />
      <span className="hidden sm:inline">{label}</span>
    </button>
  );
}

function BrowserHeader({
  device,
  setDevice,
  zoom,
  setZoom,
  onReload,
  onOpen,
  fullscreen,
  setFullscreen,
}) {
  return (
    <div className="h-11 shrink-0 border-b border-[#1e1e21] bg-[#09090b] flex items-center px-2 sm:px-3 gap-2">
      <div className="flex items-center gap-1">
        <button
          type="button"
          title="Back"
          className="h-7 w-7 rounded-md flex items-center justify-center text-zinc-700 hover:text-zinc-300 hover:bg-white/[.04] transition-colors"
        >
          <ChevronLeft size={14} />
        </button>

        <button
          type="button"
          title="Forward"
          className="h-7 w-7 rounded-md flex items-center justify-center text-zinc-700 hover:text-zinc-300 hover:bg-white/[.04] transition-colors"
        >
          <ChevronRight size={14} />
        </button>

        <button
          type="button"
          title="Reload preview"
          onClick={onReload}
          className="h-7 w-7 rounded-md flex items-center justify-center text-zinc-600 hover:text-white hover:bg-white/[.04] transition-colors"
        >
          <RotateCw size={12} />
        </button>
      </div>

      <div className="flex-1 min-w-0 h-7 rounded-md border border-white/[.06] bg-[#050506] flex items-center px-2.5 gap-2">
        <Lock size={10} className="text-zinc-700 shrink-0" />

        <span className="text-[10px] font-mono text-zinc-600 truncate">
          aurora-preview.local
        </span>

        <span className="hidden md:block ml-auto text-[9px] text-zinc-800">
          LIVE
        </span>
      </div>

      <div className="hidden md:flex items-center gap-0.5">
        <DeviceButton
          active={device === "desktop"}
          device="desktop"
          label="Desktop"
          onClick={() => setDevice("desktop")}
        />

        <DeviceButton
          active={device === "tablet"}
          device="tablet"
          label="Tablet"
          onClick={() => setDevice("tablet")}
        />

        <DeviceButton
          active={device === "mobile"}
          device="mobile"
          label="Mobile"
          onClick={() => setDevice("mobile")}
        />
      </div>

      <div className="hidden lg:flex items-center h-7 rounded-md border border-white/[.06] bg-white/[.015]">
        <button
          type="button"
          onClick={() => setZoom(Math.max(50, zoom - 10))}
          className="px-2 text-[9px] text-zinc-600 hover:text-white"
        >
          −
        </button>

        <span className="text-[9px] text-zinc-500 min-w-[34px] text-center">
          {zoom}%
        </span>

        <button
          type="button"
          onClick={() => setZoom(Math.min(150, zoom + 10))}
          className="px-2 text-[9px] text-zinc-600 hover:text-white"
        >
          +
        </button>
      </div>

      <button
        type="button"
        title={fullscreen ? "Exit fullscreen" : "Fullscreen"}
        onClick={() => setFullscreen((value) => !value)}
        className="h-7 w-7 rounded-md flex items-center justify-center text-zinc-600 hover:text-white hover:bg-white/[.04] transition-colors"
      >
        {fullscreen ? (
          <Minimize2 size={12} />
        ) : (
          <Maximize2 size={12} />
        )}
      </button>

      <button
        type="button"
        title="Open preview"
        onClick={onOpen}
        className="h-7 w-7 rounded-md flex items-center justify-center text-zinc-600 hover:text-white hover:bg-white/[.04] transition-colors"
      >
        <ExternalLink size={12} />
      </button>
    </div>
  );
}

function EmptyPreview() {
  return (
    <div className="min-h-[700px] flex items-center justify-center bg-[#050506]">
      <div className="text-center max-w-sm px-6">
        <div
          className="mx-auto mb-5 h-12 w-12 rounded-xl flex items-center justify-center border"
          style={{
            borderColor: `${GREEN}22`,
            background: `${GREEN}08`,
          }}
        >
          <Globe
            size={19}
            style={{ color: GREEN }}
          />
        </div>

        <h2 className="text-sm font-medium text-white">
          Your website preview
        </h2>

        <p className="mt-2 text-xs leading-5 text-zinc-600">
          Describe what you want to build in the chat.
          AURORA will generate the interface here.
        </p>
      </div>
    </div>
  );
}

function DashboardPreview({ template, isSecurity, isCrypto }) {
  const title = isSecurity
    ? "Security Operations"
    : isCrypto
    ? "Asset Intelligence"
    : template?.name || "AURORA Workspace";

  const description = isSecurity
    ? "Real-time infrastructure and threat visibility."
    : isCrypto
    ? "Portfolio intelligence and market performance."
    : "A modern workspace generated by AURORA.";

  const metricText = isSecurity
    ? "99.98% systems operational"
    : isCrypto
    ? "+12.84% this month"
    : "All systems operational";

  const cards = isSecurity
    ? [
        ["Threat level", "Low"],
        ["Protected assets", "12,481"],
        ["Events today", "284"],
        ["Uptime", "99.98%"],
      ]
    : isCrypto
    ? [
        ["Portfolio", "$184,920"],
        ["24h change", "+4.82%"],
        ["Assets", "28"],
        ["Performance", "+12.84%"],
      ]
    : [
        ["Projects", "24"],
        ["Activity", "128"],
        ["Members", "12"],
        ["Status", "Active"],
      ];

  return (
    <div className="min-h-[760px] bg-[#050506] text-white">
      <header className="sticky top-0 z-20 h-14 border-b border-white/[.06] bg-[#080809]/95 backdrop-blur-xl px-5 md:px-8 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div
            className="h-7 w-7 rounded-lg flex items-center justify-center"
            style={{
              background: `${GREEN}12`,
              border: `1px solid ${GREEN}24`,
            }}
          >
            <div
              className="h-2 w-2 rounded-full"
              style={{ background: GREEN }}
            />
          </div>

          <span className="text-[11px] font-medium tracking-wide">
            {title}
          </span>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-[9px] text-zinc-600">
          <span>Overview</span>
          <span>Analytics</span>
          <span>Activity</span>
        </div>
      </header>

      <main className="p-5 md:p-8">
        <div className="max-w-[1100px] mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5">
            <div>
              <div
                className="text-[9px] uppercase tracking-[.2em] mb-3"
                style={{ color: GREEN }}
              >
                {isSecurity ? "Security center" : "Workspace"}
              </div>

              <h1 className="text-2xl md:text-4xl font-semibold tracking-[-.04em]">
                {title}
              </h1>

              <p className="mt-2 text-xs text-zinc-600">
                {description}
              </p>
            </div>

            <div className="text-left md:text-right">
              <div className="text-[9px] text-zinc-700 uppercase tracking-wider">
                Current status
              </div>

              <div
                className="mt-1 text-xs font-mono"
                style={{ color: GREEN }}
              >
                {metricText}
              </div>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-2 lg:grid-cols-4 gap-3">
            {cards.map(([label, value]) => (
              <div
                key={label}
                className="rounded-xl border border-white/[.07] bg-white/[.015] p-4"
              >
                <div className="text-[9px] uppercase tracking-wider text-zinc-700">
                  {label}
                </div>

                <div className="mt-3 text-lg font-medium tracking-tight">
                  {value}
                </div>

                <div className="mt-2 h-1 rounded-full bg-white/[.04] overflow-hidden">
                  <div
                    className="h-full rounded-full"
                    style={{
                      width:
                        label === "Threat level"
                          ? "18%"
                          : label === "Status"
                          ? "92%"
                          : "76%",
                      background: GREEN,
                      opacity: 0.65,
                    }}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 rounded-xl border border-white/[.07] bg-white/[.015] overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[.06] flex items-center justify-between">
              <div>
                <div className="text-[9px] uppercase tracking-[.18em] text-zinc-700">
                  {isSecurity
                    ? "Threat activity"
                    : "Performance"}
                </div>

                <div className="mt-1 text-[10px] text-zinc-600">
                  {metricText}
                </div>
              </div>

              <div
                className="h-6 px-2.5 rounded-md border flex items-center text-[9px]"
                style={{
                  color: GREEN,
                  borderColor: `${GREEN}22`,
                  background: `${GREEN}06`,
                }}
              >
                Live
              </div>
            </div>

            <div className="h-[310px] relative p-5 overflow-hidden">
              <div className="absolute inset-x-5 bottom-8 h-px bg-white/[.05]" />

              <div className="absolute inset-x-5 top-8 bottom-8 flex flex-col justify-between opacity-40">
                <div className="h-px bg-white/[.035]" />
                <div className="h-px bg-white/[.035]" />
                <div className="h-px bg-white/[.035]" />
                <div className="h-px bg-white/[.035]" />
              </div>

              <svg
                viewBox="0 0 1000 220"
                preserveAspectRatio="none"
                className="absolute inset-x-5 bottom-8 w-[calc(100%-40px)] h-[210px]"
              >
                <defs>
                  <linearGradient
                    id="auroraChartFill"
                    x1="0"
                    x2="0"
                    y1="0"
                    y2="1"
                  >
                    <stop
                      offset="0%"
                      stopColor={GREEN}
                      stopOpacity=".13"
                    />
                    <stop
                      offset="100%"
                      stopColor={GREEN}
                      stopOpacity="0"
                    />
                  </linearGradient>
                </defs>

                <path
                  d="M0 180 C90 160 120 170 190 140 S300 155 360 120 S470 130 530 90 S630 110 700 68 S800 92 860 45 S930 55 1000 20 L1000 220 L0 220 Z"
                  fill="url(#auroraChartFill)"
                />

                <path
                  d="M0 180 C90 160 120 170 190 140 S300 155 360 120 S470 130 530 90 S630 110 700 68 S800 92 860 45 S930 55 1000 20"
                  fill="none"
                  stroke={GREEN}
                  strokeOpacity=".75"
                  strokeWidth="2"
                  vectorEffect="non-scaling-stroke"
                />

                <circle
                  cx="1000"
                  cy="20"
                  r="5"
                  fill={GREEN}
                />

                <circle
                  cx="1000"
                  cy="20"
                  r="10"
                  fill={GREEN}
                  opacity=".1"
                />
              </svg>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-40 rounded-xl border border-white/[.07] bg-white/[.015] p-5">
              <div className="text-[9px] uppercase tracking-wider text-zinc-700">
                Recent activity
              </div>

              <div className="mt-5 space-y-3">
                {[
                  "System analysis completed",
                  "Workspace synchronized",
                  "New deployment detected",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-[10px] text-zinc-600"
                  >
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background:
                          index === 0 ? GREEN : "#3f3f46",
                      }}
                    />
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="h-40 rounded-xl border border-white/[.07] bg-white/[.015] p-5">
              <div className="text-[9px] uppercase tracking-wider text-zinc-700">
                System status
              </div>

              <div className="mt-5 space-y-3">
                {[
                  ["API", "Operational"],
                  ["Database", "Operational"],
                  ["Edge", "Operational"],
                ].map(([name, status]) => (
                  <div
                    key={name}
                    className="flex items-center justify-between text-[10px]"
                  >
                    <span className="text-zinc-600">
                      {name}
                    </span>

                    <span
                      className="flex items-center gap-2"
                      style={{ color: GREEN }}
                    >
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{
                          background: GREEN,
                        }}
                      />
                      {status}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
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
  const code = template?.code || `// AURORA generated application

export default function App() {
  return (
    <main>
      <h1>Your generated website</h1>
    </main>
  );
}`;

  return (
    <div className="flex-1 min-h-0 overflow-auto bg-[#050506] p-4 md:p-8">
      <div className="max-w-[1100px] mx-auto rounded-2xl border border-white/[.07] bg-[#080809] overflow-hidden shadow-2xl">
        <div className="h-11 border-b border-white/[.06] px-4 flex items-center justify-between sticky top-0 bg-[#080809]/95 backdrop-blur-xl z-10">
          <div className="flex items-center gap-2">
            <Code2
              size={13}
              style={{ color: GREEN }}
            />

            <span className="text-[9px] text-zinc-500 font-mono">
              generated/App.jsx
            </span>
          </div>

          <button
            type="button"
            onClick={onCopy}
            className="h-7 px-2.5 rounded-lg border border-white/[.06] text-[9px] text-zinc-600 hover:text-white hover:bg-white/[.03] flex items-center gap-1.5 transition-colors"
          >
            {copied ? (
              <Check size={11} />
            ) : (
              <Copy size={11} />
            )}

            {copied ? "Copied" : "Copy"}
          </button>
        </div>

        <pre className="p-5 md:p-7 text-[11px] leading-6 font-mono text-zinc-400 overflow-auto whitespace-pre min-h-[600px]">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}

export default function PreviewViewport({
  template = null,
  activeView = "preview",
  onViewChange,
  onClose,
}) {
  const [device, setDevice] = useState("desktop");
  const [zoom, setZoom] = useState(100);
  const [reloadKey, setReloadKey] = useState(0);
  const [copied, setCopied] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);

  const templateName = String(
    template?.name || ""
  ).toLowerCase();

  const templateCode = String(
    template?.code || ""
  ).toLowerCase();

  const isSecurity =
    templateName.includes("security") ||
    templateName.includes("cyber") ||
    templateCode.includes("security");

  const isCrypto =
    templateName.includes("crypto") ||
    templateName.includes("finance") ||
    templateCode.includes("crypto");

  const viewportWidth = useMemo(() => {
    if (device === "mobile") return 390;
    if (device === "tablet") return 820;
    return 1440;
  }, [device]);

  const handleCopy = async () => {
    const code =
      template?.code ||
      "// AURORA generated application";

    try {
      await navigator.clipboard.writeText(code);

      setCopied(true);

      window.setTimeout(() => {
        setCopied(false);
      }, 1600);
    } catch (error) {
      console.error(
        "Unable to copy generated code:",
        error
      );
    }
  };

  const handleReload = () => {
    setReloadKey((value) => value + 1);
  };

  const handleOpen = () => {
    const code =
      template?.code ||
      "// AURORA generated application";

    const blob = new Blob(
      [
        `
<!doctype html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>AURORA Preview</title>
<style>
body {
  margin: 0;
  background: #050506;
  color: white;
  font-family: Inter, system-ui, sans-serif;
}
</style>
</head>
<body>
<div id="aurora-preview">
${code.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
</div>
</body>
</html>
        `,
      ],
      { type: "text/html" }
    );

    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");

    window.setTimeout(() => {
      URL.revokeObjectURL(url);
    }, 10000);
  };

  const content = (
    <div
      key={reloadKey}
      className="flex flex-col min-h-0 h-full bg-[#000000]"
    >
      <BrowserHeader
        device={device}
        setDevice={setDevice}
        zoom={zoom}
        setZoom={setZoom}
        onReload={handleReload}
        onOpen={handleOpen}
        fullscreen={fullscreen}
        setFullscreen={setFullscreen}
      />

      <div className="h-10 shrink-0 border-b border-[#1e1e21] bg-[#060607] px-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className="h-5 w-5 rounded flex items-center justify-center"
            style={{
              background: `${GREEN}0d`,
              border: `1px solid ${GREEN}20`,
            }}
          >
            <div
              className="h-1.5 w-1.5 rounded-full"
              style={{ background: GREEN }}
            />
          </div>

          <span className="text-[9px] text-zinc-600">
            Preview
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span
            className="hidden sm:inline text-[8px] uppercase tracking-wider"
            style={{ color: GREEN }}
          >
            Live
          </span>

          <span className="text-[9px] text-zinc-700 font-mono">
            {device} · {zoom}%
          </span>
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-auto bg-[#030304]">
        {activeView === "code" ? (
          <CodeWorkspace
            template={template}
            copied={copied}
            onCopy={handleCopy}
          />
        ) : (
          <div className="min-h-full flex justify-center">
            <div
              className="min-h-full transition-[width] duration-300 ease-out"
              style={{
                width:
                  device === "desktop"
                    ? "100%"
                    : `${viewportWidth}px`,
                minWidth:
                  device === "desktop"
                    ? "100%"
                    : `${viewportWidth}px`,
                transform: `scale(${zoom / 100})`,
                transformOrigin: "top center",
                marginBottom:
                  zoom > 100
                    ? `${(zoom - 100) * 6}px`
                    : "0px",
              }}
            >
              {template ? (
                <DashboardPreview
                  template={template}
                  isSecurity={isSecurity}
                  isCrypto={isCrypto}
                />
              ) : (
                <EmptyPreview />
              )}
            </div>
          </div>
        )}
      </div>

      <div className="h-10 shrink-0 border-t border-[#1e1e21] bg-[#080809] px-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#b7ff2a]" />

          <span className="text-[8px] text-zinc-700 uppercase tracking-[.14em]">
            Sandbox ready
          </span>
        </div>

        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() =>
              onViewChange?.("preview")
            }
            className={[
              "h-6 px-2.5 rounded-md text-[9px] transition-colors",
              activeView === "preview"
                ? "bg-white/[.06] text-white"
                : "text-zinc-700 hover:text-zinc-400",
            ].join(" ")}
          >
            Preview
          </button>

          <button
            type="button"
            onClick={() => onViewChange?.("code")}
            className={[
              "h-6 px-2.5 rounded-md text-[9px] transition-colors flex items-center gap-1.5",
              activeView === "code"
                ? "bg-white/[.06] text-white"
                : "text-zinc-700 hover:text-zinc-400",
            ].join(" ")}
          >
            <Code2 size={10} />
            Code
          </button>
        </div>
      </div>
    </div>
  );

  if (fullscreen) {
    return (
      <div className="fixed inset-0 z-[100] bg-black">
        {content}
      </div>
    );
  }

  return (
    <section className="h-full min-h-0 w-full overflow-hidden bg-black">
      {content}
    </section>
  );
        }
