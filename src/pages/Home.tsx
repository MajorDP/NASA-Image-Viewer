import { Rocket, Globe2, Image } from "lucide-react";
import { Link } from "react-router-dom";
function Home() {
  const options = [
    {
      name: "Astronomy Picture of the Day",
      description:
        "Explore the cosmos through NASA's carefully curated daily images.",
      link: "/apod",
      icon: Image,
    },
    {
      name: "Earth View",
      description: "View satelite imagery of Earth from your current location.",
      link: "/my-location",
      icon: Globe2,
    },
    {
      name: "EPIC Earth Images",
      description: "See the latest enchanced images of Earth from deep space.",
      link: "/earth",
      icon: Rocket,
    },
  ];

  return (
    <div className="h-screen relative w-full">
      <div
        className="absolute inset-0 z-0 opacity-40"
        style={{
          top: "-70%",
          background:
            "radial-gradient(circle, #5D3FD3 5%, rgba(0, 0, 0, 0) 35%)",
        }}
      ></div>
      <div className="relative z-50 w-full">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 bg-gradient-to-r from-[#0084FF] to-[#4faaff] bg-clip-text text-transparent text-center py-10 sm:p-20">
          Explore the Universe
        </h1>
        <p className="text-center text-sm sm:text-xl mx-auto sm:p-10 xl:p-0">
          Discover breathtaking images of space, Earth, and astronomical
          phenomena through NASA's powerful APIs.
        </p>
        <div className="flex flex-col sm:flex-row justify-center gap-8 p-10 xl:p-32 text-center">
          {options.map((option) => (
            <Link
              to={option.link}
              className={` w-full bg-[#0D0D0D] hover:bg-[#161616] hover:text-[#9f88fa] text-[#5d3fd3] border border-[#5D3FD3] p-4 sm:p-8 rounded-xl hover:border-[#9f88fa] transition-colors duration-300`}
            >
              <Image className="w-12 h-12 mx-auto mb-4 " />
              <h2 className="text-lg xl:text-xl font-semibold mb-3 text-[#EAEAEA]">
                {option.name}
              </h2>
              <p className="opacity-60 text-sm lg:text-base text-[#EAEAEA]">
                {option.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
