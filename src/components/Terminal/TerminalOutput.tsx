import { useState } from "react";
import TerminalHeader from "./TerminalHeader";
import TerminalInput from "./TerminalInput";
import { commands } from "../constants/commands";

interface OutputLine {
  id: string;
  content: string;
}

export default function Terminal() {
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [output, setOutput] = useState<OutputLine[]>([
    {
      id: "1",
      content: 'Bienvenue! Tapez "help" pour voir les commandes disponibles.',
    },
  ]);

  const handleCommand = (command: string) => {
    const cmd = commands[command.toLowerCase()];
    const newOutput = [
      ...output,
      { id: Date.now().toString(), content: `➜ ${command}` },
    ];

    if (cmd) {
      newOutput.push(
        ...cmd.action().map((line) => ({
          id: Date.now().toString() + Math.random(),
          content: line,
        }))
      );
    } else {
      newOutput.push({
        id: Date.now().toString(),
        content: `Commande non reconnue: ${command}`,
      });
    }

    setOutput(newOutput);
  };

  return (
    <div className="min-h-screen bg-gray-800 flex items-center justify-center p-4">
      <div
        className={`
        bg-gray-900 rounded-lg shadow-xl overflow-hidden transition-all duration-300
        ${isFullScreen ? "w-[1000px] h-[800px]" : "w-[800px] h-[600px]"}
      `}
      >
        <TerminalHeader onFullScreen={setIsFullScreen} />
        <div
          className={`
          p-4 overflow-y-auto flex flex-col space-y-2 font-mono
          ${isFullScreen ? "h-[calc(800px-40px)]" : "h-[calc(600px-40px)]"}
        `}
        >
          {output.map((line) => (
            <div key={line.id} className="text-white">
              {line.content}
            </div>
          ))}
          <TerminalInput onCommand={handleCommand} />
        </div>
      </div>
    </div>
  );
}
