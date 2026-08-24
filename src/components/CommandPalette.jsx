import React, { useEffect, useState } from "react";
import {
  ArrowRight,
  Command,
  FileCode2,
  Layout,
  Rocket,
  Search,
  Sparkles,
} from "lucide-react";

export default function CommandPalette({
  open,
  onClose,
  onAction,
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    if (open) {
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    const handleKey = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKey
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKey
      );
    };
  }, [onClose]);

  if (!open) return null;

  const commands = [
    {
      title: "Ask Aurora",
      description: "Describe a change or feature",
      icon: Sparkles,
      action: "ask",
    },
    {
      title: "Open canvas",
      description: "Focus the live preview",
      icon: Layout,
      action: "preview",
    },
    {
      title: "Open code",
      description: "Inspect generated source",
      icon: FileCode2,
      action: "code",
    },
    {
      title: "Deploy project",
      description: "Publish the current workspace",
      icon: Rocket,
      action: "deploy",
    },
  ];

  const filtered = commands.filter(
    (command) =>
      command.title
        .toLowerCase()
        .includes(query.toLowerCase()) ||
      command.description
        .toLowerCase()
        .includes(query.toLowerCase())
  );

  return (
    <div
      className="
        fixed
        inset-0
        z-[100]
        bg-black/65
        backdrop-blur-sm
        grid
        place-items-start
        pt-[13vh]
      "
      onMouseDown={onClose}
    >

      <div
        className="
          w-[min(620px,calc(100vw-28px))]
          rounded-2xl
          border
          border-[#2a2a2e]
          bg-[#0b0b0d]
          shadow-[0_30px_120px_rgba(0,0,0,.8)]
          overflow-hidden
          animate-aurora-in
        "
        onMouseDown={(event) =>
          event.stopPropagation()
        }
      >

        {/* SEARCH */}

        <div className="
          h-14
          border-b
          border-[#1e1e21]
          flex
          items-center
          px-4
          gap-3
        ">

          <Search
            size={16}
            className="text-zinc-600"
          />

          <input
            autoFocus
            value={query}
            onChange={(event) =>
              setQuery(event.target.value)
            }
            placeholder="Search commands..."
            className="
              flex-1
              bg-transparent
              outline-none
              text-sm
              text-zinc-200
              placeholder:text-zinc-700
            "
          />

          <kbd className="
            text-[9px]
            text-zinc-700
            border
            border-[#222225]
            rounded
            px-1.5
            py-1
          ">
            ESC
          </kbd>

        </div>

        {/* COMMANDS */}

        <div className="p-2">

          {filtered.length === 0 && (
            <div className="
              py-10
              text-center
              text-[11px]
              text-zinc-700
            ">
              No commands found.
            </div>
          )}

          {filtered.map((command) => {

            const Icon = command.icon;

            return (
              <button
                key={command.action}
                onClick={() => {
                  onAction(command.action);
                  onClose();
                }}
                className="
                  w-full
                  flex
                  items-center
                  gap-3
                  p-3
                  rounded-xl
                  text-left
                  hover:bg-[#141416]
                  interactive
                "
              >

                <div className="
                  w-8
                  h-8
                  rounded-lg
                  bg-[#111114]
                  border
                  border-[#1e1e21]
                  grid
                  place-items-center
                ">

                  <Icon
                    size={14}
                    className={
                      command.action === "ask"
                        ? "text-[#ff1232]"
                        : "text-zinc-500"
                    }
                  />

                </div>

                <div className="flex-1">

                  <div className="
                    text-xs
                    text-zinc-200
                  ">
                    {command.title}
                  </div>

                  <div className="
                    text-[10px]
                    text-zinc-700
                    mt-0.5
                  ">
                    {command.description}
                  </div>

                </div>

                <ArrowRight
                  size={13}
                  className="text-zinc-700"
                />

              </button>
            );
          })}

        </div>

        {/* FOOTER */}

        <div className="
          px-4
          py-3
          border-t
          border-[#1e1e21]
          flex
          items-center
          gap-2
          text-[9px]
          text-zinc-800
        ">

          <Command size={10} />

          AURORA COMMAND SURFACE

        </div>

      </div>

    </div>
  );
}
