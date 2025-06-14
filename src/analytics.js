import ReactGA from "react-ga4";

export const initGA = () => {
  ReactGA.initialize(import.meta.env.VITE_ANALYTICS_MEASUREMENT_ID);
};

export const logPageView = () => {
  ReactGA.send({ hitType: "pageview", page: window.location.pathname });
};

export const logContactFormSubmission  = (buttonName) => {
  ReactGA.event("contact_form_submitted", {
    button_name: buttonName,
  });
};
