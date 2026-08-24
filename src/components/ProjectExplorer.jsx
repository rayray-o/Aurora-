import React from "react";
import {
  ChevronDown,
  FileCode2,
  Folder,
  FolderOpen,
  PanelLeftClose,
  PanelLeftOpen,
  Settings2,
} from "lucide-react";

export default function ProjectExplorer({
  collapsed,
  setCollapsed,
}) {
  if (collapsed) {
    return (
      <aside className="
        w-11
        shrink-0
        border-r
        border-[#1e1e21]
        bg-[#070708]
        flex
        flex-col
        items-center
        pt-3
      ">

        <button
          onClick={() => setCollapsed(false)}
          className="
            w-7
            h-7
            grid
            place-items-center
            rounded-md
            text-zinc-600
            hover:text-white
            hover:bg-[#111113]
          "
        >
          <PanelLeftOpen size={14} />
        </button>

      </aside>
    );
  }

  const groups = [
    {
      name: "app",
      files: [
        "dashboard/page.jsx",
        "settings/page.jsx",
      ],
    },
    {
      name: "components",
      files: [
        "Header.jsx",
        "MetricCard.jsx",
        "Sidebar.jsx",
        "Chart.jsx",
      ],
    },
    {
      name: "styles",
      files: [
        "globals.css",
      ],
    },
  ];

  return (
    <aside className="
      w-[190px]
      shrink-0
      border-r
      border-[#1e1e21]
      bg-[#070708]
      flex
      flex-col
    ">

      <div className="
        h-11
        px-3
        border-b
        border-[#1e1e21]
        flex
        items-center
        justify-between
      ">

        <span className="
          text-[10px]
          tracking-[.16em]
          text-zinc-600
        ">
          PROJECT
        </span>

        <button
          onClick={() => setCollapsed(true)}
          className="text-zinc-700 hover:text-white"
        >
          <PanelLeftClose size={14} />
        </button>

      </div>

      <div className="
        px-3
        py-3
        text-[10px]
        text-zinc-500
        flex
        items-center
        gap-2
      ">

        <FolderOpen size={13} />

        aurora-workspace

      </div>

      <div className="
        px-2
        space-y-1
        overflow-y-auto
      ">

        {groups.map((group) => (
          <div key={group.name}>

            <div className="
              px-2
              py-1.5
              flex
              items-center
              gap-1.5
              text-[10px]
              text-zinc-500
            ">

              <ChevronDown size={11} />

              <Folder size={12} />

              {group.name}

            </div>

            {group.files.map((file) => (
              <button
                key={file}
                className="
                  w-full
                  text-left
                  pl-8
                  pr-2
                  py-1.5
                  rounded-md
                  text-[10px]
                  text-zinc-700
                  hover:text-zinc-300
                  hover:bg-[#101012]
                  flex
                  items-center
                  gap-2
                  transition-colors
                "
              >
                <FileCode2 size={11} />

                {file}

              </button>
            ))}

          </div>
        ))}

      </div>

      <div className="mt-auto border-t border-[#1e1e21] p-2">

        <button className="
          w-full
          flex
          items-center
          gap-2
          px-2
          py-2
          rounded-lg
          text-[10px]
          text-zinc-700
          hover:text-zinc-300
          hover:bg-[#101012]
        ">
          <Settings2 size={12} />
          Workspace settings
        </button>

      </div>

    </aside>
  );
          }
