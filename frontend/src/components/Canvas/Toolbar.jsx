import React from "react";
import { Typography, FormControl, InputLabel, Select, Chip } from "@mui/material";

const constraintsBox = [
  {
    id: "0",
    label: "Not Null",
    field: "not_null",
    type: "array",
  },
  {
    id: "1",
    label: "Unique",
    field: "unique",
    type: "array",
  },
  {
    id: "2",
    label: "Primary Key",
    field: "primary_key",
    type: "array",
  },
  {
    id: "3",
    label: "Candidate Key",
    field: "candidate_key",
    type: "2Darray",
  },
  {
    id: "4",
    label: "Foreign Key",
    field: "foreign_key",
    type: "2Darray",
  },
  {
    id: "5",
    label: "Default",
    field: "default",
    type: "arrayObj",
    obj: {
      attribute_name: "",
      value: "",
    },
  },
  {
    id: "6",
    label: "Check",
    field: "check",
    type: "arrayObj",
    obj: {
      attribute_name: "",
      condition: "",
    },
  },
];


const attributes=[
  "attribute1",
  "attribute2",
  "attribute3",
  "attribute4",
]

export default function Toolbar({ data }) {
  const [constraints, setConstraints] = React.useState({});
  const handleChangeConstraint = (event,name) => {
    let temp = constraints;
    if(temp[name]===undefined){
      temp[name]=[];
    }
    temp[name]=event.target.value;
    setConstraints(temp);
  };
  return (
    <div>
      {/* <Typography variant="h6" gutterBottom>
        Toolbar
      </Typography> */}
      <div>
        <div >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              // justifyContent: "center",
              // alignItems: "center",
              border: "1px solid black",
              borderRadius: "5px",
              padding: "5px",
              margin: "5px",
              backgroundColor: "cyan",
            }}
          >
            CONSTRAINTS
            <div style={{
                    width: "100%",
                  }}>
              {constraintsBox.map((obj) => {
                return (
                  <div style={{
                    margin: "2px",
                    border: "1px solid grey",
                    padding: "5px",
                  }}> 
                     <Typography variant="subtitle" gutterBottom>{obj.label}</Typography>
                     <Select
                      labelId="demo-simple-select-label"
                      id="demo-simple-select"
                      multiple
                      value={constraints[obj.field] || []}
                      onChange={(e)=>handleChangeConstraint(e,obj.field)}
                      style={{
                        width: "100%",
                        padding: "0px",
                      }}
                      renderValue={selected => (
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                          }}
                        >
                          {selected.map((value,idx) => (
                            <Chip
                              style={{ margin: 2 }}
                              key={idx}
                              label={value}
                            />
                          ))}
                        </div>
                      )}
                    >
                      <option value={""} disabled>None</option>
                      {attributes.map((obj) => {
                        return <option value={obj}>{obj}</option>;
                      })}
                    </Select>
            
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
