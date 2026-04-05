import { mockBudgets, mockTransactions } from "../../mockData";

const STORAGE_EVENT = "localStorageUpdated";

const profileMeta = {
    user1: { id: "user1", name: "Aarav", email: "aarav@mail.com", avatar: "https://randomuser.me/api/portraits/men/3.jpg" },
  user2: { id: "user2", name: "Ishani", email: "Ishani@mail.com", avatar: "https://randomuser.me/api/portraits/women/1.jpg" },
  user3: { id: "user3", name: "gaurav", email: "gaurav@mail.com", avatar: "https://randomuser.me/api/portraits/men/2.jpg" },
};

const clone = (value) => JSON.parse(JSON.stringify(value));

const profileStore = Object.keys(profileMeta).reduce((acc, profileId) => {
  acc[profileId] = {
    transactions: clone(mockTransactions?.[profileId] || []),
    budgets: clone(mockBudgets?.[profileId] || []),
    goals: [],
  };
  return acc;
}, {});

let activeProfileId = "user1";

const dispatchUpdate = () => {
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(STORAGE_EVENT));
  }
};

const getCurrentProfileStore = () => {
  if (!profileStore[activeProfileId]) {
    activeProfileId = "user1";
  }
  return profileStore[activeProfileId];
};

export const getProfiles = () => Object.values(profileMeta).map((profile) => ({ ...profile }));

export const getActiveProfile = () => ({ ...profileMeta[activeProfileId] });

export const setActiveProfile = (profileId) => {
  if (!profileMeta[profileId] || profileId === activeProfileId) return;
  activeProfileId = profileId;
  dispatchUpdate();
};

export const getItem = (key) => {
  try {
    const profileData = getCurrentProfileStore();
    if (key in profileData) {
      return clone(profileData[key]);
    }
    return null;
  } catch (error) {
    console.error("Error reading profile data:", error);
    return null;
  }
};

export const setItem = (key, value) => {
  try {
    const profileData = getCurrentProfileStore();
    profileData[key] = clone(value);
    dispatchUpdate();
  } catch (error) {
    console.error("Error setting profile data:", error);
  }
};

export const removeItem = (key) => {
  try {
    const profileData = getCurrentProfileStore();
    if (Array.isArray(profileData[key])) {
      profileData[key] = [];
    } else {
      delete profileData[key];
    }
    dispatchUpdate();
  } catch (error) {
    console.error("Error removing profile data item:", error);
  }
};

export const clearStorage = () => {
  try {
    const profileData = getCurrentProfileStore();
    Object.keys(profileData).forEach((key) => {
      profileData[key] = Array.isArray(profileData[key]) ? [] : null;
    });
    dispatchUpdate();
  } catch (error) {
    console.error("Error clearing profile data:", error);
  }
};

export const subscribeStorage = (callback) => {
  if (typeof window === "undefined") return () => {};

  window.addEventListener(STORAGE_EVENT, callback);

  return () => {
    window.removeEventListener(STORAGE_EVENT, callback);
  };
};