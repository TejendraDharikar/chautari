import { useNavigate } from "react-router-dom";

const Back = () => {
  const navi =useNavigate();
  const handleBack = () => {
   navi(-1);
  }
  return (
    <div>
      <button
  onClick={handleBack}
  className="mb-4 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400 transition"
  > Back</button>
    </div>
  )
}

export default Back
