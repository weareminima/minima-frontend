export const GA_TRACKING_ID = process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS;

// log the pageview with their URL
export const GAPage = (url: string): void => {
  window.gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

// log specific events happening.
export const GAEvent = ({ action, params }): void => {
  window.gtag('event', action, params);
};
