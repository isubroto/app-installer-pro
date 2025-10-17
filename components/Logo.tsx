import React from "react";
import { Sparkles } from "lucide-react";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = "md", showText = true }) => {
  const sizes = {
    sm: { icon: 24, text: "text-2xl", container: "p-2" },
    md: { icon: 32, text: "text-4xl", container: "p-3" },
    lg: { icon: 48, text: "text-6xl", container: "p-4" },
  };

  const config = sizes[size];

  return (
    <div className="flex items-center gap-3">
      <div
        className={`bg-gradient-to-br from-purple-600 to-pink-600 ${config.container} rounded-2xl shadow-lg relative overflow-hidden group`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
        <Sparkles className="text-white relative z-10" size={config.icon} />
      </div>
      {showText && (
        <div>
          <h1 className="text-2xl font-black bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
            AppMaster
          </h1>
          <p className="text-gray-400 mt-1 font-medium">
            Install everything with one click ✨
          </p>
        </div>
      )}
    </div>
  );
};
