import React, { useState, useEffect } from "react";
import axios from "axios";
import "./index.css";

const conversionOptions = {
  "Binary": ["Decimal", "Hexadecimal", "Octal", "Gray Code", "BCD", "Excess-3", "Floating Point", "IEEE 754", "Hamming Code", "Parity Bit", "Two's Complement", "Roman Numerals", "ASCII", "UTF-8", "UTF-16", "UTF-32"],
  "Decimal": ["Binary", "Hexadecimal", "Octal", "Gray Code", "BCD", "Excess-3", "Floating Point", "IEEE 754", "Signed/Unsigned Binary", "Two's Complement", "Hex Floating Point", "Roman Numerals", "Log Base", "Base64", "ASCII", "UTF-8", "UTF-16", "UTF-32"],
  "Hexadecimal": ["Binary", "Decimal", "Octal", "Gray Code", "Floating Point", "IEEE 754", "Hex Floating Point", "BCD", "Excess-3", "Signed/Unsigned Binary", "ASCII", "UTF-8", "UTF-16", "UTF-32", "Log Base", "Base64", "Roman Numerals"],
  "Octal": ["Binary", "Decimal", "Hexadecimal", "Roman Numerals", "Gray Code", "Floating Point", "IEEE 754", "Hex Floating Point", "BCD", "Excess-3", "Signed/Unsigned Binary", "ASCII", "UTF-8", "UTF-16", "UTF-32", "Log Base 2", "Log Base 10", "Log Base E", "Base64"],
  "Roman Numerals": ["Decimal", "Binary", "Hexadecimal", "Octal", "ASCII", "Unicode", "Floating Point", "Base-n"],
  "Gray Code": ["Binary", "Decimal", "Hexadecimal", "Octal"],
  "BCD": ["Decimal", "Binary", "Hexadecimal", "Octal"],
  "Excess-3": ["Decimal", "Binary", "Hexadecimal", "Octal"],
  "Floating Point": ["Binary", "Decimal", "Hexadecimal", "Octal", "IEEE 754", "Hex Floating Point", "ASCII", "Unicode"],
  "IEEE 754": ["Binary", "Decimal", "Hexadecimal", "Floating Point", "Octal"],
  "Hamming Code": ["Binary", "Decimal"],
  "Parity Bit": ["Binary", "Decimal"],
  "ASCII": ["UTF-8", "UTF-16", "UTF-32", "Binary", "Hexadecimal", "Decimal", "Base64"],
  "Twos Complement": ["Sign Magnitude"],
  "Base64": ["Base-32"],
};

const getConversionType = (inputType, outputType) => {
  const mapping = {
    "Binary": {
      "Decimal": "binaryToDecimal",
      "Hexadecimal": "binaryToHex",
      "Octal": "binaryToOctal",
      "Gray Code": "binaryToGray",
      "BCD": "binaryToBCD",
      "Excess-3": "binaryToExcess3",
      "IEEE 754": "binaryToIEEE754",
      "Floating Point": "binaryToFloatingPoint",
      "Hamming Code": "binaryToHammingCode",
      "Parity Bit": "binaryToParityBit",
      "Two's Complement": "binaryToTwosComplement",
      "Roman Numerals": "binaryToRoman",
      "ASCII": "binaryToASCII",
      "UTF-8": "binaryToUTF8",
      "UTF-16": "binaryToUTF16",
      "UTF-32": "binaryToUTF32"
    },
    "Decimal": {
      "Binary": "decimalToBinary",
      "Hexadecimal": "decimalToHex",
      "Octal": "decimalToOctal",
      "Gray Code": "decimalToGray",
      "BCD": "decimalToBCD",
      "Excess-3": "decimalToExcess3",
      "IEEE 754": "floatToIEEE754",
      "Floating Point": "decimalToFloatingPoint",
      "Signed/Unsigned Binary": "decimalToSignedUnsigned",
      "Two's Complement": "decimalToTwosComplement",
      "Hex Floating Point": "decimalToHexFloatingPoint",
      "Roman Numerals": "decimalToRoman",
      "ASCII": "decimalToASCII",
      "UTF-8": "decimalToUTF8",
      "UTF-16": "decimalToUTF16",
      "UTF-32": "decimalToUTF32",
      "Log Base": "decimalToLog",
      "Base64": "decimalToBase64"
    },
    "Hexadecimal": {
      "Binary": "hexToBinary",
      "Decimal": "hexToDecimal",
      "Octal": "hexToOctal",
      "Floating Point": "hexToFloatingPoint",
      "IEEE 754": "hexToIEEE754",
      "Hex Floating Point": "hexToHexFloatingPoint",
      "ASCII": "hexToASCII",
      "UTF-8": "hexToUTF8",
      "UTF-16": "hexToUTF16",
      "UTF-32": "hexToUTF32"
    },
    "Octal": {
      "Binary": "octalToBinary",
      "Decimal": "octalToDecimal",
      "Hexadecimal": "octalToHex",
      "Floating Point": "octalToFloatingPoint",
      "IEEE 754": "octalToIEEE754",
      "Hex Floating Point": "octalToHexFloatingPoint",
      "ASCII": "octalToASCII",
      "UTF-8": "octalToUTF8",
      "UTF-16": "octalToUTF16",
      "UTF-32": "octalToUTF32"
    },
    "Roman Numerals": {
      "Decimal": "romanToDecimal",
      "Binary": "romanToBinary",
      "Hexadecimal": "romanToHex",
      "Octal": "romanToOctal"
    },
    "Gray Code": {
      "Binary": "grayToBinary",
      "Decimal": "grayToDecimal"
    },
    "BCD": {
      "Decimal": "bcdToDecimal"
    },
    "Excess-3": {
      "Decimal": "excess3ToDecimal"
    },
    "Floating Point": {
      "Binary": "floatingPointToBinary",
      "Decimal": "floatingPointToDecimal",
      "Hexadecimal": "floatingPointToHex",
      "Octal": "floatingPointToOctal"
    },
    "IEEE 754": {
      "Binary": "ieee754ToBinary",
      "Decimal": "ieee754ToDecimal"
    },
    "ASCII": {
      "UTF-8": "asciiToUtf8",
      "UTF-16": "asciiToUtf16",
      "UTF-32": "asciiToUtf32",
      "Binary": "asciiToBinary",
      "Hexadecimal": "asciiToHex",
      "Decimal": "asciiToDecimal"
    },
    "Base64": {
      "Base-32": "base64ToBase32"
    }
  };

  return mapping[inputType]?.[outputType] || "invalid";
};

const Home = () => {
  const [inputType, setInputType] = useState("");
  const [outputType, setOutputType] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [precision, setPrecision] = useState("single");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setResult(null);
    setError("");
  }, [inputType, outputType, inputValue, precision]);

  const handleConvert = async () => {
    if (!inputType || !outputType || inputValue.trim() === "") {
      setError("Please fill all fields.");
      return;
    }

    if (loading) return;

    setLoading(true);
    setError("");
    setResult(null);

    const conversionType = getConversionType(inputType, outputType);

    const requestBody = {
      inputValue,
      conversionType,
      precision,
    };

    try {
      const API_BASE_URL = "http://localhost:5000";

      const response = await axios.post(`${API_BASE_URL}/api/convert`, requestBody);

      if (response.data && response.data.result !== undefined) {
        setResult(response.data.result);
        setError("");
      } else {
        setError("Unexpected response from server.");
      }
    } catch (err) {
      console.error("Conversion Error:", err);
      
      let errorMessage = "Conversion failed. Please check your input.";
      
      if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
      } else if (err.message) {
        errorMessage = err.message;
      } else if (err.code === 'NETWORK_ERROR') {
        errorMessage = "Network error. Please check your connection.";
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="converter-container">
      <h2>ByteMe</h2>

      <div className="form-group">
        <label>Input Type:</label>
        <select value={inputType} onChange={(e) => setInputType(e.target.value)}>
          <option value="">Select Type</option>
          {Object.keys(conversionOptions).map((type) => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      {inputType && (
        <div className="form-group">
          <label>Convert To:</label>
          <select value={outputType} onChange={(e) => setOutputType(e.target.value)}>
            <option value="">Select Type</option>
            {conversionOptions[inputType].map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
        </div>
      )}

      <div className="form-group">
        <label>Input Value:</label>
        <input type="text" value={inputValue} onChange={(e) => setInputValue(e.target.value)} />
      </div>

      {(inputType === "IEEE 754" || outputType === "IEEE 754") && (
        <div className="form-group">
          <label>Precision:</label>
          <select value={precision} onChange={(e) => setPrecision(e.target.value)}>
            <option value="single">Single Precision (32-bit)</option>
            <option value="double">Double Precision (64-bit)</option>
          </select>
        </div>
      )}

      <button onClick={handleConvert}>Convert</button>

      {error && <p className="error">{error}</p>}

      {result !== null && (
        <div className="result">
          <span>Result:</span> <span>{result}</span>
        </div>
      )}
    </div>
  );
};

export default Home;
