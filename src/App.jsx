import React, { useEffect, useRef, useState } from "react";
import TopBar from "./components/TopBar";
import ChatPanel from "./components/ChatPanel";
import PreviewViewport from "./components/PreviewViewport";
import ProjectExplorer from "./components/ProjectExplorer";
import CommandPalette from "./components/CommandPalette";
import { mockTemplates, resolveTemplate } from "./data/mockTemplates";

export default function App() {
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState("preview");

  const [messages, setMessages] = useState([]);
  const [streaming, setStreaming] = useState(false);

  const [template, setTemplate] = useState(mockTemplates.saas);

  const [chatWidth, setChatWidth] = useState(380);
  const [explorerCollapsed, setExplorerCollapsed] = useState(false);

  const [commandOpen, setCommandOpen] = useState(false);
  const [status, setStatus] = useState("ready");

  const [homePrompt, setHomePrompt] = useState("");

  const stopRef = useRef(false);

  useEffect(() => {
    const handleKeyboard = (event) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key.toLowerCase() === "k"
      ) {
        event.preventDefault();
        setCommandOpen(true);
      }

      if (event.key === "Escape") {
        setCommandOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyboard);

    return () => {
      window.removeEventListener("keydown", handleKeyboard);
    };
  }, []);

  const startBuilding = (prompt) => {
    const cleanPrompt = prompt.trim();

    if (!cleanPrompt || streaming) return;

    setStarted(true);

    setMessages((current) => [
      ...current,
      {
        role: "user",
        content: cleanPrompt,
      },
    ]);

    setStreaming(true);
    setStatus("building");

    stopRef.current = false;

    const nextTemplate = resolveTemplate(cleanPrompt);

    /*
     * This is intentionally isolated.
     *
     * Replace this block later with the real AI model request.
     *
     * Example future architecture:
     *
     * const result = await auroraAgent.generate({
     *   prompt: cleanPrompt,
     *   workspace: currentWorkspace
     * });
     */

    window.setTimeout(() => {
      if (stopRef.current) return;

      setTemplate(nextTemplate);

      setMessages((current) => [
        ...current,
        {
          role: "assistant",
          content:
            `I've translated that into a ${nextTemplate.name} workspace.\n\n` +
            `The initial architecture is now live in the canvas. ` +
            `I've established the visual hierarchy, generated the first ` +
            `component surface, and synchronized the preview with the source.`,
          files: true,
        },
      ]);

      setStreaming(false);
      setStatus("ready");
    }, 1350);
  };

  const stopGeneration = () => {
    stopRef.current = true;
    setStreaming(false);
    setStatus("ready");
  };

  const beginResize = () => {
    const move = (event) => {
      const nextWidth = window.innerWidth - event.clientX;

      setChatWidth(
        Math.max(
          300,
          Math.min(620, nextWidth)
        )
      );
    };

    const stop = () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);
  };

  const handleCommand = (command) => {
    if (command === "preview") {
      setMode("preview");
    }

    if (command === "code") {
      setMode("code");
    }

    if (command === "ask") {
      setTimeout(() => {
        document.querySelector("textarea")?.focus();
      }, 100);
    }

    if (command === "deploy") {
      setStatus("building");

      setTimeout(() => {
        setStatus("ready");
      }, 1000);
    }
  };

  /*
   * ------------------------------------------------------------
   * AURORA LANDING EXPERIENCE
   * ------------------------------------------------------------
   */

  if (!started) {
    return (
      <main className="min-h-screen bg-black text-white relative overflow-hidden technical-grid">
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_50%_35%,rgba(255,18,50,.055),transparent_32%)]" />

        <header className="relative z-10 h-16 px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="aurora-mark">
              <span />
            </div>

            <div className="text-xs font-semibold tracking-[.22em]">
              AURORA
            </div>
          </div>

          <div className="text-[9px] text-zinc-700 tracking-[.2em]">
            AI DEVELOPMENT STUDIO · 02.0
          </div>
        </header>

        <section className="relative z-10 min-h-[calc(100vh-64px)] flex flex-col items-center px-5 pt-[13vh]">
          <div className="text-[10px] uppercase tracking-[.38em] text-[#ff1232] mb-6 animate-aurora-in">
            Build without the blank page
          </div>

          <h1 className="text-center text-[clamp(46px,7vw,88px)] font-medium leading-[.91] tracking-[-.065em] max-w-5xl animate-aurora-in">
            Turn an idea into
            <br />
            <span className="text-zinc-500">
              a living product.
            </span>
          </h1>

          <p className="mt-7 text-center max-w-xl text-sm leading-6 text-zinc-600 animate-aurora-in">
            Describe what you want to build. Aurora architects the
            workspace, generates the interface, and keeps the canvas
            and source synchronized.
          </p>

          <div className="mt-10 w-[min(720px,100%)] rounded-2xl border border-[#29292d] bg-[#09090b]/95 shadow-[0_35px_120px_rgba(0,0,0,.7)] focus-within:border-[#444449] transition-colors animate-aurora-in">
            <textarea
              value={homePrompt}
              onChange={(event) => setHomePrompt(event.target.value)}
              onKeyDown={(event) => {
                if (
                  event.key === "Enter" &&
                  !event.shiftKey
                ) {
                  event.preventDefault();
                  startBuilding(homePrompt);
                }
              }}
              rows={4}
              placeholder="Describe the product you're imagining..."
              className="w-full resize-none bg-transparent outline-none px-5 pt-5 text-sm text-zinc-200 placeholder:text-zinc-700"
            />

            <div className="px-4 pb-4 flex items-center justify-between">
              <span className="text-[9px] tracking-wider text-zinc-800">
                SHIFT + ENTER FOR NEW LINE
              </span>

              <button
                disabled={!homePrompt.trim()}
                onClick={() => startBuilding(homePrompt)}
                className="h-9 px-4 rounded-lg bg-white text-black text-[11px] font-semibold disabled:opacity-20 hover:bg-zinc-200 interactive"
              >
                Build with Aurora →
              </button>
            </div>
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {[
              "Institutional crypto terminal",
              "Cybersecurity command center",
              "Premium SaaS analytics",
            ].map((item) => (
              <button
                key={item}
                onClick={() => setHomePrompt(item)}
                className="px-3 py-2 rounded-lg border border-[#1e1e21] bg-[#070708] text-[10px] text-zinc-600 hover:text-zinc-300 hover:border-[#303036] interactive"
              >
                {item}
              </button>
            ))}
          </div>

          <div className="mt-20 w-[min(900px,100%)] border-t border-[#151518] pt-5 flex justify-between text-[9px] text-zinc-800">
            <span>RECENT WORKSPACES</span>
            <span>ALL SYSTEMS OPERATIONAL</span>
          </div>
        </section>
      </main>
    );
  }

  /*
   * ------------------------------------------------------------
   * AURORA STUDIO
   * ------------------------------------------------------------
   */

  return (
    <main className="h-screen bg-black text-white flex flex-col overflow-hidden">
      <TopBar
        projectName={template.name}
        mode={mode}
        setMode={setMode}
        status={status}
        onCommand={() => setCommandOpen(true)}
      />

      <div className="flex-1 min-h-0 flex">
        <ProjectExplorer
          collapsed={explorerCollapsed}
          setCollapsed={setExplorerCollapsed}
        />

        <ChatPanel
          messages={messages}
          streaming={streaming}
          onSubmit={startBuilding}
          onStop={stopGeneration}
          width={chatWidth}
          onResize={beginResize}
        />

        <PreviewViewport
          template={template}
          mode={mode}
          setMode={setMode}
        />
      </div>

      <CommandPalette
        open={commandOpen}
        onClose={() => setCommandOpen(false)}
        onAction={handleCommand}
      />
    </main>
  );
          }
