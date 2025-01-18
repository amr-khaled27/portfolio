"use client";
import { useRef } from 'react';
import Image from 'next/image';

const Shape = () => {
  const globeRef = useRef<HTMLImageElement>(null);
  const circleRef = useRef<HTMLImageElement>(null);

  return ( 
    <div ref={circleRef} className="w-[600px] h-[600px] bg-red-700 rounded-full absolute bottom-[-400px] left-1/2 -translate-x-1/2 flex justify-center">
      <Image ref={globeRef} src="/globe.svg" width={200} height={200} alt="hero" className="w-1/3 h-1/3 object-cover -mt-20" />
    </div>
   );
}
 
export default Shape;