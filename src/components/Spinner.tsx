interface ISpinner {
  message: string;
}

const Spinner = ({ message }: ISpinner) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-full my-auto">
      <p className="text-center">{message}</p>
      <div className="w-16 h-16 border-4 border-[#EAEAEA] border-t-[#0084FF] rounded-full animate-spin"></div>
    </div>
  );
};

export default Spinner;
