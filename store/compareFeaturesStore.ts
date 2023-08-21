import { Feature } from "@/types/types";
import { create } from "zustand";

type CompareFeatureStates = 'Selection' | 'Comparison' | 'Off'
interface CompareFeatures {
	compareFeatureState: CompareFeatureStates;
	setCompareFeatureState: (compareFeatureState: CompareFeatureStates) => void;
	feature1: Feature | undefined;
	setFeature1: (feature: Feature | undefined) => void;
	feature2: Feature | undefined;
	setFeature2: (feature: Feature | undefined) => void;
	feature3: Feature | undefined;
	setFeature3: (feature: Feature | undefined) => void;
}

export const useCompareFeaturesStore = create<CompareFeatures>((set) => ({
	compareFeatureState: 'Off',
	setCompareFeatureState: (newCompareFeatureState: CompareFeatureStates) =>
		set((state) => ({ ...state, compareFeatureState: newCompareFeatureState })),
	feature1: undefined,
	setFeature1: (newSelectedFeature1: Feature | undefined) =>
		set((state) => ({ ...state, feature1: newSelectedFeature1 })),
	feature2: undefined,
	setFeature2: (newSelectedFeature2: Feature | undefined) =>
		set((state) => ({ ...state, feature2: newSelectedFeature2 })),
	feature3: undefined,
	setFeature3: (newSelectedFeature3: Feature | undefined) =>
		set((state) => ({ ...state, feature3: newSelectedFeature3 })),
}));
