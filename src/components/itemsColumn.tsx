import Card from "./card";

interface ItemsColumnProps {
  columnTitle: string;
  items: { id: number; title: string }[];
}

const ItemsColumn = ({ columnTitle, items }: ItemsColumnProps) => {
  return (
    <div className="p-4 rounded-md border border-blue-300">
      <p className="inline-block py-1 px-2 text-lg font-semibold bg-blue-300 rounded-md">
        {columnTitle}
      </p>
      <div className="pt-4 flex flex-col gap-y-3">
        {items.map((item, index) => (
          <Card key={item.id} id={item.id} title={item.title} />
        ))}
      </div>
    </div>
  );
};

export default ItemsColumn;
