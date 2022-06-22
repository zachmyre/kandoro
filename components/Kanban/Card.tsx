import { pink, green } from "../Timer/Timer";

export const Card = (props: any) => {
  return (
    <div className="p-3 text-center bg-green-400 hover:bg-green-200">
      {props.children}
    </div>
  );
};

export default Card;
