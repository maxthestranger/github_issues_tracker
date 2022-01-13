export default function Back({ navigate }) {
  return (
    <button onClick={() => navigate(-1)} className="back">
      <i className="ri-arrow-left-circle-line"></i>
    </button>
  );
}
