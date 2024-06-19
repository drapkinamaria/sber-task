import { call, put, takeEvery, CallEffect, PutEffect } from "redux-saga/effects";
import { PlanetsRequest } from "../types/types";
import { planetsFetchFailed, planetsFetchRequested, planetsFetchSucceeded } from "../store/planetsReducer";
import {PayloadAction} from "@reduxjs/toolkit";

const fetchPlanetsFromApi = (pageNumber: number): Promise<PlanetsRequest> =>
    fetch(`https://swapi.dev/api/planets/?page=${pageNumber}`)
        .then(response => {
            if (!response.ok) throw new Error("Failed to fetch planets.");
            return response.json();
        });

function* fetchPlanetsWorker(action: PayloadAction<number>): Generator<CallEffect<PlanetsRequest> | PutEffect, void, PlanetsRequest> {
    try {
        const data: PlanetsRequest = yield call(fetchPlanetsFromApi, action.payload);
        yield put(planetsFetchSucceeded(data));
    } catch (error: any) {
        const errorMessage = typeof error === 'string' ? error : error.message || "Unknown error";
        yield put(planetsFetchFailed(errorMessage));
    }
}

export function* planetsWatcher() {
    yield takeEvery(planetsFetchRequested.type, fetchPlanetsWorker);
}
