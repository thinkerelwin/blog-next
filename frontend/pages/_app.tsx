import type { AppProps /*, AppContext */ } from "next/app";

import "../styles/normalize.css";
import "../styles/variables.css";
import "../styles/main.scss";

export function reportWebVitals(metric: object) {
  console.log(metric);
}

function MyApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default MyApp;
