import { Feature } from "@/types/types";
import { create } from "zustand";

interface CompareFeatures {
	feature1: Feature | undefined;
	setFeature1: (feature: Feature | undefined) => void;
	feature2: Feature | undefined;
	setFeature2: (feature: Feature | undefined) => void;
}

export const useCompareFeaturesStore = create<CompareFeatures>((set) => ({
	feature1: undefined,
	setFeature1: (newSelectedFeature1: Feature | undefined) =>
		set((state) => ({ ...state, feature1: newSelectedFeature1 })),
	feature2: undefined,
	setFeature2: (newSelectedFeature2: Feature | undefined) =>
		set((state) => ({ ...state, feature2: newSelectedFeature2 })),
}));
