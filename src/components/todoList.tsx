import { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import ItemsColumn from "./itemsColumn";
import Droppable from "./droppable";

interface ITodoItem {
  id: number;
  title: string;
}

interface ColumnItem {
  id: number;
  title: string;
  items: {
    id: number;
    title: string;
  }[];
}

const initialTodoItems = [
  {
    id: 1,
    title: "Go for a walk",
  },
  {
    id: 2,
    title: "Take a nap",
  },
  {
    id: 3,
    title: "Read a book",
  },
  {
    id: 4,
    title: "Work out",
  },
  {
    id: 5,
    title: "Learn something new",
  },
];

const initialColumnData = {
  todoColumn: {
    id: 1,
    title: "To do",
    items: [...initialTodoItems],
  },
  doneColumn: {
    id: 2,
    title: "Done",
    items: [],
  },
};

type ColumnType = { [key: string]: ColumnItem };

const TodoList = () => {
  const [columnData, setColumnData] = useState<ColumnType>(initialColumnData);

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

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const sInd = source.droppableId;
    const dInd = destination?.droppableId;

    // REORDER: if source and destination droppable ids are same
    if (dInd && sInd === dInd) {
      const column = columnData[sInd];
      const reorderedItems = reorder(
        column.items,
        source.index,
        destination.index
      );

      setColumnData({
        ...columnData,
        [dInd]: {
          ...column,
          items: reorderedItems,
        },
      });
    }

    if (dInd && dInd !== sInd) {
      const sourceColumn = columnData[sInd];
      const desColumn = columnData[dInd];

      const itemToDrop = sourceColumn.items.find(
        (item) => item.id.toString() == result.draggableId
      );

      //INSERT: dragged item to another column
      if (itemToDrop) {
        const sourceColumnItems = Array.from(sourceColumn.items);
        const destColumnItems = Array.from(desColumn.items);

        sourceColumnItems.splice(result.source.index, 1);
        destColumnItems.splice(result.destination.index, 0, itemToDrop);

        setColumnData({
          ...columnData,
          [sInd]: {
            ...sourceColumn,
            items: sourceColumnItems,
          },
          [dInd]: {
            ...desColumn,
            items: destColumnItems,
          },
        });
      }
    }
  };

  return (
    <div className="w-[800px] mx-auto">
      <p className="py-12 text-3xl text-center font-semibold text-blue-800">
        Todo List
      </p>
      <div className="grid grid-cols-2  gap-x-4 justify-between">
        <DragDropContext onDragEnd={onDragEnd}>
          {Object.entries(columnData).map(([id, column]) => (
            <Droppable droppableId={id} key={id}>
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  <ItemsColumn
                    columnTitle={column.title}
                    items={column.items}
                  />
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
};

export default TodoList;
