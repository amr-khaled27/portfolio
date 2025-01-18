import Image from "next/image";

const Shape = () => {
  return (
    <div className="w-[600px] h-[600px] bg-red-700 rounded-full absolute flex justify-center">
      <Image
        src="/globe.svg"
        width={200}
        height={200}
        alt="hero"
        className="w-1/3 h-1/3 object-cover -mt-20"
      />
    </div>
  );
};

export default Shape;
