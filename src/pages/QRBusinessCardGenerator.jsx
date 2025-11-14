import React, { useState } from "react";

import QRCode from "qrcode";

import Logo from "../assets/logo_normal.png"

 

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

  const [size, setSize] = useState(220);

 

  const handleChange = (e) => {

    setForm({ ...form, [e.target.name]: e.target.value });

  };

 

  // Build a vCard string for QR code

  const buildVCard = () => {

    return `

BEGIN:VCARD

VERSION:3.0

N:${form.name}

ORG:${form.company}

TITLE:${form.title}

TEL;TYPE=CELL:${form.phone}

EMAIL:${form.email}

URL:${form.website}

ADR:${form.address}

END:VCARD

`;

  };

 

  const generateQR = async () => {

    const vcard = buildVCard();

 

    try {

      const dataUrl = await QRCode.toDataURL(vcard, {

        width: size,

        height: size,

      });

      setQrDataUrl(dataUrl);

    } catch (err) {

      console.error("QR generation failed", err);

    }

  };

 

  const downloadQR = () => {

    if (!qrDataUrl) return;

    const link = document.createElement("a");

    link.download = "business_card_qr.png";

    link.href = qrDataUrl;

    link.click();

  };

 

  return (

    <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-md text-center border border-gray-100 mx-auto my-12">

      <img src={Logo} alt="Weborigo Logo" className="w-40 mx-auto mb-4" />

      <h2 className="text-[#F58220] text-xl font-semibold mb-4">Business Card QR Generator</h2>

 

      {/* Form fields */}

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

            className="w-full border border-gray-300 rounded-lg p-2 text-gray-700

              focus:outline-none focus:ring-2 focus:ring-[#F58220] transition"

          />

        ))}

      </div>

 

      {/* Generate button */}

      <button

        onClick={generateQR}

        className="w-full mt-4 bg-[#F58220] text-white font-semibold py-2 rounded-lg hover:bg-orange-600 transition"

      >

        Generate QR

      </button>

 

      {/* QR Output */}

      <div

        className={`flex justify-center items-center mt-6 transition-all duration-500 ${

          qrDataUrl ? "opacity-100 scale-100" : "opacity-0 scale-95"

        }`}

      >

        {qrDataUrl && (

          <img

            src={qrDataUrl}

            alt="Business Card QR"

            className="rounded-lg shadow"

          />

        )}

      </div>

 

      {/* Download Button */}

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

 

export default QRBusinessCardGenerator;