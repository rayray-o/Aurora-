import React from "react";
import {
  Activity,
  ChevronDown,
  Cloud,
  Command,
  MoreHorizontal,
  Share2,
} from "lucide-react";

export default function TopBar({
  projectName,
  mode,
  setMode,
  status,
  onCommand,
}) {
  return (
    <header className="h-[58px] shrink-0 border-b border-[#1e1e21] bg-black/95 backdrop-blur-xl flex items-center px-4 gap-4 z-30">

      {/* BRAND */}

      <div className="flex items-center gap-3 min-w-[230px]">

        <div className="aurora-mark">
          <span />
        </div>

        <div className="leading-none">
          <div className="text-[12px] font-semibold tracking-[.16em]">
            AURORA
          </div>

          <div className="text-[9px] text-zinc-700 mt-1 tracking-[.08em]">
            AI DEVELOPMENT STUDIO
          </div>
        </div>

        <div className="h-5 w-px bg-[#1e1e21]" />

        <button className="text-xs text-zinc-300 hover:text-white flex items-center gap-1 interactive">
          {projectName}

          <ChevronDown
            size={13}
            className="text-zinc-600"
          />
        </button>
      </div>

      {/* MODE */}

      <div className="flex-1 flex justify-center">

        <div className="p-1 rounded-xl border border-[#1e1e21] bg-[#09090b] flex gap-0.5">

          {["preview", "code"].map((item) => (
            <button
              key={item}
              onClick={() => setMode(item)}
              className={`
                px-4
                py-1.5
                rounded-lg
                text-[11px]
                capitalize
                interactive

                ${
                  mode === item
                    ? "bg-[#17171a] text-white shadow-sm"
                    : "text-zinc-600 hover:text-zinc-300"
                }
              `}
            >
              {item}
            </button>
          ))}

        </div>

      </div>

      {/* SYSTEM */}

      <div className="min-w-[310px] flex justify-end items-center gap-2">

        <div className="hidden xl:flex items-center gap-2 px-2.5 py-1.5 text-[10px] text-zinc-600">

          <Activity
            size={12}
            className={
              status === "building"
                ? "text-[#ff1232] animate-pulse"
                : "text-zinc-600"
            }
          />

          {status === "building"
            ? "BUILDING"
            : "ALL CHANGES SAVED"}

        </div>

        <button
          onClick={onCommand}
          title="Command palette"
          className="w-8 h-8 rounded-lg border border-[#1e1e21] bg-[#09090b] grid place-items-center text-zinc-500 hover:text-white interactive"
        >
          <Command size={14} />
        </button>

        <button className="h-8 px-3 rounded-lg border border-[#1e1e21] bg-[#09090b] text-[11px] text-zinc-300 flex items-center gap-2 hover:text-white interactive">
          <Share2 size={13} />
          Share
        </button>

        <button className="h-8 px-3 rounded-lg bg-white text-black text-[11px] font-semibold flex items-center gap-2 hover:bg-zinc-200 interactive">
          <Cloud size={13} />
          Deploy
        </button>

        <button className="w-8 h-8 grid place-items-center text-zinc-600 hover:text-white interactive">
          <MoreHorizontal size={16} />
        </button>

      </div>
    </header>
  );
}
