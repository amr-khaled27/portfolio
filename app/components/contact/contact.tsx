import TechStack from "../about/techstack";
import Reveal from "../mini/reveal";

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
              <p className="text-2xl sm:text-[2vw]">Let&apos;s Talk</p>
            </Reveal>
          </div>
        </div>

        <form
          method="POST"
          data-netlify="true"
          className="z-10 sm:flex sm:justify-center items-center text-white"
        >
          <div className="flex flex-col gap-4">
            <Reveal style="w-full sm:w-[33vw]">
              <input
                className="w-full sm:w-[33vw] bg-white/20 focus:outline-none backdrop-blur-sm p-4 rounded-xl"
                type="text"
                placeholder="Name"
                name="name"
              />
            </Reveal>
            <Reveal style="w-full sm:w-[33vw]">
              <input
                className="w-full sm:w-[33vw] bg-white/20 focus:outline-none backdrop-blur-sm p-4 rounded-xl"
                type="email"
                placeholder="Email"
                name="email"
              />
            </Reveal>
            <Reveal style="w-full sm:w-[33vw]">
              <textarea
                className="w-full max-h-[200px] sm:w-[33vw] bg-white/20 focus:outline-none backdrop-blur-sm p-4 rounded-xl"
                placeholder="Message"
                name="message"
              ></textarea>
            </Reveal>
            <Reveal style="w-full">
              <button
                type="submit"
                className="w-full p-4 text-center rounded-xl bg-white/20 backdrop-blur-sm hover:bg-white/60 hover:text-black duration-150"
              >
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
