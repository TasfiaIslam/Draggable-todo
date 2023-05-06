interface CardProps {
  id: number;
  title: string;
}
const Card = ({ title }: CardProps) => {
  return (
    <div className="px-2 py-4 font-medium w-full h-24 shadow-md shadow-blue-300 rounded-md">
      {title}
    </div>
  );
};

export default Card;
