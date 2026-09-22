(function () {
    "use strict";

    const root = document.documentElement;
    const storageKey = "dam-study-theme";
    const preferredTheme = function () {
        try {
            const saved = localStorage.getItem(storageKey);
            if (saved === "light" || saved === "dark") return saved;
        } catch (_) {
            // The document also works when local storage is unavailable.
        }
        return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    };

    const setTheme = function (theme) {
        root.dataset.studyTheme = theme;
        const button = document.querySelector(".study-theme-toggle");
        if (!button) return;
        const dark = theme === "dark";
        button.innerHTML = dark ? "<span aria-hidden=\"true\">☀</span> Tema claro" : "<span aria-hidden=\"true\">☾</span> Tema oscuro";
        button.setAttribute("aria-label", dark ? "Cambiar al tema claro" : "Cambiar al tema oscuro");
        button.setAttribute("aria-pressed", String(dark));
    };

    setTheme(preferredTheme());

    const cleanCode = function (value) {
        return value
            .replace(/\u00a0/g, " ")
            .replace(/[ \t]+$/gm, "")
            .replace(/^\s*\n|\n\s*$/g, "")
            .replace(/\n{4,}/g, "\n\n");
    };
    const textFrom = function (element) {
        return cleanCode(element.innerText || element.textContent || "");
    };

    const mergeAdjacentCodeBlocks = function () {
        document.querySelectorAll(".book_chapter div, .book_chapter").forEach(function (parent) {
            let current = parent.firstElementChild;
            while (current) {
                if (current.tagName !== "PRE" || current.querySelector("img")) {
                    current = current.nextElementSibling;
                    continue;
                }
                const blocks = [current];
                let next = current.nextElementSibling;
                while (next && next.tagName === "PRE" && !next.querySelector("img")) {
                    blocks.push(next);
                    next = next.nextElementSibling;
                }
                if (blocks.length > 1) {
                    current.textContent = blocks.map(textFrom).filter(Boolean).join("\n");
                    blocks.slice(1).forEach(function (block) { block.remove(); });
                }
                current = next;
            }
        });
    };

    const promoteCodeParagraphs = function () {
        document.querySelectorAll(".book_chapter p").forEach(function (paragraph) {
            const text = textFrom(paragraph);
            const startsAsCode = /^(?:package\s+[\w.]+;|import\s+(?:java|javax|org)\.|public\s+(?:class|interface)|class\s+\w+\s+extends)/.test(text);
            if (!startsAsCode || !/[;{}]/.test(text)) return;
            const pre = document.createElement("pre");
            pre.textContent = text;
            paragraph.replaceWith(pre);
        });
    };

    const escapeHtml = function (value) {
        return value.replace(/[&<>]/g, function (character) {
            return { "&": "&amp;", "<": "&lt;", ">": "&gt;" }[character];
        });
    };
    const javaPattern = /(\/\*[\s\S]*?\*\/|\/\/[^\n]*|"(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|@[A-Za-z_$][\w$]*|\b(?:abstract|assert|boolean|break|byte|case|catch|char|class|const|continue|default|do|double|else|enum|extends|final|finally|float|for|if|implements|import|instanceof|int|interface|long|native|new|package|private|protected|public|record|return|short|static|strictfp|super|switch|synchronized|this|throw|throws|transient|try|var|void|volatile|while|true|false|null)\b|\b\d+(?:\.\d+)?\b)/g;
    const xmlPattern = /(<!--[\s\S]*?-->|<\/?[A-Za-z_:][^>]*>|&(?:#\d+|#x[\da-fA-F]+|\w+);)/g;

    const highlight = function (source, language) {
        const pattern = language === "xml" ? xmlPattern : javaPattern;
        let cursor = 0;
        let output = "";
        source.replace(pattern, function (token, _capture, offset) {
            output += escapeHtml(source.slice(cursor, offset));
            let type = "keyword";
            if (token.startsWith("//") || token.startsWith("/*") || token.startsWith("<!--")) type = "comment";
            else if (token.startsWith("\"") || token.startsWith("'")) type = "string";
            else if (token.startsWith("@")) type = "annotation";
            else if (/^\d/.test(token)) type = "number";
            else if (token.startsWith("<")) type = "tag";
            else if (token.startsWith("&")) type = "entity";
            output += "<span class=\"token-" + type + "\">" + escapeHtml(token) + "</span>";
            cursor = offset + token.length;
            return token;
        });
        return output + escapeHtml(source.slice(cursor));
    };

    const decorateCode = function () {
        document.querySelectorAll(".book_chapter pre").forEach(function (pre) {
            if (pre.querySelector("img")) return;
            const source = textFrom(pre);
            if (!source) {
                pre.remove();
                return;
            }
            const language = /^\s*<\??[A-Za-z_:]/.test(source) ? "xml" : "java";
            const code = document.createElement("code");
            code.className = "language-" + language;
            code.innerHTML = highlight(source, language);
            pre.replaceChildren(code);
            pre.classList.add("study-code");
            pre.dataset.language = language;
        });
    };

    const initialize = function () {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "study-theme-toggle hidden-print";
        button.addEventListener("click", function () {
            const next = root.dataset.studyTheme === "dark" ? "light" : "dark";
            try { localStorage.setItem(storageKey, next); } catch (_) {}
            setTheme(next);
        });
        document.body.appendChild(button);
        setTheme(root.dataset.studyTheme || preferredTheme());
        promoteCodeParagraphs();
        mergeAdjacentCodeBlocks();
        decorateCode();
    };

    if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", initialize);
    else initialize();
}());
