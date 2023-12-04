import React from 'react';
import {BaseEdge,EdgeLabelRenderer, getBezierPath } from 'reactflow';


const foreignObjectSize = 40;


{/*
export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  edges,
  setEdges,
}) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  // const onEdgeClick = (evt, id) => {
  //   evt.stopPropagation();
  //   console.log('Edge clicked', id);
  //   console.log('Edges',edges)
  //   let newEdge=edges.filter(ed=>ed.id!=id);
  //   console.log('New edges',newEdge)
  //   setEdges(newEdge)
// }; */}
  const onEdgeClick = (evt, id) => {
  evt.stopPropagation();
  console.log('evt', evt)
  // console.log('Edge clicked', id);
  console.log('Edges', edges);
  // console.log('Edges type', typeof edges)
  let newEdges = edges.filter((ed) => ed.id !== id);
  // const { [id]: removedEdge, ...newEdges } = edges;
  console.log('New edges', newEdges);
  setEdges( newEdges);
};

{/*
  return (
    <>
      
      <path
        id={id}
        style={style}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
      <foreignObject
        width={foreignObjectSize}
        height={foreignObjectSize}
        x={labelX - foreignObjectSize / 2}
        y={labelY - foreignObjectSize / 2}
        className="edgebutton-foreignobject"
        requiredExtensions="http://www.w3.org/1999/xhtml"
      >
        <div>
          {/* {console.log('id after path', id)} 
          <button className="edgebutton" onClick={(event) => onEdgeClick(event,id)}>
            ×
          </button>
        </div>
      </foreignObject>
    </>
  );
}

*/}


export default function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
}) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
    
      
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: 'absolute',
            transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
            fontSize: 12,
            // everything inside EdgeLabelRenderer has no pointer events by default
            // if you have an interactive element, set pointer-events: all
            pointerEvents: 'all',
          }}
          className="nodrag nopan"
        >
          {/* <button className="edgebutton" onClick={(event) => onEdgeClick(event, edge.id)}> */}
          <button className="edgebutton">
            ×
          </button>
        </div>
      </EdgeLabelRenderer>
    
    </>
  );
}
