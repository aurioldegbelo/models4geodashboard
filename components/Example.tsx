import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { YearType } from "@/types/types";

const allYears: YearType[] = [
    "2022",
    "2021",
    "2020",
    "2019",
    "2018",
    "2017",
    "2016",
    "2015",
    "2014",
    "2013",
    "2012",
    "2011",
    "2010",
    "2009",
    "2008",
];

export default function Example() {
	const [selected, setSelected] = useState(allYears[0]);

	return (
		<div className="leaflet-control bg-white rounded-lg w-28">
			<Listbox value={selected} onChange={setSelected}>
				<div className="relative mt-1">
					<Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left shadow-md focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300">
						<span className="block truncate">{selected}</span>
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Listbox.Options className="absolute mt-1 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{allYears.map((year: YearType, index: number) => (
								<Listbox.Option
									key={index}
									className={({ active }) =>
										`relative cursor-default select-none py-2 pl-10 pr-4  ${
											active
												? "bg-amber-100 text-amber-900"
												: "text-gray-900"
										}`
									}
									value={year}
								>
									{({ selected }) => (
										<span
											className={`block truncate ${
												selected
													? "font-medium"
													: "font-normal"
											}`}
										>
											{year}
										</span>
									)}
								</Listbox.Option>
							))}
						</Listbox.Options>
					</Transition>
				</div>
			</Listbox>
		</div>
	);
}
