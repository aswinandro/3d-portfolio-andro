import useScrollReveal from "../hooks/useScrollReveal";
import { logoIconsList } from "../constants";
import { LogoShowcaseSkeleton, useSkeletonLoader } from "../components/Skeleton";

const LogoIcon = ({ icon }) => (
  <div className="flex-none flex-center marquee-item opacity-30 hover:opacity-60 transition-all duration-500 hover:scale-105">
    <img src={icon.imgPath} alt="Company logo" className="h-7 md:h-9 object-contain grayscale hover:grayscale-0 transition-all duration-500" />
  </div>
);

const LogoShowcase = () => {
  const { loading, showContent } = useSkeletonLoader(600);
  const ref = useScrollReveal({ y: 20 });

  if (loading) {
    return <LogoShowcaseSkeleton />;
  }

  return (
    <div
      ref={ref}
      className={`transition-opacity duration-500 ease-out ${
        showContent ? "opacity-100" : "opacity-0"
      } md:my-16 my-10 relative`}
    >
      {/* Top line */}
      <div
        className="w-full h-[1px] mb-8"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.15) 50%, transparent 100%)",
        }}
      />

      <div className="marquee h-44">
        <div className="marquee-box md:gap-14 gap-6">
          {[...logoIconsList, ...logoIconsList].map((icon, index) => (
            <LogoIcon key={index} icon={icon} />
          ))}
        </div>
      </div>

      {/* Bottom line */}
      <div
        className="w-full h-[1px] mt-8"
        style={{
          background: "linear-gradient(90deg, transparent 0%, rgba(168,85,247,0.15) 50%, transparent 100%)",
        }}
      />
    </div>
  );
};

export default LogoShowcase;
