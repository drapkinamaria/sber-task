import { Planet } from "../types/types";

interface PlanetButtonProps {
  planet: Planet;
  onClick: () => void;
}

export function PlanetButton({ planet, onClick }: PlanetButtonProps) {
  return (
    <button className="btn btn-primary m-2" onClick={onClick}>
      {planet.name}
    </button>
  );
}
