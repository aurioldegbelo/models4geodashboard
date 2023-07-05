import { create } from "zustand";
import { Dataset } from "@/types/types";

interface SelectedDataset {
	dataset: Dataset;
	setDataset: (dataset: Dataset) => void;
}

export const useSelectedDatasetStore = create<SelectedDataset>((set) => ({
	dataset: "roadnetworkdensity",
	setDataset: (newSelectedDataset: Dataset) =>
		set((state) => ({ ...state, dataset: newSelectedDataset })),
}));
