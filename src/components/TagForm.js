import React, { useContext, useState } from "react";
import Store from "../context";

export default function TagForm() {
  const { dispatch } = useContext(Store);

  // Creating a local state to have currently writing
  // tag item that will be sent to the global store.
  const [tag, setTag] = useState("");

  function handleTagChange(e) {
    setTag(e.target.value);
  }

  function handleTagAdd() {
    dispatch({ type: "ADD_TAG", payload: tag });
    setTag("");
  }

  function handleSubmitForm(event) {
    if (event.keyCode === 13) handleTagAdd();
  }

  return (
    <div className="input-group">
      <input
        className="form-control"
        value={tag}
        placeholder="Enter new tag"
        onKeyUp={handleSubmitForm}
        onChange={handleTagChange}
      />
      <div className="input-group-append">
        <button className="btn btn-primary" onClick={handleTagAdd}>
          Add
        </button>
      </div>
    </div>
  );
}
