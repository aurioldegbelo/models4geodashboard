import { states } from "@/data/states";
import { Feature } from "@/types/types";
import { create } from "zustand";

interface SelectedFeature {
	feature: Feature | undefined;
	setFeature: (feature: Feature | undefined) => void;
}

export const useSelectedFeatureStore = create<SelectedFeature>((set) => ({
	feature: undefined,
	setFeature: (newSelectedFeature: Feature | undefined) =>
		set((state) => ({ ...state, feature: newSelectedFeature })),
}));
