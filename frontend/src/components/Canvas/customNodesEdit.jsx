import React, { memo, useEffect } from "react";
import {
  Handle,
  useReactFlow,
  useStoreApi,
  Position,
  NodeToolbar,
} from "reactflow";
import TextField from "@mui/material/TextField";
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

function CustomNodeEdit({ id, data, handleArtibuteChange }) {
  const [nameValue, setNameValue] = React.useState(data.name);
  const [selectValue, setSelectValue] = React.useState(data.type);

  // useEffect(()=>{
  //   attributeChange()
  // },[nameValue,selectValue])

  const attributeChange = (value, name) => {
    let newData = data;
    if (name === "name") {
      setNameValue(value);
      newData.name = value;
    }
    if (name === "type") {
      setSelectValue(value);
      newData.type = value;
    }
    handleArtibuteChange(id, newData);
  };

  return (
    <>
      <div
        className="custom-node_body"
   
      >
        {/* <form> */}
        <div>
         
          <div class="attribute-wrapper">
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
            <div class="am-line-name">
              <div class="am-line-name-lb">
                <label>Name</label>
              </div>
              <div class="am-line-name-ip">
                <input
                  type="text"
                  value={nameValue}
                  onChange={(e) => {
                    attributeChange(e.target.value, "name");
                  }}
                />
              </div>
            </div>
            <div class="am-line-type">
              <div class="am-line-type-lb">
                <label>Type</label>
              </div>
              <div class="am-line-type-sel">
                <select
                  value={selectValue}
                  onChange={(e) => {
                    attributeChange(e.target.value, "type");
                  }}
                >
                  <option value={""} disabled>
                    None
                  </option>
                  {datatypes.map((obj) => {
                    return <option value={obj.value}>{obj.label}</option>;
                  })}
                </select>
              </div>
            </div>
            {/* <div class="am-line-key">
              <div class="am-line-key-lb">
                <label>Key</label>
              </div>
              <div class="am-line-key-ck">
                <input type="checkbox" value={keyValue} onChange={()=>{setKeyValue(!keyValue)}} />
              </div>
            </div> */}
          </div>
        </div>
        {/* </form> */}
      </div>
    </>
  );
}

export default memo(CustomNodeEdit);
