import SideBar from "./sideBar";
import Header from "./header";
import Stats from "./stats";

export const Layout = ({ children }: any) => {
  return (
    <main className="relative h-screen overflow-hidden bg-gray-100 dark:bg-gray-800">
      <div className="flex items-start justify-between">
        <SideBar />
        {/* middle section*/}
        <div className="flex flex-col w-full space-y-4">
          <Header />
          {/* middle section below header */}
          <div className="h-screen px-4 pb-24 overflow-auto md:px-6">
            <Stats />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};
