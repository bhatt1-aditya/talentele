"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlacementModel = void 0;
const store_js_1 = require("./store.js");
const store = new store_js_1.JsonStore("placements.json", store_js_1.INITIAL_PLACEMENTS);
class PlacementModel {
    static getAll() {
        return store.read();
    }
    static getById(id) {
        const placements = store.read();
        return placements.find((p) => p.id === id) || null;
    }
    static create(data) {
        const placements = store.read();
        const newPlacement = {
            ...data,
            id: `place-${Date.now().toString().slice(-4)}`,
        };
        placements.push(newPlacement);
        store.write(placements);
        return newPlacement;
    }
}
exports.PlacementModel = PlacementModel;
