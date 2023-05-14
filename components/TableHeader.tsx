import { YearType } from "@/types/types";

interface Props {}

export default function TableHeader() {
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
		<thead className="sticky top-0 bg-gray-100">
			<tr className="">
				<th className="px-2 py-3 w-56 font-bold text-gray-800 text-left">
					Name
				</th>
				{allYears.map((year: YearType, index: number) => (
					<th
						className="w-16 font-bold text-right self-center text-gray-800 min-w-[50px] pr-2"
						key={index}
					>
						{year}
					</th>
				))}
			</tr>
		</thead>
	);
}
