import React from "react";

interface LogoProps {
  className?: string;
  size?: number;
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = "",
  size = 32,
  showText = true,
}) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* SVG replicating the exact Navior 'N' logo with royal blue top-right blade */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="flex-shrink-0 transition-transform duration-300 hover:scale-105 drop-shadow-[0_0_12px_rgba(37,99,235,0.3)]"
      >
        {/* Main 'N' Body */}
        <path
          d="M 16 18 H 36 V 82 H 16 V 18 Z M 36 18 L 68 68 V 82 H 52 L 24 38 V 18 Z M 68 44 V 82 H 84 V 44 Z"
          className="fill-white dark:fill-white"
        />
        {/* Royal Blue Top-Right Wedge Accent */}
        <path
          d="M 60 18 L 84 40 V 18 H 60 Z"
          fill="#2563eb"
        />
      </svg>

      {showText && (
        <span className="font-display font-bold tracking-tight text-white text-lg sm:text-xl">
          NAVIOR <span className="text-blue-500 font-light">STUDIOS</span>
        </span>
      )}
    </div>
  );
};

export default Logo;
