import {
  VictoryBar,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
  Background,
} from "victory";
import type { NextPage } from "next";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import { cleanURL } from "@/library/stats/statsHelpers";

export const getServerSideProps: GetServerSideProps = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_HOST_NAME}/api/stats/allposts`
    );
    const allPostStats = await response.json();
    return {
      props: {
        allPostStats,
      },
    };
  } catch (error) {
    console.error(error);
    return { props: {} };
  }
};

const Charts: NextPage = ({
  allPostStats,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <div className="px-14">
      <div className="bg-gray-700 flex-col pt-1">
        <div className="text-3xl font-sans text-stone-200 tracking-wide font-semibold text-center mt-16 -mb-12">
          Average Truthiness
        </div>
        <VictoryChart
          domainPadding={20}
          width={475}
          height={200}
          // style={{ background: { fill: "#374151" } }}
          // backgroundComponent={<Background y={} height={420} />}
        >
          <VictoryBar
            style={{ data: { fill: "#60A5FA" } }}
            data={allPostStats}
            barWidth={8}
            animate={{
              duration: 1000,
              onLoad: { duration: 600 },
            }}
            x="hostSite"
            y="averageTruthiness"
            labels={({ datum }) =>
              `${parseInt((datum.averageTruthiness * 100).toString(), 10)}%`
            }
            labelComponent={
              <VictoryLabel style={[{ fill: "white", fontSize: 5 }]} />
            }
          />
          <VictoryAxis
            tickFormat={(t) => `${cleanURL(t)}`}
            style={{
              axis: { stroke: "#374151" },
              tickLabels: { fontSize: 6, fill: "#FFFFFF" },
            }}
            offsetY={50}
          />
          <VictoryAxis
            style={{
              axis: { stroke: "#1F2836" },
              tickLabels: { fontSize: 0 },
            }}
          />
        </VictoryChart>
      </div>
    </div>
  );
};

export default Charts;
