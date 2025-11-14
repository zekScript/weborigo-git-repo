import React, { useState } from "react";
import QRCode from "qrcode";

const QRBusinessCardGenerator = () => {
  const [form, setForm] = useState({
    name: "",
    title: "",
    company: "",
    phone: "",
    email: "",
    website: "",
    address: "",
  });

  const [qrDataUrl, setQrDataUrl] = useState(null);
  const [qrSvg, setQrSvg] = useState(null);

  const [size, setSize] = useState(220);
  const [customSize, setCustomSize] = useState("");
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const buildVCard = () => {
    // Properly formatted vCard 3.0 for better Android/iPhone compatibility
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      form.name ? `FN:${form.name}` : '',
      form.name ? `N:${form.name.split(' ').reverse().join(';')};;;` : '',
      form.company ? `ORG:${form.company}` : '',
      form.title ? `TITLE:${form.title}` : '',
      form.phone ? `TEL;TYPE=CELL:${form.phone}` : '',
      form.email ? `EMAIL:${form.email}` : '',
      form.website ? `URL:${form.website}` : '',
      form.address ? `ADR;TYPE=WORK:;;${form.address};;;;` : '',
      'END:VCARD'
    ].filter(line => line !== '').join('\r\n');

    return vcard;
  };

  const generateQR = async () => {
    const vcard = buildVCard();
    const actualSize = customSize ? Number(customSize) : size;

    try {
      const pngUrl = await QRCode.toDataURL(vcard, {
        width: actualSize,
        height: actualSize,
        margin: 2,
        errorCorrectionLevel: 'M'
      });

      const svgString = await QRCode.toString(vcard, {
        type: "svg",
        width: actualSize,
        margin: 2,
        errorCorrectionLevel: 'M'
      });

      setQrDataUrl(pngUrl);
      setQrSvg(svgString);
    } catch (err) {
      console.error("QR generation failed", err);
    }
  };

  const downloadPNG = () => {
    if (!qrDataUrl) return;
    const link = document.createElement("a");
    link.download = "business_card_qr.png";
    link.href = qrDataUrl;
    link.click();
  };

  const downloadSVG = () => {
    if (!qrSvg) return;

    const blob = new Blob([qrSvg], { type: "image/svg+xml" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.download = "business_card_qr.svg";
    link.href = url;
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center border border-gray-100 mx-auto my-12">
      <div className="w-40 h-12 mx-auto mb-4 bg-[#F58220] rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-xl">WebOrigo</span>
      </div>
      <h2 className="text-[#F58220] text-xl font-semibold mb-4">
        Business Card QR Generator
      </h2>

      {/* FORM */}
      <div className="grid grid-cols-1 gap-3 text-left">
        {[
          ["name", "Full Name"],
          ["title", "Job Title"],
          ["company", "Company"],
          ["phone", "Phone Number"],
          ["email", "Email Address"],
          ["website", "Website"],
          ["address", "Full Address"],
        ].map(([key, label]) => (
          <input
            key={key}
            name={key}
            type="text"
            placeholder={label}
            value={form[key]}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F58220] transition"
          />
        ))}
      </div>

      {/* SIZE SELECT */}
      <select
        value={size}
        onChange={(e) => setSize(Number(e.target.value))}
        disabled={customSize !== ""}
        className="w-full border border-gray-300 rounded-lg p-2 mt-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#F58220] transition disabled:bg-gray-100"
      >
        <option value={180}>Small (180px)</option>
        <option value={220}>Medium (220px)</option>
        <option value={260}>Large (260px)</option>
      </select>

      {/* ADVANCED OPTIONS */}
      <button
        onClick={() => setShowAdvanced(!showAdvanced)}
        className="text-sm text-[#F58220] underline mt-2"
      >
        {showAdvanced ? "Hide Advanced Options" : "Show Advanced Options"}
      </button>

      {showAdvanced && (
        <div className="mt-3 mb-2 text-left border p-3 rounded-lg">
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
        className="w-full mt-4 bg-[#F58220] text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition"
      >
        Generate QR
      </button>

      {/* QR DISPLAY */}
      <div
        className={`flex justify-center items-center mt-6 transition-all duration-500 ${
          qrDataUrl ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        {qrDataUrl && (
          <img src={qrDataUrl} alt="Business Card QR" className="rounded-lg shadow" />
        )}
      </div>

      {/* DOWNLOAD BUTTONS */}
      {qrDataUrl && (
        <>
          <button
            onClick={downloadPNG}
            className="mt-4 w-full bg-[#333333] text-white font-semibold py-2 rounded-lg hover:bg-gray-800 transition"
          >
            Download PNG
          </button>

          <button
            onClick={downloadSVG}
            className="mt-2 w-full bg-[#444444] text-white font-semibold py-2 rounded-lg hover:bg-gray-900 transition"
          >
            Download SVG
          </button>
        </>
      )}

      <p className="text-xs text-gray-500 mt-6">© WebOrigo</p>
    </div>
  );
};

export default QRBusinessCardGenerator;