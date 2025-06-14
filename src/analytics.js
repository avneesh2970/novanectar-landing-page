import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize(import.meta.env.VITE_ANALYTICS_MEASUREMENT_ID);
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};

export const logButtonClick = (buttonName) => {
  ReactGA.event({
    category: "User",
    action: "Click",
    label: buttonName,
  });
};
