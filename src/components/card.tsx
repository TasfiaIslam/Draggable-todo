import { Draggable } from "react-beautiful-dnd";

interface CardProps {
  id: number;
  title: string;
  draggableId: string;
  index: number;
}
const Card = ({ title, draggableId, index }: CardProps) => {
  return (
    <Draggable
      draggableId={draggableId}
      index={index}
      // isDragDisabled={isDragDisabled}
    >
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="px-2 py-4 font-medium w-full h-24 shadow-md shadow-blue-300 rounded-md"
        >
          {title}
        </div>
      )}
    </Draggable>
  );
};

export default Card;
