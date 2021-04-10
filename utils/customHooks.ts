import { useState, useEffect, useLayoutEffect, useRef } from "react";
import marked from "marked";

const createDOMPurify = require("dompurify");

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

export function useSanitizer(content: string) {
  const [santitizedContent, setSantitizedContent] = useState("");

  useEffect(() => {
    const DOMPurify = createDOMPurify(window);
    const santitizedContent = DOMPurify.sanitize(marked(content), {
      USE_PROFILES: { html: true }
    });
    setSantitizedContent(santitizedContent);
  }, [content]);

  return santitizedContent;
}
