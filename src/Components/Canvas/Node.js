import { Circle, Group, Shape } from "react-konva";
import { useState } from "react";

const Node = ({
  nodeInfo,
  updateCoordNode,
  isNamingState,
  setSelected,
  selected,
  setMouseCoord,
  updateCoordEdges,
  isNamingTr,
  addingTr,
  setMouseDown,
  nodeRunningId,
  running,
}) => {
  const RADIUS = 20;
  const STAGE = {
    height: 500,
    width: 900,
  };
  const [color, setColor] = useState("#ffeaa7");

  const handleDragEnd = (e) => {
    setMouseDown(false);
    const coords = {
      x: e.target.position().x + nodeInfo.x,
      y: e.target.position().y + nodeInfo.y,
    };

    //user is out of bounds
    if (coords.y < 19) coords.y = 23;
    if (coords.x < 19) coords.x = 23;
    if (coords.y > STAGE.height) coords.y = 478;
    if (coords.x > STAGE.width) coords.x = 878;

    updateCoordNode(coords, nodeInfo.id);
    updateCoordEdges(coords, nodeInfo.id);
    setSelected("-1");
  };

  return (
    <>
      <Group
        type="nodo"
        id={nodeInfo.id}
        draggable={!isNamingState && !addingTr.state}
        listening={!running}
        onMouseEnter={() => setColor("#7bed9f")}
        onMouseOut={() => setColor("#ffeaa7")}
        opacity={
          (isNamingState || isNamingTr !== "-1") && selected !== nodeInfo.id
            ? 0.5
            : 1
        }
        onDragEnd={(e) => handleDragEnd(e)}
        onDragMove={(e) => {
          if (selected !== nodeInfo.id) setSelected(nodeInfo.id);
          setMouseDown(true);
          const coords = {
            x: e.target.position().x + nodeInfo.x,
            y: e.target.position().y + nodeInfo.y,
          };

          setMouseCoord(coords);
        }}
      >
        <Circle
          id={nodeInfo.id}
          {...nodeInfo}
          fill={
            nodeRunningId && nodeRunningId === nodeInfo.id
              ? "#a29bfe"
              : selected === nodeInfo.id && addingTr.state
              ? "#0097e6"
              : selected === nodeInfo.id
              ? "#e17055"
              : color
          }
        />
        {(nodeInfo.start || (nodeRunningId && nodeRunningId === nodeInfo.id)) && (
          <Shape
            id={nodeInfo.id}
            sceneFunc={(ctx, shape) => {
              ctx.font = "20px Georgia";
              ctx.textAlign = "right";
              ctx.textBaseline = "middle";
              ctx.fillStyle = "black";
              ctx.fillText("\u{1F449}", nodeInfo.x - RADIUS, nodeInfo.y);
              // (!) Konva specific method, it is very important
              ctx.fillStrokeShape(shape);
            }}
          />
        )}

        {nodeInfo.final && (
          <Shape
            type="nodo"
            id={nodeInfo.id}
            sceneFunc={(ctx, shape) => {
              ctx.beginPath();
              ctx.arc(
                nodeInfo.x,
                nodeInfo.y,
                (RADIUS * 10) / 8,
                0,
                Math.PI * 2,
                false
              );
              ctx.stroke();
              // (!) Konva specific method, it is very important
              ctx.fillStrokeShape(shape);
            }}
          />
        )}
        <Shape
          id={nodeInfo.id}
          type="nodo"
          coord={{ x: nodeInfo.x, y: nodeInfo.y }}
          sceneFunc={(ctx, shape) => {
            ctx.font = "15px Georgia";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "rgb(6, 11, 16)";
            ctx.fillText(nodeInfo.name, nodeInfo.x, nodeInfo.y);
            // (!) Konva specific method, it is very important
            ctx.fillStrokeShape(shape);
          }}
        />
      </Group>
    </>
  );
};

export default Node;
