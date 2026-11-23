import React, { createContext, useContext, useMemo, useState } from "react";

const AppContext = createContext(null);

const initialProfile = {
  nickname: "Volunteer",
  fullName: "",
  birthDate: "",
  school: "",
  cardNumber: "",
  email: "",
  gender: "",
  hobby: "",
  following: 0,
  followers: 0,
  likes: 0,
};

export const AppDataProvider = ({ children }) => {
  const [profile, setProfile] = useState(initialProfile);
  const [savedOpportunityIds, setSavedOpportunityIds] = useState([]);

  const toggleSavedOpportunity = (opportunityId) => {
    setSavedOpportunityIds((currentIds) =>
      currentIds.includes(opportunityId)
        ? currentIds.filter((id) => id !== opportunityId)
        : [...currentIds, opportunityId],
    );
  };

  const value = useMemo(
    () => ({
      profile,
      setProfile,
      savedOpportunityIds,
      toggleSavedOpportunity,
    }),
    [profile, savedOpportunityIds],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppData = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useAppData must be used within AppDataProvider");
  }

  return context;
};
