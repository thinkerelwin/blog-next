import { useState, useEffect, useLayoutEffect, useRef } from "react";
import marked from "marked";
import prism from "prismjs";
import createDOMPurify from "dompurify";

export function useMediaQuery(query: string) {
  const [doesMatch, onSetDoesMatch] = useState(false);

  useLayoutEffect(() => {
    const onUpdateMatch = ({ matches }: { matches: boolean }) => {
      onSetDoesMatch(matches);
    };

    const matcher = window.matchMedia(query);

    matcher.addEventListener("change", onUpdateMatch);

    onUpdateMatch(matcher);

    return () => {
      matcher.removeEventListener("change", onUpdateMatch);
    };
  }, [query, onSetDoesMatch]);

  return doesMatch;
}

export function usePrevious(value: number, initialValue: number = 0) {
  const ref = useRef(initialValue);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

const markedRenderer = new marked.Renderer();
markedRenderer.code = (code, lang) => {
  if (!lang) {
    return `<pre><code>${code}</code></pre>`;
  }
  const hightlightedCode = markedRenderer.options.highlight
    ? markedRenderer.options.highlight(code, lang)
    : null;

  const className = `language-${lang}`;
  return `<pre class="${className}"><code class="${className}">${hightlightedCode}</code></pre>`;
};

marked.setOptions({
  renderer: markedRenderer,
  highlight: (code, lang) => {
    if (prism.languages[lang]) {
      return prism.highlight(code, prism.languages[lang], lang);
    } else {
      return code;
    }
  }
});

export function useSanitizer(content: string) {
  const [santitizedContent, setSantitizedContent] = useState("");

  useEffect(() => {
    const DOMPurify = createDOMPurify(window);
    const santitizedContent = DOMPurify.sanitize(marked(content));
    setSantitizedContent(santitizedContent);
  }, [content]);

  return santitizedContent;
}
