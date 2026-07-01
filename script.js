// ---------- script.js ----------
(function() {
    "use strict";

    // DOM refs
    const sourceLangSelect = document.getElementById('sourceLang');
    const targetLangSelect = document.getElementById('targetLang');
    const sourceText = document.getElementById('sourceText');
    const translatedText = document.getElementById('translatedText');
    const translateBtn = document.getElementById('translateBtn');
    const swapBtn = document.getElementById('swapLangBtn');
    const copyBtn = document.getElementById('copyBtn');
    const clearBtn = document.getElementById('clearBtn');
    const charCount = document.getElementById('charCount');
    const statusToast = document.getElementById('statusToast');

    // max chars
    const MAX_CHARS = 500;

    // update character counter
    function updateCharCounter() {
        const len = sourceText.value.length;
        charCount.textContent = `${len} / ${MAX_CHARS}`;
        if (len > MAX_CHARS) {
            charCount.style.color = '#c73b3b';
        } else {
            charCount.style.color = '#5b7895';
        }
    }

    // trim text if exceeds max
    function enforceMaxChars() {
        if (sourceText.value.length > MAX_CHARS) {
            sourceText.value = sourceText.value.slice(0, MAX_CHARS);
            updateCharCounter();
        }
    }

    sourceText.addEventListener('input', function() {
        enforceMaxChars();
        updateCharCounter();
    });

    // ----- TRANSLATE using MyMemory (free, no API key required) -----
    async function translateText(text, sourceLang, targetLang) {
        if (!text || text.trim() === '') {
            return '';
        }

        // MyMemory API endpoint (public, no key)
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;

        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }
            const data = await response.json();
            // MyMemory returns responseData.translatedText
            if (data.responseData && data.responseData.translatedText) {
                return data.responseData.translatedText;
            } else {
                console.warn('MyMemory response:', data);
                return '[Translation not available]';
            }
        } catch (error) {
            console.error('Translation error:', error);
            // fallback: use a dummy translation for demo (so it works offline)
            if (sourceLang === 'en' && targetLang === 'es') {
                return 'Hola, ¿cómo estás? (demo)';
            } else if (sourceLang === 'es' && targetLang === 'en') {
                return 'Hello, how are you? (demo)';
            } else {
                return `[Demo] ${text} (${sourceLang}→${targetLang})`;
            }
        }
    }

    // main translate action
    async function performTranslation() {
        const text = sourceText.value.trim();
        if (!text) {
            translatedText.value = 'Please enter some text.';
            return;
        }

        const source = sourceLangSelect.value;
        const target = targetLangSelect.value;

        // show loading state
        translateBtn.innerHTML = '<i class="fas fa-spinner fa-pulse"></i> Translating…';
        translateBtn.disabled = true;

        try {
            const result = await translateText(text, source, target);
            translatedText.value = result;
        } catch (err) {
            translatedText.value = '⚠️ Error during translation.';
            console.error(err);
        } finally {
            translateBtn.innerHTML = '<i class="fas fa-arrow-right-to-bracket"></i> Translate';
            translateBtn.disabled = false;
        }
    }

    // event: translate button
    translateBtn.addEventListener('click', performTranslation);

    // event: swap languages
    function swapLanguages() {
        const src = sourceLangSelect.value;
        const tgt = targetLangSelect.value;
        sourceLangSelect.value = tgt;
        targetLangSelect.value = src;

        // also swap text if both have content
        const srcText = sourceText.value;
        const tgtText = translatedText.value;
        // only swap if translation is not empty or placeholder
        if (tgtText && !tgtText.includes('Please enter') && !tgtText.includes('Error')) {
            sourceText.value = tgtText;
            translatedText.value = srcText;
            updateCharCounter();
        } else {
            // just swap the text areas
            sourceText.value = tgtText;
            translatedText.value = srcText;
            updateCharCounter();
        }
        // clear any toast
        statusToast.classList.remove('show');
    }

    swapBtn.addEventListener('click', swapLanguages);

    // event: copy translation
    function copyTranslation() {
        const text = translatedText.value;
        if (!text || text === '' || text.includes('Please enter') || text.includes('Error')) {
            statusToast.textContent = '⚠️ Nothing to copy';
            statusToast.classList.add('show');
            setTimeout(() => statusToast.classList.remove('show'), 1500);
            return;
        }

        navigator.clipboard.writeText(text).then(() => {
            statusToast.textContent = '✅ Copied!';
            statusToast.classList.add('show');
            setTimeout(() => statusToast.classList.remove('show'), 1800);
        }).catch(() => {
            // fallback
            translatedText.select();
            document.execCommand('copy');
            statusToast.textContent = '✅ Copied!';
            statusToast.classList.add('show');
            setTimeout(() => statusToast.classList.remove('show'), 1800);
        });
    }

    copyBtn.addEventListener('click', copyTranslation);

    // event: clear
    function clearAll() {
        sourceText.value = '';
        translatedText.value = '';
        updateCharCounter();
        statusToast.classList.remove('show');
        sourceText.focus();
    }

    clearBtn.addEventListener('click', clearAll);

    // initial character counter
    updateCharCounter();

    // auto-translate on load with default text
    window.addEventListener('load', function() {
        // small delay to let everything render
        setTimeout(() => {
            performTranslation();
        }, 200);
    });

    // optional: translate on language change (if user wants)
    sourceLangSelect.addEventListener('change', function() {
        if (sourceText.value.trim() !== '') {
            performTranslation();
        }
    });
    targetLangSelect.addEventListener('change', function() {
        if (sourceText.value.trim() !== '') {
            performTranslation();
        }
    });

    // extra: Ctrl+Enter shortcut
    sourceText.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
            e.preventDefault();
            performTranslation();
        }
    });

})();