// 1. Binary Conversions

function convertBinaryToDecimal(binary) {
  let isNegative = binary.startsWith('-');
  if (isNegative) {
    binary = binary.slice(1);
  }

  let [integerPart, fractionalPart] = binary.split('.');

  let decimalInteger = parseInt(integerPart, 2);

  let decimalFraction = 0;
  if (fractionalPart) {
    decimalFraction = fractionalPart.split('').reduce((acc, digit, index) => {
      return acc + parseInt(digit) * Math.pow(2, -(index + 1));
    }, 0);
  }

  let decimalValue = decimalInteger + decimalFraction;

  return isNegative ? -decimalValue : decimalValue;
}


function convertBinaryToHex(binary) {
  let isNegative = binary.startsWith('-');
  if (isNegative) {
    binary = binary.slice(1);
  }

  let [integerPart, fractionalPart] = binary.split('.');

  let hexInteger = parseInt(integerPart, 2).toString(16).toUpperCase();

  let hexFraction = '';
  if (fractionalPart) {
    let fractionalValue = 0;
    for (let i = 0; i < fractionalPart.length; i++) {
      fractionalValue += parseInt(fractionalPart[i]) * Math.pow(2, -(i + 1));
    }

    let precision = 8;
    while (fractionalValue > 0 && precision > 0) {
      fractionalValue *= 16;
      let digit = Math.floor(fractionalValue);
      hexFraction += digit.toString(16).toUpperCase();
      fractionalValue -= digit;
      precision--;
    }
  }

  let result = hexFraction ? `${hexInteger}.${hexFraction}` : hexInteger;

  return isNegative ? '-' + result : result;
}

function convertBinaryToOctal(binary) {
  let isNegative = binary.startsWith('-');
  if (isNegative) {
    binary = binary.slice(1);
  }

  let [integerPart, fractionalPart] = binary.split('.');

  let octalInteger = parseInt(integerPart, 2).toString(8);

  let octalFraction = '';
  if (fractionalPart) {
    let fractionalValue = 0;
    for (let i = 0; i < fractionalPart.length; i++) {
      fractionalValue += parseInt(fractionalPart[i]) * Math.pow(2, -(i + 1));
    }

    let precision = 8;
    while (fractionalValue > 0 && precision > 0) {
      fractionalValue *= 8;
      let digit = Math.floor(fractionalValue);
      octalFraction += digit.toString(8);
      fractionalValue -= digit;
      precision--;
    }
  }

  let result = octalFraction ? `${octalInteger}.${octalFraction}` : octalInteger;

  return isNegative ? '-' + result : result;
}


function convertBinaryToGray(binary) {
  let isNegative = binary.startsWith('-');
  if (isNegative) {
    binary = binary.slice(1);
  }

  let [integerPart, fractionalPart] = binary.split('.');

  let gray = integerPart[0];
  for (let i = 1; i < integerPart.length; i++) {
    gray += (parseInt(integerPart[i - 1], 2) ^ parseInt(integerPart[i], 2)).toString();
  }

  if (fractionalPart) {
    gray += '.';
    for (let i = 1; i < fractionalPart.length; i++) {
      gray += (parseInt(fractionalPart[i - 1], 2) ^ parseInt(fractionalPart[i], 2)).toString();
    }
  }

  return isNegative ? '-' + gray : gray;
}


function convertBinaryToBCD(binary) {
  let isNegative = binary.startsWith('-');
  if (isNegative) {
    binary = binary.slice(1);
  }

  let decimal = convertBinaryToDecimal(binary);

  let [integerPart, fractionalPart] = decimal.toString().split('.');

  let bcdInteger = integerPart
    .split('')
    .map(digit => parseInt(digit).toString(2).padStart(4, '0'))
    .join(' ');

  let bcdFraction = '';
  if (fractionalPart) {
    bcdFraction = fractionalPart
      .split('')
      .map(digit => parseInt(digit).toString(2).padStart(4, '0'))
      .join(' ');
  }

  let result = bcdInteger + (bcdFraction ? '.' + bcdFraction : '');

  return isNegative ? '-' + result : result;
}

function convertBinaryToExcess3(binary) {
  let isNegative = binary.startsWith('-');
  if (isNegative) {
    binary = binary.slice(1);
  }

  let decimal = convertBinaryToDecimal(binary);

  let integerPart = Math.floor(decimal);
  let excess3Integer = (integerPart + 3)
    .toString()
    .split('')
    .map(digit => parseInt(digit).toString(2).padStart(4, '0'))
    .join(' ');

  let fractionalPart = decimal - integerPart;
  let excess3Fraction = '';
  if (fractionalPart) {
    fractionalPart = (fractionalPart * 10).toFixed(2);
    excess3Fraction = fractionalPart
      .split('')
      .map(digit => (parseInt(digit) + 3).toString(2).padStart(4, '0'))
      .join(' ');
  }

  let result = excess3Integer + (excess3Fraction ? '.' + excess3Fraction : '');

  return isNegative ? '-' + result : result;
}


function convertBinaryToFloatingPoint(binary) {
  let isNegative = binary[0] === '1';
  let binaryStr = isNegative ? binary.slice(1) : binary;

  let [integerPart, fractionalPart] = binaryStr.split('.');

  let integerDecimal = parseInt(integerPart, 2);

  let fractionalDecimal = 0;
  if (fractionalPart) {
    for (let i = 0; i < fractionalPart.length; i++) {
      fractionalDecimal += parseInt(fractionalPart[i], 2) * Math.pow(2, -(i + 1));
    }
  }

  let result = integerDecimal + fractionalDecimal;

  return isNegative ? -result : result;
}

function convertBinaryToIEEE754(binary) {
  let sign = binary[0] === '1' ? -1 : 1;
  let exponent = parseInt(binary.slice(1, 9), 2) - 127;
  let fraction = parseInt(binary.slice(9), 2) / Math.pow(2, 23);

  return sign * (1 + fraction) * Math.pow(2, exponent);
}


function convertBinaryToHammingCode(binary) {
  if (binary.length !== 4) {
    return 'Hamming Code only works for 4-bit input.';
  }

  let p1 = binary[0] ^ binary[1] ^ binary[3];
  let p2 = binary[0] ^ binary[2] ^ binary[3];
  let p3 = binary[1] ^ binary[2] ^ binary[3];

  return `${p1}${p2}${binary[0]}${p3}${binary[1]}${binary[2]}${binary[3]}`;
}

function convertBinaryToParityBit(binary) {
  let parity = binary.split('').reduce((acc, bit) => acc ^ bit, 0); // XOR for parity
  return `${binary}${parity}`;
}


function convertBinaryToTwosComplement(binary) {
  let decimal = parseInt(binary, 2);

  if (binary[0] === '1') {
    let complement = Math.pow(2, binary.length) - decimal;
    return complement.toString(2);
  }


  return binary;
}

function convertBinaryToRoman(binary) {
  let decimal = parseInt(binary, 2);
  return convertDecimalToRoman(decimal);
}

function convertDecimalToRoman(num) {
  let romanMap = [
    [1000, 'M'],
    [900, 'CM'],
    [500, 'D'],
    [400, 'CD'],
    [100, 'C'],
    [90, 'XC'],
    [50, 'L'],
    [40, 'XL'],
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I']
  ];
  let roman = '';
  for (let [value, symbol] of romanMap) {
    while (num >= value) {
      roman += symbol;
      num -= value;
    }
  }
  return roman;
}


function convertBinaryToASCII(binary) {
  return binary
    .match(/.{8}/g)
    .map(byte => String.fromCharCode(parseInt(byte, 2)))
    .join('');
}

function convertBinaryToUTF8(binary) {
  return binary
    .match(/.{8}/g)
    .map(byte => String.fromCharCode(parseInt(byte, 2)))
    .join('');
}

function convertBinaryToUTF16(binary) {
  return binary
    .match(/.{16}/g)
    .map(byte => String.fromCharCode(parseInt(byte, 2)))
    .join('');
}


function convertBinaryToUTF32(binary) {
  const paddedBinary = binary.padStart(Math.ceil(binary.length / 32) * 32, '0');  // Ensure 32-bit chunks
  const codePoints = paddedBinary
    .match(/.{32}/g)
    .map(chunk => {
      const codePoint = parseInt(chunk, 2);
      if (codePoint > 0x10FFFF) {
        throw new Error(`Invalid code point: ${codePoint}`);
      }
      return String.fromCodePoint(codePoint);
    });

  return codePoints.join('');
}

// 2. Decimal Conversions


function convertDecimalToBinary(decimal) {
  return (decimal >>> 0).toString(2);
}

function convertDecimalToHex(decimal) {

  if (decimal < 0) return '-' + convertDecimalToHex(-decimal);

  let integerPart = Math.floor(decimal).toString(16).toUpperCase();


  let fractionalPart = decimal - Math.floor(decimal);
  let hexFraction = '';

  while (fractionalPart > 0 && hexFraction.length < 8) {
    fractionalPart *= 16;
    let digit = Math.floor(fractionalPart);
    hexFraction += digit.toString(16).toUpperCase();
    fractionalPart -= digit;
  }


  return hexFraction ? integerPart + '.' + hexFraction : integerPart;
}

function convertDecimalToOctal(decimal) {

  if (decimal < 0) return '-' + convertDecimalToOctal(-decimal);

  let integerPart = Math.floor(decimal).toString(8);

  let fractionalPart = decimal - Math.floor(decimal);
  let octalFraction = '';

  while (fractionalPart > 0 && octalFraction.length < 8) {
    let digit = Math.floor(fractionalPart);
    octalFraction += digit.toString(8);
    fractionalPart -= digit;
  }

  return octalFraction ? integerPart + '.' + octalFraction : integerPart;
}

function convertDecimalToGray(decimal) {
  return convertBinaryToGray(convertDecimalToBinary(decimal));
}


function convertDecimalToBCD(decimal) {
  return decimal
    .toString()
    .split('')
    .map(digit => parseInt(digit).toString(2).padStart(4, '0'))
    .join(' ');
}

function convertDecimalToExcess3(decimal) {
  return (decimal + 3).toString(2);
}

function convertDecimalToFloatingPoint(decimal) {
  return parseFloat(decimal);
}


function convertDecimalToIEEE754(decimal) {
  let buffer = new ArrayBuffer(4);
  let view = new DataView(buffer);
  view.setFloat32(0, decimal);
  let ieee754 = [...new Uint8Array(buffer)]
    .map(b => b.toString(2).padStart(8, '0'))
    .join('');
  return ieee754;
}

function convertDecimalToSignedUnsigned(decimal) {
  let unsigned = (decimal >>> 0).toString(2);
  let signed =
    decimal >= 0
      ? unsigned
      : (Math.pow(2, unsigned.length) + decimal).toString(2);
  return { signed, unsigned };
}

function convertDecimalToHexFloatingPoint(decimal) {
  return decimal.toString(16).toUpperCase();
}

function convertDecimalToRoman(decimal) {
  let values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  let numerals = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
  let result = "";
  for (let i = 0; i < values.length; i++) {
    while (decimal >= values[i]) {
      decimal -= values[i];
      result += numerals[i];
    }
  }
  return result;
}

function convertDecimalToLogBase(decimal, base) {
  return Math.log(decimal) / Math.log(base);
}

function convertDecimalToBase64(decimal) {
  return btoa(decimal.toString());
}

function convertDecimalToASCII(decimal) {
  return String.fromCharCode(decimal);
}


function convertDecimalToUTF8(decimal) {
  return new TextEncoder().encode(String.fromCharCode(decimal));
}


function convertDecimalToUTF16(decimal) {
  return String.fromCharCode(decimal).charCodeAt(0).toString(16).padStart(4, '0');
}


function convertDecimalToUTF32(decimal) {
  return decimal.toString(16).padStart(8, '0');
}

// 3. Hexadecimal Conversions


function convertHexToBinary(hex) {
  return parseInt(hex, 16).toString(2);
}


function convertHexToDecimal(hex) {
  return parseInt(hex, 16);
}


function convertHexToOctal(hex) {
  return parseInt(hex, 16).toString(8);
}


function convertHexToGray(hex) {
  return convertBinaryToGray(convertHexToBinary(hex));
}


function convertHexToFloatingPoint(hex) {
  return parseFloat(parseInt(hex, 16));
}


function convertHexToIEEE754(hex) {
  return convertHexToFloatingPoint(hex).toExponential();
}


function convertHexToHexFloatingPoint(hex) {
  return hex.toUpperCase();
}


function convertHexToBCD(hex) {
  let decimal = convertHexToDecimal(hex);
  return decimal
    .toString()
    .split("")
    .map(digit => parseInt(digit).toString(2).padStart(4, "0"))
    .join(" ");
}


function convertHexToExcess3(hex) {
  let decimal = convertHexToDecimal(hex) + 3;
  return decimal.toString(2);
}


function convertHexToSignedUnsigned(hex) {
  let binary = convertHexToBinary(hex);
  return {
    signed:
      parseInt(binary, 2) - (binary[0] === "1" ? Math.pow(2, binary.length) : 0),
    unsigned: parseInt(binary, 2)
  };
}


function convertHexToASCII(hex) {
  return String.fromCharCode(parseInt(hex, 16));
}

function convertHexToUTF8(hex) {
  return decodeURIComponent(`%${hex}`);
}

function convertHexToUTF16(hex) {
  return String.fromCharCode(parseInt(hex, 16));
}

function convertHexToUTF32(hex) {
  return String.fromCodePoint(parseInt(hex, 16));
}


function convertHexToLogBase(hex, base) {
  let decimal = convertHexToDecimal(hex);
  return Math.log(decimal) / Math.log(base);
}


function convertHexToBase64(hex) {
  let binaryStr = convertHexToBinary(hex);
  let decimal = parseInt(binaryStr, 2);
  return btoa(String.fromCharCode(decimal));
}


function convertHexToRoman(hex) {
  let decimal = convertHexToDecimal(hex);
  let values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  let numerals = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
  let result = "";
  for (let i = 0; i < values.length; i++) {
    while (decimal >= values[i]) {
      decimal -= values[i];
      result += numerals[i];
    }
  }
  return result;
}

// 4. Octal Conversions

function convertOctalToBinary(octal) {
  return parseInt(octal, 8).toString(2);
}


function convertOctalToDecimal(octal) {
  return parseInt(octal, 8);
}


function convertOctalToHex(octal) {
  return parseInt(octal, 8).toString(16).toUpperCase();
}


function convertOctalToRoman(octal) {
  let decimal = convertOctalToDecimal(octal);
  let values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  let numerals = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
  let result = "";
  for (let i = 0; i < values.length; i++) {
    while (decimal >= values[i]) {
      decimal -= values[i];
      result += numerals[i];
    }
  }
  return result;
}


function convertOctalToGray(octal) {
  return convertBinaryToGray(convertOctalToBinary(octal));
}


function convertOctalToFloatingPoint(octal) {
  return parseFloat(parseInt(octal, 8));
}


function convertOctalToIEEE754(octal) {
  let floatValue = convertOctalToFloatingPoint(octal);
  return floatValue.toExponential();
}


function convertOctalToHexFloatingPoint(octal) {
  return parseInt(octal, 8).toString(16).toUpperCase();
}


function convertOctalToBCD(octal) {
  let decimal = convertOctalToDecimal(octal);
  return decimal.toString().split('').map(digit => parseInt(digit).toString(2).padStart(4, '0')).join(' ');
}


function convertOctalToExcess3(octal) {
  let decimal = convertOctalToDecimal(octal) + 3;
  return decimal.toString(2);
}


function convertOctalToSignedUnsigned(octal) {
  let decimal = convertOctalToDecimal(octal);
  return {
    signed: decimal >= 0 ? decimal : (Math.pow(2, 8) + decimal), // Adjust bit-length as needed
    unsigned: decimal
  };
}


function convertOctalToASCII(octal) {
  return String.fromCharCode(convertOctalToDecimal(octal));
}

function convertOctalToUTF8(octal) {
  return new TextEncoder().encode(String.fromCharCode(convertOctalToDecimal(octal)));
}

function convertOctalToUTF16(octal) {
  return String.fromCharCode(convertOctalToDecimal(octal)).charCodeAt(0).toString(16);
}

function convertOctalToUTF32(octal) {
  return convertOctalToDecimal(octal).toString(16).padStart(8, '0');
}


function convertOctalToLogBase2(octal) {
  return Math.log2(convertOctalToDecimal(octal));
}

function convertOctalToLogBase10(octal) {
  return Math.log10(convertOctalToDecimal(octal));
}

function convertOctalToLogBaseE(octal) {
  return Math.log(convertOctalToDecimal(octal));
}


function convertOctalToBase64(octal) {
  let decimal = convertOctalToDecimal(octal);
  return btoa(String.fromCharCode(decimal));
}

// 5. Roman Conversions

function convertRomanToDecimal(roman) {
  const romanMap = {
    'I': 1, 'V': 5, 'X': 10, 'L': 50, 'C': 100, 'D': 500, 'M': 1000
  };
  let decimal = 0;
  for (let i = 0; i < roman.length; i++) {
    let current = romanMap[roman[i]];
    let next = romanMap[roman[i + 1]];
    if (next > current) {
      decimal -= current;
    } else {
      decimal += current;
    }
  }
  return decimal;
}

function convertRomanToBinary(roman) {
  return convertRomanToDecimal(roman).toString(2);
}

function convertRomanToHex(roman) {
  return convertRomanToDecimal(roman).toString(16).toUpperCase();
}

function convertRomanToOctal(roman) {
  return convertRomanToDecimal(roman).toString(8);
}

function convertRomanToASCII(roman) {
  return roman.split('').map(char => char.charCodeAt(0)).join(' ');
}

function convertRomanToUnicode(roman) {
  return roman.split('').map(char => '\\u' + char.charCodeAt(0).toString(16).padStart(4, '0')).join(' ');
}

function convertRomanToFloatingPoint(roman) {
  return parseFloat(convertRomanToDecimal(roman));
}

function convertRomanToBaseN(roman, base) {
  return convertRomanToDecimal(roman).toString(base);
}

// 6. Gray Code conversions
function convertGrayToBinary(gray) {
  let binary = gray[0];
  for (let i = 1; i < gray.length; i++) {
    binary += (binary[i - 1] ^ gray[i]);
  }
  return binary;
}


function convertGrayToDecimal(gray) {
  let binary = convertGrayToBinary(gray);
  return parseInt(binary, 2);
}


function convertGrayToHex(gray) {
  let decimal = convertGrayToDecimal(gray);
  return decimal.toString(16).toUpperCase();
}


function convertGrayToOctal(gray) {
  let decimal = convertGrayToDecimal(gray);
  return decimal.toString(8);
}

// 7. BCD Conversions 
function convertBCDToDecimal(bcd) {
  let decimal = bcd.split(' ').map(bin => parseInt(bin, 2)).join('');
  return parseInt(decimal, 10);
}


function convertBCDToBinary(bcd) {
  let decimal = convertBCDToDecimal(bcd);
  return decimal.toString(2);
}


function convertBCDToHex(bcd) {
  let decimal = convertBCDToDecimal(bcd);
  return decimal.toString(16).toUpperCase();
}


function convertBCDToOctal(bcd) {
  let decimal = convertBCDToDecimal(bcd);
  return decimal.toString(8);
}

// 8. Excess-3 Code Conversions
function convertExcess3ToDecimal(excess3) {
  let decimal = excess3.split(' ').map(bin => parseInt(bin, 2) - 3).join('');
  return parseInt(decimal, 10);
}


function convertExcess3ToBinary(excess3) {
  let decimal = convertExcess3ToDecimal(excess3);
  return decimal.toString(2);
}


function convertExcess3ToHex(excess3) {
  let decimal = convertExcess3ToDecimal(excess3);
  return decimal.toString(16).toUpperCase();
}


function convertExcess3ToOctal(excess3) {
  let decimal = convertExcess3ToDecimal(excess3);
  return decimal.toString(8);
}

// 9. Floating point conversions

function convertFloatingPointToBinary(floatNum) {
  let intPart = Math.floor(floatNum).toString(2);
  let fracPart = floatNum - Math.floor(floatNum);
  let binaryFrac = '';

  while (fracPart > 0 && binaryFrac.length < 10) {
    fracPart *= 2;
    if (fracPart >= 1) {
      binaryFrac += '1';
      fracPart -= 1;
    } else {
      binaryFrac += '0';
    }
  }

  return intPart + '.' + binaryFrac;
}


function convertFloatingPointToDecimal(floatNum) {
  return parseFloat(floatNum);
}


function convertFloatingPointToHex(floatNum) {
  return floatNum.toString(16).toUpperCase();
}


function convertFloatingPointToOctal(floatNum) {
  return floatNum.toString(8);
}


function convertFloatingPointToIEEE754(floatNum) {
  let buffer = new ArrayBuffer(4);
  let view = new DataView(buffer);
  view.setFloat32(0, floatNum, false);
  return [...new Uint8Array(buffer)].map(b => b.toString(2).padStart(8, '0')).join(' ');
}


function convertFloatingPointToHexFloatingPoint(floatNum) {
  return floatNum.toString(16).toUpperCase();
}


function convertFloatingPointToASCII(floatNum) {
  return String.fromCharCode(floatNum);
}

function convertFloatingPointToUnicode(floatNum) {
  let unicodeChar = String.fromCodePoint(floatNum);
  let utf8 = Buffer.from(unicodeChar, 'utf8').toString('hex').toUpperCase();
  let utf16 = Buffer.from(unicodeChar, 'utf16le').toString('hex').toUpperCase();
  let utf32 = Buffer.from(unicodeChar, 'utf32le').toString('hex').toUpperCase();

  return {
    UTF8: utf8,
    UTF16: utf16,
    UTF32: utf32
  };
}

// 10. IEEE 754 Conversions
function convertIEEE754ToBinary(ieee754Hex) {
  let ieeeBinary = parseInt(ieee754Hex, 16).toString(2).padStart(32, '0');
  return ieeeBinary;
}


function convertIEEE754ToDecimal(ieee754Hex) {
  let buffer = new ArrayBuffer(4);
  let view = new DataView(buffer);

  let intValue = parseInt(ieee754Hex, 16);
  view.setUint32(0, intValue, false);
  return view.getFloat32(0, false);
}


function convertIEEE754ToHex(ieee754Hex) {
  return ieee754Hex.toUpperCase();
}


function convertIEEE754ToFloatingPoint(ieee754Hex) {
  return convertIEEE754ToDecimal(ieee754Hex);
}


function convertIEEE754ToOctal(ieee754Hex) {
  return parseInt(ieee754Hex, 16).toString(8);
}

// 11. Hamming Code Conversions

function convertHammingToBinary(hammingCode) {
  let n = hammingCode.length;
  let errorPos = 0;


  for (let i = 0; i < Math.log2(n) + 1; i++) {
    let pos = Math.pow(2, i);
    let parity = 0;

    for (let j = pos - 1; j < n; j += 2 * pos) {
      for (let k = 0; k < pos && j + k < n; k++) {
        parity ^= parseInt(hammingCode[j + k]);
      }
    }

    if (parity !== 0) errorPos += pos;
  }
  if (errorPos > 0) {
    let correctedCode = hammingCode.split('');
    correctedCode[errorPos - 1] = correctedCode[errorPos - 1] === '0' ? '1' : '0';
    hammingCode = correctedCode.join('');
  }

  let binaryData = "";
  for (let i = 0; i < n; i++) {
    if ((i & (i + 1)) !== 0) binaryData += hammingCode[i];
  }

  return binaryData;
}

function convertHammingToDecimal(hammingCode) {
  let binary = convertHammingToBinary(hammingCode);
  return parseInt(binary, 2);
}

// 12. Parity Bit conversions 
function convertParityToBinary(parityBinary) {
  let dataBits = parityBinary.slice(0, -1);
  let parityBit = parseInt(parityBinary[parityBinary.length - 1]);

  let calculatedParity = dataBits.split('').reduce((acc, bit) => acc ^ parseInt(bit), 0);

  if (calculatedParity !== parityBit) {
    console.log("⚠️ Warning: Parity error detected!");
  }

  return dataBits;
}


function convertParityToDecimal(parityBinary) {
  let binary = convertParityToBinary(parityBinary);
  return parseInt(binary, 2);
}

// 13. ASCII Conversions
function convertASCIItoUTF8(text) {
  return new TextEncoder().encode(text);
}

function convertASCIItoUTF16(text) {
  let utf16Array = [];
  for (let char of text) {
    utf16Array.push(char.charCodeAt(0).toString(16).padStart(4, '0'));
  }
  return utf16Array.join(' ');
}

function convertASCIItoUTF32(text) {
  let utf32Array = [];
  for (let char of text) {
    utf32Array.push(char.charCodeAt(0).toString(16).padStart(8, '0'));
  }
  return utf32Array.join(' ');
}

function convertASCIItoBinary(text) {
  return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
}

function convertASCIItoHex(text) {
  return text.split('').map(char => char.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0')).join(' ');
}

function convertASCIItoDecimal(text) {
  return text.split('').map(char => char.charCodeAt(0)).join(' ');
}

function convertASCIItoBase64(text) {
  return btoa(text);
}

// 14. 2's complement conversions
function convertTwosComplementToSignMagnitude(binary) {
  const isNegative = binary[0] === '1';
  let signMagnitude = '';

  if (isNegative) {

    let invertedBinary = '';
    for (let i = 0; i < binary.length; i++) {
      invertedBinary += binary[i] === '1' ? '0' : '1';
    }
    let magnitude = (parseInt(invertedBinary, 2) + 1).toString(2).padStart(binary.length - 1, '0');
    signMagnitude = '1' + magnitude;
  } else {
    signMagnitude = '0' + binary.slice(1);
  }

  return signMagnitude;
}

// 15. Base 64 to base 32 
function convertBase64ToBase32(base64) {

  let binaryString = atob(base64);
  let bytes = [];
  for (let i = 0; i < binaryString.length; i++) {
    bytes.push(binaryString.charCodeAt(i));
  }


  const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';


  let base32 = '';
  let buffer = 0;
  let bitsInBuffer = 0;

  for (let i = 0; i < bytes.length; i++) {
    buffer = (buffer << 8) | bytes[i];
    bitsInBuffer += 8;

    while (bitsInBuffer >= 5) {
      base32 += base32Chars[(buffer >>> (bitsInBuffer - 5)) & 31];
      bitsInBuffer -= 5;
    }
  }


  if (bitsInBuffer > 0) {
    base32 += base32Chars[(buffer << (5 - bitsInBuffer)) & 31];
  }


  while (base32.length % 8 !== 0) {
    base32 += '=';
  }

  return base32;
}


module.exports = {
  convertBinaryToDecimal,
  convertBinaryToHex,
  convertBinaryToOctal,
  convertBinaryToGray,
  convertBinaryToBCD,
  convertBinaryToExcess3,
  convertBinaryToFloatingPoint,
  convertBinaryToIEEE754,
  convertBinaryToHammingCode,
  convertBinaryToParityBit,
  convertBinaryToTwosComplement,
  convertBinaryToRoman,
  convertBinaryToASCII,
  convertBinaryToUTF8,
  convertBinaryToUTF16,
  convertBinaryToUTF32,
  convertDecimalToBinary,
  convertDecimalToHex,
  convertDecimalToOctal,
  convertDecimalToGray,
  convertDecimalToBCD,
  convertDecimalToExcess3,
  convertDecimalToFloatingPoint,
  convertDecimalToIEEE754,
  convertDecimalToSignedUnsigned,
  convertDecimalToHexFloatingPoint,
  convertDecimalToRoman,
  convertDecimalToLogBase,
  convertDecimalToBase64,
  convertDecimalToASCII,
  convertDecimalToUTF8,
  convertDecimalToUTF16,
  convertDecimalToUTF32,
  convertHexToBinary,
  convertHexToDecimal,
  convertHexToOctal,
  convertHexToGray,
  convertHexToFloatingPoint,
  convertHexToIEEE754,
  convertHexToHexFloatingPoint,
  convertHexToBCD,
  convertHexToExcess3,
  convertHexToSignedUnsigned,
  convertHexToASCII,
  convertHexToUTF8,
  convertHexToUTF16,
  convertHexToUTF32,
  convertHexToLogBase,
  convertHexToBase64,
  convertHexToRoman,
  convertOctalToBinary,
  convertOctalToDecimal,
  convertOctalToHex,
  convertOctalToRoman,
  convertOctalToGray,
  convertOctalToFloatingPoint,
  convertOctalToIEEE754,
  convertOctalToHexFloatingPoint,
  convertOctalToBCD,
  convertOctalToExcess3,
  convertOctalToSignedUnsigned,
  convertOctalToASCII,
  convertOctalToUTF8,
  convertOctalToUTF16,
  convertOctalToUTF32,
  convertOctalToLogBase2,
  convertOctalToLogBase10,
  convertOctalToLogBaseE,
  convertOctalToBase64,
  convertRomanToDecimal,
  convertRomanToBinary,
  convertRomanToHex,
  convertRomanToOctal,
  convertRomanToASCII,
  convertRomanToUnicode,
  convertRomanToFloatingPoint,
  convertRomanToBaseN,
  convertGrayToBinary,
  convertGrayToDecimal,
  convertGrayToHex,
  convertGrayToOctal,
  convertBCDToDecimal,
  convertBCDToBinary,
  convertBCDToHex,
  convertBCDToOctal,
  convertExcess3ToDecimal,
  convertExcess3ToBinary,
  convertExcess3ToHex,
  convertExcess3ToOctal,
  convertFloatingPointToBinary,
  convertFloatingPointToDecimal,
  convertFloatingPointToHex,
  convertFloatingPointToOctal,
  convertFloatingPointToIEEE754,
  convertFloatingPointToHexFloatingPoint,
  convertFloatingPointToASCII,
  convertFloatingPointToUnicode,
  convertIEEE754ToBinary,
  convertIEEE754ToDecimal,
  convertIEEE754ToHex,
  convertIEEE754ToFloatingPoint,
  convertIEEE754ToOctal,
  convertHammingToBinary,
  convertHammingToDecimal,
  convertParityToBinary,
  convertParityToDecimal,
  convertASCIItoUTF8,
  convertASCIItoUTF16,
  convertASCIItoUTF32,
  convertASCIItoBinary,
  convertASCIItoHex,
  convertASCIItoDecimal,
  convertASCIItoBase64,
  convertTwosComplementToSignMagnitude,
  convertBase64ToBase32
};
