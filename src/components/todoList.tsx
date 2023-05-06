import { useState } from "react";
import { DragDropContext, DropResult, Droppable } from "react-beautiful-dnd";
import ItemsColumn from "./itemsColumn";

interface ITodoItem {
  id: number;
  title: string;
}

const initialTodoItems = [
  {
    id: 1,
    title: "Study Geography",
  },
  {
    id: 2,
    title: "Water plants",
  },
  {
    id: 3,
    title: "Bake a cake",
  },
];

const TodoList = () => {
  const [todoItems, setTodoItems] = useState([...initialTodoItems]);
  const [doneItems, setDoneItems] = useState([]);

  const reorder = (
    list: Array<ITodoItem>,
    startIndex: number,
    endIndex: number
  ) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  const handleRightDraggedItems = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    console.log({ source });
    console.log({ destination });

    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const sInd = source.droppableId;
    const dInd = destination?.droppableId;

    // REORDER: if source and destination droppable ids are todoDroppableColumn
    if (sInd === "todoDroppableColumn" && sInd === dInd) {
      if (destination && sInd === "todoDroppableColumn") {
        const reorderedItems = reorder(
          todoItems,
          source.index,
          destination.index
        );

        setTodoItems([...reorderedItems]);
      }
    }
    // DROP TO LEFT : if source droppableId is doneDroppableColumn
    else {
      if (source.droppableId === "doneDroppableColumn") {
        handleRightDraggedItems(result);
      }
    }
  };

  return (
    <div className="w-[800px] mx-auto">
      <p className="py-12 text-3xl text-center font-semibold">Todo List </p>
      <div className="grid grid-cols-2 gap-x-4 justify-between">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="todoDroppableColumn">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <ItemsColumn columnTitle={"Todos"} items={todoItems} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="doneDroppableColumn">
            {(provided, snapshot) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <ItemsColumn columnTitle="Done" items={doneItems} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
    </div>
  );
};

export default TodoList;
