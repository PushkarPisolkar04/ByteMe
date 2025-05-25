# **ByteMe - The Ultimate Conversion Tool**  
![ByteMe Logo](screenshots/logo.png)

## **About ByteMe**  
ByteMe is a **powerful, multi-directional conversion tool** that supports **53 different conversion types**! Whether you need to convert **binary, decimal, hexadecimal, octal, IEEE 754, ASCII, Unicode, floating-point, BCD, Gray code**, or even **Roman numerals**, ByteMe has got you covered.  

With an interactive, real-time conversion, and a clean, user-friendly UI, ByteMe makes number system conversions **easier than ever**!  

## **Getting Started**

### Prerequisites
- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation
1. Clone the repository
```bash
git clone https://github.com/PushkarPisolkar04/ByteMe
cd byteme
```

2. Install dependencies
```bash
npm run install-all
```

3. Create environment files
```bash
# Frontend (.env)
VITE_API_URL=http://localhost:5000

# Backend (.env)
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:5173
```

4. Start the development server
```bash
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

### Production Build
```bash
npm run build
npm start
```

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Author
[Pushkar Pisolkar](https://github.com/PushkarPisolkar04)

---

## **Screenshots**  

**Screenshots to Include:**  
1. **Homepage** – Shows the main UI of ByteMe.  
2. **Number Conversion** – A working example of Binary → Decimal conversion.  
3. **Step-by-Step Explanation** – Screenshot of stepwise conversion process.  
4. **Comparison Table View** – A comparison of multiple number systems.  
5. **Interactive Diagram / Tooltip** – Example of visualized bitwise conversion.  
6. **Error Handling** – Screenshot of invalid input detection and user-friendly error message.  

📌 **How to Insert Screenshots in README?**  
```md
## 🖥️ Screenshots

### 1️⃣ **Homepage UI**
![Homepage](screenshots/homepage.png)

### 2️⃣ **Binary to Decimal Conversion**
![Binary to Decimal](screenshots/binary_to_decimal.png)

### 3️⃣ **Step-by-Step Explanation**
![Step Explanation](screenshots/step_explanation.png)

### 4️⃣ **Comparison Table View**
![Comparison Table](screenshots/comparison_table.png)

### 5️⃣ **Interactive Tooltip & Diagrams**
![Tooltip Example](screenshots/tooltip_example.png)

### 6️⃣ **Error Handling & Validation**
![Error Handling](screenshots/error_handling.png)


🛠️ Tech Stack
Frontend: React.js / Next.js
Backend: Node.js / Express
Database: N/A (no persistence needed)
Other Tools: Vite, Tailwind CSS

