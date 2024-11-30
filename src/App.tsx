import { FC, useState } from "react";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { Item } from "./types";
import { ItemComponent } from "./itme";

const initialItems: Item[] = [
  { id: "1", content: "Item 1", row: 1, col: 1, width: 2 },
  { id: "2", content: "Item 2", row: 2, col: 1, width: 1 },
  { id: "3", content: "Item 3", row: 3, col: 1, width: 1 },
  { id: "4", content: "Item 4", row: 4, col: 1, width: 2 },
];

const CustomGridDnD: FC = () => {
  const [items, setItems] = useState<Item[]>(initialItems);

  // ドラッグ終了時の処理
  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;

    const draggedId = result.draggableId;
    const targetRow = parseInt(
      result.destination.droppableId.split("-")[1],
      10
    );

    const draggedItem = items.find((item) => item.id === draggedId);

    if (!draggedItem) return;

    const isValidDrop = validateDrop(draggedItem, targetRow);

    if (!isValidDrop) return;

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === draggedId ? { ...item, row: targetRow } : item
      )
    );
  };

  // 幅の切り替え (ダブルクリックで1列 ↔ 2列)
  const toggleWidth = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, width: item.width === 1 ? 2 : 1 } : item
      )
    );
  };

  // ドロップの妥当性検証
  const validateDrop = (item: Item, targetRow: number): boolean => {
    if (item.width == 2) {
      return !items.some((i) => i.row === targetRow);
    }

    return !items.some((i) => i.row === targetRow && i.width === 2);
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
        {[1, 2, 3, 4, 5, 6].map((row) => (
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
                      onToggleWidthChange={toggleWidth}
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

export default CustomGridDnD;
