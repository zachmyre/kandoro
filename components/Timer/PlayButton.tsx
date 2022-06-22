import { MdPlayCircleFilled } from "react-icons/md";

export const PlayButton = ({ props }: any) => {
  return (
    <div>
      <MdPlayCircleFilled className="h-12 w-12 text-pink-600 hover:text-pink-500" />
    </div>
  );
};

export default PlayButton;
