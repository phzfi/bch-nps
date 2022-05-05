import { ResponsiveLine } from "@nivo/line";

const MyResponsiveLine = ({ data, months }) => {
	const valuesToShow = data[0].data.map((v, i) =>
		months >= 6 ? (i % 6 ? "" : v.x) : i % 2 ? "" : v.x
	);
	return (
		<ResponsiveLine
			data={data}
			theme={{
				fontSize: "1rem",
				axis: {
					ticks: {
						text: {
							fill: "#FFF",
						},
					},
					legend: {
						text: {
							fontSize: "1rem",
							fill: "#FFF",
						},
					},
				},
			}}
			margin={{ top: 50, right: 150, bottom: 150, left: 90 }}
			xScale={{ type: "point" }}
			yScale={{
				type: "linear",
				min: "auto",
				max: "auto",
				stacked: true,
				reverse: false,
			}}
			curve="monotoneX"
			yFormat=" >-.2f"
			axisTop={null}
			axisRight={null}
			axisBottom={{
				orient: "bottom",
				tickSize: 5,
				tickPadding: 10,
				tickRotation: 50,
				legend: "Date",
				legendOffset: 72,
				legendPosition: "middle",
				format: (v) => (valuesToShow.find((vts) => vts === v) ? v : ""),
			}}
			axisLeft={{
				orient: "left",
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: "Score",
				legendOffset: -60,
				legendPosition: "middle",
			}}
			enableGridX={false}
			colors={{ datum: "color" }}
			pointSize={3}
			pointColor={{ theme: "background" }}
			pointBorderWidth={5}
			pointBorderColor={{ from: "serieColor" }}
			pointLabelYOffset={-12}
			useMesh={true}
			legends={[
				{
					anchor: "bottom-right",
					direction: "column",
					justify: false,
					translateX: 100,
					translateY: 0,
					itemsSpacing: 0,
					itemDirection: "left-to-right",
					itemWidth: 80,
					itemHeight: 20,
					itemOpacity: 1,
					symbolSize: 15,
					symbolShape: "circle",
					symbolBorderColor: "rgba(0, 0, 0, 0)",
					itemTextColor: "#FFF",
				},
			]}
		/>
	);
};

export default MyResponsiveLine;
