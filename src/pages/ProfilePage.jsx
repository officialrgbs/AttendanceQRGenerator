import { useLocation, useNavigate } from "react-router-dom";
import { QRCodeCanvas } from 'qrcode.react';
import { useRef } from "react";

function ProfilePage() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const qrRef = useRef(null);

  if (!state) {
    return (
      <div className="p-6 text-center">
        <p>No data. Please fill the form first.</p>
        <button onClick={() => navigate("/")} className="text-blue-600 underline">Go Back</button>
      </div>
    )
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


  return (
    <div className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4"></h1>
        <div className="bg-gray-100 p-4 rounded space-y-2">
          <p><strong>Name:</strong> {state.name}</p>
          <p><strong>LRN:</strong> {state.lrn}</p>
          <p><strong>Grade:</strong> {state.grade}</p>
          <p><strong>Section:</strong> {state.section}</p>
          <p><strong>Contact Number:</strong> {state.parentNumber}</p>
        </div>
        <div className="mt-6 text-center" ref={qrRef}>
          <p className="font-semibold mb-2">QR Code: </p>
          <QRCodeCanvas value={qrData} size={180} />

          <div className="mt-4">
            <button onClick={handleDownload} className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700">
              Download QR
            </button>
          </div>
        </div>
    </div>
  )
}

export default ProfilePage;