import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../firebase"
import { serverTimestamp } from "firebase/firestore";

function FormPage() {
  const [formData, setFormData] = useState({
    name: '',
    lrn: '',
    grade: '',
    section: '',
    parentNumber: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('')
  const navigate = useNavigate();

  useEffect(() => {
    const checkExistingProfile = async () => {
      const savedLRN = localStorage.getItem("userLRN");
      if (savedLRN) {
        try {
          const docRef = doc(db, "students", savedLRN);
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            navigate("/profile");
          }
        } catch (error) {
          console.error("error checking existing profile ", error)
        }
      }
    }

    checkExistingProfile()
  }, [navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('')
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const docRef = doc(db, "students", formData.lrn)
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setError("A student with this LRN already exists.");
        setLoading(false);
        return;
      }

      await setDoc(docRef, {
        name: formData.name,
        lrn: formData.lrn,
        grade: parseInt(formData.grade),
        section: formData.section,
        parentNumber: formData.parentNumber,
        createdAt: serverTimestamp(),
      })

      localStorage.setItem("userLRN", formData.lrn);
      localStorage.setItem("createdProfile", "true");

      navigate("/profile", { state: formData });
    } catch (error) {
      console.error("Error creating student profile: ", error);
      setError("Failed to create profile. Please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Student Info</h1>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            name="name"
            placeholder="Full Name"
            required
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
          />
          <input
            name="lrn"
            placeholder="LRN"
            required
            value={formData.lrn}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
          />
          <input
            name="grade"
            type="number"
            placeholder="Grade Level"
            min="7"
            max="12"
            required
            value={formData.grade}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
          />
          <input
            name="section"
            placeholder="Section"
            required
            value={formData.section}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
          />
          <input
            name="parentNumber"
            type="number"
            placeholder="Parent / Guardian's Contact Number"
            required
            value={formData.parentNumber}
            onChange={handleChange}
            disabled={loading}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none transition-all"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white text-lg font-medium py-3 rounded-xl transition-all"
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating Profile...
              </>
            ) : (
              'Generate Profile'
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormPage;
