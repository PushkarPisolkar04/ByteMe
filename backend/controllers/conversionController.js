const conversionService = require("../services/conversionService");

exports.convertNumber = (req, res) => {
  try {
    const { inputValue, conversionType, precision } = req.body;

    if (!inputValue || !conversionType) {
      return res.status(400).json({ error: "Missing required fields: inputValue and conversionType" });
    }

    if (conversionType === "invalid") {
      return res.status(400).json({ error: "Invalid conversion type selected." });
    }

    let result;

    switch (conversionType) {
      case "decimalToRoman":
        result = conversionService.convertDecimalToRoman(inputValue);
        break;
      case "romanToDecimal":
        result = conversionService.convertRomanToDecimal(inputValue);
        break;
      case "romanToBinary":
        result = conversionService.convertRomanToBinary(inputValue);
        break;
      case "romanToHex":
        result = conversionService.convertRomanToHex(inputValue);
        break;
      case "romanToOctal":
        result = conversionService.convertRomanToOctal(inputValue);
        break;
      case "romanToASCII":
        result = conversionService.convertRomanToASCII(inputValue);
        break;
      case "romanToUnicode":
        result = conversionService.convertRomanToUnicode(inputValue);
        break;
      case "romanToFloatingPoint":
        result = conversionService.convertRomanToFloatingPoint(inputValue);
        break;
      case "romanToBaseN":
        result = conversionService.convertRomanToBaseN(inputValue);
        break;
      case "binaryToGray":
        result = conversionService.convertBinaryToGray(inputValue);
        break;
      case "grayToBinary":
        result = conversionService.convertGrayToBinary(inputValue);
        break;
      case "grayToDecimal":
        result = conversionService.convertGrayToDecimal(inputValue);
        break;
      case "decimalToBCD":
        result = conversionService.convertDecimalToBCD(inputValue);
        break;
      case "bcdToDecimal":
        result = conversionService.convertBCDToDecimal(inputValue);
        break;
      case "decimalToExcess3":
        result = conversionService.convertDecimalToExcess3(inputValue);
        break;
      case "excess3ToDecimal":
        result = conversionService.convertExcess3ToDecimal(inputValue);
        break;
      case "floatToIEEE754":
        if (!precision) return res.status(400).json({ error: "Precision (single/double) required" });
        result = conversionService.convertFloatToIEEE754(parseFloat(inputValue), precision);
        break;
      case "ieee754ToFloat":
        result = conversionService.convertIEEE754ToFloat(inputValue, precision);
        break;
      case "hammingCode":
        result = conversionService.convertBinaryToHammingCode(inputValue);
        break;
      case "parityBit":
        result = conversionService.convertBinaryToParityBit(inputValue);
        break;
      case "base64Encode":
        result = conversionService.convertBase64Encode(inputValue);
        break;
      case "base32Encode":
        result = conversionService.convertBase32Encode(inputValue);
        break;
      case "binaryToDecimal":
        result = conversionService.convertBinaryToDecimal(inputValue);
        break;
      case "binaryToHex":
        result = conversionService.convertBinaryToHex(inputValue);
        break;
      case "binaryToOctal":
        result = conversionService.convertBinaryToOctal(inputValue);
        break;
      case "binaryToBCD":
        result = conversionService.convertBinaryToBCD(inputValue);
        break;
      case "binaryToExcess3":
        result = conversionService.convertBinaryToExcess3(inputValue);
        break;
      case "binaryToFloatingPoint":
        result = conversionService.convertBinaryToFloatingPoint(inputValue);
        break;
      case "binaryToIEEE754":
        result = conversionService.convertBinaryToIEEE754(inputValue);
        break;
      case "binaryToHammingCode":
        result = conversionService.convertBinaryToHammingCode(inputValue);
        break;
      case "binaryToParityBit":
        result = conversionService.convertBinaryToParityBit(inputValue);
        break;
      case "binaryToTwosComplement":
        result = conversionService.convertBinaryToTwosComplement(inputValue);
        break;
      case "binaryToRoman":
        result = conversionService.convertBinaryToRoman(inputValue);
        break;
      case "binaryToASCII":
        result = conversionService.convertBinaryToASCII(inputValue);
        break;
      case "binaryToUTF8":
        result = conversionService.convertBinaryToUTF8(inputValue);
        break;
      case "binaryToUTF16":
        result = conversionService.convertBinaryToUTF16(inputValue);
        break;
      case "binaryToUTF32":
        result = conversionService.convertBinaryToUTF32(inputValue);
        break;
      case "decimalToBinary":
        result = conversionService.convertDecimalToBinary(inputValue);
        break;
      case "decimalToHex":
        result = conversionService.convertDecimalToHex(inputValue);
        break;
      case "decimalToOctal":
        result = conversionService.convertDecimalToOctal(inputValue);
        break;
      case "decimalToSignedUnsigned":
        result = conversionService.convertDecimalToSignedUnsigned(inputValue);
        break;
      case "decimalToHexFloatingPoint":
        result = conversionService.convertDecimalToHexFloatingPoint(inputValue);
        break;
      case "decimalToBase64":
        result = conversionService.convertDecimalToBase64(inputValue);
        break;
      case "decimalToASCII":
        result = conversionService.convertDecimalToASCII(inputValue);
        break;
      case "decimalToUTF8":
        result = conversionService.convertDecimalToUTF8(inputValue);
        break;
      case "decimalToUTF16":
        result = conversionService.convertDecimalToUTF16(inputValue);
        break;
      case "decimalToUTF32":
        result = conversionService.convertDecimalToUTF32(inputValue);
        break;
      case "hexToBinary":
        result = conversionService.convertHexToBinary(inputValue);
        break;
      case "hexToDecimal":
        result = conversionService.convertHexToDecimal(inputValue);
        break;
      case "hexToOctal":
        result = conversionService.convertHexToOctal(inputValue);
        break;
      case "hexToBCD":
        result = conversionService.convertHexToBCD(inputValue);
        break;
      case "hexToASCII":
        result = conversionService.convertHexToASCII(inputValue);
        break;
      case "hexToUTF8":
        result = conversionService.convertHexToUTF8(inputValue);
        break;
      case "hexToUTF16":
        result = conversionService.convertHexToUTF16(inputValue);
        break;
      case "hexToUTF32":
        result = conversionService.convertHexToUTF32(inputValue);
        break;
      case "hexToBase64":
        result = conversionService.convertHexToBase64(inputValue);
        break;
      case "octalToBinary":
        result = conversionService.convertOctalToBinary(inputValue);
        break;
      case "octalToDecimal":
        result = conversionService.convertOctalToDecimal(inputValue);
        break;
      case "octalToHex":
        result = conversionService.convertOctalToHex(inputValue);
        break;
      case "octalToBCD":
        result = conversionService.convertOctalToBCD(inputValue);
        break;
      case "octalToASCII":
        result = conversionService.convertOctalToASCII(inputValue);
        break;
      case "octalToUTF8":
        result = conversionService.convertOctalToUTF8(inputValue);
        break;
      case "octalToUTF16":
        result = conversionService.convertOctalToUTF16(inputValue);
        break;
      case "octalToUTF32":
        result = conversionService.convertOctalToUTF32(inputValue);
        break;
      default:
        return res.status(400).json({ error: "Invalid conversion type" });
    }

    return res.json({ inputValue, conversionType, result });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
