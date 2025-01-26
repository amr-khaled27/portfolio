import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";
import Links from "./mini/links";

const Footer = () => {
  return (
    <footer className="p-4 flex justify-center text-white">
      <div className="flex flex-col">
        <FontAwesomeIcon className="text-xl" icon={faAngleUp} />
        <p>© 2025 Amr Khaled. All rights reserved.</p>
        <Links />
      </div>
    </footer>
  );
};

export default Footer;
