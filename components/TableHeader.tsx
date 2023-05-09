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
		<div className="flex sticky top-0 bg-gray-100 p-2">
			<div className="w-56 font-bold text-gray-800 flex-shrink-0">Name</div>
            {allYears.map((year: YearType, index: number) => (
                <div className="w-10 font-bold text-right self-center text-gray-800 flex-shrink-0" key={index}>
                    {year}
                </div>
            ))}
		</div>
	);
}
