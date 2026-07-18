import { abilities } from "../constants";
import { FeatureCardsSkeleton, useSkeletonLoader } from "../components/Skeleton";

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
        {abilities.map(({ imgPath, title, desc }) => (
          <div
            key={title}
            className="card-border rounded-xl p-8 flex flex-col gap-4 group relative overflow-hidden"
          >
            {/* Gradient accent line at top */}
            <div
              className="absolute top-0 left-0 right-0 h-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
              style={{ background: "linear-gradient(90deg, #22c55e, #3b82f6)" }}
            />

            <div
              className="size-14 flex items-center justify-center rounded-xl"
              style={{
                background: "rgba(34, 197, 94, 0.08)",
                border: "1px solid rgba(34, 197, 94, 0.12)",
              }}
            >
              <img src={imgPath} alt={title} />
            </div>
            <h3
              className="text-white text-2xl font-semibold mt-2"
              style={{ letterSpacing: "-0.02em" }}
            >
              {title}
            </h3>
            <p style={{ color: "#94a3b8" }} className="text-lg leading-relaxed">
              {desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeatureCards;
