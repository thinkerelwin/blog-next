import MarkdownIt from "markdown-it";
import Prism from "prismjs";

const md = new MarkdownIt({
  highlight: (code: string, lang: string) => {
    if (Prism.languages[lang]) {
      try {
        const hightlightedCode = Prism.highlight(
          code,
          Prism.languages[lang],
          lang
        );

        const className = `language-${lang}`;
        return `<pre class="${className}"><code class="${className}">${hightlightedCode}</code></pre>`;
      } catch (error) {
        console.error("error when highlighting");
      }
    }
    console.error("lang is not recognized on syntax highlighting:", lang);
    return ""; // use external default escaping
  }
});

export default md;
