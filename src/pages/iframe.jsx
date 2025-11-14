import React from "react";

const QRFrame = () => {
  return (
    <iframe
      src="https://yourdomain.com/embed/weborigo-qr"
      style={{
        border: "none",
        width: "100%",
        maxWidth: "380px",
        height: "540px",
        borderRadius: "16px",
        overflow: "hidden",
      }}
      loading="lazy"
      allowTransparency={true}
    ></iframe>
  );
};

export default QRFrame;