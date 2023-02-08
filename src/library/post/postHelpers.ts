export const getPostStats = (post) => {
  //Truthiness is the average of:
  // Average User Compliance
  // Average Expert Compliance
  // AI Compliance

  // Display as a percentage to indicate truthiness
  // 16% to 100% = green
  // -15% to +15% = yellow
  // -16% to -100% = red

  const aiAverage = post.aiCompliance;
  let expertAverage = null;
  let userAverage = null;

  //get the average expert compliance
  if (post.expertResponses.length > 0) {
    expertAverage =
      post.expertCompliances
        .map((vote) => {
          return vote.compliance;
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
          return vote.compliance;
        })
        .reduce((a, b) => {
          return a + b;
        }) / post.userCompliances.length;
  }

  //filter out the nulls so average will be accurate
  const allAverages = [userAverage, expertAverage, aiAverage].filter(
    (category) => {
      return category !== null;
    }
  );

  //average the available values together, and return the % value
  const averageTruthiness =
    allAverages.reduce((a, b) => {
      return a + b;
    }) / allAverages.length;

  //divisiveness is the max average response - the min average response
  //the max this can be is 2, so we divide the result by 2
  //this results in a percentage value that represents how divisive something is
  //for example 100% divisiveness would display if:
  // ai compliance was 1 and expert compliance was -1
  const getDivisivness = (allAverages) => {
    const maxValue = Math.max(...allAverages);
    const minValue = Math.min(...allAverages);

    return `${maxValue - (minValue / 2) * 100}%`;
  };

  const divisivness = getDivisivness(allAverages);

  return {
    truthiness: `${averageTruthiness * 100}%`,
    divisivness: divisivness,
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
