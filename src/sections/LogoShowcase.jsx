import { logoIconsList } from "../constants";
import { LogoShowcaseSkeleton, useSkeletonLoader } from "../components/Skeleton";

const LogoIcon = ({ icon }) => {
  return (
    <div className="flex-none flex-center marquee-item">
      <img src={icon.imgPath} alt={icon.name} />
    </div>
  );
};

const LogoShowcase = () => {
  const { loading, showContent } = useSkeletonLoader(600);

  if (loading) {
    return <LogoShowcaseSkeleton />;
  }

  return (
    <div className={`transition-opacity duration-500 ease-out ${showContent ? "opacity-100" : "opacity-0"} md:my-20 my-10 relative`}>
      <div className="gradient-edge" />
      <div className="gradient-edge" />

      <div className="marquee h-52">
        <div className="marquee-box md:gap-12 gap-5">
          {logoIconsList.map((icon, index) => (
            <LogoIcon key={index} icon={icon} />
          ))}

          {logoIconsList.map((icon, index) => (
            <LogoIcon key={index} icon={icon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default LogoShowcase;
