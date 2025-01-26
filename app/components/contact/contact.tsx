import TechStack from "../about/techstack";
import Reveal from "../mini/reveal";

const Contact = () => {
  return (
    <div className="h-screen bg-blue-60 relative flex items-center">
      <TechStack
        numberOfPolygons={50}
        options={{ walled: false, wrap: true }}
        style="pointer-events-none absolute top-0 left-0 w-full h-full"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/50"></div>

      <div className="container z-10 mx-auto grid grid-cols-2 gap-2 h-full items-center">
        <div className="text-white">
          <Reveal>
            <p className="text-[4vw]">
              Is your next big idea ready to see the light?
            </p>
          </Reveal>
          <Reveal>
            <p className="text-[2vw]">Let&apos;s Talk</p>
          </Reveal>
        </div>

        <form className="z-10 flex justify-center items-center text-white">
          <div className="flex flex-col gap-4">
            <Reveal>
              <input
                className="w-[33vw] bg-white/20 focus:outline-none backdrop-blur-sm p-4 rounded-xl"
                type="text"
                placeholder="Name"
              />
            </Reveal>
            <Reveal>
              <input
                className="w-[33vw] bg-white/20 focus:outline-none backdrop-blur-sm p-4 rounded-xl"
                type="email"
                placeholder="Email"
              />
            </Reveal>
            <Reveal>
              <textarea
                className="w-[33vw] bg-white/20 focus:outline-none backdrop-blur-sm p-4 rounded-xl"
                placeholder="Message"
              ></textarea>
            </Reveal>
            <Reveal style="w-full">
              <button className="w-full p-4 text-center rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/60 hover:text-black duration-150">
                Send
              </button>
            </Reveal>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Contact;
