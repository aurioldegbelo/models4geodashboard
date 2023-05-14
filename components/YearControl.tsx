import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { YearType } from "@/types/types";
import { useYearStore } from "@/store/selectedYearStore";

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

export default function YearControl() {
	const selectedYear = useYearStore((state) => state.year);
	const setYear = useYearStore((state) => state.setYear);

	return (
		<div className="leaflet-control bg-white rounded-lg w-28">
			<Listbox value={selectedYear} onChange={setYear}>
				<div className="">
					<Listbox.Button className="w-full rounded-lg h-10 border-2 bg-white text-center focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-indigo-500">
						<span className="block truncate text-md font-medium">{selectedYear}</span>
					</Listbox.Button>
					<Transition
						as={Fragment}
						leave="transition ease-in duration-100"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<Listbox.Options className="absolute mt-1 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
							{allYears.map((year: YearType, index: number) => (
								<Listbox.Option
									key={index}
									className={({ active }) =>
										`relative cursor-default select-none py-2 pl-10 pr-4  ${
											active
												? "bg-indigo-300 text-indigo-900"
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
