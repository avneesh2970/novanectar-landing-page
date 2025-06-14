/* eslint-disable no-unused-vars */


// Create a placeholder GSAP object that will be replaced with the real one when loaded
export const gsap = {
  to: (_target, _vars) => {
    return { kill: () => {} };
  },
  fromTo: (_target, _fromVars, _toVars) => {
    return { kill: () => {} };
  },
  set: (_target, _vars) => {
    // This is a placeholder
  },
  killTweensOf: (_target) => {
    // This is a placeholder
  },
  timeline: (_vars) => {
    return {
      to: (_target, _vars, _position) => {
        // Return the timeline for chaining
        return gsap.timeline();
      },
      fromTo: (_target, _fromVars, _toVars, _position) => {
        // Return the timeline for chaining
        return gsap.timeline();
      },
      set: (_target, _vars, _position) => {
        return gsap.timeline();
      },
      kill: () => {},
    };
  },

  // Add from method
  from: (_target, _vars) => {
    // This is a placeholder that will be replaced when GSAP is loaded
    return { kill: () => {} };
  },

  globalTimeline: {
    clear: () => {},
  },
};

// Placeholder for plugins
export const MotionPathPlugin = {};
export const ScrollTrigger = {
  getAll: () => [],
};
export const ScrollToPlugin = {};

let isInitialized = false;
let isLoading = false;
let loadPromise = null;

// Function to initialize GSAP and register plugins
export const initGSAP = async () => {
  if (typeof window === "undefined") return Promise.resolve();

  if (isInitialized) return Promise.resolve();

  // If already loading, return the existing promise
  if (isLoading && loadPromise) return loadPromise;

  isLoading = true;

  // Create a promise to load GSAP and its plugins
  // eslint-disable-next-line no-async-promise-executor
  loadPromise = new Promise(async (resolve) => {
    try {
      // Dynamically import GSAP core
      const gsapModule = await import("gsap");

      // Dynamically import plugins only when needed
      const [motionPathModule, scrollTriggerModule, scrollToModule] =
        await Promise.all([
          import("gsap/MotionPathPlugin"),
          import("gsap/ScrollTrigger"),
          import("gsap/ScrollToPlugin"),
        ]);

      // Register plugins
      gsapModule.gsap.registerPlugin(
        motionPathModule.MotionPathPlugin,
        scrollTriggerModule.ScrollTrigger,
        scrollToModule.ScrollToPlugin
      );

      // Replace placeholder methods with actual GSAP methods
      Object.assign(gsap, gsapModule.gsap);
      Object.assign(MotionPathPlugin, motionPathModule.MotionPathPlugin);
      Object.assign(ScrollTrigger, scrollTriggerModule.ScrollTrigger);
      Object.assign(ScrollToPlugin, scrollToModule.ScrollToPlugin);

      isInitialized = true;
      console.log("GSAP plugins registered successfully");
      resolve();
    } catch (error) {
      console.error("Error registering GSAP plugins:", error);
      resolve(); // Resolve anyway to prevent hanging promises
    } finally {
      isLoading = false;
    }
  });

  return loadPromise;
};

// Function to clean up GSAP animations
export const cleanupGSAP = () => {
  if (typeof window === "undefined" || !isInitialized) return;

  // Kill all active GSAP animations
  gsap.killTweensOf("*");

  // Clean up timeline
  gsap.globalTimeline.clear();

  // Kill all ScrollTriggers if they exist
  if (ScrollTrigger && ScrollTrigger.getAll) {
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger && typeof trigger.kill === "function") {
        trigger.kill();
      }
    });
  }
};

// Custom hook for using GSAP in components
import { useEffect, useRef, useCallback } from "react";

// Fixed version of useGSAP hook with proper dependency handling
export const useGSAP = (
  callback,
  dependencies = []
) => {
  const initialized = useRef(false);

  // Wrap the callback in useCallback to ensure it's stable
  const stableCallback = useCallback(callback, [...dependencies, callback]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let isActive = true;

    const loadAndRun = async () => {
      await initGSAP();
      if (isActive && !initialized.current) {
        stableCallback();
        initialized.current = true;
      }
    };

    loadAndRun();

    return () => {
      isActive = false;
    };
  }, [stableCallback]); // Only depend on the stable callback
};