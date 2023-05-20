export const initialTodoItems = [
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

export const initialColumnData = {
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
