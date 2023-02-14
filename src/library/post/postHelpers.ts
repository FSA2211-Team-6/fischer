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
  // if (post.expertResponses.length > 0) {
  //   expertAverage =
  //     post.expertResponses
  //       .map((vote) => {
  //         return vote.compliance;
  //       })
  //       .reduce((a, b) => {
  //         return a + b;
  //       }) / post.expertResponses.length;
  // }

  if (post.expertCompliances.length > 0) {
    expertAverage =
      post.expertCompliances
        .map((vote) => {
          return vote!.compliance;
        })
        .reduce((a, b) => {
          return a + b;
        }) / post.expertCompliances.length;
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
  let extensionTruthColor: string = "";

  if (averageTruthiness > 0.15) {
    truthColor = "border-emerald-400";
    extensionTruthColor = "green";
  }

  if (averageTruthiness < -0.15) {
    truthColor = "border-red-400";
    extensionTruthColor = "red";
  }

  if (averageTruthiness >= -0.15 && averageTruthiness <= 0.15) {
    truthColor = "border-yellow-400";
    extensionTruthColor = "yellow";
  }

  //divisiveness is the max average response - the min average response
  //the max this can be is 2, so we divide the result by 2
  //this results in a percentage value that represents how divisive something is
  //for example 100% divisiveness would display if:
  // ai compliance was 1 and expert compliance was -1
  const getDivisiveness = (allAverages: any) => {
    const maxValue = Math.max(...allAverages);
    const minValue = Math.min(...allAverages);

    return (maxValue - minValue) / 2;
  };

  //This is just getting colors for CSS
  const divisiveness = getDivisiveness(allAverages);

  let divisivenessColor: string = "";
  let extensionDivisivenessColor: string = "";

  if (divisiveness > 0.65) {
    divisivenessColor = "border-red-400";
    extensionDivisivenessColor = "red";
  }

  if (divisiveness < 0.45) {
    divisivenessColor = "border-emerald-400";
    extensionDivisivenessColor = "green";
  }

  if (divisiveness >= 0.45 && divisiveness <= 0.65) {
    divisivenessColor = "border-yellow-400";
    extensionDivisivenessColor = "yellow";
  }

  return {
    truthiness: `${averageTruthiness * 100}%`,
    truthAsNumber: averageTruthiness,
    truthColor: truthColor,
    extensionTruthColor: extensionTruthColor,
    divisiveness: `${divisiveness * 100}%`,
    divisivenessColor: divisivenessColor,
    extensionDivisivenessColor: extensionDivisivenessColor,
  };
};
