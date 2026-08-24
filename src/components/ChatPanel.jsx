import { useEffect, useRef, useState } from "react";
import {
  ArrowUp,
  Bot,
  ChevronDown,
  Code2,
  FileCode2,
  ImagePlus,
  Loader2,
  Paperclip,
  Plus,
  RotateCcw,
  Sparkles,
  WandSparkles,
  X,
} from "lucide-react";

const suggestions = [
  "Build a crypto dashboard",
  "Design a security operations center",
  "Make the interface more premium",
  "Add responsive mobile layouts",
];

function ChatPanel({
  messages,
  isStreaming,
  onSubmit,
  onRegenerate,
  activeTemplate,
}) {
  const [input, setInput] = useState("");
  const [attachments, setAttachments] = useState([]);
  const textareaRef = useRef(null);
  const messagesRef = useRef(null);

  useEffect(() => {
    const container = messagesRef.current;

    if (!container) return;

    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  const handleSubmit = async (event) => {
    event?.preventDefault();

    if (!input.trim() || isStreaming) return;

    const currentInput = input;

    setInput("");
    setAttachments([]);

    await onSubmit(currentInput, attachments);
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      handleSubmit(event);
    }
  };

  const handleSuggestion = (suggestion) => {
    setInput(suggestion);

    requestAnimationFrame(() => {
      textareaRef.current?.focus();
    });
  };

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files || []);

    setAttachments((current) => [
      ...current,
      ...files.map((file) => ({
        id: `${file.name}-${file.lastModified}`,
        name: file.name,
        size: file.size,
      })),
    ]);

    event.target.value = "";
  };

  return (
    <div className="flex h-full min-h-0 flex-col">
      <div className="flex h-[52px] shrink-0 items-center justify-between border-b border-[#1e1e21] px-4">
        <div className="flex items-center gap-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#121214]">
            <WandSparkles size={12} className="text-[#ff1232]" />
          </div>

          <span className="text-[11px] font-semibold uppercase tracking-[0.11em] text-zinc-300">
            Architect
          </span>
        </div>

        <button
          type="button"
          onClick={onRegenerate}
          disabled={isStreaming}
          className="aurora-transition flex items-center gap-1.5 rounded-md border border-transparent px-2 py-1.5 text-[10px] font-medium text-zinc-600 hover:border-[#1e1e21] hover:bg-[#121214] hover:text-zinc-300 disabled:cursor-not-allowed disabled:opacity-30"
        >
          <RotateCcw size={11} />
          Regenerate
        </button>
      </div>

      <div
        ref={messagesRef}
        className="aurora-scroll min-h-0 flex-1 overflow-y-auto px-4 py-5"
      >
        <div className="space-y-5">
          {messages.map((message) => (
            <ChatMessage key={message.id} message={message} />
          ))}
        </div>
      </div>

      <div className="shrink-0 border-t border-[#1e1e21] bg-[#09090b] p-3">
        <div className="mb-2.5 flex items-center gap-1.5 overflow-x-auto pb-0.5">
          {suggestions.map((suggestion) => (
            <button
              type="button"
              key={suggestion}
              onClick={() => handleSuggestion(suggestion)}
              className="aurora-transition shrink-0 rounded-full border border-[#1e1e21] bg-[#0d0d0f] px-2.5 py-1.5 text-[10px] text-zinc-500 hover:border-[#333338] hover:bg-[#121214] hover:text-zinc-300"
            >
              {suggestion}
            </button>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="overflow-hidden rounded-xl border border-[#29292d] bg-[#0d0d0f] shadow-[0_12px_40px_rgba(0,0,0,0.25)] focus-within:border-[#3a3a3f]"
        >
          {attachments.length > 0 && (
            <div className="flex gap-2 border-b border-[#1e1e21] px-3 py-2">
              {attachments.map((attachment) => (
                <div
                  key={attachment.id}
                  className="flex max-w-[170px] items-center gap-2 rounded-md border border-[#1e1e21] bg-[#121214] px-2 py-1.5"
                >
                  <FileCode2 size={12} className="shrink-0 text-zinc-500" />

                  <span className="truncate text-[10px] text-zinc-400">
                    {attachment.name}
                  </span>

                  <button
                    type="button"
                    onClick={() =>
                      setAttachments((current) =>
                        current.filter((item) => item.id !== attachment.id)
                      )
                    }
                    className="text-zinc-700 hover:text-zinc-300"
                  >
                    <X size={11} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <textarea
            ref={textareaRef}
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyDown={handleKeyDown}
            rows={3}
            disabled={isStreaming}
            placeholder="Describe what you want to build..."
            className="block w-full resize-none bg-transparent px-3.5 py-3 text-[12px] leading-5 text-zinc-200 outline-none placeholder:text-zinc-700 disabled:cursor-not-allowed"
          />

          <div className="flex items-center justify-between border-t border-[#1e1e21] px-2 py-2">
            <div className="flex items-center gap-0.5">
              <label
                title="Attach files"
                className="aurora-transition cursor-pointer rounded-md p-1.5 text-zinc-600 hover:bg-[#121214] hover:text-zinc-300"
              >
                <Paperclip size={14} />
                <input
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>

              <button
                type="button"
                title="Add image"
                onClick={() => {}}
                className="aurora-transition rounded-md p-1.5 text-zinc-600 hover:bg-[#121214] hover:text-zinc-300"
              >
                <ImagePlus size={14} />
              </button>

              <div className="mx-1 h-4 w-px bg-[#1e1e21]" />

              <div className="flex items-center gap-1.5 px-1.5">
                <Sparkles size={11} className="text-[#ff1232]" />
                <span className="text-[10px] font-medium text-zinc-600">
                  Aurora Engine
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={!input.trim() || isStreaming}
              className="aurora-transition flex h-7 w-7 items-center justify-center rounded-md bg-white text-black hover:bg-zinc-200 disabled:cursor-not-allowed disabled:bg-[#1e1e21] disabled:text-zinc-700"
            >
              {isStreaming ? (
                <Loader2 size={13} className="aurora-spin" />
              ) : (
                <ArrowUp size={14} strokeWidth={2.4} />
              )}
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between px-1 pt-2">
          <div className="flex items-center gap-1.5 text-[9px] text-zinc-700">
            <Code2 size={10} />
            <span>Production frontend mode</span>
          </div>

          <span className="text-[9px] text-zinc-700">
            {activeTemplate.name}
          </span>
        </div>
      </div>
    </div>
  );
}

function ChatMessage({ message }) {
  const isUser = message.role === "user";
  const isSystem = message.role === "system";

  if (isSystem) {
    return (
      <div className="rounded-lg border border-[#1e1e21] bg-[#0d0d0f] p-3">
        <div className="mb-2 flex items-center gap-2">
          <div className="h-1.5 w-1.5 rounded-full bg-[#ff1232]" />
          <span className="text-[9px] font-semibold uppercase tracking-[0.13em] text-zinc-600">
            System
          </span>
        </div>

        <p className="text-[11px] leading-5 text-zinc-500">
          {message.content}
        </p>
      </div>
    );
  }

  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md border ${
          isUser
            ? "border-[#29292d] bg-[#121214]"
            : "border-[#ff1232]/20 bg-[#ff1232]/5"
        }`}
      >
        {isUser ? (
          <span className="text-[9px] font-bold text-zinc-500">YOU</span>
        ) : (
          <Bot size={12} className="text-[#ff1232]" />
        )}
      </div>

      <div
        className={`min-w-0 flex-1 ${
          isUser ? "flex flex-col items-end" : ""
        }`}
      >
        <div
          className={`mb-1 text-[9px] uppercase tracking-[0.1em] ${
            isUser ? "text-zinc-700" : "text-zinc-600"
          }`}
        >
          {isUser ? "You" : "Aurora"}
        </div>

        <div
          className={`text-[11px] leading-5 ${
            isUser
              ? "max-w-[88%] rounded-lg border border-[#29292d] bg-[#121214] px-3 py-2 text-zinc-300"
              : "text-zinc-400"
          }`}
        >
          {message.content}

          {message.streaming && <span className="aurora-caret" />}
        </div>

        {message.attachments?.length > 0 && (
          <div className="mt-2 flex flex-wrap justify-end gap-1.5">
            {message.attachments.map((attachment) => (
              <div
                key={attachment.id}
                className="flex items-center gap-1.5 rounded border border-[#1e1e21] px-2 py-1 text-[9px] text-zinc-600"
              >
                <Paperclip size={9} />
                {attachment.name}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ChatPanel;
