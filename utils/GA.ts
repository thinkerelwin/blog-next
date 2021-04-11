export const GA_TRACKING_ID = "G-KPF2FTD6LW";
export const GTM_TRACKING_ID = "GTM-TQXX2R9";

export const pageview = (url: URL) => {
  window.gtag("config", GA_TRACKING_ID, {
    page_path: url
  });
};
