import { FC } from "react";
import { DropResult, DragDropContext, Droppable } from "react-beautiful-dnd";
import { ItemComponent } from "./itme";
import { Item } from "./types";

type Props = {
  items: Item[];
  onToggleWidth: (id: string) => void;
  onDragEnd: (result: DropResult) => void;
  maxRow: number;
};

export const DndArea: FC<Props> = ({
  items,
  onToggleWidth,
  onDragEnd,
  maxRow,
}) => {
  const rows = () => {
    const item1 = maxRow + 1;
    const item2 = items.length;

    return item1 < item2 ? item1 : item2;
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        style={{
          display: "grid",
          gridTemplateRows: "repeat(6, auto)",
          gap: "10px",
        }}
      >
        {[...Array(rows() + 1)]
          .map((_, i) => i)
          .map((row) => (
            <Droppable
              droppableId={`droppable-${row}-1`}
              key={`droppable-${row}`}
            >
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(2, 1fr)",
                    gap: "10px",
                    border: "1px dashed gray",
                    padding: "10px",
                    minHeight: "50px",
                  }}
                >
                  {items
                    .filter((item) => item.row === row)
                    .map((item, index) => (
                      <ItemComponent
                        item={item}
                        index={index}
                        onToggleWidthChange={onToggleWidth}
                      />
                    ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
      </div>
    </DragDropContext>
  );
};
