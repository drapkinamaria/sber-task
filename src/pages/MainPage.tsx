import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { FilmsWithCharacters } from "../components/films-with-characters";
import { LoadingSpinner } from "../components/loading";
import { PlanetList } from "../components/planet-list";
import { Planet } from "../types/types";
import { planetsFetchRequested } from "../store/planetsReducer";
import {
  charactersFetchRequested,
  charactersReset,
} from "../store/charactersReducer";
import { Pagination } from "../components/pagination";
import "../index.css";

export function MainPage() {
  const dispatch = useDispatch();
  const {
    planetsRequest,
    loading: loadingPlanets,
    error: errorPlanets,
  } = useSelector((state: RootState) => state.planets);
  const {
    characters,
    activePlanet,
    loading: loadingCharacters,
    error: errorCharacters,
  } = useSelector((state: RootState) => state.characters);
  const planets: Planet[] = planetsRequest.results;
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    dispatch(planetsFetchRequested(pageNumber));
  }, [dispatch, pageNumber]);

  function handleClickPlanetButton(films: string[], planetName: string) {
    dispatch(charactersFetchRequested(films, planetName));
  }

  function handlePagination(next: boolean) {
    dispatch(charactersReset());
    setPageNumber((prevPageNumber) =>
      next ? prevPageNumber + 1 : prevPageNumber - 1,
    );
  }

  return (
    <div className="container custom-container">
      <h1>Planets</h1>
      {loadingPlanets ? (
        <LoadingSpinner />
      ) : (
        <>
          {errorPlanets && (
            <p className="alert alert-danger" role="alert">
              Error fetching planets: {errorPlanets}
            </p>
          )}
          <PlanetList
            planets={planets}
            handleClickPlanetButton={handleClickPlanetButton}
          />
        </>
      )}
      {loadingCharacters ? (
        <LoadingSpinner />
      ) : (
        <>
          {errorCharacters && (
            <p className="alert alert-danger" role="alert">
              Error fetching characters and films: {errorCharacters}
            </p>
          )}
          {activePlanet && <h3 className="ml-3">Films for {activePlanet}</h3>}
          {characters.length === 0 ? (
            <p className="alert alert-info" role="alert">
              No films
            </p>
          ) : (
            <FilmsWithCharacters filmsWithCharacters={characters} />
          )}
          <Pagination
            next={!!planetsRequest.next}
            previous={!!planetsRequest.previous}
            onPageChange={handlePagination}
          />
        </>
      )}
    </div>
  );
}
