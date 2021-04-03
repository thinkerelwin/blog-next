import type { AppProps } from "next/app";
import { Provider } from "react-redux";

import store from "@/store/index";

import "@/styles/normalize.css";
import "@/styles/variables.css";
import "@/styles/main.scss";

export function reportWebVitals(metric: object) {
  // console.log(metric);
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default MyApp;
