import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FormPage() {
  const [formData, setFormData] = useState({
    name: '',
    lrn: '',
    grade: '',
    section: '',
    parentNumber: ''
  })

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/profile", { state: formData });
  }

  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Full Name" required onChange={handleChange} className="w-full p-2 border"></input>
          <input name="lrn" placeholder="LRN" required onChange={handleChange} className="w-full p-2 border"></input>
          <input name="grade" type="number" placeholder="Grade Level" required onChange={handleChange} className="w-full p-2 border" />
          <input name="section" placeholder="Section" required onChange={handleChange} className="w-full p-2 border" />
          <input name="parentNumber" type="number" placeholder="Parent / Guardian's Contact Number" required onChange={handleChange} className="w-full p-2 border" />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Generate Profile</button>
        </form>
      </h1>
    </div>
  )
}

export default FormPage;