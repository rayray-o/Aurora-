import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  Check,
  ChevronDown,
  FileCode2,
  Paperclip,
  Plus,
  Sparkles,
  Square,
  WandSparkles,
} from "lucide-react";

export default function ChatPanel({
  messages,
  streaming,
  onSubmit,
  onStop,
  width,
  onResize,
}) {
  const [input, setInput] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);

  const endRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messages, streaming]);

  const submit = () => {
    const value = input.trim();

    if (!value || streaming) return;

    onSubmit(value);
    setInput("");
  };

  const handleKeyDown = (event) => {
    if (
      event.key === "Enter" &&
      !event.shiftKey
    ) {
      event.preventDefault();
      submit();
    }
  };

  const resizeStart = () => {
    onResize?.();
  };

  return (
    <aside
      style={{ width }}
      className="
        relative
        shrink-0
        bg-[#070708]
        border-r
        border-[#1e1e21]
        flex
        flex-col
        panel-transition
      "
    >

      {/* HEADER */}

      <div className="h-11 shrink-0 px-4 border-b border-[#1e1e21] flex items-center justify-between">

        <div className="flex items-center gap-2">

          <div className="w-5 h-5 rounded-md bg-[#16080b] border border-[#3b151b] grid place-items-center">
            <Sparkles
              size={10}
              className="text-[#ff1232]"
            />
          </div>

          <span className="text-[11px] font-semibold tracking-wide">
            AURORA AGENT
          </span>

        </div>

        <div className="flex items-center gap-2">

          <span className="w-1.5 h-1.5 rounded-full bg-[#ff1232] shadow-[0_0_8px_rgba(255,18,50,.5)]" />

          <span className="text-[9px] text-zinc-700 tracking-[.15em]">
            LIVE
          </span>

        </div>

      </div>

      {/* MESSAGE AREA */}

      <div className="flex-1 overflow-y-auto px-4 py-5">

        {messages.length === 0 && (
          <EmptyState
            onSuggestion={(value) => {
              setInput(value);

              requestAnimationFrame(() => {
                textareaRef.current?.focus();
              });
            }}
          />
        )}

        <div className="space-y-7">

          {messages.map((message, index) => (
            <Message
              key={`${message.role}-${index}`}
              message={message}
            />
          ))}

          {streaming && (
            <StreamingState />
          )}

        </div>

        <div ref={endRef} />

      </div>

      {/* SUGGESTION BAR */}

      <div className="px-3">

        <button
          onClick={() =>
            setShowSuggestions((value) => !value)
          }
          className="
            w-full
            h-8
            rounded-lg
            border
            border-[#1e1e21]
            bg-[#09090b]
            flex
            items-center
            justify-between
            px-3
            text-[10px]
            text-zinc-600
            hover:text-zinc-300
            hover:border-[#2d2d32]
            interactive
          "
        >
          <span className="flex items-center gap-2">
            <WandSparkles size={11} />
            Suggestions
          </span>

          <ChevronDown
            size={12}
            className={
              showSuggestions
                ? "rotate-180 transition-transform"
                : "transition-transform"
            }
          />
        </button>

        {showSuggestions && (
          <div className="mt-1.5 grid grid-cols-2 gap-1.5 animate-aurora-in">

            {[
              "Make it more minimal",
              "Add analytics",
              "Improve navigation",
              "Make it responsive",
            ].map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => {
                  setInput(suggestion);
                  textareaRef.current?.focus();
                }}
                className="
                  p-2
                  rounded-lg
                  border
                  border-[#1e1e21]
                  bg-[#09090b]
                  text-left
                  text-[9px]
                  text-zinc-600
                  hover:text-zinc-300
                  hover:border-[#303036]
                  interactive
                "
              >
                {suggestion}
              </button>
            ))}

          </div>
        )}

      </div>

      {/* COMPOSER */}

      <div className="p-3 border-t border-[#1e1e21] bg-[#050506]">

        <div
          className="
            rounded-xl
            border
            border-[#29292d]
            bg-[#0b0b0d]
            focus-within:border-[#444449]
            transition-colors
          "
        >

          <textarea
            ref={textareaRef}
            value={input}
            onChange={(event) =>
              setInput(event.target.value)
            }
            onKeyDown={handleKeyDown}
            rows={3}
            placeholder="Ask Aurora to change something..."
            className="
              w-full
              bg-transparent
              resize-none
              outline-none
              px-3
              pt-3
              text-xs
              text-zinc-200
              placeholder:text-zinc-700
            "
          />

          <div className="px-2.5 pb-2.5 flex items-center justify-between">

            <div className="flex items-center gap-1">

              <button
                className="
                  w-7
                  h-7
                  grid
                  place-items-center
                  rounded-lg
                  text-zinc-700
                  hover:text-zinc-300
                  hover:bg-[#151518]
                  interactive
                "
              >
                <Paperclip size={14} />
              </button>

              <button
                className="
                  w-7
                  h-7
                  grid
                  place-items-center
                  rounded-lg
                  text-zinc-700
                  hover:text-zinc-300
                  hover:bg-[#151518]
                  interactive
                "
              >
                <Plus size={14} />
              </button>

            </div>

            <button
              onClick={streaming ? onStop : submit}
              disabled={
                !streaming &&
                !input.trim()
              }
              className={`
                w-7
                h-7
                rounded-lg
                grid
                place-items-center
                interactive

                ${
                  streaming
                    ? "bg-[#1b1b1f] text-white"
                    : input.trim()
                    ? "bg-[#ff1232] text-white shadow-[0_0_20px_rgba(255,18,50,.16)]"
                    : "bg-[#151518] text-zinc-700"
                }
              `}
            >
              {streaming ? (
                <Square
                  size={10}
                  fill="currentColor"
                />
              ) : (
                <ArrowUp size={14} />
              )}
            </button>

          </div>

        </div>

        <div className="text-[9px] text-zinc-800 text-center mt-2">
          ENTER TO SEND · SHIFT + ENTER FOR NEW LINE
        </div>

      </div>

      {/* RESIZE HANDLE */}

      <div
        onMouseDown={resizeStart}
        className="
          absolute
          top-0
          right-[-4px]
          w-2
          h-full
          cursor-col-resize
          z-40
          group
        "
      >
        <div className="
          h-full
          w-px
          mx-auto
          bg-transparent
          group-hover:bg-[#444449]
          transition-colors
        " />
      </div>

    </aside>
  );
}

function EmptyState({ onSuggestion }) {
  const suggestions = [
    "Build an institutional crypto analytics terminal",
    "Create a cybersecurity operations center",
    "Design a polished SaaS dashboard",
  ];

  return (
    <div className="pt-7 pb-8 animate-aurora-in">

      <div className="text-[9px] uppercase tracking-[.22em] text-zinc-700 mb-3">
        Agent ready
      </div>

      <h2 className="text-xl font-medium tracking-tight text-zinc-100">
        What should we build?
      </h2>

      <p className="text-xs leading-5 text-zinc-600 mt-2 max-w-[310px]">
        Describe an interface, product, or experience.
        Aurora will architect the workspace and generate
        the first pass.
      </p>

      <div className="mt-6 space-y-2">

        {suggestions.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => onSuggestion(suggestion)}
            className="
              w-full
              text-left
              p-3
              rounded-xl
              border
              border-[#1e1e21]
              bg-[#09090b]
              text-[11px]
              text-zinc-500
              hover:text-zinc-200
              hover:border-[#303036]
              interactive
            "
          >
            {suggestion}
          </button>
        ))}

      </div>

    </div>
  );
}

function Message({ message }) {
  const isUser = message.role === "user";

  return (
    <div className="animate-aurora-in">

      <div className="flex items-center gap-2 mb-2">

        <div
          className={`
            w-5
            h-5
            rounded-md
            grid
            place-items-center

            ${
              isUser
                ? "bg-[#17171a]"
                : "bg-[#16080b] border border-[#3b151b]"
            }
          `}
        >
          {isUser ? (
            <span className="text-[7px] font-semibold">
              YOU
            </span>
          ) : (
            <Sparkles
              size={10}
              className="text-[#ff1232]"
            />
          )}
        </div>

        <span className="text-[9px] uppercase tracking-[.16em] text-zinc-700">
          {isUser ? "Request" : "Aurora"}
        </span>

      </div>

      <div className="text-[12px] leading-5 text-zinc-300 whitespace-pre-wrap">
        {message.content}
      </div>

      {message.files && (
        <div className="
          mt-3
          flex
          items-center
          gap-2
          p-2.5
          rounded-lg
          border
          border-[#1e1e21]
          bg-[#09090b]
        ">

          <FileCode2
            size={13}
            className="text-zinc-600"
          />

          <div>
            <div className="text-[10px] text-zinc-400">
              Workspace updated
            </div>

            <div className="text-[8px] text-zinc-700 mt-0.5">
              Canvas + source synchronized
            </div>
          </div>

          <Check
            size={12}
            className="ml-auto text-zinc-600"
          />

        </div>
      )}

    </div>
  );
}

function StreamingState() {
  return (
    <div className="animate-aurora-in">

      <div className="flex items-center gap-2 text-[11px] text-zinc-500">

        <span className="
          w-1.5
          h-1.5
          rounded-full
          bg-[#ff1232]
          animate-aurora-pulse
        " />

        Architecting workspace...

      </div>

      <div className="
        mt-3
        h-1
        rounded-full
        bg-[#17171a]
        aurora-shimmer
      " />

    </div>
  );
                }
