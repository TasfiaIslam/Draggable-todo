import Card from "../components/card";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { reorder } from "../utils/helpers";

describe("#Card", () => {
  it("renders card component with expected props", async () => {
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

  it("renders card component with correct draggable ID", async () => {
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

    // Get the card element
    const cardElement = screen.getByText("title");

    // Assert that the card element has the correct draggable ID
    expect(cardElement.getAttribute("data-rbd-draggable-id")).toEqual("testId");
  });
});

describe("reorder", () => {
  it("should reorder the list correctly", () => {
    const list = [
      { id: 1, title: "Item 1" },
      { id: 2, title: "Item 2" },
      { id: 3, title: "Item 3" },
      { id: 4, title: "Item 4" },
    ];
    const startIndex = 1;
    const endIndex = 3;
    const expectedList = [
      { id: 1, title: "Item 1" },
      { id: 3, title: "Item 3" },
      { id: 4, title: "Item 4" },
      { id: 2, title: "Item 2" },
    ];

    const result = reorder(list, startIndex, endIndex);

    expect(result).toEqual(expectedList);
  });
});
