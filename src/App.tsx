import { FC } from "react";
import { DndArea } from "./dndArea";
import { Button } from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
import { Item } from "./types";
import { useItems } from "./useItems";
const initialItems: Item[] = [
  { id: "1", content: "Item 1", row: 1, col: 1, width: 2 },
  { id: "2", content: "Item 2", row: 2, col: 1, width: 1 },
  { id: "3", content: "Item 3", row: 3, col: 1, width: 1 },
  { id: "4", content: "Item 4", row: 4, col: 1, width: 2 },
];

const CustomGridDnD: FC = () => {
  const { items, toggleWidth, onDragEnd, addItems, maxRow } =
    useItems(initialItems);

  return (
    <>
      <DndArea
        items={items}
        onToggleWidth={toggleWidth}
        onDragEnd={onDragEnd}
        maxRow={maxRow}
      />
      <br />
      <p>要素ダブルクリックで大きさ変わる</p>
      <p>
        <a>https://github.com/renasami/dnd-sample</a>
      </p>
      <Button intent="success" text="add item" onClick={addItems}></Button>
    </>
  );
};

export default CustomGridDnD;
