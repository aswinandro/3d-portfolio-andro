import { logoIconsList } from "../constants";
import { LogoShowcaseSkeleton, useSkeletonLoader } from "../components/Skeleton";

const LogoIcon = ({ icon }) => {
  return (
    <div className="flex-none flex-center marquee-item opacity-40 hover:opacity-70 transition-opacity duration-300">
      <img src={icon.imgPath} alt="Company logo" className="h-8 md:h-10 object-contain" />
    </div>
  );
};

const LogoShowcase = () => {
  const { loading, showContent } = useSkeletonLoader(600);

  if (loading) {
    return <LogoShowcaseSkeleton />;
  }

  return (
    <div
      className={`transition-opacity duration-500 ease-out ${
        showContent ? "opacity-100" : "opacity-0"
      } md:my-20 my-10 relative`}
    >
      <div className="gradient-edge" />
      <div className="gradient-edge" />

      {/* Top border line */}
      <div
        className="w-full h-[1px] mb-10"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
        }}
      />

      <div className="marquee h-52">
        <div className="marquee-box md:gap-16 gap-8">
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`a-${index}`} icon={icon} />
          ))}
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={`b-${index}`} icon={icon} />
          ))}
        </div>
      </div>

      {/* Bottom border line */}
      <div
        className="w-full h-[1px] mt-10"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
        }}
      />
    </div>
  );
};

export default LogoShowcase;
