import React from "react";

export default function DataInput(props) {
  return (
    <div  className="input_container">
      <input
        className  ="input_name"
        type       ="text"
        placeholder="Enter name"
        onChange={(event) => props.playerNameChange(event)}
      />
      <span> Field: </span>
      <input
        type="number"
  
        min ="3"
        max ="10"
        defaultValue="3"
        onClick={(event) => props.fieldSizeChange(event)}
      />
      <button
        className="input_button"
        onClick={() => props.createNewGame()}
      >
        +
      </button>
    </div>
  )
}
