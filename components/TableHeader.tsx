import { YearType } from "@/types/types";

interface Props {}

export default function TableHeader() {
	const allYears: YearType[] = [
		"2008",
		"2009",
		"2010",
		"2011",
		"2012",
		"2013",
		"2014",
		"2015",
		"2016",
		"2017",
		"2018",
		"2019",
		"2020",
		"2021",
		"2022",
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
