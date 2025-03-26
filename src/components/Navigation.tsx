import { Globe2, Image, MenuIcon, Rocket } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="hidden md:flex w-full bg-[#0D0D0D] text-lg lg:text-xl justify-between p-6 border-b border-[#5D3FD3]">
        <div>
          <Link
            to="/"
            className="text-xl lg:text-2xl flex flex-row items-center gap-2"
          >
            <Rocket size={30} className="text-[#5D3FD3]" /> Nasa Explorer
          </Link>
        </div>

        <div className="flex flex-row gap-10">
          <div>
            <Link to="/apod" className="hover:text-[#0084FF] duration-200">
              APOD
            </Link>
          </div>
          <div>
            <Link
              to="/my-location"
              className="hover:text-[#0084FF] duration-200"
            >
              Your location
            </Link>
          </div>
          <div>
            <Link to="/earth" className="hover:text-[#0084FF] duration-200">
              See Earth
            </Link>
          </div>
        </div>
      </nav>

      <div
        className={`md:hidden pl-4 pt-4 duration-300 ${
          isOpen ? "bg-[#0D0D0D] opacity-100" : "bg-transparent"
        }`}
      >
        <MenuIcon size={30} onClick={() => setIsOpen(!isOpen)} />
      </div>
      <nav
        className={`${
          isOpen
            ? "max-h-[500px] opacity-100 pointer-events-auto"
            : "max-h-0 opacity-0 pointer-events-none"
        } transition-all duration-300 ease-in-out flex flex-col gap-3 md:hidden w-full bg-[#0D0D0D] text-lg p-4 border-b border-[#5D3FD3]`}
      >
        <Link
          to="/"
          className="flex items-center gap-2"
          onClick={() => setIsOpen(false)}
        >
          <Rocket className="text-[#5D3FD3]" /> Nasa Explorer
        </Link>
        <Link
          to="/apod"
          className="flex items-center gap-2"
          onClick={() => setIsOpen(false)}
        >
          <Image /> APOD
        </Link>
        <Link
          to="/my-location"
          className="flex items-center gap-2"
          onClick={() => setIsOpen(false)}
        >
          <Globe2 /> Your location
        </Link>
        <Link
          to="/earth"
          className="flex items-center gap-2"
          onClick={() => setIsOpen(false)}
        >
          <Rocket /> See Earth
        </Link>
      </nav>
    </>
  );
}

export default Navigation;
