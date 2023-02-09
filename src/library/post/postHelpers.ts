export const getPostStats = (post: Post) => {
  //Truthiness is the average of:
  // Average User Compliance
  // Average Expert Compliance
  // AI Compliance

  // Display as a percentage to indicate truthiness
  // 16% to 100% = green
  // -15% to +15% = yellow
  // -16% to -100% = red

  const aiAverage: number | null = post.aiCompliance;
  let expertAverage: number | null = null;
  let userAverage: number | null = null;

  //get the average expert compliance
  if (post.expertResponses.length > 0) {
    expertAverage =
      post.expertResponses
        .map((vote) => {
          return vote.compliance;
        })
        .reduce((a, b) => {
          return a + b;
        }) / post.expertResponses.length;
  }
  //get the average user compliance
  if (post.userCompliances.length > 0) {
    userAverage =
      post.userCompliances
        .map((vote) => {
          return vote!.compliance;
        })
        .reduce((a, b) => {
          return a + b;
        }) / post.userCompliances.length;
  }

  //filter out the nulls so average will be accurate
  const allAverages: any = [userAverage, expertAverage, aiAverage].filter(
    (category) => {
      return category !== null;
    }
  );

  //average the available values together, and return the % value
  const averageTruthiness: number =
    allAverages.reduce((a: number, b: number) => {
      return a + b;
    }) / allAverages.length;

  //This is just getting colors for CSS
  let truthColor: string = "";

  if (averageTruthiness > 0.15) {
    truthColor = "border-emerald-400";
  }

  if (averageTruthiness < -0.15) {
    truthColor = "border-red-400";
  }

  if (averageTruthiness >= -0.15 && averageTruthiness <= 0.15)
    truthColor = "border-yellow-400";

  //divisiveness is the max average response - the min average response
  //the max this can be is 2, so we divide the result by 2
  //this results in a percentage value that represents how divisive something is
  //for example 100% divisiveness would display if:
  // ai compliance was 1 and expert compliance was -1
  const getDivisivness = (allAverages: any) => {
    const maxValue = Math.max(...allAverages);
    const minValue = Math.min(...allAverages);

    return (maxValue - minValue) / 2;
  };

  //This is just getting colors for CSS
  const divisivness = getDivisivness(allAverages);

  let divisivenessColor: string = "";

  if (divisivness > 0.65) {
    divisivenessColor = "border-red-400";
  }

  if (divisivness < 0.45) {
    divisivenessColor = "border-emerald-400";
  }

  if (divisivness >= 0.45 && divisivness <= 0.65) {
    divisivenessColor = "border-yellow-400";
  }

  return {
    truthiness: `${averageTruthiness * 100}%`,
    truthColor: truthColor,
    divisivness: `${divisivness * 100}%`,
    divisivenessColor: divisivenessColor,
  };
};

//trottle function prevents a user from scrolling super fast and spamming get requests too quickly
export function throttle(callback: Function, time: number) {
  let throttleTimer: boolean | undefined;

  if (throttleTimer) {
    return;
  }
  throttleTimer = true;
  setTimeout(() => {
    callback();
    throttleTimer = false;
  }, time);
}
