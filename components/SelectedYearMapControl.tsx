import { useYearStore } from "@/store/selectedYearStore";
import { YearType } from "@/types/types";

export default function SelectedYearMapControl() {
	const selectedYear = useYearStore((state) => state.year);
	const setYear = useYearStore((state) => state.setYear);

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

	return (
		<div className="leaflet-control leaflet-bar bg-white p-5">
			<div className="font-bold">Select Year</div>
			{allYears.map((year: YearType, index: number) => (
				<div className="flex items-center gap-2" key={index}>
					<input
						type="radio"
						id={year}
						name={year}
						checked={selectedYear == year}
						onChange={() => setYear(year)}
					/>
					<label htmlFor="2022">{year}</label>
				</div>
			))}
		</div>
	);
}
