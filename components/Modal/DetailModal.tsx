import { Feature } from "@/types/types";
import PrimaryButton from "../Button/PrimaryButton";
import { useEffect, useRef } from "react";

interface Props {
	feature: Feature;
	showModal: boolean;
	setShowModal: (bool: boolean) => void;
}

export default function DetailModal(props: Props) {

	const modalRef = useRef(null);

	useEffect(() => {
		const handleOutsideClick = (event) => {
			if (modalRef.current && !modalRef.current.contains(event.target)) {
				props.setShowModal(false);
			}
		};

		if (props.showModal) {
			document.addEventListener("mousedown", handleOutsideClick);
		}

		return () => {
			document.removeEventListener("mousedown", handleOutsideClick);
		};
	}, [props.showModal, props.setShowModal]);

	return (
		<div
			className={`fixed inset-0 flex items-center justify-center z-50 ${
				props.showModal ? "" : "hidden"
			}`}
		>
			<div className="fixed inset-0 bg-gray-900 opacity-50 z-45"></div>
			<div
				ref={modalRef}
				className="bg-white rounded-lg w-1/2 relative z-50"
			>
				<div className="px-6 py-4">
					<div className="text-lg font-medium text-gray-900">
						{props.feature && props.feature.properties.NUTS_NAME}
					</div>
					<div className="mt-4 text-sm text-gray-600">content</div>
				</div>
				<div className="px-6 py-4 bg-gray-100 text-right rounded-b-lg">
					<PrimaryButton onClick={() => props.setShowModal(false)} uppercase>
						Close
					</PrimaryButton>
				</div>
			</div>
		</div>
	);
}
