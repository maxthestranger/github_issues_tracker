export default function Search({ userName, handleChange }) {
  return (
    <input
      type="text"
      placeholder="Search for user..."
      value={userName}
      onChange={handleChange}
      className="userSearch"
    />
  );
}
