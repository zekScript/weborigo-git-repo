import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Logo from "../assets/logo_normal.png"

const PasswordGenerator = () => {
  const [options, setOptions] = useState({
    uppercase: true,
    numbers: true,
    symbols: true,
  });
  const [ensureTwoPerType, setEnsureTwoPerType] = useState(true);
  const [length, setLength] = useState(18);
  const [password, setPassword] = useState("");
  const [copied, setCopied] = useState(false);
  const [strength, setStrength] = useState({ score: 0, label: "Weak", width: 0 });
  const inputRef = useRef(null);

  // Calculate minimum required length based on selected options
  const getMinRequiredLength = () => {
    if (!ensureTwoPerType) return 4; // Just minimum 4 if not enforcing 2 per type
    
    return 2 + // lowercase (always included)
      (options.uppercase ? 2 : 0) +
      (options.numbers ? 2 : 0) +
      (options.symbols ? 2 : 0);
  };

  const minRequiredLength = getMinRequiredLength();

  // Auto-adjust length when options change
  useEffect(() => {
    if (length < minRequiredLength) {
      setLength(minRequiredLength);
    }
  }, [options, minRequiredLength, ensureTwoPerType]);

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setOptions((prev) => ({ ...prev, [id]: checked }));
  };

  const handleLengthChange = (e) => {
    const value = Number(e.target.value);
    const adjustedValue = Math.max(4, value);
    setLength(adjustedValue);
  };

  const generatePassword = () => {
    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const nums = "0123456789";
    const syms = "!@#$%^&*()_+-={}[]|:;<>,.?/~";

    let allChars = lower;
    let requiredChars = [];

    if (ensureTwoPerType) {
      // Always 2 lowercase
      requiredChars.push(lower[Math.floor(Math.random() * lower.length)]);
      requiredChars.push(lower[Math.floor(Math.random() * lower.length)]);

      if (options.uppercase) {
        allChars += upper;
        requiredChars.push(upper[Math.floor(Math.random() * upper.length)]);
        requiredChars.push(upper[Math.floor(Math.random() * upper.length)]);
      }

      if (options.numbers) {
        allChars += nums;
        requiredChars.push(nums[Math.floor(Math.random() * nums.length)]);
        requiredChars.push(nums[Math.floor(Math.random() * nums.length)]);
      }

      if (options.symbols) {
        allChars += syms;
        requiredChars.push(syms[Math.floor(Math.random() * syms.length)]);
        requiredChars.push(syms[Math.floor(Math.random() * syms.length)]);
      }
    } else {
      // Just ensure at least 1 of each selected type
      requiredChars.push(lower[Math.floor(Math.random() * lower.length)]);

      if (options.uppercase) {
        allChars += upper;
        requiredChars.push(upper[Math.floor(Math.random() * upper.length)]);
      }

      if (options.numbers) {
        allChars += nums;
        requiredChars.push(nums[Math.floor(Math.random() * nums.length)]);
      }

      if (options.symbols) {
        allChars += syms;
        requiredChars.push(syms[Math.floor(Math.random() * syms.length)]);
      }
    }

    const finalLength = Math.max(length, minRequiredLength);

    while (requiredChars.length < finalLength) {
      requiredChars.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    for (let i = requiredChars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [requiredChars[i], requiredChars[j]] = [requiredChars[j], requiredChars[i]];
    }

    const finalPassword = requiredChars.join("");
    setPassword(finalPassword);
    setCopied(false);
    setStrength(calculateStrength(finalPassword));
  };

  const handleGenerate = () => {
    generatePassword();
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleCopy = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const calculateStrength = (pwd) => {
    let score = 0;
    if (!pwd) return { score: 0, label: "Weak", width: 0 };

    if (pwd.length >= 8) score += 1;
    if (pwd.length >= 12) score += 1;
    if (pwd.length >= 16) score += 1;

    const types =
      (/[a-z]/.test(pwd) ? 1 : 0) +
      (/[A-Z]/.test(pwd) ? 1 : 0) +
      (/[0-9]/.test(pwd) ? 1 : 0) +
      (/[^A-Za-z0-9]/.test(pwd) ? 1 : 0);

    if (types >= 1) score += 1;
    if (types >= 2) score += 1;
    if (types >= 3) score += 1;

    let label = "Weak";
    let width = "33%";
    if (score <= 3) {
      label = "Weak";
      width = "33%";
    } else if (score <= 5) {
      label = "Medium";
      width = "66%";
    } else {
      label = "Strong";
      width = "100%";
    }

    return { score, label, width };
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", justifyContent: "center", alignItems: "center", background: "#f3f4f6" }}>
      <div style={{ width: "400px", background: "#fff", padding: "2rem", borderRadius: "1rem", boxShadow: "0 4px 12px rgba(0,0,0,0.1)" }}>
        <div><img src={Logo} alt="Weborigo" className="w-[15em] h-[4em] flex mx-auto"/></div>
        <h1 style={{ fontSize: "1.75rem", fontWeight: "bold", color: "#f97316", textAlign: "center", marginBottom: "1rem" }}>Password Generator</h1>

        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="text"
              value={password}
              placeholder="Generated Password"
              readOnly
              ref={inputRef}
              style={{ flex: 1, padding: "0.5rem", borderRadius: "0.5rem", border: "1px solid #d1d5db" }}
            />
            <button
              type="button"
              onClick={handleCopy}
              disabled={!password}
              style={{
                padding: "0.5rem 1rem",
                borderRadius: "0.5rem",
                backgroundColor: copied ? "#f97316" : "#fff",
                color: copied ? "#fff" : "#f97316",
                border: "1px solid #f97316",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>

          {/* Strength meter */}
          {password && (
            <div style={{ marginTop: "0.5rem" }}>
              <div style={{ width: "100%", height: "0.5rem", background: "#e5e7eb", borderRadius: "0.25rem", overflow: "hidden" }}>
                <motion.div
                  className="h-full"
                  initial={{ width: 0 }}
                  animate={{ width: strength.width }}
                  transition={{ duration: 0.5 }}
                  style={{ backgroundColor: strength.label === "Weak" ? "#f87171" : strength.label === "Medium" ? "#facc15" : "#22c55e", borderRadius: "0.25rem", height: "100%" }}
                ></motion.div>
              </div>
              <p style={{ marginTop: "0.25rem", fontWeight: "bold", color: strength.label === "Weak" ? "#b91c1c" : strength.label === "Medium" ? "#ca8a04" : "#15803d" }}>
                Strength: {strength.label}
              </p>
            </div>
          )}

          <button onClick={handleGenerate} style={{ padding: "0.5rem", background: "#f97316", color: "#fff", fontWeight: "bold", borderRadius: "0.5rem", cursor: "pointer", border: "none" }}>
            Generate
          </button>
        </div>

        <div style={{ marginTop: "1rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            Length:
            <select value={length} onChange={handleLengthChange} style={{ padding: "0.25rem", borderRadius: "0.25rem", border: "1px solid #d1d5db" }}>
              {Array.from({ length: 61 }, (_, i) => {
                const lengthValue = i + 4;
                if (lengthValue < minRequiredLength) return null;
                return (
                  <option key={lengthValue} value={lengthValue}>
                    {lengthValue}
                  </option>
                );
              })}
            </select>
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem", paddingBottom: "0.5rem", borderBottom: "1px solid #e5e7eb" }}>
            <input 
              type="checkbox" 
              checked={ensureTwoPerType} 
              onChange={(e) => setEnsureTwoPerType(e.target.checked)} 
            />
            Ensure 2 of each character type
          </label>

          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input type="checkbox" id="uppercase" checked={options.uppercase} onChange={handleCheckboxChange} />
            Uppercase
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input type="checkbox" id="numbers" checked={options.numbers} onChange={handleCheckboxChange} />
            Numbers
          </label>
          <label style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input type="checkbox" id="symbols" checked={options.symbols} onChange={handleCheckboxChange} />
            Symbols
          </label>
        </div>
      </div>
    </div>
  );
};

export default PasswordGenerator;