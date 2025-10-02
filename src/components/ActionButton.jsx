export default function ActionButton({ dispatch, type, payload, children }) {
  return (
    <button
      onClick={() => {
        dispatch({ type, payload });
      }}
    >
      {children}
    </button>
  );
}
