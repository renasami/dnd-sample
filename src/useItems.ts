import { useState } from "react";
import { DropResult } from "react-beautiful-dnd";
import { Item } from "./types";

export const useItems = (initialItems: Item[]) => {
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

  const addItems = () => {
    const length = items.length;
    const content = `Item ${length + 1}`;
    const maxRow = items.reduce((max, item) => Math.max(max, item.row), 0);
    const newItem: Item = {
      id: (length + 1).toString(),
      content: content,
      row: maxRow + 1,
      col: 1,
      width: 2,
    };
    setItems([...items, newItem]);
  };

  return {
    items,
    toggleWidth,
    onDragEnd,
    addItems,
    maxRow: items.reduce((max, item) => Math.max(max, item.row), 0),
  };
};
