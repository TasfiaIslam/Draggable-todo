import { useState } from "react";
import ItemsColumn from "./itemsColumn";

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
  return (
    <div className="w-[800px] mx-auto">
      <p className="py-12 text-3xl text-center font-semibold">Todo List </p>
      <div className="grid grid-cols-2 gap-x-4 justify-between">
        <ItemsColumn columnTitle={"Todos"} items={todoItems} />
        <ItemsColumn columnTitle="Done" items={doneItems} />
      </div>
    </div>
  );
};

export default TodoList;
