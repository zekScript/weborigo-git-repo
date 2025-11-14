import React, { useState, useRef } from 'react'

const PasswordGenerator = () => {
  const [options, setOptions] = useState({
    uppercase: true,
    numbers: true,
    symbols: true,
  });
  const inputRef = useRef(null);
  const [length, setLength] = useState(18);
  const [password, setPassword] = useState('');
  const [copied, setCopied] = useState(false);

  const handleCheckboxChange = (e) => {
    const { id, checked } = e.target;
    setOptions(prev => ({
      ...prev,
      [id]: checked
    }));
  };

  const handleLengthChange = (e) => {
    setLength(Number(e.target.value));
  };

  const generatePassword = () => {
    let chars = 'abcdefghijklmnopqrstuvwxyz';
    if (options.uppercase) chars += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (options.numbers) chars += '0123456789';
    if (options.symbols) chars += '!@#$%^&*()_+-={}[]|:;<>,.?/~';
    if (chars.length === 0) {
      setPassword('');
      return;
    }
    let pwd = '';
    for (let i = 0; i < length; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setPassword(pwd);
    setCopied(false);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.select();
        document.execCommand('copy');
      }
    }, 0);
  };

  const handleGenerate = (e) => {
    e.preventDefault();
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

  return (
    <div className="min-h-screen flex items-center justify-center  py-8">
      <div className="w-[75%] bg-white rounded-2xl shadow-lg p-8 border border-orange-200">
        <h1 className="text-3xl font-bold text-orange-600 mb-6 text-center">Password Generator</h1>
        <form onSubmit={handleGenerate} className="flex flex-col gap-4 mb-6">
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={password}
              placeholder="Generated Password"
              readOnly
              ref={inputRef}
              className={`flex-1 px-3 py-2 rounded-lg border-2 focus:outline-none`}
            />
            <button
              type="button"
              onClick={handleCopy}
              disabled={!password}
              className={`px-3 py-2 rounded-lg font-semibold transition-all duration-200 border border-orange-400 ${copied ? 'bg-orange-400 text-white' : 'bg-white text-orange-600 hover:bg-orange-100'}`}
            >
              {copied ? 'Copied!' : 'Copy'}
            </button>
          </div>
          <button
            type="submit"
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 rounded-lg shadow transition-all duration-200 mt-2"
          >
            Generate
          </button>
        </form>
        <div className="flex flex-col gap-4">
          <label className="flex items-center gap-3 text-orange-700 font-medium">
            Password Length
            <select
              value={length}
              onChange={handleLengthChange}
              className="ml-2 px-2 py-1 rounded border border-orange-300 focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
            >
              {Array.from({ length: 64 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              id="uppercase"
              checked={options.uppercase}
              onChange={handleCheckboxChange}
              className="accent-orange-500 w-5 h-5"
            />
            <span className="text-orange-700">Include Uppercase Letters</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              id="numbers"
              checked={options.numbers}
              onChange={handleCheckboxChange}
              className="accent-orange-500 w-5 h-5"
            />
            <span className="text-orange-700">Include Numbers</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              id="symbols"
              checked={options.symbols}
              onChange={handleCheckboxChange}
              className="accent-orange-500 w-5 h-5"
            />
            <span className="text-orange-700">Include Symbols</span>
          </label>
        </div>
      </div>
    </div>
  );
}

export default PasswordGenerator