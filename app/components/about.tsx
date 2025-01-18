import Reveal from "./reveal";

const About = () => {
  return (
    <div className="bg-red-700 h-screen flex justify-center items-center">
      <div className="container mx-auto">
        <div className="flex justify-center">
          <Reveal>
            <h2 className="text-center text-white text-3xl font-semibold">
              About The Developer
            </h2>
          </Reveal>
        </div>
      </div>
    </div>
  );
};

export default About;
