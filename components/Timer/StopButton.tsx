import { MdStopCircle } from "react-icons/md";

export const StopButton = ({ props }: any) => {
  return (
    <div>
      <MdStopCircle className="h-12 w-12 text-pink-600 hover:text-pink-500" />
    </div>
  );
};

export default StopButton;
