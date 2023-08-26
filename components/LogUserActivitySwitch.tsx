import { useLogUserActivityStore } from "@/store/logUserActivityStore";
import { Switch } from "@headlessui/react";

interface Props {}

export default function LogUserActivitySwitch(props: Props) {
	const shouldLogUserActivity = useLogUserActivityStore(
		(state) => state.logUserActivity
	);
	const setShouldLogUserActivity = useLogUserActivityStore(
		(state) => state.setLogUserActivity
	);

	return (
		<div className="">
			<Switch
                disabled={process.env.NODE_ENV !== 'development'}
				checked={shouldLogUserActivity}
				onChange={setShouldLogUserActivity}
				className={`${
					process.env.NODE_ENV == 'development' ? shouldLogUserActivity ? "bg-indigo-500" : "bg-indigo-200" : 'bg-gray-200'
				}
          relative inline-flex h-[24px] w-[44px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
			>
				<span className="sr-only">Log User Activity</span>
				<span
					aria-hidden="true"
					className={`${
						shouldLogUserActivity
							? "translate-x-5"
							: "translate-x-0"
					}
            pointer-events-none inline-block h-[20px] w-[20px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
				/>
			</Switch>
		</div>
	);
}
