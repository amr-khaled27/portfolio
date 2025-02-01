import {
  faGithub,
  faGoogle,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import TechStack from "../about/techstack";
import Reveal from "../mini/reveal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Contact = () => {
  return (
    <div
      id="contact"
      className="h-screen bg-blue-60 relative flex items-center"
    >
      <TechStack
        numberOfPolygons={50}
        options={{ walled: false, wrap: true }}
        style="absolute top-0 left-0 w-full h-full"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      <div className="container px-4 sm:px-0 z-10 mx-auto grid grid-cols-1 sm:grid-cols-2 gap-2 h-full items-center">
        <div className="text-white flex justify-center sm:p-0">
          <div>
            <Reveal>
              <p className="text-4xl font-semibold sm:text-[4vw] leading-tight">
                Is your next big idea ready to see the light?
              </p>
            </Reveal>
            <Reveal>
              <p className="text-2xl sm:text-[2vw] xl:mt-4">Let&apos;s Talk</p>
            </Reveal>
          </div>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
          className="z-10 sm:flex sm:justify-center items-center text-white"
        >
          <div className="flex flex-col gap-4">
            <Reveal style="w-full sm:w-[33vw]">
              <a
                target="_blank"
                href="mailto:3moorkh2005@gmail.com"
                className="w-full bg-white/20 focus:outline-none duration-300 hover:bg-white/40 backdrop-blur-sm active:scale-95 p-4 rounded-xl grid grid-cols-3"
              >
                <FontAwesomeIcon
                  className="text-3xl"
                  icon={faGoogle}
                ></FontAwesomeIcon>
                <p className="text-center centered text-xl">Email</p>
                <div></div>
              </a>
            </Reveal>
            <Reveal style="w-full sm:w-[33vw]">
              <a
                target="_blank"
                href="https://www.linkedin.com/in/amr-khaled-74b936256/"
                className="w-full bg-white/20 focus:outline-none duration-300 hover:bg-white/40 backdrop-blur-sm active:scale-95 p-4 rounded-xl grid grid-cols-3"
              >
                <FontAwesomeIcon
                  className="text-3xl"
                  icon={faLinkedin}
                ></FontAwesomeIcon>
                <p className="text-center centered text-xl">LinkedIn</p>
                <div></div>
              </a>
            </Reveal>
            <Reveal style="w-full sm:w-[33vw]">
              <a
                target="_blank"
                href="https://github.com/amr-khaled27"
                className="w-full bg-white/20 focus:outline-none duration-300 hover:bg-white/40 backdrop-blur-sm active:scale-95 p-4 rounded-xl grid grid-cols-3"
              >
                <FontAwesomeIcon
                  className="text-3xl"
                  icon={faGithub}
                ></FontAwesomeIcon>
                <p className="text-center centered text-xl">GitHub</p>
                <div></div>
              </a>
            </Reveal>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
