import { createDraftSafeSelector } from "@reduxjs/toolkit";
const selectDomain = (state) => state.auth;

export const selectToken = createDraftSafeSelector(
  selectDomain,
  (auth) => auth.token
);
export const selectRole = createDraftSafeSelector(
  selectDomain,
  (auth) => auth.user
);
