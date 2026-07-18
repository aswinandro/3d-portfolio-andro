const TitleHeader = ({ title, sub }) => {
  return (
    <div className="flex flex-col items-center gap-5">
      <div className="hero-badge">
        <p>{sub}</p>
      </div>
      <div>
        <h1
          className="font-semibold md:text-5xl text-3xl text-center"
          style={{
            letterSpacing: "-0.03em",
            lineHeight: "1.1",
          }}
        >
          {title}
        </h1>
      </div>
    </div>
  );
};

export default TitleHeader;
