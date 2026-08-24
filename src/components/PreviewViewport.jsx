import { useEffect, useMemo, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Code2,
  ExternalLink,
  Globe2,
  Maximize2,
  Minus,
  MoreHorizontal,
  PanelRight,
  Play,
  RefreshCw,
  RotateCcw,
  Search,
  ShieldCheck,
  Smartphone,
  Square,
  Tablet,
  TerminalSquare,
  X,
} from "lucide-react";

function PreviewViewport({
  viewport,
  setViewport,
  device,
  activeTemplate,
  sourceCode,
  onRefresh,
}) {
  const [url, setUrl] = useState("aurora.local");
  const [previewKey, setPreviewKey] = useState(0);
  const [browserTab, setBrowserTab] = useState("Preview");

  const codeLines = useMemo(() => sourceCode.split("\n"), [sourceCode]);

  useEffect(() => {
    setPreviewKey((value) => value + 1);
  }, [activeTemplate]);

  const refreshPreview = () => {
    setPreviewKey((value) => value + 1);
    onRefresh();
  };

  const frameClass =
    device === "mobile"
      ? "h-[640px] w-[360px]"
      : device === "tablet"
      ? "h-[760px] w-[680px]"
      : "h-full w-full";

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex h-[52px] shrink-0 items-center border-b border-[#1e1e21] bg-[#09090b] px-3">
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => setBrowserTab("Preview")}
            className={`aurora-transition flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[10px] font-medium ${
              browserTab === "Preview"
                ? "bg-[#121214] text-zinc-200"
                : "text-zinc-600 hover:text-zinc-400"
            }`}
          >
            <Globe2 size={11} />
            Preview
          </button>

          <button
            type="button"
            onClick={() => {
              setBrowserTab("Source");
              setViewport("code");
            }}
            className={`aurora-transition flex items-center gap-1.5 rounded-md px-2.5 py-1.5 text-[10px] font-medium ${
              browserTab === "Source"
                ? "bg-[#121214] text-zinc-200"
                : "text-zinc-600 hover:text-zinc-400"
            }`}
          >
            <Code2 size={11} />
            Source
          </button>
        </div>

        <div className="mx-3 h-4 w-px bg-[#1e1e21]" />

        <div className="flex min-w-0 flex-1 items-center gap-2">
          <button
            type="button"
            className="hidden p-1 text-zinc-700 hover:text-zinc-400 sm:block"
          >
            <ArrowLeft size={13} />
          </button>

          <button
            type="button"
            className="hidden p-1 text-zinc-700 hover:text-zinc-400 sm:block"
          >
            <ArrowRight size={13} />
          </button>

          <div className="flex min-w-0 flex-1 items-center gap-2 rounded-md border border-[#1e1e21] bg-[#0d0d0f] px-2.5 py-1.5">
            <ShieldCheck size={11} className="shrink-0 text-zinc-700" />

            <input
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              className="min-w-0 flex-1 bg-transparent text-[10px] text-zinc-500 outline-none"
              aria-label="Preview URL"
            />

            <Search size={11} className="shrink-0 text-zinc-700" />
          </div>
        </div>

        <div className="ml-2 flex items-center gap-0.5">
          <button
            type="button"
            onClick={refreshPreview}
            title="Refresh preview"
            className="aurora-transition rounded-md p-1.5 text-zinc-600 hover:bg-[#121214] hover:text-zinc-300"
          >
            <RefreshCw size={13} />
          </button>

          <button
            type="button"
            onClick={() => setViewport("code")}
            title="View source"
            className={`aurora-transition rounded-md p-1.5 ${
              viewport === "code"
                ? "bg-[#121214] text-zinc-200"
                : "text-zinc-600 hover:bg-[#121214] hover:text-zinc-300"
            }`}
          >
            <TerminalSquare size={13} />
          </button>

          <button
            type="button"
            onClick={() => {}}
            title="Fullscreen"
            className="aurora-transition rounded-md p-1.5 text-zinc-600 hover:bg-[#121214] hover:text-zinc-300"
          >
            <Maximize2 size={13} />
          </button>
        </div>
      </div>

      <div className="flex h-[42px] shrink-0 items-center border-b border-[#1e1e21] bg-[#0d0d0f] px-3">
        <div className="flex h-full items-center">
          <div className="flex h-full items-center gap-2 border-b border-[#ff1232] px-3">
            <div className="h-1.5 w-1.5 rounded-full bg-[#ff1232]" />

            <span className="text-[10px] text-zinc-400">
              {activeTemplate.name}
            </span>

            <button
              type="button"
              className="ml-1 text-zinc-700 hover:text-zinc-400"
            >
              <X size={10} />
            </button>
          </div>

          <button
            type="button"
            className="px-3 text-zinc-700 hover:text-zinc-400"
          >
            <PlusIcon />
          </button>
        </div>

        <div className="ml-auto flex items-center gap-1">
          <div className="hidden items-center gap-1 rounded border border-[#1e1e21] px-2 py-1 sm:flex">
            <span className="text-[9px] uppercase tracking-[0.1em] text-zinc-700">
              {device}
            </span>
          </div>

          <button
            type="button"
            className="rounded-md p-1.5 text-zinc-700 hover:bg-[#121214] hover:text-zinc-400"
          >
            <MoreHorizontal size={13} />
          </button>
        </div>
      </div>

      <div className="aurora-preview-grid min-h-0 flex-1 overflow-auto bg-[#050506]">
        {viewport === "preview" ? (
          <div className="flex min-h-full items-start justify-center p-5">
            <div
              key={previewKey}
              className={`aurora-transition relative overflow-hidden rounded-lg border border-[#29292d] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.55)] ${frameClass}`}
            >
              <PreviewContent template={activeTemplate} />
            </div>
          </div>
        ) : (
          <CodePanel
            lines={codeLines}
            onBack={() => {
              setViewport("preview");
              setBrowserTab("Preview");
            }}
          />
        )}
      </div>
    </div>
  );
}

function PreviewContent({ template }) {
  const [activeNav, setActiveNav] = useState(0);

  return (
    <div className="h-full min-h-full overflow-auto bg-[#08090b] text-white">
      <div className="sticky top-0 z-10 flex h-14 items-center border-b border-white/[0.07] bg-[#08090b]/95 px-5 backdrop-blur-xl">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[#ff1232]">
            <SparkMark />
          </div>

          <span className="text-[13px] font-semibold tracking-[-0.02em]">
            {template.brand}
          </span>
        </div>

        <div className="ml-auto hidden items-center gap-5 md:flex">
          {template.navigation.map((item, index) => (
            <button
              type="button"
              key={item}
              onClick={() => setActiveNav(index)}
              className={`text-[10px] transition-colors ${
                activeNav === index
                  ? "text-white"
                  : "text-zinc-600 hover:text-zinc-300"
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        <button className="ml-5 rounded-md border border-white/10 bg-white/[0.04] px-3 py-1.5 text-[9px] font-medium">
          Launch
        </button>
      </div>

      <div className="px-5 py-6 md:px-8 md:py-10">
        <div className="mb-8 max-w-2xl">
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-full border border-[#ff1232]/20 bg-[#ff1232]/[0.06] px-2.5 py-1 text-[8px] uppercase tracking-[0.16em] text-[#ff6a7d]">
            <span className="h-1 w-1 rounded-full bg-[#ff1232]" />
            {template.eyebrow}
          </div>

          <h1 className="text-[27px] font-semibold leading-[1.08] tracking-[-0.045em] md:text-[38px]">
            {template.headline}
          </h1>

          <p className="mt-3 max-w-lg text-[11px] leading-5 text-zinc-500">
            {template.description}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2.5 md:grid-cols-4">
          {template.metrics.map((metric) => (
            <div
              key={metric.label}
              className="rounded-lg border border-white/[0.07] bg-white/[0.025] p-3"
            >
              <div className="mb-2 text-[8px] uppercase tracking-[0.13em] text-zinc-700">
                {metric.label}
              </div>

              <div className="text-[18px] font-semibold tracking-[-0.03em]">
                {metric.value}
              </div>

              <div className="mt-1 text-[8px] text-zinc-600">
                {metric.change}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-[1.45fr_0.8fr]">
          <div className="overflow-hidden rounded-lg border border-white/[0.07] bg-white/[0.02]">
            <div className="flex h-10 items-center justify-between border-b border-white/[0.06] px-3.5">
              <span className="text-[9px] font-medium text-zinc-400">
                {template.primaryPanel.title}
              </span>

              <span className="text-[8px] text-zinc-700">
                {template.primaryPanel.period}
              </span>
            </div>

            <div className="p-4">
              <Chart data={template.primaryPanel.chart} />
            </div>
          </div>

          <div className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-4">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-[9px] font-medium text-zinc-400">
                {template.secondaryPanel.title}
              </span>

              <MoreHorizontal size={12} className="text-zinc-700" />
            </div>

            <div className="space-y-3">
              {template.secondaryPanel.rows.map((row) => (
                <div
                  key={row.label}
                  className="flex items-center justify-between border-b border-white/[0.04] pb-2.5 last:border-0 last:pb-0"
                >
                  <div>
                    <div className="text-[9px] text-zinc-500">{row.label}</div>
                    <div className="mt-0.5 text-[11px] font-medium text-zinc-300">
                      {row.value}
                    </div>
                  </div>

                  <span className="text-[8px] text-zinc-600">
                    {row.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 grid gap-3 md:grid-cols-3">
          {template.cards.map((card) => (
            <div
              key={card.title}
              className="rounded-lg border border-white/[0.07] bg-white/[0.02] p-4"
            >
              <div className="mb-5 flex items-start justify-between">
                <div className="flex h-7 w-7 items-center justify-center rounded-md bg-white/[0.04]">
                  <div className="h-2 w-2 rounded-full bg-[#ff1232]" />
                </div>

                <span className="text-[8px] text-zinc-700">{card.tag}</span>
              </div>

              <div className="text-[11px] font-medium text-zinc-300">
                {card.title}
              </div>

              <p className="mt-1.5 text-[8px] leading-4 text-zinc-600">
                {card.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function CodePanel({ lines, onBack }) {
  return (
    <div className="h-full min-w-[700px] bg-[#08080a]">
      <div className="sticky top-0 z-10 flex h-11 items-center border-b border-[#1e1e21] bg-[#09090b]/95 px-4 backdrop-blur-xl">
        <button
          type="button"
          onClick={onBack}
          className="mr-3 flex items-center gap-1.5 text-[10px] text-zinc-600 hover:text-zinc-300"
        >
          <ArrowLeft size={11} />
          Preview
        </button>

        <div className="h-4 w-px bg-[#1e1e21]" />

        <div className="ml-3 flex items-center gap-2">
          <Code2 size={12} className="text-[#ff1232]" />
          <span className="text-[10px] font-medium text-zinc-400">
            generated.jsx
          </span>
        </div>

        <span className="ml-auto text-[9px] text-zinc-700">
          {lines.length} lines
        </span>
      </div>

      <div className="aurora-scroll aurora-mono aurora-code overflow-auto py-4 text-[11px] leading-[21px] text-zinc-500">
        {lines.map((line, index) => (
          <span key={`${index}-${line}`} className="aurora-code-line">
            <SyntaxLine line={line} />
          </span>
        ))}
      </div>
    </div>
  );
}

function SyntaxLine({ line }) {
  if (line.trim().startsWith("//")) {
    return <span className="aurora-code-comment">{line}</span>;
  }

  const tokens = line.split(
    /(".*?"|'[^']*'|`[^`]*`|\b(?:const|let|return|function|import|from|export|default|className)\b)/g
  );

  return (
    <>
      {tokens.map((token, index) => {
        if (/^["'`]/.test(token)) {
          return (
            <span key={index} className="aurora-code-string">
              {token}
            </span>
          );
        }

        if (
          /^(const|let|return|function|import|from|export|default|className)$/.test(
            token
          )
        ) {
          return (
            <span key={index} className="aurora-code-keyword">
              {token}
            </span>
          );
        }

        if (/\b(?:aurora|Aurora|red|accent)\b/i.test(token)) {
          return (
            <span key={index} className="aurora-code-accent">
              {token}
            </span>
          );
        }

        return <span key={index}>{token}</span>;
      })}
    </>
  );
}

function Chart({ data }) {
  const points = data
    .map((value, index) => {
      const x = (index / Math.max(data.length - 1, 1)) * 100;
      const min = Math.min(...data);
      const max = Math.max(...data);
      const range = max - min || 1;
      const y = 90 - ((value - min) / range) * 70;

      return `${x},${y}`;
    })
    .join(" ");

  return (
    <div className="relative h-[150px] w-full">
      <div className="absolute inset-0 flex flex-col justify-between">
        {[0, 1, 2, 3].map((item) => (
          <div key={item} className="h-px w-full bg-white/[0.035]" />
        ))}
      </div>

      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full overflow-visible"
      >
        <polyline
          points={points}
          fill="none"
          stroke="#ff1232"
          strokeWidth="1.4"
          vectorEffect="non-scaling-stroke"
        />

        <polyline
          points={`0,92 ${points}`}
          fill="rgba(255,18,50,0.035)"
          stroke="none"
        />
      </svg>
    </div>
  );
}

function SparkMark() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
      <path
        d="M6.5 0.8L7.6 5.4L12.2 6.5L7.6 7.6L6.5 12.2L5.4 7.6L0.8 6.5L5.4 5.4L6.5 0.8Z"
        fill="white"
      />
    </svg>
  );
}

function PlusIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
      <path d="M5.5 1V10M1 5.5H10" stroke="currentColor" />
    </svg>
  );
}

export default PreviewViewport;
