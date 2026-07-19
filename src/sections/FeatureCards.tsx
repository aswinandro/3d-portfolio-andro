import useScrollReveal from "../hooks/useScrollReveal";
import { abilities } from "../constants";
import { FeatureCardsSkeleton, useSkeletonLoader } from "../components/Skeleton";
import GlassCard from "../components/GlassCard";
import SectionHeader from "../components/SectionHeader";

const FeatureCard = ({ imgPath, title, desc, index }: { imgPath: string; title: string; desc: string; index: number }) => {
  const ref = useScrollReveal({ y: 30, delay: index * 0.1 });

  return (
    <div ref={ref}>
      <GlassCard className="h-full" hover>
        <div className="p-5 flex flex-col gap-3">
          {/* Icon */}
          <div
            className="w-9 h-9 flex items-center justify-center rounded-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.2)]"
            style={{
              background: "rgba(168, 85, 247, 0.08)",
              border: "1px solid rgba(168, 85, 247, 0.12)",
            }}
          >
            <img src={imgPath} alt={title} className="w-4 h-4" />
          </div>

          {/* Title */}
          <h3
            className="text-base font-medium"
            style={{ letterSpacing: "-0.01em", color: "#f8fafc" }}
          >
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm leading-relaxed" style={{ color: "#64748b" }}>
            {desc}
          </p>
        </div>
      </GlassCard>
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
      <div className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {abilities.map((ability, index) => (
          <FeatureCard key={ability.title} {...ability} index={index} />
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;
