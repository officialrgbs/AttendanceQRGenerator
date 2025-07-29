import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from "qrcode.react";
import { useRef } from "react";

function ProfilePage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const qrRef = useRef(null);

  if (!state) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="bg-white p-6 rounded-2xl shadow-xl text-center max-w-md w-full">
          <p className="text-gray-700 mb-4">No data. Please fill the form first.</p>
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-800 font-medium underline transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  const qrData = JSON.stringify(state);

  const handleDownload = () => {
    const canvas = qrRef.current?.querySelector("canvas");
    if (canvas) {
      const imgData = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = imgData;
      link.download = `${state.lrn}_qr.png`;
      link.click();
    }
  };

  const handleBackToForm = () => {
    localStorage.removeItem("createdProfile");
    navigate("/", { replace: true })
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        <h1 className="text-3xl font-semibold text-gray-800 mb-6 text-center">Student Profile</h1>

        <div className="space-y-3 text-gray-700 mb-6">
          <p><strong>Name:</strong> {state.name}</p>
          <p><strong>LRN:</strong> {state.lrn}</p>
          <p><strong>Grade:</strong> {state.grade}</p>
          <p><strong>Section:</strong> {state.section}</p>
          <p><strong>Parent's Contact:</strong> {state.parentNumber}</p>
        </div>

        <div ref={qrRef} className="text-center">
          <p className="font-medium text-gray-800 mb-2">QR Code</p>
          <div className="inline-block bg-gray-50 p-4 rounded-xl shadow">
            <QRCodeCanvas value={qrData} size={180} />
          </div>

          <div className="mt-4 space-y-4">
            <button
              onClick={handleDownload}
              className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-xl font-medium transition-all"
              >
              Download QR
            </button>
            <button
                onClick={handleBackToForm}
                className="w-full bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 rounded-xl font-medium transition-all"
                >
                Go Back to Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
