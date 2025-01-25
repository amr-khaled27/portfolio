"use client";
// import Header from "./components/header";
import Landing from "./components/landing/landing";
import About from "./components/about/about";
import Projects from "./components/projects/projects";
import Contact from "./components/contact/contact";

export default function Home() {
  return (
    <>
      {/* <Header /> */}
      <Landing />
      <About />
      <Projects />
      <Contact />
    </>
  );
}
