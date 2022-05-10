import { ResponsivePie } from "@nivo/pie";

const MyResponsivePie = ({ data, promoterScore, setClicked }) => {
	const CenteredMetric = ({ centerX, centerY }) => {
		return (
			<text
				x={promoterScore.score >= 0 ? centerX : centerX - 8}
				y={centerY}
				textAnchor="middle"
				dominantBaseline="central"
				onClick={() => setClicked("")}
				style={{
					fontSize: "2.5rem",
					fontWeight: 500,
					fill: "#fff",
					cursor: "pointer",
				}}
			>
				{`${Math.ceil(promoterScore.score)}`}
			</text>
		);
	};

	const handlePieClick = (data) => {
		setClicked(data);
	};
	return (
		<ResponsivePie
			data={data}
			onClick={(node, event) => handlePieClick(node.id)}
			margin={{ top: 20, right: 50, bottom: 160, left: 50 }}
			innerRadius={0.7}
			padAngle={0.1}
			cornerRadius={3}
			activeOuterRadiusOffset={10}
			borderWidth={1}
			theme={{ fontSize: "1rem" }}
			colors={{ datum: "data.color" }}
			borderColor={{ from: "color", modifiers: [["darker", 10]] }}
			enableArcLinkLabels={false}
			arcLabelsSkipAngle={10}
			arcLabelsTextColor={{
				from: "color",
				modifiers: [["brighter", 10]],
			}}
			layers={["arcs", "arcLabels", "legends", CenteredMetric]}
			legends={[
				{
					anchor: "bottom",
					direction: "row",
					justify: false,
					translateX: 0,
					translateY: 60,
					itemsSpacing: 1,
					itemWidth: 100,
					itemHeight: 28,
					itemTextColor: "#FFF",
					itemDirection: "top-to-bottom",
					itemOpacity: 1,
					symbolSize: 20,
					symbolShape: "circle",
				},
			]}
		/>
	);
};

export default MyResponsivePie;
