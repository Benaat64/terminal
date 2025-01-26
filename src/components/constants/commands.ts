export const commands = {
  help: {
    name: "help",
    description: "Affiche la liste des commandes",
    action: () => [
      "Commandes disponibles :",
      "help       - Affiche ce message",
      "about      - À propos de moi",
      "xp         - Mon expérience",
      "skills     - Mes compétences",
      "contact    - Me contacter",
      "projects   - Mes projets",
      "clear      - Nettoie le terminal",
    ],
  },
  about: {
    name: "about",
    description: "À propos de moi",
    action: () => [
      "Développeur Full Stack",
      "Passionné par les nouvelles technologies",
      "En recherche active",
    ],
  },
  clear: {
    name: "clear",
    description: "Nettoie le terminal",
    action: () => [],
  },
};

export type CommandName = keyof typeof commands;
