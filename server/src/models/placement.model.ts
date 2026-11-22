import { Placement } from "../types/index.js";
import { INITIAL_PLACEMENTS, JsonStore } from "./store.js";

const store = new JsonStore<Placement>("placements.json", INITIAL_PLACEMENTS);

export class PlacementModel {
  static getAll(): Placement[] {
    return store.read();
  }

  static getById(id: string): Placement | null {
    const placements = store.read();
    return placements.find((p) => p.id === id) || null;
  }

  static create(data: Omit<Placement, "id">): Placement {
    const placements = store.read();
    const newPlacement: Placement = {
      ...data,
      id: `place-${Date.now().toString().slice(-4)}`,
    };
    placements.push(newPlacement);
    store.write(placements);
    return newPlacement;
  }
}
