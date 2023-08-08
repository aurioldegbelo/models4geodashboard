interface Props {
	active?: boolean;
	payload?: any;
	label?: any;
}

export default function GraphViewHoverTooltip(props: Props) {
	if (props.active && props.payload && props.payload.length) {
		return (
			<div className="border bg-white rounded-lg p-2">
				<p className="font-bold underline underline-offset-2">{`Year: ${props.label}`}</p>
				<div className="flex gap-2">
					<div>
						{props.payload.map((payload: any, index: number) =>
							index <= 7 ? (
								<p
									key={index}
									style={{
										color: payload.color,
									}}
								>
									{payload.dataKey}: {payload.value}
								</p>
							) : null
						)}
					</div>
					<div>
						{props.payload.map((payload: any, index: number) =>
							index > 7 ? (
								<p
									key={index}
									style={{
										color: payload.color,
									}}
								>
									{payload.dataKey}: {payload.value}
								</p>
							) : null
						)}
					</div>
				</div>
			</div>
		);
	}

	return null;
}
