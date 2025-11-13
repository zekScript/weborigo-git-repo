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
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
      <h1>Password Generator Page</h1>
      <form onSubmit={handleGenerate} style={{ marginBottom: 20 }}>
        <input
          type="text"
          value={password}
          placeholder="Generated Password"
          readOnly
          ref={inputRef}
          style={{
            width: '70%',
            marginRight: 8,
            
          }}
        />
        <button type="button" onClick={handleCopy} disabled={!password} style={{ marginRight: 8 }}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
        <button type="submit" className='bg-gray-700 p-2  text-white'>Generate</button>
      </form>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        <label>
          Password Length
          <select
            value={length}
            onChange={handleLengthChange}
            style={{ marginLeft: 8, width: 70 }}
          >
            {Array.from({ length: 64 }, (_, i) => (
              <option key={i + 1} value={i + 1}>{i + 1}</option>
            ))}
          </select>
        </label>
        <label>
          <input
            type="checkbox"
            id="uppercase"
            checked={options.uppercase}
            onChange={handleCheckboxChange}
          />{' '}
          Include Uppercase Letters
        </label>
        <label>
          <input
            type="checkbox"
            id="numbers"
            checked={options.numbers}
            onChange={handleCheckboxChange}
          />{' '}
          Include Numbers
        </label>
        <label>
          <input
            type="checkbox"
            id="symbols"
            checked={options.symbols}
            onChange={handleCheckboxChange}
          />{' '}
          Include Symbols
        </label>
      </div>
    </div>
  );
}

export default PasswordGenerator