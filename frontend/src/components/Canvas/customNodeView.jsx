import React, { memo, useEffect } from "react";
import {
  Handle,
  useReactFlow,
  useStoreApi,
  Position,
  NodeToolbar,
} from "reactflow";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Chip from "@mui/material/Chip";
import VpnKeyIcon from "@mui/icons-material/VpnKey";
import KeyOutlinedIcon from "@mui/icons-material/KeyOutlined";
import FlareOutlinedIcon from "@mui/icons-material/FlareOutlined";
import EditAttributesOutlinedIcon from "@mui/icons-material/EditAttributesOutlined";
const options = [
  {
    value: "smoothstep",
    label: "Smoothstep",
  },
  {
    value: "step",
    label: "Step",
  },
  {
    value: "default",
    label: "Bezier (default)",
  },
  {
    value: "straight",
    label: "Straight",
  },
];

const datatypes = [
  {
    value: "string",
    label: "String",
  },
  {
    value: "num",
    label: "Number",
  },
  {
    value: "date",
    label: "Date",
  },
  {
    value: "datetime",
    label: "Date Time",
  },
  {
    value: "boolean",
    label: "Boolean",
  },
];

function Select({ value, handleId, nodeId }) {
  const { setNodes } = useReactFlow();
  const store = useStoreApi();

  const onChange = (evt) => {
    const { nodeInternals } = store.getState();
    setNodes(
      Array.from(nodeInternals.values()).map((node) => {
        if (node.id === nodeId) {
          node.data = {
            ...node.data,
            selects: {
              ...node.data.selects,
              [handleId]: evt.target.value,
            },
          };
        }

        return node;
      })
    );
  };

  return (
    <div className="custom-node__select">
      <div>Edge Type</div>
      <select className="nodrag" onChange={onChange} value={value}>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <Handle type="source" position={Position.Right} id={handleId} />
    </div>
  );
}

function CustomNodeView({ id, data, constraints }) {
  return (
    <>
      <div className="custom-node_body">
        {/* <form> */}
        <div>
          <div class="attribute-wrapper-p">
            <div
              style={{
                position: "absolute",
                top: "-5px",
                // left: "120px",

                backgroundColor: "rgba(230, 230, 230, 1)",
                padding: "0px 5px",
                borderRadius: "25px",
                
                display: "flex",
              }}
            >
              {constraints &&
              constraints[id.split("_")[0].toString()] &&
              constraints[id.split("_")[0].toString()]["primary_key"] &&
              constraints[id.split("_")[0].toString()]["primary_key"].filter(
                (x) => x.id === id
              ).length > 0 ? (
                <div>
                  <KeyOutlinedIcon
                    style={{
                      width: "10px",
                      height: "10px",
                      transform: "rotate(-90deg)",
                      color: "gold",
                      padding: "0px",
                      margin: "0px",
                    }}
                  />
                </div>
              ) : null}

              {constraints &&
              constraints[id.split("_")[0].toString()] &&
              constraints[id.split("_")[0].toString()]["foreign_key"] &&
              constraints[id.split("_")[0].toString()]["foreign_key"].filter(
                (x) => x.id === id
              ).length > 0 ? (
                <div>
                  <VpnKeyIcon
                    style={{
                      width: "10px",
                      height: "10px",
                      transform: "rotate(-90deg)",
                      color: "green",
                      padding: "0px",
                      margin: "0px",
                    }}
                  />
                </div>
              ) : null}

              {constraints &&
              constraints[id.split("_")[0].toString()] &&
              constraints[id.split("_")[0].toString()]["not_null"] &&
              constraints[id.split("_")[0].toString()]["not_null"].filter(
                (x) => x.id === id
              ).length > 0 ? (
                <div>
                  <EditAttributesOutlinedIcon
                    style={{
                      width: "10px",
                      height: "10px",
                      // transform: "rotate(-90deg)",
                      color: "blue",
                      padding: "0px",
                      margin: "0px",
                    }}
                  />
                </div>
              ) : null}

              {constraints &&
              constraints[id.split("_")[0].toString()] &&
              constraints[id.split("_")[0].toString()]["unique"] &&
              constraints[id.split("_")[0].toString()]["unique"].filter(
                (x) => x.id === id
              ).length > 0 ? (
                <div>
                  <FlareOutlinedIcon
                    style={{
                      width: "10px",
                      height: "10px",
                      transform: "rotate(-90deg)",
                      color: "red",
                      padding: "0px",
                      margin: "0px",
                    }}
                  />
                </div>
              ) : null}
            </div>
            <Handle
              type="target"
              position={Position.Left}
              id={id + "_l"}
              onConnect={(params) => console.log("handle onConnect", params)}
              isConnectable={true}
            />
            <Handle
              type="source"
              position={Position.Right}
              id={id + "_r"}
              isConnectable={true}
            />
            <div class="am-line-name-c">
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <div
                    style={{
                      width: "100%",
                      textAlign: "right",
                    }}
                  >
                    {data.name}
                  </div>
                </Grid>
                <Grid item xs={6}>
                  <div
                    style={{
                      width: "100%",
                      textAlign: "right",
                    }}
                  >
                    {data.type}
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
        {/* </form> */}
      </div>
    </>
  );
}

export default memo(CustomNodeView);
