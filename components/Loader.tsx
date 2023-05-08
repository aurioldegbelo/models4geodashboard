import { MoonLoader } from "react-spinners";

export default function Loader() {
	return (
		<div className="flex h-screen justify-center items-center pb-12">
			<MoonLoader color="#4F46E5"/>
		</div>
	);
}
