import { FC } from "react";
import { Item } from "./types";
import { Draggable } from "react-beautiful-dnd";
import { Card } from "@blueprintjs/core";

type Props = {
  item: Item;
  index: number;
  onToggleWidthChange: (id: string) => void;
};

export const ItemComponent: FC<Props> = ({
  item,
  index,
  onToggleWidthChange,
}) => {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => (
        <Card
          elevation={1}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          onDoubleClick={() => onToggleWidthChange(item.id)}
          style={{
            gridColumn: `span ${item.width}`,
            padding: "10px",
            backgroundColor: "#f0f0f0",
            border: "1px solid #ccc",
            borderRadius: "4px",
            textAlign: "center",
            cursor: "grab",
            ...provided.draggableProps.style,
          }}
        >
          {item.content}
        </Card>
      )}
    </Draggable>
  );
};
