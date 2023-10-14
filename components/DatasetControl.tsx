import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { useSelectedDatasetStore } from "@/store/selectedDatasetStore";
import { useTranslation } from 'next-i18next'

export default function DatasetControl() {
	
    const dataset = useSelectedDatasetStore((state) => state.dataset);
    const setDataset = useSelectedDatasetStore((state) => state.setDataset);

	const { t } = useTranslation('common')

	return (
		<div className="leaflet-control bg-white rounded-lg w-64">
			<Listbox value={dataset} onChange={setDataset}>
				<div className="">
					<Listbox.Button className="w-full rounded-lg h-10 border-2 bg-white text-center focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-white hover:bg-indigo-100 hover:ring-offset-indigo-600 hover:text-indigo-900 hover:ring-indigo-600 hover:border-indigo-600">
						<span className="block truncate text-md font-semibold">
							{dataset == 'roadnetworkdensity' ? t('roadnetworkdensity'): ''}
                            {dataset == 'greenlandpercentage' ? 'Anteil Grünlandfläche': ''}
                            {dataset == 'woodlandpercentage' ? 'Anteil Waldfläche': ''}
							{dataset == 'agriculturallandpercentage' ? 'Anteil Landwirtschaftsfläche': ''}
						</span>
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Listbox.Options className="absolute mt-1 w-64 overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
								<Listbox.Option
									className={({ active }) =>
										`relative cursor-default select-none py-2 px-4  ${
											active
												? "bg-indigo-300 text-indigo-900"
												: "text-gray-900"
										}`
									}
									value={'roadnetworkdensity'}
								>
									{({ selected }) => (
										<span
											className={`block truncate ${
												selected
													? "font-medium"
													: "font-normal"
											}`}
										>
											{'Straßennetzdichte'}
										</span>
									)}
								</Listbox.Option>
                                <Listbox.Option
									className={({ active }) =>
										`relative cursor-default select-none py-2 px-4  ${
											active
												? "bg-indigo-300 text-indigo-900"
												: "text-gray-900"
										}`
									}
									value={'greenlandpercentage'}
								>
									{({ selected }) => (
										<span
											className={`block truncate ${
												selected
													? "font-medium"
													: "font-normal"
											}`}
										>
											{'Anteil Grünlandfläche'}
										</span>
									)}
								</Listbox.Option>
                                <Listbox.Option
									className={({ active }) =>
										`relative cursor-default select-none py-2 px-4  ${
											active
												? "bg-indigo-300 text-indigo-900"
												: "text-gray-900"
										}`
									}
									value={'woodlandpercentage'}
								>
									{({ selected }) => (
										<span
											className={`block truncate ${
												selected
													? "font-medium"
													: "font-normal"
											}`}
										>
											{'Anteil Waldfläche'}
										</span>
									)}
								</Listbox.Option>
								<Listbox.Option
									className={({ active }) =>
										`relative cursor-default select-none py-2 px-4  ${
											active
												? "bg-indigo-300 text-indigo-900"
												: "text-gray-900"
										}`
									}
									value={'agriculturallandpercentage'}
								>
									{({ selected }) => (
										<span
											className={`block truncate ${
												selected
													? "font-medium"
													: "font-normal"
											}`}
										>
											{'Anteil Landwirtschaftsfläche'}
										</span>
									)}
								</Listbox.Option>
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</div>
	);
}
