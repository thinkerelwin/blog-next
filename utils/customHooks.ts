import { useState, useEffect, useRef } from "react";

export function useMediaQuery(query: string) {
  const [doesMatch, onSetDoesMatch] = useState(false);

  useEffect(() => {
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
