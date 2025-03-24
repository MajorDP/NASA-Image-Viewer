import { Link } from "react-router-dom";

interface IError {
  message: string;
}
function Error({ message }: IError) {
  return (
    <div className="flex flex-col gap-2 py-10">
      <p className="text-red-500 text-center">{message}</p>
      <Link
        to="/"
        className="text-center underline hover:text-[#0084FF] duration-200"
      >
        Return to Homepage
      </Link>
    </div>
  );
}

export default Error;
