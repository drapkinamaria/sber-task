import { FilmWithCharacters } from "../types/types";

interface FilmsWithCharactersProps {
  filmsWithCharacters: FilmWithCharacters[];
}

export function FilmsWithCharacters({
  filmsWithCharacters,
}: FilmsWithCharactersProps) {
  return (
    <>
      {filmsWithCharacters.map((films) => (
        <div key={films.filmTitle} className="card m-3">
          <div className="card-header">{films.filmTitle}</div>
          <div className="card-body">
            {films.characters.map((character) => (
              <div key={character.name} className="p-1">
                {character.name}
              </div>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
