import TechStack from "../about/techstack";

const Contact = () => {
  return (
    <div className="h-screen bg-blue-60 ">
      <TechStack
        numberOfPolygons={50}
        options={{ walled: false, wrap: true }}
        style="pointer-events-none"
      />
    </div>
  );
};

export default Contact;
