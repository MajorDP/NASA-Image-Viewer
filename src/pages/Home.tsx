import { Rocket, Globe2, Image } from "lucide-react";
import Option from "../components/Option";

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
    <div className="max-h-screen relative w-full bg-gradient-to-b  from-[#0d0d0d00] to-[#0D0D0D] py-5">
      <div className="relative w-full">
        <h1 className="text-4xl sm:text-6xl font-bold mb-6 sm:mb-0 bg-gradient-to-r from-[#0084FF] to-[#4faaff] bg-clip-text text-transparent text-center py-10 sm:p-20">
          Explore the Universe
        </h1>
        <div className="">
          <p className="text-center w-[90%] sm:w-auto text-sm sm:text-xl mx-auto sm:p-10 xl:p-0">
            Discover breathtaking images of space, Earth, and astronomical
            phenomena through NASA's powerful APIs.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-8 p-10 xl:p-32 text-center">
            {options.map((option) => (
              <Option option={option} key={option.link} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
