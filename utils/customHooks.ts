import { useState, useEffect } from "react";

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
