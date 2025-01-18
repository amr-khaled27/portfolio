"use client";
import { useEffect, useRef } from "react";
import SplitType from "split-type";

const About = () => {
  const myText = useRef<HTMLHeadingElement | null>(null);
  useEffect(() => {
    const text = new SplitType(myText.current!);
    console.log(text);
  }, []);
  return ( 
    <div className="w-full h-screen bg-red-700 overflow-hidden flex justify-center">
      <div className="container mx-auto mt-16">
        <h2 ref={myText} className="text-white text-3xl text-center">About The Developer</h2>
      </div>
    </div>
   );
}
 
export default About;