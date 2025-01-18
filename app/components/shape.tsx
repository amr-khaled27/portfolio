"use client";
import { useEffect, useRef } from 'react';
import Image from 'next/image';
import {TweenMax, Power3} from 'gsap';

const Shape = () => {
  const globeRef = useRef<HTMLImageElement>(null);
  const circleRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    TweenMax.from(circleRef.current!, 1, {opacity: 0, y: 40, ease: Power3.easeOut});
    TweenMax.from(globeRef.current!, 1, {opacity: 0, y: 40, ease: Power3.easeOut, delay: 0.5});
  }, []);

  return ( 
    <div ref={circleRef} className="w-[600px] h-[600px] bg-red-700 rounded-full absolute bottom-[-400px] left-1/2 -translate-x-1/2 flex justify-center">
      <Image ref={globeRef} src="/globe.svg" width={200} height={200} alt="hero" className="w-1/2 h-1/2 object-cover -mt-28" />
    </div>
   );
}
 
export default Shape;