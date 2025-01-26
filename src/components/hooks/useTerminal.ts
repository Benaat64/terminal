import { useState } from "react";
import { commands } from "../constants/commands";

interface OutputLine {
  id: string;
  type: "command" | "response";
  content: string;
  isCommandInHelp?: boolean;
}

export function useTerminal() {
  const [output, setOutput] = useState<OutputLine[]>([
    {
      id: "1",
      type: "response",
      content: `      
########   #######  ########  ######## ########  #######  ##       ####  #######  
##     ## ##     ## ##     ##    ##    ##       ##     ## ##        ##  ##     ## 
##     ## ##     ## ##     ##    ##    ##       ##     ## ##        ##  ##     ## 
########  ##     ## ########     ##    ######   ##     ## ##        ##  ##     ## 
##        ##     ## ##   ##      ##    ##       ##     ## ##        ##  ##     ## 
##        ##     ## ##    ##     ##    ##       ##     ## ##        ##  ##     ## 
##         #######  ##     ##    ##    ##        #######  ######## ####  #######  
                                                        
`,
    },
    {
      id: "2",
      type: "response",
      content:
        'Bienvenue sur mon Portfolio ! Pour afficher les commandes disponibles tapez <span class="text-red-500">"help"</span>.',
    },
    {
      id: "3",
      type: "response",
      content:
        "Pour valider chaque commande appuyez sur <span class='italic'>Enter</span>, vous pouvez utiliser la touche Tabulation afin de vous aider à compléter une commande.",
    },
  ]);
  const executeCommand = (command: string) => {
    if (command === "clear") {
      setOutput([]);
      return;
    }

    const cmd = commands[command.toLowerCase()];
    const newOutput = [
      ...output,
      { id: Date.now().toString(), type: "command", content: `➜ ${command}` },
    ];

    if (cmd) {
      newOutput.push(
        ...cmd.action().map((line) => {
          const parts = line.split(" - ");
          return {
            id: Date.now().toString() + Math.random(),
            type: "response",
            content: line,
            isCommandInHelp: parts.length === 2,
          };
        })
      );
    } else {
      newOutput.push({
        id: Date.now().toString(),
        type: "response",
        content: `Commande non reconnue: ${command}`,
      });
    }

    setOutput(newOutput);
  };

  return { output, executeCommand };
}
