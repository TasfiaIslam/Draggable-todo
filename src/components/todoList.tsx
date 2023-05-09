import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import ItemsColumn from "./itemsColumn";
import Droppable from "./droppable";

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
  {
    id: 4,
    title: "Bake a cake",
  },
  {
    id: 5,
    title: "Bake a cake",
  },
];

const TodoList = () => {
  const [todoItems, setTodoItems] = useState<Array<ITodoItem>>([
    ...initialTodoItems,
  ]);
  const [doneItems, setDoneItems] = useState<Array<ITodoItem>>([]);

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

  const handleDraggedItems = (result: DropResult) => {
    if (!result.destination) {
      return;
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

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
    // REORDER: if source and destination droppable ids are doneDroppableColumn
    if (sInd === "doneDroppableColumn" && sInd === dInd) {
      if (destination && sInd === "doneDroppableColumn") {
        const reorderedItems = reorder(
          doneItems,
          source.index,
          destination.index
        );

        setDoneItems([...reorderedItems]);
      }
    }
    if (sInd === "todoDroppableColumn" && dInd === "doneDroppableColumn") {
      // handleDraggedItems(result);
      if (!result.destination) {
        return;
      }

      const itemToDrop = todoItems.find(
        (item) => item.id.toString() == result.draggableId
      );
      //INSERT: dragged item to done list
      if (itemToDrop) {
        const doneListItems = Array.from(doneItems);
        doneListItems.splice(result.destination.index, 0, itemToDrop);

        setDoneItems([...doneListItems]);
        setTodoItems((current) =>
          current.filter((item) => item.id !== itemToDrop.id)
        );
      }
    }

    if (sInd === "doneDroppableColumn" && dInd === "todoDroppableColumn") {
      // handleDraggedItems(result);
      if (!result.destination) {
        return;
      }

      const itemToDrop = doneItems.find(
        (item) => item.id.toString() == result.draggableId
      );
      //INSERT: dragged item to done list
      if (itemToDrop) {
        const todoListItems = Array.from(todoItems);
        todoListItems.splice(result.destination.index, 0, itemToDrop);

        setTodoItems([...todoListItems]);
        setDoneItems((current) =>
          current.filter((item) => item.id !== itemToDrop.id)
        );
      }
    }
  };

  return (
    <div className="w-[800px] mx-auto">
      <p className="py-12 text-3xl text-center font-semibold text-blue-800">
        Todo List{" "}
      </p>
      <div className="grid grid-cols-2  gap-x-4 justify-between">
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="todoDroppableColumn">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef}>
                <ItemsColumn columnTitle={"Todos"} items={todoItems} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          <Droppable droppableId="doneDroppableColumn">
            {(provided) => (
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
