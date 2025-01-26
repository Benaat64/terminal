interface TerminalHeaderProps {
  onFullScreen: (isFullScreen: boolean) => void;
}

export default function TerminalHeader({ onFullScreen }: TerminalHeaderProps) {
  const handleClose = () => {
    if (window.confirm("Êtes-vous sûr de vouloir fermer le terminal ?")) {
      window.close();
    }
  };

  const handleMaximizeMinimize = (isMaximize: boolean) => {
    onFullScreen(isMaximize);
  };

  return (
    <div className="bg-gray-800 px-4 py-2 flex items-center border-b border-gray-700 select-none">
      <div className="flex space-x-2">
        <button
          onClick={handleClose}
          className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
        />
        <button
          onClick={() => handleMaximizeMinimize(false)}
          className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"
        />
        <button
          onClick={() => handleMaximizeMinimize(true)}
          className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors"
        />
      </div>
      <div className="flex-1 text-center text-sm text-gray-400">
        ~/Romain Esquerra
      </div>
    </div>
  );
}
