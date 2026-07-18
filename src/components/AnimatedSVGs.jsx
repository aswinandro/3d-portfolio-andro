const AnimatedSVGs = () => {
  const svgs = [
    {
      id: "code",
      path: "M16 18l6-6-6-6M8 6l-6 6 6 6",
      color: "#22c55e",
      size: 32,
      style: { top: "12%", left: "8%" },
      delay: 0,
      duration: 7,
    },
    {
      id: "cloud",
      path: "M18 10h-1.26A8 8 0 109 20h9a5 5 0 000-10z",
      color: "#3b82f6",
      size: 28,
      style: { top: "20%", right: "12%" },
      delay: 1.2,
      duration: 8,
    },
    {
      id: "layers",
      path: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5",
      color: "#a855f7",
      size: 26,
      style: { bottom: "25%", left: "5%" },
      delay: 0.8,
      duration: 6.5,
    },
    {
      id: "terminal",
      path: "M4 17l6-6-6-6M12 19h8",
      color: "#06b6d4",
      size: 24,
      style: { top: "35%", left: "15%" },
      delay: 2,
      duration: 9,
    },
    {
      id: "database",
      path: "M12 2C6.48 2 2 4.02 2 6.5v11C2 19.98 6.48 22 12 22s10-2.02 10-4.5v-11C22 4.02 17.52 2 12 2zM2 6.5C2 8.99 6.48 11 12 11s10-2.01 10-4.5M2 12c0 2.49 4.48 4.5 10 4.5s10-2.01 10-4.5",
      color: "#f59e0b",
      size: 22,
      style: { bottom: "30%", right: "8%" },
      delay: 1.5,
      duration: 7.5,
    },
    {
      id: "shield",
      path: "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
      color: "#ef4444",
      size: 20,
      style: { top: "15%", right: "25%" },
      delay: 0.5,
      duration: 8.5,
    },
    {
      id: "cpu",
      path: "M9 3v2m6-2v2M9 19v2m6-2v2M3 9h2m-2 6h2m14-6h2m-2 6h2M7 7h10v10H7zM5 5h2m-2 2h2m12-2h2m-2 2h2M5 17h2m-2-2h2m12 2h2m-2-2h2",
      color: "#22c55e",
      size: 26,
      style: { top: "55%", left: "3%" },
      delay: 3,
      duration: 6,
    },
    {
      id: "git-branch",
      path: "M6 3v12M18 9a3 3 0 100-6 3 3 0 000 6zM6 21a3 3 0 100-6 3 3 0 000 6zM18 9a9 9 0 01-9 9",
      color: "#f97316",
      size: 24,
      style: { bottom: "15%", right: "18%" },
      delay: 2.5,
      duration: 7,
    },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
      {svgs.map((svg) => (
        <div
          key={svg.id}
          className="hero-float-svg absolute"
          style={{
            ...svg.style,
            animationDelay: `${svg.delay}s`,
            animationDuration: `${svg.duration}s`,
          }}
        >
          <svg
            width={svg.size}
            height={svg.size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={svg.color}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ opacity: 0.15 }}
          >
            <path d={svg.path} />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default AnimatedSVGs;
