import { create } from "zustand";

interface LogUserActivity {
	logUserActivity: boolean;
	setLogUserActivity: (logUserActivity: boolean) => void;
}

export const useLogUserActivityStore = create<LogUserActivity>((set) => ({
	logUserActivity: false,
	setLogUserActivity: (shouldLogUserActivity: boolean) =>
		set((state) => ({ ...state, logUserActivity: shouldLogUserActivity })),
}));
