import { Feature } from "@/types/types";
import { create } from "zustand";
import { states } from "../data/states";


interface SelectedFeature {
	feature: Feature;
	setFeature: (feature: Feature) => void;
}

export const useSelectedFeatureStore = create<SelectedFeature>((set) => ({
	feature: states.features[0],
	setFeature: (newSelectedFeature: Feature) =>
		set((state) => ({ ...state, feature: newSelectedFeature })),
}));
