import {Character} from "../types/types";
import {put, takeEvery, call, CallEffect, PutEffect} from "redux-saga/effects";
import {charactersFetchFailed, charactersFetchRequested, charactersFetchSucceeded} from "../store/charactersReducer";

export const fetchCharactersFromApi = (filmUrls: string[]): Promise<{filmTitle: string, characters: Character[]}[]> => {
    const filmPromises = filmUrls.map(url =>
        fetch(url)
            .then(response => response.json())
            .then(data => ({
                filmTitle: data.title,
                characterUrls: data.characters as string[]
            }))
    );

    return Promise.all(filmPromises)
        .then(films => Promise.all(
            films.map(film =>
                Promise.all(
                    film.characterUrls.map(characterUrl =>
                        fetch(characterUrl)
                            .then(response => response.json())
                    )
                ).then(characters => ({
                    filmTitle: film.filmTitle,
                    characters
                }))
            )
        ));
};

function* fetchCharactersWorker(action: ReturnType<typeof charactersFetchRequested>): Generator<CallEffect | PutEffect, void, any> {
    try {
        const data = yield call(fetchCharactersFromApi, action.payload);
        yield put(charactersFetchSucceeded(data));
    } catch (error: any) {
        yield put(charactersFetchFailed(error.message || "Unknown error"));
    }
}

export function* charactersWatcher(): Generator {
    yield takeEvery(charactersFetchRequested.type, fetchCharactersWorker);
}

