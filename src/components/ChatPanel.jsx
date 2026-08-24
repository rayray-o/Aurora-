import React, { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  ChevronDown,
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
  messages,
  streaming,
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

    onSubmit(value);

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
        `${input.trim()}. Make the interface exceptionally polished, responsive, spacious, and production-ready with strong typography, thoughtful interactions, and a refined visual hierarchy.`
      );

      setEnhancing(false);
    }, 550);
  };

  const addAttachment = () => {
    /*
     * This is the future attachment boundary.
     *
     * A real implementation can replace this with:
     *
     * <input type="file" />
     *
     * followed by an upload pipeline.
     */

    setAttachments((current) => [
      ...current,
      {
        id: crypto.randomUUID(),
        name: "reference-image.png",
        type: "image",
      },
    ]);
  };

  const hasConversation = messages.length > 0;

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

      {/* --------------------------------------------------
          AMBIENT LIGHT
      -------------------------------------------------- */}

      <div className="
        pointer-events-none
        absolute
        inset-0
        bg-[radial-gradient(circle_at_50%_20%,rgba(255,18,50,.045),transparent_34%)]
      " />

      {/* --------------------------------------------------
          TOP CONTEXT
      -------------------------------------------------- */}

      <div className="
        relative
        z-10
        flex
        justify-center
        pt-[12vh]
        md:pt-[15vh]
        px-5
      ">

        {!hasConversation && (
          <div className="
            text-center
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
                shadow-[0_0_9px_rgba(255,18,50,.6)]
              />

              AI WEBSITE BUILDER

            </div>

            <h1 className="
              mt-7
              text-[clamp(42px,6vw,72px)]
              leading-[.95]
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
              mt-5
              max-w-lg
              mx-auto
              text-sm
              leading-6
              text-zinc-600
            ">
              Describe a website in plain language.
              Aurora designs the interface, writes the
              code, and gives you a live preview to iterate on.
            </p>

          </div>
        )}

      </div>

      {/* --------------------------------------------------
          CONVERSATION
      -------------------------------------------------- */}

      <div className="
        relative
        z-10
        flex-1
        min-h-0
        overflow-y-auto
        px-5
        md:px-8
        pb-8
      ">

        <div className="
          max-w-[760px]
          mx-auto
          pt-10
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

      {/* --------------------------------------------------
          SUGGESTIONS
      -------------------------------------------------- */}

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
            pb-1
            scrollbar-hide
          ">

            {suggestions.map((suggestion) => (
              <button
                key={suggestion.title}
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

      {/* --------------------------------------------------
          COMPOSER
      -------------------------------------------------- */}

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
