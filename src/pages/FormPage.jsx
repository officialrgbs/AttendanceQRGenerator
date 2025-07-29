import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function FormPage() {
  const [formData, setFormData] = useState({
    name: '',
    lrn: '',
    grade: '',
    section: '',
    parentNumber: ''
  });

  const navigate = useNavigate();

  // check if already created profile
  useEffect(() => {
    if (localStorage.getItem("createdProfile") === "true") {
      navigate("/profile");
    }
  }, [navigate])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("createdProfile", "true")
    navigate("/profile", { state: formData });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Student Info</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            placeholder="Full Name"
            required
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
          />
          <input
            name="lrn"
            placeholder="LRN"
            required
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
          />
          <input
            name="grade"
            type="number"
            placeholder="Grade Level"
            required
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
          />
          <input
            name="section"
            placeholder="Section"
            required
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
          />
          <input
            name="parentNumber"
            type="number"
            placeholder="Parent / Guardian's Contact Number"
            required
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
          />
          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium py-3 rounded-xl transition-all"
          >
            Generate Profile
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormPage;
