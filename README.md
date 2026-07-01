# 🌐 Language Translator

A simple, elegant web-based language translator built as part of an internship task. This application allows users to translate text between multiple languages using a clean, modern interface.

## 📁 Project Structure
translator/
│
├── index.html # Main HTML structure
├── style.css # All styling and responsive design
├── script.js # Translation logic and interactivity
└── README.md # Project documentation 

## ✨ Features

- **Multi-language support**: Translate between 12+ languages including English, Spanish, French, German, Japanese, and more
- **Swap languages**: Quickly swap source and target languages with one click
- **Character counter**: Live character count with 500-character limit
- **Copy translation**: One-click copy to clipboard
- **Clear all**: Reset both text areas instantly
- **Keyboard shortcut**: Press `Ctrl+Enter` to translate
- **Responsive design**: Works on desktop, tablet, and mobile devices
- **Free API**: Uses MyMemory translation API (no API key required)

## 🚀 How to Use

1. **Select languages**: Choose your source language (From) and target language (To)
2. **Enter text**: Type or paste your text in the input box
3. **Translate**: Click the "Translate" button or press `Ctrl+Enter`
4. **Copy result**: Click the "Copy" button to copy the translation
5. **Swap languages**: Click the swap button (↔) to reverse languages
6. **Clear**: Use the "Clear" button to reset everything

## 🛠️ Technologies Used

- **HTML5**: Semantic markup
- **CSS3**: Modern styling with flexbox, backdrop filters, and responsive design
- **JavaScript (ES6+)**: Async/await, DOM manipulation, and API integration
- **Font Awesome**: Icons for better UX
- **MyMemory API**: Free translation service

## 📦 Installation

1. Clone or download this repository
2. Navigate to the `translator` folder
3. Open `index.html` in your web browser
4. No server or installation required!

```bash
# Clone the repository
git clone https://github.com/yourusername/translator.git

# Navigate to the project folder
cd translator

# Open index.html in your browser
open index.html   # macOS
start index.html  # Windows
xdg-open index.html # Linux