import { createAction, createReducer } from "@reduxjs/toolkit";

// Typings
export enum Page {
  SEARCH = "search",
  MANAGE = "manage",
  STATS = "stats",
}

interface GlobalState {
  currentPage?: Page;
}

const initialState: GlobalState = {
  currentPage: Page.SEARCH,
};

// Actions
export const setCurrentPage = createAction<{ nextPage: Page }>(
  "global/setCurrentPage"
);

// Reducer
export default createReducer(initialState, (builder) =>
  builder.addCase(setCurrentPage, (state, action) => {
    const { nextPage } = action.payload;
    return { ...state, currentPage: nextPage };
  })
);
