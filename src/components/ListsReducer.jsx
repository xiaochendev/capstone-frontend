const ACTIONS = {
  ADD_TODO: "add_todo",
  TOGGLE_TODO: "toggle_todo",
  DELETE_TODO: "delete_todo",
  START_EDITING: "start_editing",
  UPDATE_EDIT_TEXT: "update_edit_text",
  SAVE_TODO: "save_todo",
};

export default function ListsReducer(todos, action) {
  switch (action.type) {
    
    case ACTIONS.ADD_TODO: {
      const title = action.payload.todos?.trim();
      if (!title) return todos;

      if (todos.some(todo => todo.title === title)) {
        alert(`There is already a "${title}" in your Todo list.`);
        return todos;
      }

      const newTodo = {
        userId: 1,
        id: Date.now(),
        title,
        completed: false,
        isEditing: false,
        editText: title,
      };

      return [newTodo, ...todos];
    }

    case ACTIONS.TOGGLE_TODO: {
      return todos.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, completed: !todo.completed }
          : todo
      );
    }

    case ACTIONS.DELETE_TODO: {
      return todos.filter(todo => todo.id !== action.payload.id);
    }

    case ACTIONS.START_EDITING: {
      return todos.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, isEditing: true }
          : todo
      );
    }

    case ACTIONS.UPDATE_EDIT_TEXT: {
      return todos.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, editText: action.payload.text }
          : todo
      );
    }

    case ACTIONS.SAVE_TODO: {
      return todos.map(todo =>
        todo.id === action.payload.id
          ? { ...todo, title: todo.editText, isEditing: false }
          : todo
      );
    }

    default:
      return todos;
  }
}
