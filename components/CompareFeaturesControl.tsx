import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useCompareFeaturesStore } from "@/store/compareFeaturesStore";

export default function CompareFeaturesControl() {
	const comparisonFeature1 = useCompareFeaturesStore(
		(state) => state.feature1
	);
	const comparisonFeature2 = useCompareFeaturesStore(
		(state) => state.feature2
	);

	return (
		<div className="leaflet-control bg-white rounded-lg w-48">
			<Listbox value={"Compare"}>
				<div className="">
					<Listbox.Button className="w-full rounded-lg h-10 border-2 bg-white text-center focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-white hover:bg-indigo-100 hover:ring-offset-indigo-600 hover:text-indigo-900 hover:ring-indigo-600 hover:border-indigo-600">
						<span className="block truncate text-md font-semibold">
							Compare
						</span>
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Listbox.Options className="absolute mt-1 w-48 overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{comparisonFeature1 ? (
								<Listbox.Option
									className={({ active }) =>
										`relative cursor-default select-none py-2 px-4  ${
											active
												? "bg-indigo-300 text-indigo-900"
												: "text-gray-900"
										}`
									}
									value={
										comparisonFeature1.properties.NUTS_NAME
									}
								>
									{({ selected }) => (
										<span
											className={`block truncate ${
												selected
													? "font-medium"
													: "font-normal"
											}`}
										>
											{
												comparisonFeature1.properties
													.NUTS_NAME
											}
										</span>
									)}
								</Listbox.Option>
							) : null}
							{comparisonFeature2 ? (
								<Listbox.Option
									className={({ active }) =>
										`relative cursor-default select-none py-2 px-4  ${
											active
												? "bg-indigo-300 text-indigo-900"
												: "text-gray-900"
										}`
									}
									value={
										comparisonFeature2.properties.NUTS_NAME
									}
								>
									{({ selected }) => (
										<span
											className={`block truncate ${
												selected
													? "font-medium"
													: "font-normal"
											}`}
										>
											{
												comparisonFeature2.properties
													.NUTS_NAME
											}
										</span>
									)}
								</Listbox.Option>
							) : null}
							{comparisonFeature1 == undefined &&
							comparisonFeature2 == undefined ? (
								<Listbox.Option
									className={({ active }) =>
										`relative cursor-default select-none py-2 px-4  ${
											active
												? "bg-indigo-300 text-indigo-900"
												: "text-gray-900"
										}`
									}
									value={"noFeaturesSelected"}
								>
									{({ selected }) => (
										<span
											className={`block truncate ${
												selected
													? "font-medium"
													: "font-normal"
											}`}
										>
											{"No Features selected"}
										</span>
									)}
								</Listbox.Option>
							) : null}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</div>
	);
}
