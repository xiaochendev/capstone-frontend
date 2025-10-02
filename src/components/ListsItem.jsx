export default function ListsItem({ item, dispatch }) {
  const handleToggle = () =>
    dispatch({ type: "toggle_todo", payload: { id: item.id } });

  const handleDelete = () => {
    if (
      window.confirm(`Are you sure you want to remove "${item.title}" from your list?`)
    ) {
      dispatch({ type: "delete_todo", payload: { id: item.id } });
    }
  };

  const handleEdit = () =>
    dispatch({ type: "start_editing", payload: { id: item.id } });

  const handleSave = () =>
    dispatch({ type: "save_todo", payload: { id: item.id } });

  const handleEditChange = (e) =>
    dispatch({
      type: "update_edit_text",
      payload: { id: item.id, text: e.target.value },
    });

  return (
    <div style={{ marginBottom: "10px", textAlign: "center" }}>
      <input
        type="checkbox"
        checked={item.completed}
        onChange={handleToggle}
        style={{ marginRight: "10px" }}
      />

      {item.isEditing ? (
        <>
          <input
            type="text"
            value={item.editText}
            onChange={handleEditChange}
          />
          <button onClick={handleSave}>Save</button>
        </>
      ) : (
        <>
          <span
            style={{
              textDecoration: item.completed ? "line-through" : "none",
              marginRight: "10px",
            }}
          >
            {item.title}
          </span>
          <button onClick={handleEdit}>Edit</button>
          <button
            onClick={handleDelete}
            disabled={!item.completed}
            style={{ marginLeft: "5px", color: item.completed ? "red" : "gray" }}
          >
            Delete
          </button>
        </>
      )}
    </div>
  );
}
