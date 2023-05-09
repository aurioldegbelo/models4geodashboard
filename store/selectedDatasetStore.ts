import { DatasetType } from "@/types/types";
import { create } from "zustand";

interface SelectedDataset {
	dataset: DatasetType;
    setDataset: (dataset: DatasetType) => void
}

export const useDatasetStore = create<SelectedDataset>((set) => ({
	dataset: "State",
	setDataset: (newDatasetType: DatasetType) => set((state) => ({ ...state, dataset: newDatasetType})),
}));
