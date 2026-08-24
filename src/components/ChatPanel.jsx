import React, {
  useEffect,
  useRef,
  useState,
} from "react";

import {
  ArrowUp,
  Code2,
  File,
  Image,
  Paperclip,
  Plus,
  Sparkles,
  Square,
  Wand2,
  X,
} from "lucide-react";

const suggestions = [
  {
    label: "SaaS dashboard",
    prompt:
      "Build a premium SaaS analytics dashboard with revenue, customers, conversion and activity.",
  },
  {
    label: "Crypto terminal",
    prompt:
      "Build an institutional crypto trading and portfolio intelligence dashboard.",
  },
  {
    label: "Security platform",
    prompt:
      "Build a cybersecurity command center with threats, incidents, endpoints and risk intelligence.",
  },
  {
    label: "Portfolio",
    prompt:
      "Build a minimal cinematic portfolio for an independent creative studio.",
  },
];

export default function ChatPanel({
  messages,
  streaming,
  onSubmit,
  onStop,
  onOpenPreview,
}) {
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [enhancing, setEnhancing] = useState(false);

  const textareaRef = useRef(null);
  const bottomRef = useRef(null);

  const hasMessages = messages.length > 0;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messages, streaming]);

  const submit = () => {
    if (!input.trim() || streaming) return;

    onSubmit(input.trim());

    setInput("");
    setAttachments([]);
    setExpanded(false);
  };

  const enhance = () => {
    if (!input.trim() || enhancing) return;

    setEnhancing(true);

    setTimeout(() => {
      setInput(
        `${input.trim()}. Make it production-grade with exceptional typography, spacing, responsive behavior, clear hierarchy, polished interactions, and a premium visual system.`
      );

      setEnhancing(false);

      requestAnimationFrame(() => {
        textareaRef.current?.focus();
      });
    }, 500);
  };

  const addAttachment = () => {
    setAttachments((current) => [
      ...current,
      {
        id: Date.now(),
        name: `reference-${current.length + 1}.png`,
      },
    ]);
  };

  return (
    <div className="
      h-full
      w-full
      flex
      flex-col
      bg-black
      relative
      overflow-hidden
    ">
      <div className="
        absolute
        inset-0
        pointer-events-none
        technical-grid
        opacity-[.18]
      " />

      <div className="
        absolute
        inset-0
        pointer-events-none
        bg-[radial-gradient(circle_at_50%_18%,rgba(183,255,42,.035),transparent_35%)]
      " />

      {!hasMessages ? (
        <div className="
          relative
          flex-1
          flex
          flex-col
          justify-center
          items-center
          px-5
          pb-24
        ">
          <div className="w-full max-w-[760px]">
            <div className="flex items-center justify-center mb-6">
              <div className="
                w-10
                h-10
                rounded-xl
                border
                border-[#b7ff2a]/[.14]
                bg-[#b7ff2a]/[.035]
                grid
                place-items-center
              ">
                <Sparkles
                  size={17}
                  className="text-[#b7ff2a]"
                />
              </div>
            </div>

            <h1 className="
              text-center
              text-[clamp(38px,6vw,68px)]
              font-medium
              tracking-[-.065em]
              leading-[.94]
            ">
              What are we
              <br />
              <span className="text-zinc-600">
                building?
              </span>
            </h1>

            <p className="
              max-w-[540px]
              mx-auto
              mt-6
              text-center
              text-[12px]
              leading-6
              text-zinc-600
            ">
              Describe the website, product, or interface
              you have in mind. Start broad or be precise.
              Aurora will turn the brief into an editable
              workspace.
            </p>

            <div className="
              mt-9
              flex
              gap-2
              justify-center
              flex-wrap
            ">
              {suggestions.map((item) => (
                <button
                  key={item.label}
                  onClick={() => {
                    setInput(item.prompt);
                    setExpanded(true);

                    requestAnimationFrame(() =>
                      textareaRef.current?.focus()
                    );
                  }}
                  className="
                    px-3
                    py-2
                    rounded-lg
                    border
                    border-white/[.07]
                    bg-white/[.02]
                    text-[10px]
                    text-zinc-600
                    hover:text-zinc-200
                    hover:border-white/[.13]
                    hover:bg-white/[.045]
                    transition-all
                  "
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="
          relative
          z-10
          flex-1
          min-h-0
          overflow-y-auto
          px-5
          md:px-8
        ">
          <div className="
            max-w-[760px]
            mx-auto
            py-10
          ">
            {messages.map((message) => (
              <Message
                key={message.id}
                message={message}
                onOpenPreview={onOpenPreview}
              />
            ))}

            {streaming && <StreamingState />}

            <div ref={bottomRef} />
          </div>
        </div>
      )}

      <div className="
        relative
        z-20
        w-full
        max-w-[820px]
        mx-auto
        px-4
        md:px-5
        pb-5
      ">
        <div className="
          rounded-2xl
          border
          border-white/[.08]
          bg-[#09090b]/95
          backdrop-blur-2xl
          shadow-[0_30px_100px_rgba(0,0,0,.55)]
          overflow-hidden
        ">
          {attachments.length > 0 && (
            <div className="flex gap-2 px-3 pt-3">
              {attachments.map((file) => (
                <div
                  key={file.id}
                  className="
                    flex
                    items-center
                    gap-2
                    px-2
                    py-1.5
                    rounded-lg
                    border
                    border-white/[.06]
                    bg-white/[.025]
                  "
                >
                  <File size={11} className="text-zinc-600" />

                  <span className="text-[9px] text-zinc-500">
                    {file.name}
                  </span>

                  <button
                    onClick={() =>
                      setAttachments((current) =>
                        current.filter(
                          (item) =>
                            item.id !== file.id
                        )
                      )
                    }
                  >
                    <X
                      size={10}
                      className="text-zinc-700 hover:text-white"
                    />
                  </button>
                </div>
              ))}
            </div>
          )}

          <textarea
            ref={textareaRef}
            value={input}
            onChange={(event) =>
              setInput(event.target.value)
            }
            onFocus={() => setExpanded(true)}
            onKeyDown={(event) => {
              if (
                event.key === "Enter" &&
                !event.shiftKey
              ) {
                event.preventDefault();
                submit();
              }
            }}
            rows={expanded ? 5 : 3}
            placeholder={
              hasMessages
                ? "Describe the next change..."
                : "Describe the website you want to build..."
            }
            className="
              w-full
              bg-transparent
              resize-none
              outline-none
              px-4
              pt-4
              text-[13px]
              leading-6
              text-zinc-200
              placeholder:text-zinc-700
            "
          />

          <div className="
            px-3
            pb-3
            flex
            items-center
            justify-between
          ">
            <div className="flex items-center gap-1">
              <ComposerButton
                icon={Paperclip}
                onClick={addAttachment}
              />

              <ComposerButton
                icon={Plus}
                onClick={() =>
                  setExpanded(true)
                }
              />

              <ComposerButton
                icon={Wand2}
                active={enhancing}
                onClick={enhance}
              />
            </div>

            <div className="flex items-center gap-3">
              <span className="
                hidden
                sm:block
                text-[8px]
                text-zinc-800
              ">
                SHIFT + ENTER FOR NEW LINE
              </span>

              <button
                onClick={
                  streaming
                    ? onStop
                    : submit
                }
                disabled={
                  !streaming &&
                  !input.trim()
                }
                className={`
                  w-9
                  h-9
                  rounded-xl
                  grid
                  place-items-center
                  transition-all
                  ${
                    streaming
                      ? "bg-white/[.08] text-white"
                      : input.trim()
                      ? "bg-[#b7ff2a] text-black shadow-[0_0_28px_rgba(183,255,42,.12)] hover:bg-[#c5ff51]"
                      : "bg-white/[.04] text-zinc-700"
                  }
                `}
              >
                {streaming ? (
                  <Square
                    size={10}
                    fill="currentColor"
                  />
                ) : (
                  <ArrowUp size={16} />
                )}
              </button>
            </div>
          </div>
        </div>

        <div className="
          text-center
          text-[8px]
          text-zinc-800
          mt-2.5
        ">
          Describe changes naturally. Aurora keeps your project context.
        </div>
      </div>
    </div>
  );
}

function ComposerButton({
  icon: Icon,
  onClick,
  active,
}) {
  return (
    <button
      onClick={onClick}
      className={`
        w-8
        h-8
        rounded-lg
        grid
        place-items-center
        transition-all
        ${
          active
            ? "text-[#b7ff2a] bg-[#b7ff2a]/[.06]"
            : "text-zinc-700 hover:text-zinc-300 hover:bg-white/[.04]"
        }
      `}
    >
      <Icon size={14} />
    </button>
  );
}

function Message({
  message,
  onOpenPreview,
}) {
  const user = message.role === "user";

  return (
    <article className="
      mb-9
      animate-aurora-in
    ">
      <div className="
        flex
        items-center
        gap-2
        mb-3
      ">
        <div className={`
          w-6
          h-6
          rounded-lg
          border
          grid
          place-items-center
          ${
            user
              ? "border-white/[.07] bg-white/[.025]"
              : "border-[#b7ff2a]/[.13] bg-[#b7ff2a]/[.035]"
          }
        `}>
          {user ? (
            <span className="text-[7px] text-zinc-600 font-semibold">
              YOU
            </span>
          ) : (
            <Sparkles
              size={12}
              className="text-[#b7ff2a]"
            />
          )}
        </div>

        <span className="text-[9px] uppercase tracking-[.18em] text-zinc-700">
          {user ? "You" : "Aurora"}
        </span>
      </div>

      <div className={`
        text-[13px]
        leading-7
        whitespace-pre-wrap
        ${
          user
            ? "text-zinc-300"
            : "text-zinc-400"
        }
      `}>
        {message.content}
      </div>

      {message.generation && (
        <button
          onClick={onOpenPreview}
          className="
            mt-4
            w-full
            max-w-[560px]
            p-3
            rounded-xl
            border
            border-white/[.07]
            bg-white/[.018]
            text-left
            hover:border-[#b7ff2a]/[.16]
            hover:bg-[#b7ff2a]/[.025]
            transition-all
          "
        >
          <div className="flex items-center gap-3">
            <div className="
              w-9
              h-9
              rounded-lg
              border
              border-[#b7ff2a]/[.1]
              bg-[#b7ff2a]/[.035]
              grid
              place-items-center
            ">
              <Code2
                size={14}
                className="text-[#b7ff2a]"
              />
            </div>

            <div className="flex-1 min-w-0">
              <div className="text-[11px] text-zinc-300">
                {message.generation.template}
              </div>

              <div className="text-[9px] text-zinc-700 mt-1">
                Generated workspace · Open preview
              </div>
            </div>
          </div>
        </button>
      )}
    </article>
  );
}

function StreamingState() {
  return (
    <div className="
      flex
      items-center
      gap-3
      py-3
      animate-aurora-in
    ">
      <div className="
        w-6
        h-6
        rounded-lg
        border
        border-[#b7ff2a]/[.12]
        bg-[#b7ff2a]/[.03]
        grid
        place-items-center
      ">
        <Sparkles
          size={12}
          className="text-[#b7ff2a] animate-aurora-pulse"
        />
      </div>

      <div>
        <div className="text-[10px] text-zinc-400">
          Building your workspace
        </div>

        <div className="
          mt-1
          w-44
          h-[2px]
          bg-white/[.04]
          overflow-hidden
          rounded-full
        ">
          <div className="
            w-1/3
            h-full
            bg-[#b7ff2a]
            animate-aurora-progress
          " />
        </div>
      </div>
    </div>
  );
              }
