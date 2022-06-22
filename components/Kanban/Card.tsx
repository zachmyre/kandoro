export const Card = (props: any) => {
  return (
    <div className="flex justify-between p-3 text-center bg-green-400 hover:bg-green-200">
      {props.children}
    </div>
  );
};

export default Card;
