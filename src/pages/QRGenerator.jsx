import React, { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";
import Logo from "../assets/logo_normal.png"


const QRGenerator = () => {
  const [text, setText] = useState("");
  const [size, setSize] = useState(200);
  const [qrDataUrl, setQrDataUrl] = useState(null);
  const qrContainerRef = useRef(null);

  const generateQR = async () => {
    if (!text) return;
    try {
      const dataUrl = await QRCode.toDataURL(text, { width: size, height: size });
      setQrDataUrl(dataUrl);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.download = "weborigo_qr.png";
    link.href = qrDataUrl;
    link.click();
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm text-center border border-gray-100 mx-auto my-12">
      <img src={Logo} alt="Weborigo Logo" className="w-40 mx-auto mb-4" />
      <h2 className="text-[#F58220] text-xl font-semibold mb-3">QR Code Generator</h2>

      <input
        type="text"
        placeholder="Enter URL or text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F58220] transition mb-2"
      />

      <select
        value={size}
        onChange={(e) => setSize(Number(e.target.value))}
        className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F58220] transition mb-3"
      >
        <option value={150}>Small (150px)</option>
        <option value={200}>Medium (200px)</option>
        <option value={250}>Large (250px)</option>
      </select>

      <button
        onClick={generateQR}
        className="w-full bg-[#F58220] text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition"
      >
        Generate QR
      </button>

      <div
        ref={qrContainerRef}
        className={`flex justify-center items-center mt-6 transition-transform duration-400 ${
          qrDataUrl ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {qrDataUrl && <img src={qrDataUrl} alt="Generated QR" />}
      </div>

      {qrDataUrl && (
        <button
          onClick={downloadQR}
          className="mt-4 w-full bg-[#333333] text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Download PNG
        </button>
      )}

      <p className="text-xs text-gray-500 mt-6">© WebOrigo</p>
    </div>
  );
};

export default QRGenerator;