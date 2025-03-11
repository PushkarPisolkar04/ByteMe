// conversionService.js

// 1. Binary Conversions

function convertBinaryToDecimal(binary) {
  // Check if the binary number is negative
  let isNegative = binary.startsWith('-');
  if (isNegative) {
    binary = binary.slice(1); // Remove the negative sign for processing
  }

  // Split the binary number into integer and fractional parts
  let [integerPart, fractionalPart] = binary.split('.');

  // Convert integer part from binary to decimal
  let decimalInteger = parseInt(integerPart, 2);

  // Convert fractional part from binary to decimal (if exists)
  let decimalFraction = 0;
  if (fractionalPart) {
    decimalFraction = fractionalPart.split('').reduce((acc, digit, index) => {
      return acc + parseInt(digit) * Math.pow(2, -(index + 1));
    }, 0);
  }

  // Combine the integer and fractional parts
  let decimalValue = decimalInteger + decimalFraction;

  // If the number was negative, apply the negative sign
  return isNegative ? -decimalValue : decimalValue;
}
// Binary → Hexadecimal
function convertBinaryToHex(binary) {
  // Check if the binary number is negative
  let isNegative = binary.startsWith('-');
  if (isNegative) {
    binary = binary.slice(1); // Remove the negative sign for processing
  }

  // Split the binary number into integer and fractional parts
  let [integerPart, fractionalPart] = binary.split('.');

  // Convert integer part from binary to hexadecimal
  let hexInteger = parseInt(integerPart, 2).toString(16).toUpperCase();

  // Convert fractional part from binary to hexadecimal (if exists)
  let hexFraction = '';
  if (fractionalPart) {
    let fractionalValue = 0;
    for (let i = 0; i < fractionalPart.length; i++) {
      fractionalValue += parseInt(fractionalPart[i]) * Math.pow(2, -(i + 1));
    }

    // Convert fractional part to hexadecimal
    let precision = 8;  // Limit precision to 8 hex digits
    while (fractionalValue > 0 && precision > 0) {
      fractionalValue *= 16;
      let digit = Math.floor(fractionalValue);
      hexFraction += digit.toString(16).toUpperCase();
      fractionalValue -= digit;
      precision--;
    }
  }

  // Combine integer and fractional parts
  let result = hexFraction ? `${hexInteger}.${hexFraction}` : hexInteger;

  // If the number was negative, apply the negative sign
  return isNegative ? '-' + result : result;
}
function convertBinaryToOctal(binary) {
  // Check if the binary number is negative
  let isNegative = binary.startsWith('-');
  if (isNegative) {
    binary = binary.slice(1); // Remove the negative sign for processing
  }

  // Split the binary number into integer and fractional parts
  let [integerPart, fractionalPart] = binary.split('.');

  // Convert integer part from binary to octal
  let octalInteger = parseInt(integerPart, 2).toString(8);

  // Convert fractional part from binary to octal (if exists)
  let octalFraction = '';
  if (fractionalPart) {
    let fractionalValue = 0;
    for (let i = 0; i < fractionalPart.length; i++) {
      fractionalValue += parseInt(fractionalPart[i]) * Math.pow(2, -(i + 1));
    }

    // Convert fractional part to octal
    let precision = 8;  // Limit precision to 8 octal digits
    while (fractionalValue > 0 && precision > 0) {
      fractionalValue *= 8;
      let digit = Math.floor(fractionalValue);
      octalFraction += digit.toString(8);
      fractionalValue -= digit;
      precision--;
    }
  }

  // Combine integer and fractional parts
  let result = octalFraction ? `${octalInteger}.${octalFraction}` : octalInteger;

  // If the number was negative, apply the negative sign
  return isNegative ? '-' + result : result;
}


// Binary → Gray Code
function convertBinaryToGray(binary) {
  // Check if the binary is negative
  let isNegative = binary.startsWith('-');
  if (isNegative) {
    binary = binary.slice(1); // Remove the negative sign for processing
  }

  // Split the binary into integer and fractional parts
  let [integerPart, fractionalPart] = binary.split('.');

  // Gray code conversion for the integer part
  let gray = integerPart[0]; // The first bit remains the same
  for (let i = 1; i < integerPart.length; i++) {
    // XOR the current bit with the previous one
    gray += (parseInt(integerPart[i - 1], 2) ^ parseInt(integerPart[i], 2)).toString();
  }

  // Handle fractional part (if exists)
  if (fractionalPart) {
    gray += '.'; // Add the decimal point for the fractional part
    for (let i = 1; i < fractionalPart.length; i++) {
      // XOR the current bit with the previous one for the fractional part
      gray += (parseInt(fractionalPart[i - 1], 2) ^ parseInt(fractionalPart[i], 2)).toString();
    }
  }

  // If the number is negative, add the negative sign to the result
  return isNegative ? '-' + gray : gray;
}


// Binary → BCD (Binary-Coded Decimal)
function convertBinaryToBCD(binary) {
  // Handle negative numbers (convert absolute value first)
  let isNegative = binary.startsWith('-');
  if (isNegative) {
    binary = binary.slice(1);
  }

  // Convert binary to decimal
  let decimal = convertBinaryToDecimal(binary);
  
  // Handle fractional part (if exists)
  let [integerPart, fractionalPart] = decimal.toString().split('.');

  // Convert integer part to BCD
  let bcdInteger = integerPart
    .split('')
    .map(digit => parseInt(digit).toString(2).padStart(4, '0'))
    .join(' ');

  // Convert fractional part to BCD (if exists)
  let bcdFraction = '';
  if (fractionalPart) {
    bcdFraction = fractionalPart
      .split('')
      .map(digit => parseInt(digit).toString(2).padStart(4, '0'))
      .join(' ');
  }

  // Return combined result
  let result = bcdInteger + (bcdFraction ? '.' + bcdFraction : '');
  
  // If the number was negative, apply the negative sign
  return isNegative ? '-' + result : result;
}
// Binary → Excess-3 Code
function convertBinaryToExcess3(binary) {
  // Handle negative numbers (convert absolute value first)
  let isNegative = binary.startsWith('-');
  if (isNegative) {
    binary = binary.slice(1);
  }

  // Convert binary to decimal
  let decimal = convertBinaryToDecimal(binary);

  // Convert to Excess-3 code for integer part
  let integerPart = Math.floor(decimal);
  let excess3Integer = (integerPart + 3)
    .toString()
    .split('')
    .map(digit => parseInt(digit).toString(2).padStart(4, '0'))
    .join(' ');

  // Handle fractional part (if exists)
  let fractionalPart = decimal - integerPart;
  let excess3Fraction = '';
  if (fractionalPart) {
    // Convert fractional part to Excess-3 code by adding 3 to each decimal digit
    fractionalPart = (fractionalPart * 10).toFixed(2); // Ensure precision
    excess3Fraction = fractionalPart
      .split('')
      .map(digit => (parseInt(digit) + 3).toString(2).padStart(4, '0'))
      .join(' ');
  }

  // Return combined result
  let result = excess3Integer + (excess3Fraction ? '.' + excess3Fraction : '');
  
  // If the number was negative, apply the negative sign
  return isNegative ? '-' + result : result;
}
// Binary → Floating Point
// Binary → Floating Point (Including Negative, Fractional)
function convertBinaryToFloatingPoint(binary) {
  // Handle negative numbers
  let isNegative = binary[0] === '1';
  let binaryStr = isNegative ? binary.slice(1) : binary;

  // Separate the integer and fractional parts
  let [integerPart, fractionalPart] = binaryStr.split('.');
  
  // Convert the integer part to decimal
  let integerDecimal = parseInt(integerPart, 2);
  
  // Convert the fractional part to decimal
  let fractionalDecimal = 0;
  if (fractionalPart) {
    for (let i = 0; i < fractionalPart.length; i++) {
      fractionalDecimal += parseInt(fractionalPart[i], 2) * Math.pow(2, -(i + 1));
    }
  }

  // Combine the integer and fractional parts
  let result = integerDecimal + fractionalDecimal;
  
  // If negative, apply the negative sign
  return isNegative ? -result : result;
}


// Binary → IEEE 754 (Single Precision)
function convertBinaryToIEEE754(binary) {
  let sign = binary[0] === '1' ? -1 : 1;
  let exponent = parseInt(binary.slice(1, 9), 2) - 127; // IEEE 754 exponent offset
  let fraction = parseInt(binary.slice(9), 2) / Math.pow(2, 23);

  // Combine the result with the sign, exponent, and fraction
  return sign * (1 + fraction) * Math.pow(2, exponent);
}


// Binary → Hamming Code (7,4)
function convertBinaryToHammingCode(binary) {
  if (binary.length !== 4) {
    return 'Hamming Code only works for 4-bit input.';
  }
  
  // Calculate parity bits for the 7-bit Hamming code
  let p1 = binary[0] ^ binary[1] ^ binary[3];
  let p2 = binary[0] ^ binary[2] ^ binary[3];
  let p3 = binary[1] ^ binary[2] ^ binary[3];
  
  return `${p1}${p2}${binary[0]}${p3}${binary[1]}${binary[2]}${binary[3]}`;
}


// Binary → Parity Bit (Even Parity)
function convertBinaryToParityBit(binary) {
  let parity = binary.split('').reduce((acc, bit) => acc ^ bit, 0); // XOR for parity
  return `${binary}${parity}`;
}


// Binary → Two's Complement
function convertBinaryToTwosComplement(binary) {
  let decimal = parseInt(binary, 2);
  
  // If the number is negative
  if (binary[0] === '1') {
    let complement = Math.pow(2, binary.length) - decimal;
    return complement.toString(2);
  }

  // Positive number, just return as is
  return binary;
}


// Binary → Roman Numerals
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


// Binary → ASCII
function convertBinaryToASCII(binary) {
  return binary
    .match(/.{8}/g)  // Match every 8 bits for a byte
    .map(byte => String.fromCharCode(parseInt(byte, 2)))  // Convert to ASCII character
    .join('');
}


// Binary → Unicode UTF-8
function convertBinaryToUTF8(binary) {
  return binary
    .match(/.{8}/g)
    .map(byte => String.fromCharCode(parseInt(byte, 2)))
    .join('');
}


// Binary → Unicode UTF-16
function convertBinaryToUTF16(binary) {
  return binary
    .match(/.{16}/g)
    .map(byte => String.fromCharCode(parseInt(byte, 2)))
    .join('');
}


// Binary → Unicode UTF-32
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

// Decimal → Binary
function convertDecimalToBinary(decimal) {
  return (decimal >>> 0).toString(2);
}

function convertDecimalToHex(decimal) {
  // Handle negative numbers
  if (decimal < 0) return '-' + convertDecimalToHex(-decimal);

  // Integer part in hexadecimal
  let integerPart = Math.floor(decimal).toString(16).toUpperCase();

  // Fractional part in hexadecimal
  let fractionalPart = decimal - Math.floor(decimal);
  let hexFraction = '';

  while (fractionalPart > 0 && hexFraction.length < 8) {
    fractionalPart *= 16;
    let digit = Math.floor(fractionalPart);
    hexFraction += digit.toString(16).toUpperCase();
    fractionalPart -= digit;
  }

  // Return combined result
  return hexFraction ? integerPart + '.' + hexFraction : integerPart;
}

function convertDecimalToOctal(decimal) {
  // Handle negative numbers
  if (decimal < 0) return '-' + convertDecimalToOctal(-decimal);

  // Integer part in octal
  let integerPart = Math.floor(decimal).toString(8);

  // Fractional part in octal
  let fractionalPart = decimal - Math.floor(decimal);
  let octalFraction = '';

  while (fractionalPart > 0 && octalFraction.length < 8) {  // Limiting precision to 8 digits
    fractionalPart *= 8;
    let digit = Math.floor(fractionalPart);
    octalFraction += digit.toString(8);
    fractionalPart -= digit;
  }

  // Return combined result (integer + fractional part)
  return octalFraction ? integerPart + '.' + octalFraction : integerPart;
}

// Decimal → Gray Code
function convertDecimalToGray(decimal) {
  return convertBinaryToGray(convertDecimalToBinary(decimal));
}

// Decimal → BCD (Binary-Coded Decimal)
function convertDecimalToBCD(decimal) {
  return decimal
    .toString()
    .split('')
    .map(digit => parseInt(digit).toString(2).padStart(4, '0'))
    .join(' ');
}

// Decimal → Excess-3 Code
function convertDecimalToExcess3(decimal) {
  return (decimal + 3).toString(2);
}

// Decimal → Floating Point
function convertDecimalToFloatingPoint(decimal) {
  return parseFloat(decimal);
}

// Decimal → IEEE 754 (Single Precision)
function convertDecimalToIEEE754(decimal) {
  let buffer = new ArrayBuffer(4);
  let view = new DataView(buffer);
  view.setFloat32(0, decimal);
  let ieee754 = [...new Uint8Array(buffer)]
    .map(b => b.toString(2).padStart(8, '0'))
    .join('');
  return ieee754;
}

// Decimal → Signed/Unsigned Binary
function convertDecimalToSignedUnsigned(decimal) {
  let unsigned = (decimal >>> 0).toString(2);
  let signed =
    decimal >= 0
      ? unsigned
      : (Math.pow(2, unsigned.length) + decimal).toString(2);
  return { signed, unsigned };
}

// Decimal → Hexadecimal Floating Point
function convertDecimalToHexFloatingPoint(decimal) {
  return decimal.toString(16).toUpperCase();
}

// Decimal → Roman Numerals
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

// Decimal → Logarithmic Base (Base-n Logarithm)
function convertDecimalToLogBase(decimal, base) {
  return Math.log(decimal) / Math.log(base);
}

// Decimal → Base-64 Encoding
function convertDecimalToBase64(decimal) {
  return btoa(decimal.toString());
}

// Decimal → ASCII
function convertDecimalToASCII(decimal) {
  return String.fromCharCode(decimal);
}

// Decimal → Unicode (UTF-8)
function convertDecimalToUTF8(decimal) {
  return new TextEncoder().encode(String.fromCharCode(decimal));
}

// Decimal → Unicode (UTF-16)
function convertDecimalToUTF16(decimal) {
  return String.fromCharCode(decimal).charCodeAt(0).toString(16).padStart(4, '0');
}

// Decimal → Unicode (UTF-32)
function convertDecimalToUTF32(decimal) {
  return decimal.toString(16).padStart(8, '0');
}

// 3. Hexadecimal Conversions

// Convert Hexadecimal to Binary
function convertHexToBinary(hex) {
  return parseInt(hex, 16).toString(2);
}

// Convert Hexadecimal to Decimal
function convertHexToDecimal(hex) {
  return parseInt(hex, 16);
}

// Convert Hexadecimal to Octal
function convertHexToOctal(hex) {
  return parseInt(hex, 16).toString(8);
}

// Convert Hexadecimal to Gray Code
function convertHexToGray(hex) {
  return convertBinaryToGray(convertHexToBinary(hex));
}

// Convert Hexadecimal to Floating Point
function convertHexToFloatingPoint(hex) {
  return parseFloat(parseInt(hex, 16));
}

// Convert Hexadecimal to IEEE 754 (Scientific Notation)
function convertHexToIEEE754(hex) {
  return convertHexToFloatingPoint(hex).toExponential();
}

// Convert Hexadecimal to Hexadecimal Floating Point (Same as Hex)
function convertHexToHexFloatingPoint(hex) {
  return hex.toUpperCase();
}

// Convert Hexadecimal to BCD (Binary-Coded Decimal)
function convertHexToBCD(hex) {
  let decimal = convertHexToDecimal(hex);
  return decimal
    .toString()
    .split("")
    .map(digit => parseInt(digit).toString(2).padStart(4, "0"))
    .join(" ");
}

// Convert Hexadecimal to Excess-3 Code
function convertHexToExcess3(hex) {
  let decimal = convertHexToDecimal(hex) + 3;
  return decimal.toString(2);
}

// Convert Hexadecimal to Signed/Unsigned Binary
function convertHexToSignedUnsigned(hex) {
  let binary = convertHexToBinary(hex);
  return {
    signed:
      parseInt(binary, 2) - (binary[0] === "1" ? Math.pow(2, binary.length) : 0),
    unsigned: parseInt(binary, 2)
  };
}

// Convert Hexadecimal to ASCII / Unicode (UTF-8, UTF-16, UTF-32)
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

// Convert Hexadecimal to Logarithmic Base (Base 2, 10, e)
function convertHexToLogBase(hex, base) {
  let decimal = convertHexToDecimal(hex);
  return Math.log(decimal) / Math.log(base);
}

// Convert Hexadecimal to Base-64 Encoding
function convertHexToBase64(hex) {
  let binaryStr = convertHexToBinary(hex);
  let decimal = parseInt(binaryStr, 2);
  return btoa(String.fromCharCode(decimal));
}

// Convert Hexadecimal to Roman Numerals
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
// Octal → Binary
function convertOctalToBinary(octal) {
  return parseInt(octal, 8).toString(2);
}

//  Octal → Decimal
function convertOctalToDecimal(octal) {
  return parseInt(octal, 8);
}

// Octal → Hexadecimal
function convertOctalToHex(octal) {
  return parseInt(octal, 8).toString(16).toUpperCase();
}

// Octal → Roman Numerals
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

// Octal → Gray Code
function convertOctalToGray(octal) {
  return convertBinaryToGray(convertOctalToBinary(octal));
}

//  Octal → Floating Point
function convertOctalToFloatingPoint(octal) {
  return parseFloat(parseInt(octal, 8));
}

//  Octal → IEEE 754 (Scientific Notation)
function convertOctalToIEEE754(octal) {
  let floatValue = convertOctalToFloatingPoint(octal);
  return floatValue.toExponential();
}

// Octal → Hexadecimal Floating Point
function convertOctalToHexFloatingPoint(octal) {
  return parseInt(octal, 8).toString(16).toUpperCase();
}

//  Octal → BCD (Binary-Coded Decimal)
function convertOctalToBCD(octal) {
  let decimal = convertOctalToDecimal(octal);
  return decimal.toString().split('').map(digit => parseInt(digit).toString(2).padStart(4, '0')).join(' ');
}

//  Octal → Excess-3 Code
function convertOctalToExcess3(octal) {
  let decimal = convertOctalToDecimal(octal) + 3;
  return decimal.toString(2);
}

//  Octal → Signed/Unsigned Binary
function convertOctalToSignedUnsigned(octal) {
  let decimal = convertOctalToDecimal(octal);
  return {
    signed: decimal >= 0 ? decimal : (Math.pow(2, 8) + decimal), // Adjust bit-length as needed
    unsigned: decimal
  };
}

//  Octal → ASCII / Unicode (UTF-8, UTF-16, UTF-32)
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

//  Octal → Logarithmic Base (Base 2, 10, e)
function convertOctalToLogBase2(octal) {
  return Math.log2(convertOctalToDecimal(octal));
}

function convertOctalToLogBase10(octal) {
  return Math.log10(convertOctalToDecimal(octal));
}

function convertOctalToLogBaseE(octal) {
  return Math.log(convertOctalToDecimal(octal));
}

//  Octal → Base-64 Encoding
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
  let binary = gray[0]; // First bit remains the same
  for (let i = 1; i < gray.length; i++) {
      binary += (binary[i - 1] ^ gray[i]); // XOR operation
  }
  return binary;
}

// Function to convert Gray Code to Decimal
function convertGrayToDecimal(gray) {
  let binary = convertGrayToBinary(gray);
  return parseInt(binary, 2); // Convert binary to decimal
}

// Function to convert Gray Code to Hexadecimal
function convertGrayToHex(gray) {
  let decimal = convertGrayToDecimal(gray);
  return decimal.toString(16).toUpperCase(); // Convert decimal to hexadecimal
}

// Function to convert Gray Code to Octal
function convertGrayToOctal(gray) {
  let decimal = convertGrayToDecimal(gray);
  return decimal.toString(8); // Convert decimal to octal
}

// 7. BCD Conversions 
function convertBCDToDecimal(bcd) {
  let decimal = bcd.split(' ').map(bin => parseInt(bin, 2)).join('');
  return parseInt(decimal, 10);
}

// Function to convert BCD to Binary
function convertBCDToBinary(bcd) {
  let decimal = convertBCDToDecimal(bcd);
  return decimal.toString(2);
}

// Function to convert BCD to Hexadecimal
function convertBCDToHex(bcd) {
  let decimal = convertBCDToDecimal(bcd);
  return decimal.toString(16).toUpperCase();
}

// Function to convert BCD to Octal
function convertBCDToOctal(bcd) {
  let decimal = convertBCDToDecimal(bcd);
  return decimal.toString(8);
}

// 8. Excess-3 Code Conversions
function convertExcess3ToDecimal(excess3) {
  let decimal = excess3.split(' ').map(bin => parseInt(bin, 2) - 3).join('');
  return parseInt(decimal, 10);
}

// Function to convert Excess-3 to Binary
function convertExcess3ToBinary(excess3) {
  let decimal = convertExcess3ToDecimal(excess3);
  return decimal.toString(2);
}

// Function to convert Excess-3 to Hexadecimal
function convertExcess3ToHex(excess3) {
  let decimal = convertExcess3ToDecimal(excess3);
  return decimal.toString(16).toUpperCase();
}

// Function to convert Excess-3 to Octal
function convertExcess3ToOctal(excess3) {
  let decimal = convertExcess3ToDecimal(excess3);
  return decimal.toString(8);
}

// 9. Floating point conversions

function convertFloatingPointToBinary(floatNum) {
  let intPart = Math.floor(floatNum).toString(2);
  let fracPart = floatNum - Math.floor(floatNum);
  let binaryFrac = '';

  while (fracPart > 0 && binaryFrac.length < 10) {  // Limit fraction to 10 places
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

// Function to convert Floating Point to Decimal (No Conversion Needed)
function convertFloatingPointToDecimal(floatNum) {
  return parseFloat(floatNum);
}

// Function to convert Floating Point to Hexadecimal
function convertFloatingPointToHex(floatNum) {
  return floatNum.toString(16).toUpperCase();
}

// Function to convert Floating Point to Octal
function convertFloatingPointToOctal(floatNum) {
  return floatNum.toString(8);
}

// Function to convert Floating Point to IEEE 754 Representation
function convertFloatingPointToIEEE754(floatNum) {
  let buffer = new ArrayBuffer(4);
  let view = new DataView(buffer);
  view.setFloat32(0, floatNum, false);  // Store in IEEE 754 format
  return [...new Uint8Array(buffer)].map(b => b.toString(2).padStart(8, '0')).join(' ');
}

// Function to convert Floating Point to Hexadecimal Floating Point
function convertFloatingPointToHexFloatingPoint(floatNum) {
  return floatNum.toString(16).toUpperCase();
}

// Function to convert Floating Point to ASCII (UTF-8)
function convertFloatingPointToASCII(floatNum) {
  return String.fromCharCode(floatNum);
}

// Function to convert Floating Point to Unicode UTF-8, UTF-16, UTF-32
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

// Function to convert IEEE 754 (32-bit) to Decimal (Floating Point)
function convertIEEE754ToDecimal(ieee754Hex) {
  let buffer = new ArrayBuffer(4);
  let view = new DataView(buffer);

  let intValue = parseInt(ieee754Hex, 16);
  view.setUint32(0, intValue, false); // Set IEEE 754 hex as 32-bit value

  return view.getFloat32(0, false); // Retrieve as floating point number
}

// Function to convert IEEE 754 to Hexadecimal (No Conversion Needed)
function convertIEEE754ToHex(ieee754Hex) {
  return ieee754Hex.toUpperCase();
}

// Function to convert IEEE 754 to Floating Point (Same as Decimal)
function convertIEEE754ToFloatingPoint(ieee754Hex) {
  return convertIEEE754ToDecimal(ieee754Hex);
}

// Function to convert IEEE 754 to Octal
function convertIEEE754ToOctal(ieee754Hex) {
  return parseInt(ieee754Hex, 16).toString(8);
}

// 11. Hamming Code Conversions

function convertHammingToBinary(hammingCode) {
  let n = hammingCode.length;
  let errorPos = 0;
  
  // Find error position using parity bits
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

  // If error position found, correct it
  if (errorPos > 0) {
    let correctedCode = hammingCode.split('');
    correctedCode[errorPos - 1] = correctedCode[errorPos - 1] === '0' ? '1' : '0';
    hammingCode = correctedCode.join('');
  }

  // Extract data bits (remove parity bits)
  let binaryData = "";
  for (let i = 0; i < n; i++) {
    if ((i & (i + 1)) !== 0) binaryData += hammingCode[i];
  }
  
  return binaryData;
}

// Function to convert Hamming Code to Decimal
function convertHammingToDecimal(hammingCode) {
  let binary = convertHammingToBinary(hammingCode);
  return parseInt(binary, 2);
}

// 12. Parity Bit conversions 
function convertParityToBinary(parityBinary) {
  let dataBits = parityBinary.slice(0, -1); // Remove last bit (parity)
  let parityBit = parseInt(parityBinary[parityBinary.length - 1]);

  // Validate parity (assuming even parity)
  let calculatedParity = dataBits.split('').reduce((acc, bit) => acc ^ parseInt(bit), 0);

  if (calculatedParity !== parityBit) {
    console.log("⚠️ Warning: Parity error detected!");
  }

  return dataBits;
}

// Function to convert Parity Bit (Binary) to Decimal
function convertParityToDecimal(parityBinary) {
  let binary = convertParityToBinary(parityBinary);
  return parseInt(binary, 2);
}

// 13. ASCII Conversions
function convertASCIItoUTF8(text) {
  return new TextEncoder().encode(text);
}

// Convert ASCII to UTF-16 encoding
function convertASCIItoUTF16(text) {
  let utf16Array = [];
  for (let char of text) {
    utf16Array.push(char.charCodeAt(0).toString(16).padStart(4, '0'));
  }
  return utf16Array.join(' ');
}

// Convert ASCII to UTF-32 encoding
function convertASCIItoUTF32(text) {
  let utf32Array = [];
  for (let char of text) {
    utf32Array.push(char.charCodeAt(0).toString(16).padStart(8, '0'));
  }
  return utf32Array.join(' ');
}

// Convert ASCII to Binary
function convertASCIItoBinary(text) {
  return text.split('').map(char => char.charCodeAt(0).toString(2).padStart(8, '0')).join(' ');
}

// Convert ASCII to Hexadecimal
function convertASCIItoHex(text) {
  return text.split('').map(char => char.charCodeAt(0).toString(16).toUpperCase().padStart(2, '0')).join(' ');
}

// Convert ASCII to Decimal (Character Codes)
function convertASCIItoDecimal(text) {
  return text.split('').map(char => char.charCodeAt(0)).join(' ');
}

// Convert ASCII to Base-64 Encoding
function convertASCIItoBase64(text) {
  return btoa(text);
}

// 14. 2's complement conversions
function convertTwosComplementToSignMagnitude(binary) {
  const isNegative = binary[0] === '1'; // Check if the number is negative
  let signMagnitude = '';
  
  if (isNegative) {
    // Invert the bits and add 1 to get the magnitude
    let invertedBinary = '';
    for (let i = 0; i < binary.length; i++) {
      invertedBinary += binary[i] === '1' ? '0' : '1';
    }
    let magnitude = (parseInt(invertedBinary, 2) + 1).toString(2).padStart(binary.length - 1, '0');
    signMagnitude = '1' + magnitude;
  } else {
    signMagnitude = '0' + binary.slice(1); // Keep as is for positive values
  }

  return signMagnitude;
}

// 15. Base 64 to base 32 
function convertBase64ToBase32(base64) {
  // Decode the Base64 string to bytes
  let binaryString = atob(base64);
  let bytes = [];
  for (let i = 0; i < binaryString.length; i++) {
    bytes.push(binaryString.charCodeAt(i));
  }

  // Base32 alphabet
  const base32Chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ234567';

  // Convert the bytes to Base32
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

  // Handle remaining bits
  if (bitsInBuffer > 0) {
    base32 += base32Chars[(buffer << (5 - bitsInBuffer)) & 31];
  }

  // Add padding if necessary
  while (base32.length % 8 !== 0) {
    base32 += '=';
  }

  return base32;
}

// EXPORT FUNCTIONS
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
