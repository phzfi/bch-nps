import { ResponsiveBar } from "@nivo/bar";

const MyResponsiveBar = ({ data, months }) => {
	const valuesToShow = data.map((v, i) =>
		months >= 6 ? (i % 6 ? "" : v.timeSpan) : i % 2 ? "" : v.timeSpan
	);
	return (
		<ResponsiveBar
			data={data}
			keys={["promoters", "passives", "detractors"]}
			indexBy="timeSpan"
			margin={{ top: 50, right: 150, bottom: 200, left: 90 }}
			padding={0.1}
			valueScale={{ type: "linear" }}
			indexScale={{ type: "band", round: true }}
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
							fill: "#FFF",
							fontSize: "1rem",
						},
					},
				},
			}}
			colors={({ id, data }) => data[`${id}Color`]}
			borderColor={{
				from: "color",
				modifiers: [["brighter", 10]],
			}}
			axisTop={null}
			axisRight={null}
			axisBottom={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 50,
				legend: "Date",
				legendPosition: "middle",
				legendOffset: 110,
				format: (v) => (valuesToShow.find((vts) => vts === v) ? v : ""),
			}}
			axisLeft={{
				tickSize: 5,
				tickPadding: 5,
				tickRotation: 0,
				legend: "Volume",
				legendPosition: "middle",
				legendOffset: -60,
			}}
			labelSkipWidth={12}
			labelSkipHeight={12}
			labelTextColor={{
				from: "color",
				modifiers: [["brighter", 10]],
			}}
			legends={[
				{
					dataFrom: "keys",
					anchor: "bottom-right",
					direction: "column",
					justify: false,
					translateX: 100,
					translateY: 0,
					itemsSpacing: 2,
					itemWidth: 80,
					itemHeight: 30,
					itemDirection: "left-to-right",
					itemOpacity: 1,
					symbolSize: 20,
					itemTextColor: "#FFF",
					effects: [
						{
							on: "hover",
							style: {
								itemOpacity: 1,
							},
						},
					],
				},
			]}
			role="application"
			ariaLabel="bar chart of promoter score response volume of one year rolling"
			barAriaLabel={function (e) {
				return e.id + ": " + e.formattedValue + " in day: " + e.indexValue;
			}}
		/>
	);
};

export default MyResponsiveBar;
