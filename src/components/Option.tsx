import { Image, LucideIcon } from "lucide-react";
import { Link } from "react-router-dom";

interface IOption {
  option: {
    name: string;
    description: string;
    link: string;
    icon: LucideIcon;
  };
}
function Option({ option }: IOption) {
  return (
    <Link
      to={option.link}
      className={`hover:scale-105 w-full bg-[#0D0D0D] hover:bg-[#161616] hover:text-[#9f88fa] text-[#5d3fd3] border border-[#5D3FD3] p-4 sm:p-8 rounded-xl hover:border-[#9f88fa] transition-all duration-300`}
    >
      <Image className="w-12 h-12 mx-auto mb-4 " />
      <h2 className="text-base xl:text-xl font-semibold mb-3 text-[#EAEAEA]">
        {option.name}
      </h2>
      <p className="opacity-60 text-sm lg:text-base text-[#EAEAEA]">
        {option.description}
      </p>
    </Link>
  );
}

export default Option;
