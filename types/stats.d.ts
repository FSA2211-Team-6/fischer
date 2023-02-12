declare global {
  interface SiteMap {
    id: number;
    name: string;
    count: number;
  }

  interface topSites {
    siteMap: Array<SiteMap>;
    posts: Array<Post>;
  }

  interface userComplianceStats {
    userCompliance: Array<UserCompliance>;
    sortedPosts: Array<Post>;
  }

  interface websiteTruth {
    truthinessValues: Array<number>;
    chartData: { hostSite: string; averageTruthiness: number | null };
  }
}

export {};
