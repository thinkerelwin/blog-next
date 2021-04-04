import React from "react";

import iconPaths from "./selection.json"; // the file exported from IcoMoon

function getPath(name) {
  const icon = iconPaths.icons.find(
    ({ properties }) => properties.name === name
  );

  if (icon) {
    return icon.icon.paths.join(" ");
  } else {
    console.error(`icon ${name} does not exist.`);
    return "";
  }
}

export default function IcoMoon({ iconName, cn = "" }) {
  return (
    <svg className={cn} width="22" height="22" viewBox="0 0 1024 1024">
      <path d={getPath(iconName)}></path>
    </svg>
  );
}
