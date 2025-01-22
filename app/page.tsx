import Header from "./components/header";
import Landing from "./components/landing";
import About from "./components/about";

export default function Home() {
  return (
    <>
      <Header />
      <Landing />
      <About />
      <div className="h-screen bg-stone-600"></div>
    </>
  );
}
