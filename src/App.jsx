import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowRight,
  Command,
  Eye,
  Globe,
  History,
  Menu,
  MoreHorizontal,
  Sparkles,
} from "lucide-react";

import ChatPanel from "./components/ChatPanel";
import PreviewViewport from "./components/PreviewViewport";

import {
  mockTemplates,
  resolveTemplate,
} from "./data/mockTemplates";


export default function App() {
  const [surface, setSurface] =
    useState("chat");

  const [previewMode, setPreviewMode] =
    useState("preview");

  const [messages, setMessages] =
    useState([]);

  const [streaming, setStreaming] =
    useState(false);

  const [template, setTemplate] =
    useState(mockTemplates.saas);

  const [projectName, setProjectName] =
    useState("Untitled website");

  const [historyOpen, setHistoryOpen] =
    useState(false);

  const [toast, setToast] =
    useState(null);

  const [dragging, setDragging] =
    useState(false);

  const startX = useRef(0);
  const currentX = useRef(0);

  const generationTimer =
    useRef(null);

  const toastTimer =
    useRef(null);


  /* ==========================================================
     TOAST
  ========================================================== */

  const showToast = (message) => {
    setToast(message);

    if (toastTimer.current) {
      window.clearTimeout(
        toastTimer.current
      );
    }

    toastTimer.current =
      window.setTimeout(() => {
        setToast(null);
      }, 2200);
  };


  /* ==========================================================
     PREVIEW
  ========================================================== */

  const openPreview = () => {
    setSurface("preview");
  };

  const closePreview = () => {
    setSurface("chat");
  };


  /* ==========================================================
     GENERATION
  ========================================================== */

  const submitPrompt = (prompt) => {
    if (
      !prompt.trim() ||
      streaming
    ) {
      return;
    }

    const cleanPrompt =
      prompt.trim();

    if (
      projectName ===
      "Untitled website"
    ) {
      const generatedName =
        cleanPrompt
          .split(/\s+/)
          .slice(0, 5)
          .join(" ")
          .replace(/[.!?]+$/, "");

      setProjectName(
        generatedName ||
          "Untitled website"
      );
    }

    setMessages(
      (current) => [
        ...current,
        {
          id:
            `${Date.now()}-user`,
          role: "user",
          content: cleanPrompt,
        },
      ]
    );

    setStreaming(true);

    const nextTemplate =
      resolveTemplate(
        cleanPrompt
      );

    if (generationTimer.current) {
      window.clearTimeout(
        generationTimer.current
      );
    }

    generationTimer.current =
      window.setTimeout(() => {
        setTemplate(
          nextTemplate
        );

        setMessages(
          (current) => [
            ...current,
            {
              id:
                `${Date.now()}-assistant`,
              role: "assistant",
              content:
                "I've generated the first version of your website. The preview is ready whenever you want to inspect it.",
              generation: {
                template:
                  nextTemplate.name,
              },
            },
          ]
        );

        setStreaming(false);

        showToast(
          "Website generated · Preview ready"
        );
      }, 1450);
  };


  /* ==========================================================
     STOP
  ========================================================== */

  const stopGeneration = () => {
    if (generationTimer.current) {
      window.clearTimeout(
        generationTimer.current
      );

      generationTimer.current =
        null;
    }

    setStreaming(false);

    showToast(
      "Generation stopped"
    );
  };


  /* ==========================================================
     CLEANUP
  ========================================================== */

  useEffect(() => {
    return () => {
      if (generationTimer.current) {
        window.clearTimeout(
          generationTimer.current
        );
      }

      if (toastTimer.current) {
        window.clearTimeout(
          toastTimer.current
        );
      }
    };
  }, []);


  /* ==========================================================
     SWIPE
  ========================================================== */

  const beginSwipe = (event) => {
    startX.current =
      event.clientX;

    currentX.current =
      event.clientX;

    setDragging(true);

    try {
      event.currentTarget.setPointerCapture(
        event.pointerId
      );
    } catch {
      // Pointer capture is not available
      // in every browser environment.
    }
  };


  const moveSwipe = (event) => {
    if (!dragging) {
      return;
    }

    currentX.current =
      event.clientX;
  };


  const endSwipe = () => {
    if (!dragging) {
      return;
    }

    const distance =
      currentX.current -
      startX.current;

    setDragging(false);

    if (
      distance < -70 &&
      surface === "chat"
    ) {
      openPreview();
      return;
    }

    if (
      distance > 70 &&
      surface === "preview"
    ) {
      closePreview();
    }
  };


  /* ==========================================================
     KEYBOARD NAVIGATION
  ========================================================== */

  useEffect(() => {
    const handleKeyboard =
      (event) => {
        if (
          event.key === "Escape" &&
          surface === "preview"
        ) {
          closePreview();
        }

        if (
          event.key === "ArrowRight" &&
          surface === "chat"
        ) {
          openPreview();
        }

        if (
          event.key === "ArrowLeft" &&
          surface === "preview"
        ) {
          closePreview();
        }
      };

    window.addEventListener(
      "keydown",
      handleKeyboard
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyboard
      );
    };
  }, [surface]);


  return (
    <main className="
      h-[100dvh]
      w-full
      bg-black
      text-white
      overflow-hidden
      select-none
    ">

      {/* ======================================================
          TOP BAR
      ====================================================== */}

      <header className="
        absolute
        top-0
        left-0
        right-0
        z-[80]
        h-[58px]
        px-5
        flex
        items-center
        justify-between
        border-b
        border-white/[0.06]
        bg-black/70
        backdrop-blur-2xl
      ">

        <div className="
          flex
          items-center
          gap-3
          min-w-0
        ">

          <button
            type="button"
            onClick={() =>
              setHistoryOpen(
                (value) => !value
              )
            }
            className="
              w-8
              h-8
              shrink-0
              rounded-lg
              border
              border-white/[0.07]
              bg-white/[0.025]
              grid
              place-items-center
              text-zinc-500
              hover:text-white
              hover:bg-white/[0.05]
              transition-all
            "
          >
            <Menu size={15} />
          </button>

          <div className="
            flex
            items-center
            gap-2.5
            shrink-0
          ">

            <div className="
              w-7
              h-7
              rounded-[8px]
              border
              border-[#351117]
              bg-[#100406]
              grid
              place-items-center
            ">
              <span className="
                w-[7px]
                h-[7px]
                rounded-full
                bg-[#ff1232]
                shadow-[0_0_12px_rgba(255,18,50,.6)]
              " />
            </div>

            <span className="
              text-[11px]
              font-semibold
              tracking-[.22em]
            ">
              AURORA
            </span>

          </div>

          <div className="
            h-4
            w-px
            bg-white/[0.07]
            shrink-0
          " />

          <div className="
            hidden
            sm:flex
            items-center
            gap-2
            text-[10px]
            text-zinc-600
            min-w-0
          ">

            <Globe size={11} />

            <span className="
              max-w-[180px]
              truncate
            ">
              {projectName}
            </span>

          </div>

        </div>


        {/* Center switcher */}

        <div className="
          absolute
          left-1/2
          -translate-x-1/2
          flex
          items-center
          gap-1
          p-1
          rounded-xl
          border
          border-white/[0.06]
          bg-black/60
        ">

          <button
            type="button"
            onClick={closePreview}
            className={`
              h-7
              px-3
              rounded-lg
              text-[10px]
              flex
              items-center
              gap-1.5
              transition-all
              ${
                surface === "chat"
                  ? "bg-white/[0.07] text-white"
                  : "text-zinc-600 hover:text-zinc-300"
              }
            `}
          >
            <Sparkles size={11} />
            Chat
          </button>

          <button
            type="button"
            onClick={openPreview}
            className={`
              h-7
              px-3
              rounded-lg
              text-[10px]
              flex
              items-center
              gap-1.5
              transition-all
              ${
                surface === "preview"
                  ? "bg-white/[0.07] text-white"
                  : "text-zinc-600 hover:text-zinc-300"
              }
            `}
          >
            <Eye size={11} />
            Preview
          </button>

        </div>


        {/* Right controls */}

        <div className="
          flex
          items-center
          gap-1.5
        ">

          <button
            type="button"
            title="Command palette"
            className="
              hidden
              sm:grid
              w-8
              h-8
              rounded-lg
              place-items-center
              text-zinc-600
              hover:text-white
              hover:bg-white/[0.04]
              transition-all
            "
          >
            <Command size={14} />
          </button>

          <button
            type="button"
            title="History"
            onClick={() =>
              setHistoryOpen(
                (value) => !value
              )
            }
            className="
              hidden
              sm:grid
              w-8
              h-8
              rounded-lg
              place-items-center
              text-zinc-600
              hover:text-white
              hover:bg-white/[0.04]
              transition-all
            "
          >
            <History size={14} />
          </button>

          <button
            type="button"
            className="
              hidden
              sm:grid
              w-8
              h-8
              rounded-lg
              place-items-center
              text-zinc-600
              hover:text-white
              hover:bg-white/[0.04]
              transition-all
            "
          >
            <MoreHorizontal size={15} />
          </button>

          <button
            type="button"
            onClick={() =>
              showToast(
                "Deployment pipeline coming next"
              )
            }
            className="
              h-8
              px-3
              ml-1
              rounded-lg
              bg-white
              text-black
              text-[10px]
              font-semibold
              hover:bg-zinc-200
              transition-all
            "
          >
            Deploy
          </button>

        </div>

      </header>


      {/* ======================================================
          TWO-SURFACE WORKSPACE
      ====================================================== */}

      <div
        className="
          absolute
          inset-0
          overflow-hidden
          pt-[58px]
        "
        style={{
          touchAction: "pan-y",
        }}
        onPointerDown={beginSwipe}
        onPointerMove={moveSwipe}
        onPointerUp={endSwipe}
        onPointerCancel={endSwipe}
      >

        <div
          className={`
            h-full
            w-[200vw]
            flex
            will-change-transform
            ${
              dragging
                ? "transition-none"
                : "transition-transform duration-[650ms] ease-[cubic-bezier(.22,1,.36,1)]"
            }
            ${
              surface === "preview"
                ? "-translate-x-1/2"
                : "translate-x-0"
            }
          `}
        >

          {/* CHAT */}

          <section className="
            w-screen
            h-full
            shrink-0
            relative
            bg-black
          ">

            <ChatPanel
              messages={messages}
              streaming={streaming}
              onSubmit={submitPrompt}
              onStop={stopGeneration}
              onOpenPreview={openPreview}
            />

            <div className="
              absolute
              bottom-5
              right-6
              hidden
              md:flex
              items-center
              gap-2
              text-[9px]
              text-zinc-800
              pointer-events-none
            ">
              <ArrowRight size={11} />
              <span>
                SWIPE TO PREVIEW
              </span>
            </div>

          </section>


          {/* PREVIEW */}

          <section className="
            w-screen
            h-full
            shrink-0
            bg-[#030304]
          ">

            <PreviewViewport
              template={template}
              mode={previewMode}
              setMode={setPreviewMode}
              onBack={closePreview}
            />

          </section>

        </div>

      </div>


      {/* ======================================================
          HISTORY DRAWER
      ====================================================== */}

      <div
        className={`
          absolute
          top-[58px]
          left-0
          bottom-0
          z-[90]
          w-[270px]
          border-r
          border-white/[0.07]
          bg-[#070708]/95
          backdrop-blur-2xl
          shadow-[20px_0_80px_rgba(0,0,0,.45)]
          transition-transform
          duration-500
          ease-[cubic-bezier(.22,1,.36,1)]
          ${
            historyOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        <div className="
          p-4
          border-b
          border-white/[0.06]
        ">

          <div className="
            text-[9px]
            tracking-[.2em]
            text-zinc-700
          ">
            WORKSPACE
          </div>

          <div className="
            mt-2
            text-sm
            text-zinc-300
            truncate
          ">
            {projectName}
          </div>

        </div>

        <div className="p-3">

          <div className="
            text-[9px]
            uppercase
            tracking-[.16em]
            text-zinc-700
            px-2
            mb-2
          ">
            Recent
          </div>

          <button
            type="button"
            className="
              w-full
              text-left
              px-3
              py-2.5
              rounded-lg
              bg-white/[0.035]
              text-[10px]
              text-zinc-300
            "
          >
            {projectName}
          </button>

        </div>

      </div>


      {/* ======================================================
          TOAST
      ====================================================== */}

      {toast && (
        <div className="
          absolute
          bottom-6
          left-1/2
          -translate-x-1/2
          z-[120]
          px-4
          py-2.5
          rounded-xl
          border
          border-white/[0.09]
          bg-[#101012]/95
          backdrop-blur-xl
          shadow-[0_15px_50px_rgba(0,0,0,.55)]
          text-[10px]
          text-zinc-300
          animate-aurora-in
        ">
          {toast}
        </div>
      )}

    </main>
  );
        }
