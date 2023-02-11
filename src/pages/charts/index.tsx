import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  VictoryTheme,
} from "victory";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";

export const getServerSideProps: GetServerSideProps = async () => {
  const response = await fetch("http://localhost:3000/api/stats/allposts");
  const allPostStats = await response.json();
  return {
    props: {
      allPostStats,
    },
  };
};

const Charts: NextPage = ({ allPostStats }) => {
  return (
    <div>
      <div className="text-xl font-sans text-stone-200 font-light text-center mt-24 -mb-12">
        Average Truthiness
      </div>
      <VictoryChart domainPadding={20} width={400} height={200}>
        <VictoryBar
          style={{ data: { fill: "#60A5FA" } }}
          data={allPostStats}
          barWidth={8}
          animate={{
            duration: 1000,
            onLoad: { duration: 500 },
          }}
          x="hostSite"
          y="averageTruthiness"
          labels={({ datum }) => `${datum.averageTruthiness * 100}%`}
          labelComponent={
            <VictoryLabel style={[{ fill: "white", fontSize: 5 }]} />
          }
        />
        <VictoryAxis
          tickFormat={(t) => `${t.slice(0, t.length - 4).slice(12)}`}
          style={{
            axis: { stroke: "#1F2937" },
            tickLabels: { fontSize: 6, fill: "#FFFFFF" },
          }}
          offsetY={50}
        />
        <VictoryAxis
          style={{
            axis: { stroke: "#374151" },
            tickLabels: { fontSize: 0 },
          }}
        />
      </VictoryChart>
    </div>
  );
};

export default Charts;
