import { createReducer, createAction, PayloadAction } from "@reduxjs/toolkit";
import { FilmWithCharacters } from "../types/types";

interface CharactersState {
    characters: FilmWithCharacters[];
    activePlanet: string | null;
    loading: boolean;
    error: string | null;
}

const initialState: CharactersState = {
    characters: [],
    activePlanet: null,
    loading: false,
    error: null,
};

export interface FetchCharactersPayload {
    films: string[];
    planetName: string;
}

export const charactersFetchRequested = createAction(
    "CHARACTERS_FETCH_REQUESTED",
    (films: string[], planetName: string) => ({
        payload: { films, planetName },
    }),
);

export const charactersFetchSucceeded = createAction<FilmWithCharacters[]>(
    "CHARACTERS_FETCH_SUCCEEDED",
);

export const charactersFetchFailed = createAction<string>(
    "CHARACTERS_FETCH_FAILED",
);

export const charactersReset = createAction("CHARACTERS_RESET");

export const charactersReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(
            charactersFetchRequested,
            (state, action: PayloadAction<FetchCharactersPayload>) => {
                state.loading = true;
                state.error = null;
                state.activePlanet = action.payload.planetName;
            },
        )
        .addCase(
            charactersFetchSucceeded,
            (state, action: PayloadAction<FilmWithCharacters[]>) => {
                state.characters = action.payload;
                state.loading = false;
                state.error = null;
            },
        )
        .addCase(charactersFetchFailed, (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        })
        .addCase(charactersReset, (state) => {
            state.characters = [];
            state.activePlanet = null;
            state.loading = false;
            state.error = null;
        });
});
