import { ResponsiveBar } from "@nivo/bar";

const MyResponsiveBar = ({ data }) => (
	<ResponsiveBar
		data={data}
		keys={["promoters", "passives", "detractors"]}
		indexBy="week"
		margin={{ top: 50, right: 150, bottom: 100, left: 80 }}
		padding={0.3}
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
			tickRotation: -75,
			legend: "Time",
			legendPosition: "middle",
			legendOffset: 72,
		}}
		axisLeft={{
			tickSize: 5,
			tickPadding: 5,
			tickRotation: 0,
			legend: "Volume",
			legendPosition: "middle",
			legendOffset: -40,
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
				translateX: 120,
				translateY: 0,
				itemsSpacing: 2,
				itemWidth: 100,
				itemHeight: 20,
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

export default MyResponsiveBar;
