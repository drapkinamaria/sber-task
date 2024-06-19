import { createReducer, createAction, PayloadAction } from "@reduxjs/toolkit";
import { PlanetsRequest } from "../types/types";

interface PlanetsState {
  planetsRequest: PlanetsRequest;
  loading: boolean;
  error: string | null;
}

const initialState: PlanetsState = {
  planetsRequest: { count: 0, next: null, previous: null, results: [] },
  loading: false,
  error: null,
};

export const planetsFetchRequested = createAction<number>(
  "PLANETS_FETCH_REQUESTED",
);
export const planetsFetchSucceeded = createAction<PlanetsRequest>(
  "PLANETS_FETCH_SUCCEEDED",
);
export const planetsFetchFailed = createAction<string>("PLANETS_FETCH_FAILED");

export const planetsReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(planetsFetchRequested, (state) => {
      state.loading = true;
      state.error = null;
    })
    .addCase(
      planetsFetchSucceeded,
      (state, action: PayloadAction<PlanetsRequest>) => {
        state.planetsRequest = action.payload;
        state.loading = false;
        state.error = null;
      },
    )
    .addCase(planetsFetchFailed, (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    });
});
