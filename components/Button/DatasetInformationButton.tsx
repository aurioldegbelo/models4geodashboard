import PrimaryButton from "./PrimaryButton";

interface Props {
	setShowDatasetModal: (showDatasetModal: boolean) => void;
}

export default function DatasetInformationButton(props: Props) {
	return (
		<>
			<div className="leaflet-control bg-white rounded-md">
				<PrimaryButton onClick={() => props.setShowDatasetModal(true)} uppercase={false}>
					About the Data
				</PrimaryButton>
			</div>
		</>
	);
}
