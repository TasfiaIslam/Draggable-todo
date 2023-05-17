import Card from "../components/card";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";

it("renders card with expected props", async () => {
  // Render the component
  render(
    <DragDropContext onDragEnd={() => {}}>
      <Droppable droppableId={"droppableTestId"} key={"droppableTestId"}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            <Card title="title" id={1} draggableId="testId" index={1} />
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
  const headingElement = screen.getByText("title");

  // Assert that the rendered prop matches the expected value
  expect(headingElement).toBeDefined();
});
