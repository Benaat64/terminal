// src/components/Terminal/TerminalInput.tsx
import { KeyboardEvent, useState } from "react";
import { commands } from "../constants/commands";

interface TerminalInputProps {
  onCommand: (command: string) => void;
}

export default function TerminalInput({ onCommand }: TerminalInputProps) {
  const [input, setInput] = useState("");
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    switch (e.key) {
      case "Enter":
        if (input.trim()) {
          onCommand(input);
          setCommandHistory((prev) => [...prev, input]);
          setInput("");
          setHistoryIndex(-1);
        }
        break;

      case "ArrowUp":
        e.preventDefault();
        if (commandHistory.length > 0) {
          const newIndex =
            historyIndex < commandHistory.length - 1
              ? historyIndex + 1
              : historyIndex;
          setHistoryIndex(newIndex);
          setInput(commandHistory[commandHistory.length - 1 - newIndex] || "");
        }
        break;

      case "ArrowDown":
        e.preventDefault();
        if (historyIndex > -1) {
          const newIndex = historyIndex - 1;
          setHistoryIndex(newIndex);
          setInput(
            newIndex === -1
              ? ""
              : commandHistory[commandHistory.length - 1 - newIndex] || ""
          );
        }
        break;

      case "Tab":
        e.preventDefault();
        if (input) {
          const completions = Object.keys(commands).filter((cmd) =>
            cmd.toLowerCase().startsWith(input.toLowerCase())
          );

          if (completions.length === 1) {
            setInput(completions[0]);
          } else if (completions.length > 0) {
            onCommand("");
            completions.forEach((cmd) => onCommand(`  ${cmd}`));
          }
        }
        break;

      case "l":
        if (e.ctrlKey) {
          e.preventDefault();
          onCommand("clear");
        }
        break;
    }
  };

  return (
    <div className="flex items-center">
      <span className="text-green-500 mr-2">➜</span>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent outline-none text-gray-200"
        autoFocus
      />
    </div>
  );
}
