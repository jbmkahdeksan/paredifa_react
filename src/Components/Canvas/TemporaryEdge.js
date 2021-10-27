import { Arrow, Group, Arc } from "react-konva";

import {
  arrowStart as startArrow,
  arrowCurve as curveArrow,
  arrowEnd as endArrow,
  isMouseOverState,
} from "./EdgeUtil";

const TemporaryEdge = ({
  id,
  node1,
  node2,
  mouseCoord,
  x,
  y
}) => {

  const dx = node1.x - node2.x;
  const dy = node1.y - node2.y;
  let angle = Math.atan2(-dy, dx);

  const radius = 20;

  const arrowStart = startArrow(node2, angle);

  const arrowEnd = endArrow(node1, angle);

  const arrowCurve = curveArrow(angle, node1, node2);
  return (
    <>
      <Group>
        {!isMouseOverState(node2, mouseCoord) && (
          <Arrow
            id={id}
            type="arrow"
            tension={0.5}
            points={[
              arrowStart.x,
              arrowStart.y,
              arrowCurve.x,
              arrowCurve.y,
              arrowEnd.x,
              arrowEnd.y,
            ]}
            stroke={"#8c7ae6"}
            fill={"#8c7ae6"}
            strokeWidth={3}
            pointerWidth={5}
              pointerLength={5}
          />
        )}
        {isMouseOverState(node2, mouseCoord) && (
          <>
            <Arc
              id={id}
              type="arrow"
              x={x - radius * (Math.PI / 4)-3}
              y={y - radius * (Math.PI / 4) - 6}
              innerRadius={17.5}
              outerRadius={17.5}
              strokeWidth={2.5}
              stroke={"#8c7ae6"}
              rotation={-20}
              angle={110}
              clockwise={true}
            />
            <Arrow
              id={id}
              type="arrow"
              x={x - 1}
              y={y - radius - 4}
              rotation={70}
              stroke={"#8c7ae6"}
              fill={"#8c7ae6"}
              strokeWidth={3}
              pointerWidth={5}
              pointerLength={5}
            />
          </>
        )}
      </Group>
    </>
  );
};

export default TemporaryEdge;