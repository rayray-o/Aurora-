import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
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
    title: "Landing page",
    prompt:
      "Build a premium landing page for a modern creative technology company.",
  },
  {
    title: "SaaS dashboard",
    prompt:
      "Build a polished SaaS analytics dashboard with revenue, users, activity and conversion metrics.",
  },
  {
    title: "Portfolio",
    prompt:
      "Build a cinematic portfolio website for an independent film studio.",
  },
  {
    title: "E-commerce",
    prompt:
      "Build a premium minimalist storefront for a luxury fashion brand.",
  },
];

export default function ChatPanel({
  messages = [],
  streaming = false,
  onSubmit,
  onStop,
  onOpenPreview,
}) {
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState([]);
  const [enhancing, setEnhancing] = useState(false);
  const [composerExpanded, setComposerExpanded] =
    useState(false);

  const textareaRef = useRef(null);
  const bottomRef = useRef(null);

  const hasConversation = messages.length > 0;

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [messages, streaming]);

  useEffect(() => {
    const handleKeyboard = (event) => {
      if (
        (event.metaKey || event.ctrlKey) &&
        event.key === "Enter"
      ) {
        event.preventDefault();

        if (streaming) {
          onStop?.();
        } else {
          submit();
        }
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
  }, [input, streaming]);

  const submit = () => {
    const value = input.trim();

    if (!value || streaming) {
      return;
    }

    onSubmit?.(value);

    setInput("");
    setAttachments([]);
    setComposerExpanded(false);
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

  const useSuggestion = (prompt) => {
    setInput(prompt);

    requestAnimationFrame(() => {
      textareaRef.current?.focus();
    });
  };

  const enhancePrompt = () => {
    if (!input.trim() || enhancing) {
      return;
    }

    setEnhancing(true);

    window.setTimeout(() => {
      setInput(
        `${input.trim()}. Make the interface exceptionally polished, responsive, production-ready, and visually refined with strong typography, thoughtful spacing, clear hierarchy, subtle interactions, and excellent mobile behavior.`
      );

      setEnhancing(false);
    }, 550);
  };

  const addAttachment = () => {
    setAttachments((current) => [
      ...current,
      {
        id: `${Date.now()}-${current.length}`,
        name: "reference-image.png",
        type: "image",
      },
    ]);
  };

  return (
    <div className="
      h-full
      w-full
      flex
      flex-col
      relative
      overflow-hidden
      bg-black
    ">

      {/* Ambient atmosphere */}

      <div className="
        pointer-events-none
        absolute
        inset-0
        bg-[radial-gradient(circle_at_50%_15%,rgba(255,18,50,.045),transparent_34%)]
      " />

      {/* ======================================================
          EMPTY STATE
      ====================================================== */}

      {!hasConversation && (
        <div className="
          relative
          z-10
          flex
          justify-center
          px-5
          pt-[14vh]
          md:pt-[17vh]
        ">

          <div className="
            text-center
            max-w-2xl
            animate-aurora-in
          ">

            <div className="
              inline-flex
              items-center
              gap-2
              px-2.5
              py-1.5
              rounded-full
              border
              border-white/[0.07]
              bg-white/[0.025]
              text-[9px]
              uppercase
              tracking-[.18em]
              text-zinc-600
            ">

              <span className="
                w-1.5
                h-1.5
                rounded-full
                bg-[#ff1232]
                shadow-[0_0_10px_rgba(255,18,50,.55)]
              " />

              AI WEBSITE BUILDER

            </div>

            <h1 className="
              mt-7
              text-[clamp(44px,6vw,76px)]
              leading-[.92]
              tracking-[-.065em]
              font-medium
            ">
              What do you want
              <br />
              <span className="text-zinc-600">
                to build?
              </span>
            </h1>

            <p className="
              mt-6
              mx-auto
              max-w-[540px]
              text-[13px]
              leading-6
              text-zinc-600
            ">
              Describe the website you want in plain
              language. Aurora will turn the idea into
              an editable interface you can inspect,
              iterate on, and eventually deploy.
            </p>

          </div>

        </div>
      )}

      {/* ======================================================
          CONVERSATION
      ====================================================== */}

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
          pt-8
          pb-8
        ">

          {messages.map((message, index) => (
            <ConversationMessage
              key={message.id || index}
              message={message}
              onOpenPreview={onOpenPreview}
            />
          ))}

          {streaming && (
            <GenerationProgress />
          )}

          <div ref={bottomRef} />

        </div>

      </div>

      {/* ======================================================
          SUGGESTIONS
      ====================================================== */}

      {!hasConversation && (
        <div className="
          relative
          z-10
          w-full
          max-w-[820px]
          mx-auto
          px-5
          pb-5
        ">

          <div className="
            flex
            gap-2
            overflow-x-auto
            scrollbar-hide
          ">

            {suggestions.map((suggestion) => (
              <button
                key={suggestion.title}
                type="button"
                onClick={() =>
                  useSuggestion(
                    suggestion.prompt
                  )
                }
                className="
                  shrink-0
                  px-3
                  py-2
                  rounded-lg
                  border
                  border-white/[0.07]
                  bg-white/[0.02]
                  text-[10px]
                  text-zinc-600
                  hover:text-zinc-200
                  hover:bg-white/[0.045]
                  hover:border-white/[0.12]
                  transition-all
                "
              >
                {suggestion.title}
              </button>
            ))}

          </div>

        </div>
      )}

      {/* ======================================================
          COMPOSER
      ====================================================== */}

      <div className="
        relative
        z-20
        w-full
        max-w-[820px]
        mx-auto
        px-5
        pb-5
      ">

        <div
          className={`
            rounded-2xl
            border
            bg-[#09090b]/95
            backdrop-blur-2xl
            shadow-[0_20px_80px_rgba(0,0,0,.55)]
            transition-all
            ${
              composerExpanded
                ? "border-white/[0.13]"
                : "border-white/[0.08]"
            }
          `}
        >

          {/* Attachments */}

          {attachments.length > 0 && (
            <div className="
              flex
              flex-wrap
              gap-2
              px-3
              pt-3
            ">

              {attachments.map(
                (attachment) => (
                  <div
                    key={attachment.id}
                    className="
                      flex
                      items-center
                      gap-2
                      px-2
                      py-1.5
                      rounded-lg
                      border
                      border-white/[0.07]
                      bg-white/[0.025]
                    "
                  >

                    <Image
                      size={12}
                      className="text-zinc-600"
                    />

                    <span className="
                      text-[9px]
                      text-zinc-500
                    ">
                      {attachment.name}
                    </span>

                    <button
                      type="button"
                      onClick={() =>
                        setAttachments(
                          (current) =>
                            current.filter(
                              (item) =>
                                item.id !==
                                attachment.id
                            )
                        )
                      }
                      className="
                        text-zinc-700
                        hover:text-white
                        transition-colors
                      "
                    >
                      <X size={10} />
                    </button>

                  </div>
                )
              )}

            </div>
          )}

          {/* Input */}

          <textarea
            ref={textareaRef}
            value={input}
            onChange={(event) =>
              setInput(event.target.value)
            }
            onKeyDown={handleKeyDown}
            onFocus={() =>
              setComposerExpanded(true)
            }
            placeholder={
              hasConversation
                ? "Describe a change..."
                : "Describe the website you want to build..."
            }
            rows={
              composerExpanded
                ? 4
                : 3
            }
            className="
              w-full
              resize-none
              bg-transparent
              outline-none
              px-4
              pt-4
              text-sm
              leading-6
              text-zinc-200
              placeholder:text-zinc-700
            "
          />

          {/* Composer controls */}

          <div className="
            px-3
            pb-3
            flex
            items-center
            justify-between
          ">

            <div className="
              flex
              items-center
              gap-1
            ">

              <ComposerButton
                icon={Paperclip}
                label="Attach"
                onClick={addAttachment}
              />

              <ComposerButton
                icon={Plus}
                label="More"
                onClick={() =>
                  setComposerExpanded(true)
                }
              />

              <ComposerButton
                icon={Wand2}
                label={
                  enhancing
                    ? "Enhancing"
                    : "Enhance prompt"
                }
                onClick={enhancePrompt}
                active={enhancing}
              />

            </div>

            <div className="
              flex
              items-center
              gap-3
            ">

              <span className="
                hidden
                sm:block
                text-[9px]
                text-zinc-800
              ">
                ⌘ ENTER
              </span>

              <button
                type="button"
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
                      ? "bg-white/[0.08] text-white hover:bg-white/[0.12]"
                      : input.trim()
                      ? "bg-[#ff1232] text-white shadow-[0_0_25px_rgba(255,18,50,.18)] hover:bg-[#ff2945]"
                      : "bg-white/[0.04] text-zinc-700"
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
          flex
          justify-center
          mt-2.5
          text-[9px]
          text-zinc-800
        ">
          Aurora can make mistakes. Review generated code before deployment.
        </div>

      </div>

    </div>
  );
}


/* ============================================================
   CONVERSATION MESSAGE
============================================================ */

function ConversationMessage({
  message,
  onOpenPreview,
}) {
  const isUser =
    message.role === "user";

  return (
    <div className="
      mb-8
      animate-aurora-in
    ">

      <div className="
        flex
        items-center
        gap-2
        mb-2.5
      ">

        <div
          className={`
            w-6
            h-6
            rounded-lg
            grid
            place-items-center
            border
            ${
              isUser
                ? "bg-white/[0.04] border-white/[0.07]"
                : "bg-[#160406] border-[#341117]"
            }
          `}
        >

          {isUser ? (
            <span className="
              text-[7px]
              font-semibold
              text-zinc-500
            ">
              YOU
            </span>
          ) : (
            <Sparkles
              size={12}
              className="text-[#ff1232]"
            />
          )}

        </div>

        <span className="
          text-[9px]
          uppercase
          tracking-[.18em]
          text-zinc-700
        ">
          {isUser ? "You" : "Aurora"}
        </span>

      </div>

      <div
        className={`
          text-[13px]
          leading-6
          whitespace-pre-wrap
          ${
            isUser
              ? "text-zinc-300"
              : "text-zinc-400"
          }
        `}
      >
        {message.content}
      </div>

      {message.generation && (
        <button
          type="button"
          onClick={onOpenPreview}
          className="
            mt-4
            w-full
            max-w-[560px]
            rounded-xl
            border
            border-white/[0.07]
            bg-[#080809]
            p-3
            text-left
            hover:border-white/[0.13]
            hover:bg-[#0c0c0e]
            transition-all
            group
          "
        >

          <div className="
            flex
            items-center
            gap-3
          ">

            <div className="
              w-9
              h-9
              rounded-lg
              bg-[#111114]
              border
              border-white/[0.06]
              grid
              place-items-center
            ">
              <Sparkles
                size={14}
                className="
                  text-[#ff1232]
                  group-hover:scale-110
                  transition-transform
                "
              />
            </div>

            <div className="flex-1 min-w-0">

              <div className="
                text-[11px]
                text-zinc-300
                truncate
              ">
                {message.generation.template}
              </div>

              <div className="
                text-[9px]
                text-zinc-700
                mt-1
              ">
                Generated website · Open preview
              </div>

            </div>

            <ArrowUp
              size={13}
              className="
                rotate-45
                text-zinc-700
                group-hover:text-white
                transition-colors
              "
            />

          </div>

        </button>
      )}

    </div>
  );
}


/* ============================================================
   GENERATION PROGRESS
============================================================ */

function GenerationProgress() {
  const stages = [
    "Understanding request",
    "Planning page structure",
    "Generating interface",
    "Preparing preview",
  ];

  return (
    <div className="
      mb-8
      animate-aurora-in
    ">

      <div className="
        flex
        items-center
        gap-2
        mb-4
      ">

        <div className="
          w-6
          h-6
          rounded-lg
          bg-[#160406]
          border
          border-[#341117]
          grid
          place-items-center
        ">
          <Sparkles
            size={12}
            className="text-[#ff1232]"
          />
        </div>

        <span className="
          text-[10px]
          uppercase
          tracking-[.18em]
          text-zinc-600
        ">
          Aurora is building
        </span>

      </div>

      <div className="
        max-w-[460px]
        rounded-xl
        border
        border-white/[0.07]
        bg-[#080809]
        p-4
      ">

        <div className="space-y-3">

          {stages.map(
            (stage, index) => (
              <div
                key={stage}
                className="
                  flex
                  items-center
                  gap-3
                "
              >

                <span
                  className={`
                    w-1.5
                    h-1.5
                    rounded-full
                    ${
                      index === 2
                        ? "bg-[#ff1232] animate-pulse"
                        : index < 2
                        ? "bg-zinc-500"
                        : "bg-zinc-800"
                    }
                  `}
                />

                <span
                  className={`
                    text-[10px]
                    ${
                      index <= 2
                        ? "text-zinc-400"
                        : "text-zinc-800"
                    }
                  `}
                >
                  {stage}
                </span>

              </div>
            )
          )}

        </div>

        <div className="
          mt-4
          h-px
          bg-[#18181b]
          overflow-hidden
        ">
          <div className="
            h-full
            w-1/3
            bg-[#ff1232]
            shadow-[0_0_12px_rgba(255,18,50,.5)]
            animate-aurora-progress
          " />
        </div>

      </div>

    </div>
  );
}


/* ============================================================
   COMPOSER BUTTON
============================================================ */

function ComposerButton({
  icon: Icon,
  label,
  onClick,
  active = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      title={label}
      className={`
        w-8
        h-8
        rounded-lg
        grid
        place-items-center
        transition-all
        ${
          active
            ? "text-[#ff1232] bg-[#18070a]"
            : "text-zinc-700 hover:text-zinc-300 hover:bg-white/[0.04]"
        }
      `}
    >
      <Icon size={14} />
    </button>
  );
           }
