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
    page_path: window.location.pathname,
  });
};

// Log contact button click
export const logContactButtonClick = () => {
  ReactGA.event("button_click", {
    button_name: "Contact Button",
    page_path: window.location.pathname,
  });
};

// Log services button click
export const logServicesButtonClick = (serviceName) => {
  ReactGA.event("button_click", {
    button_name: `Services - ${serviceName}`,
    page_path: window.location.pathname,
  });
};
