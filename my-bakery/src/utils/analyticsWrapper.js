import { initializeAnalytics } from '../config/firebase';

let analytics = null;

export const initAnalytics = async () => {
  analytics = await initializeAnalytics();
};

export const logEvent = (eventName, eventParams) => {
  if (analytics) {
    import('firebase/analytics').then(({ logEvent }) => {
      logEvent(analytics, eventName, eventParams);
    }).catch(error => {
      console.error("Error logging event:", error);
    });
  } else {
    console.log(`Analytics event not logged: ${eventName}`, eventParams);
  }
};
