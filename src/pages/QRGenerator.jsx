import React, { useState, useRef, useEffect } from "react";
import QRCode from "qrcode";
import Logo from "../assets/logo_normal.png";

const QRGenerator = () => {
  const [text, setText] = useState("");
  const [size, setSize] = useState(200);
  const [customSize, setCustomSize] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [qrDataUrl, setQrDataUrl] = useState(null);
  const [qrSvg, setQrSvg] = useState(null);

  const qrContainerRef = useRef(null);

  const generateQR = async () => {
    if (!text) return;

    const actualSize = customSize ? Number(customSize) : size;

    try {
      const dataUrl = await QRCode.toDataURL(text, {
        width: actualSize,
        height: actualSize,
      });

      const svgString = await QRCode.toString(text, {
        type: "svg",
        width: actualSize,
      });

      setQrDataUrl(dataUrl);
      setQrSvg(svgString);
    } catch (err) {
      console.error(err);
    }
  };

  const downloadPNG = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.download = "weborigo_qr.png";
    link.href = qrDataUrl;
    link.click();
  };

  const downloadSVG = () => {
    if (!qrSvg) return;

    const blob = new Blob([qrSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.download = "weborigo_qr.svg";
    link.href = url;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm text-center border border-gray-100 mx-auto my-12">
      <img src={Logo} alt="Weborigo Logo" className="w-40 mx-auto mb-4" />
      <h2 className="text-[#F58220] text-xl font-semibold mb-3">
        QR Code Generator
      </h2>

      {/* TEXT INPUT */}
      <input
        type="text"
        placeholder="Enter URL or text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F58220] transition mb-2"
      />

      {/* SIZE DROPDOWN */}
      <select
        value={size}
        onChange={(e) => setSize(Number(e.target.value))}
        disabled={customSize !== ""}
        className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F58220] transition mb-2 disabled:bg-gray-100"
      >
        <option value={150}>Small (150px)</option>
        <option value={200}>Medium (200px)</option>
        <option value={250}>Large (250px)</option>
      </select>

      {/* ADVANCED OPTIONS TOGGLE */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-sm text-[#F58220] underline mb-3"
      >
        {showAdvanced ? "Hide Advanced Options" : "Show Advanced Options"}
      </button>

      {/* ADVANCED OPTIONS SECTION */}
      {showAdvanced && (
        <div className="mb-4 text-left border p-3 rounded-lg">
          <label className="block text-gray-600 text-sm mb-1">
            Custom Size (px)
          </label>
          <input
            type="number"
            min="50"
            placeholder="e.g. 300"
            value={customSize}
            onChange={(e) => setCustomSize(e.target.value)}
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F58220] transition"
          />

          {customSize !== "" && (
            <p className="text-xs text-gray-500 mt-1">
              Custom size overrides preset sizes.
            </p>
          )}
        </div>
      )}

      {/* GENERATE BUTTON */}
      <button
        onClick={generateQR}
        className="w-full bg-[#F58220] text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition"
      >
        Generate QR
      </button>

      {/* QR DISPLAY */}
      <div
        ref={qrContainerRef}
        className={`flex justify-center items-center mt-6 transition-transform duration-400 ${
          qrDataUrl ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
      >
        {qrDataUrl && <img src={qrDataUrl} alt="Generated QR" />}
      </div>

      {/* DOWNLOAD BUTTONS */}
      {qrDataUrl && (
        <>
          <button
            onClick={downloadPNG}
            className="mt-4 w-full bg-[#333] text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Download PNG
          </button>

          <button
            onClick={downloadSVG}
            className="mt-2 w-full bg-[#444] text-white font-semibold py-2 rounded-lg hover:bg-gray-900 transition"
          >
            Download SVG
          </button>
        </>
      )}

      <p className="text-xs text-gray-500 mt-6">© WebOrigo</p>
    </div>
  );
};

export default QRGenerator;
