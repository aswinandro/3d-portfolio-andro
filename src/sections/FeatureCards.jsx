import useScrollReveal from "../hooks/useScrollReveal";
import { abilities } from "../constants";
import { FeatureCardsSkeleton, useSkeletonLoader } from "../components/Skeleton";

const FeatureCard = ({ imgPath, title, desc, index }) => {
  const ref = useScrollReveal("fadeUp", { y: 30, delay: index * 0.1 });

  return (
    <div
      ref={ref}
      className="card-border rounded-xl p-7 flex flex-col gap-4 group relative overflow-hidden"
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: "linear-gradient(90deg, #a855f7, #6366f1)" }}
      />

      {/* Mouse glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-xl"
        style={{
          background:
            "radial-gradient(300px circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(168,85,247,0.04), transparent 40%)",
        }}
      />

      <div
        className="size-12 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
        style={{
          background: "rgba(168, 85, 247, 0.08)",
          border: "1px solid rgba(168, 85, 247, 0.12)",
        }}
      >
        <img src={imgPath} alt={title} className="w-6 h-6" />
      </div>

      <h3
        className="text-white text-xl font-semibold mt-1"
        style={{ letterSpacing: "-0.02em" }}
      >
        {title}
      </h3>

      <p
        className="text-sm leading-relaxed"
        style={{ color: "#94a3b8" }}
      >
        {desc}
      </p>
    </div>
  );
};

const FeatureCards = () => {
  const { loading, showContent } = useSkeletonLoader(650);

  if (loading) {
    return <FeatureCardsSkeleton />;
  }

  return (
    <div
      className={`transition-opacity duration-500 ease-out ${
        showContent ? "opacity-100" : "opacity-0"
      } w-full padding-x-lg`}
    >
      <div className="mx-auto grid-3-cols">
        {abilities.map((ability, index) => (
          <FeatureCard key={ability.title} {...ability} index={index} />
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;
