import { Planet } from "../types/types";
import { PlanetButton } from "./planet-button";

interface PlanetListProps {
  planets: Planet[];
  handleClickPlanetButton: (films: string[], planetName: string) => void;
}

export function PlanetList({
  planets,
  handleClickPlanetButton,
}: PlanetListProps) {
  return (
    <div>
      {planets.map((planet) => (
        <PlanetButton
          key={planet.name}
          planet={planet}
          onClick={() => handleClickPlanetButton(planet.films, planet.name)}
        />
      ))}
    </div>
  );
}
