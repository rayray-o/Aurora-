import {
  Activity,
  ChevronDown,
  CircleDot,
  Code2,
  Command,
  Cpu,
  Monitor,
  MoreHorizontal,
  RefreshCw,
  RotateCcw,
  Settings2,
  Sparkles,
  Smartphone,
  Tablet,
  Zap,
} from "lucide-react";

function TopBar({
  engineState,
  latency,
  workspaceName,
  setWorkspaceName,
  device,
  setDevice,
  workspaceStats,
  onClearWorkspace,
  showToast,
}) {
  return (
    <header className="relative z-20 flex h-[58px] w-full items-center border-b border-[#1e1e21] bg-[#09090b]">
      <div className="flex h-full items-center border-r border-[#1e1e21] px-4">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md border border-[#ff1232]/30 bg-[#ff1232]/10">
            <Sparkles size={14} strokeWidth={1.8} className="text-[#ff1232]" />
          </div>

          <span className="text-[13px] font-semibold tracking-[-0.02em] text-white">
            AURORA
          </span>

          <span className="rounded border border-[#1e1e21] bg-[#121214] px-1.5 py-0.5 text-[9px] font-medium tracking-[0.12em] text-zinc-500">
            AI
          </span>
        </div>
      </div>

      <div className="flex min-w-0 flex-1 items-center justify-between px-3">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={() => showToast("Workspace selector opened")}
            className="aurora-transition flex max-w-[260px] items-center gap-2 rounded-md px-2 py-1.5 hover:bg-[#121214]"
          >
            <span className="truncate text-[12px] font-medium text-zinc-300">
              {workspaceName}
            </span>

            <ChevronDown size={13} className="shrink-0 text-zinc-600" />
          </button>

          <div className="hidden h-4 w-px bg-[#1e1e21] sm:block" />

          <div className="hidden items-center gap-2 md:flex">
            <div className="flex items-center gap-1.5 text-[10px] uppercase tracking-[0.1em] text-zinc-600">
              <CircleDot size={10} className="text-[#ff1232]" />
              Live
            </div>

            <span className="text-zinc-800">/</span>

            <span className="text-[10px] text-zinc-600">
              {workspaceStats.components} components
            </span>

            <span className="text-zinc-800">/</span>

            <span className="text-[10px] text-zinc-600">
              {workspaceStats.lines} lines
            </span>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <div className="hidden items-center gap-3 rounded-md border border-[#1e1e21] bg-[#0d0d0f] px-2.5 py-1.5 lg:flex">
            <div className="flex items-center gap-1.5">
              <Activity size={11} className="text-zinc-600" />
              <span className="text-[10px] font-medium text-zinc-500">
                {latency}ms
              </span>
            </div>

            <div className="h-3 w-px bg-[#1e1e21]" />

            <div className="flex items-center gap-1.5">
              <Cpu size={11} className="text-zinc-600" />
              <span className="text-[10px] font-medium text-zinc-500">
                {engineState}
              </span>
            </div>
          </div>

          <div className="hidden items-center gap-0.5 rounded-md border border-[#1e1e21] bg-[#0d0d0f] p-0.5 sm:flex">
            <button
              type="button"
              onClick={() => setDevice("desktop")}
              className={`aurora-transition rounded p-1.5 ${
                device === "desktop"
                  ? "bg-[#1e1e21] text-white"
                  : "text-zinc-600 hover:text-zinc-400"
              }`}
              title="Desktop"
            >
              <Monitor size={13} />
            </button>

            <button
              type="button"
              onClick={() => setDevice("tablet")}
              className={`aurora-transition rounded p-1.5 ${
                device === "tablet"
                  ? "bg-[#1e1e21] text-white"
                  : "text-zinc-600 hover:text-zinc-400"
              }`}
              title="Tablet"
            >
              <Tablet size={13} />
            </button>

            <button
              type="button"
              onClick={() => setDevice("mobile")}
              className={`aurora-transition rounded p-1.5 ${
                device === "mobile"
                  ? "bg-[#1e1e21] text-white"
                  : "text-zinc-600 hover:text-zinc-400"
              }`}
              title="Mobile"
            >
              <Smartphone size={13} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => showToast("Project settings opened")}
            className="aurora-transition rounded-md border border-transparent p-2 text-zinc-600 hover:border-[#1e1e21] hover:bg-[#121214] hover:text-zinc-300"
            title="Settings"
          >
            <Settings2 size={14} />
          </button>

          <button
            type="button"
            onClick={() => showToast("Workspace actions opened")}
            className="aurora-transition rounded-md border border-transparent p-2 text-zinc-600 hover:border-[#1e1e21] hover:bg-[#121214] hover:text-zinc-300"
            title="More"
          >
            <MoreHorizontal size={15} />
          </button>
        </div>
      </div>
    </header>
  );
}

export default TopBar;
