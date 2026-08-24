import React from "react";
import {
  Activity,
  ChevronDown,
  Command,
  Menu,
  Settings,
} from "lucide-react";

export default function TopBar({
  projectName,
  surface,
  status,
  onCommand,
  onToggleSidebar,
  onSettings,
}) {
  return (
    <header className="
      relative
      z-[120]
      h-[58px]
      shrink-0
      border-b
      border-white/[.06]
      bg-black/80
      backdrop-blur-2xl
      flex
      items-center
      justify-between
      px-3
      md:px-5
    ">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onToggleSidebar}
          className="
            w-8
            h-8
            rounded-lg
            border
            border-white/[.07]
            bg-white/[.025]
            grid
            place-items-center
            text-zinc-600
            hover:text-white
            hover:bg-white/[.05]
          "
        >
          <Menu size={15} />
        </button>

        <div className="aurora-mark">
          <span />
        </div>

        <div className="hidden sm:block">
          <div className="text-[11px] font-semibold tracking-[.22em]">
            AURORA
          </div>

          <div className="text-[8px] tracking-[.12em] text-zinc-700 mt-1">
            AI WEBSITE BUILDER
          </div>
        </div>

        <div className="hidden md:block h-4 w-px bg-white/[.07]" />

        <button className="hidden md:flex items-center gap-1.5 max-w-[180px] text-[10px] text-zinc-500 hover:text-white">
          <span className="truncate">
            {projectName}
          </span>

          <ChevronDown
            size={11}
            className="shrink-0 text-zinc-700"
          />
        </button>
      </div>

      <div className="
        absolute
        left-1/2
        -translate-x-1/2
        flex
        items-center
        p-1
        rounded-xl
        border
        border-white/[.06]
        bg-[#050506]/80
      ">
        <button
          onClick={() => {}}
          className={`
            h-7
            px-3
            rounded-lg
            text-[10px]
            transition-all
            ${
              surface === "chat"
                ? "bg-white/[.07] text-white"
                : "text-zinc-700"
            }
          `}
        >
          Build
        </button>

        <button
          onClick={() => {}}
          className={`
            h-7
            px-3
            rounded-lg
            text-[10px]
            transition-all
            ${
              surface === "preview"
                ? "bg-white/[.07] text-white"
                : "text-zinc-700"
            }
          `}
        >
          Preview
        </button>
      </div>

      <div className="flex items-center gap-1.5">
        <div className="hidden lg:flex items-center gap-2 px-2 text-[9px] text-zinc-700">
          <Activity
            size={11}
            className={
              status === "building"
                ? "text-[#b7ff2a] animate-aurora-pulse"
                : "text-[#b7ff2a]"
            }
          />

          {status === "building"
            ? "GENERATING"
            : "READY"}
        </div>

        <button
          onClick={onCommand}
          className="
            w-8
            h-8
            rounded-lg
            border
            border-white/[.07]
            bg-white/[.02]
            grid
            place-items-center
            text-zinc-600
            hover:text-white
          "
        >
          <Command size={14} />
        </button>

        <button
          onClick={onSettings}
          className="
            w-8
            h-8
            rounded-lg
            border
            border-white/[.07]
            bg-white/[.02]
            grid
            place-items-center
            text-zinc-600
            hover:text-white
          "
        >
          <Settings size={14} />
        </button>

        <button
          className="
            hidden
            sm:flex
            h-8
            px-3
            rounded-lg
            bg-[#b7ff2a]
            text-black
            text-[10px]
            font-semibold
            items-center
            gap-2
            hover:bg-[#c4ff52]
          "
        >
          Deploy
        </button>
      </div>
    </header>
  );
        }
