import { socialImgs } from "../constants";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="flex flex-col justify-center">
          <p
            className="text-xs"
            style={{
              color: "#475569",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.05em",
            }}
          >
            Terms & Conditions
          </p>
        </div>
        <div className="socials">
          {socialImgs.map((socialImg, index) => (
            <div key={index} className="icon">
              <a
                href={socialImg.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={socialImg.imgPath} alt="social icon" />
              </a>
            </div>
          ))}
        </div>
        <div className="flex flex-col justify-center">
          <p
            className="text-center md:text-end text-xs"
            style={{
              color: "#475569",
              fontFamily: "'JetBrains Mono', monospace",
              letterSpacing: "0.05em",
            }}
          >
            &copy; {new Date().getFullYear()} Aswin Andro
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
