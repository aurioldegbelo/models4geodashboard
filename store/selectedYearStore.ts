import { YearType } from "@/types/types";
import { create } from "zustand";

interface SelectedYear {
	year: YearType;
    setYear: (yearType: YearType) => void
}

export const useYearStore = create<SelectedYear>((set) => ({
	year: "2022",
	setYear: (newYear: YearType) => set((state) => ({ ...state, year: newYear})),
}));
