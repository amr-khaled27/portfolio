"use client";
import { useRef } from "react";
import "./about.css";

const About = () => {
  const myText = useRef<HTMLHeadingElement | null>(null);
  return ( 
    <div className="w-full h-screen bg-red-700 overflow-hidden flex justify-center">
      <div className="container mx-auto mt-16">
        <h2 ref={myText} className="about text-white text-3xl text-center">About The Developer</h2>
      </div>
    </div>
   );
}
 
export default About;