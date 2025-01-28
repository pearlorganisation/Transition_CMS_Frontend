import React from "react";

interface TabListProps {
  tabs: string[];
  activeTab: string;
  onTabClick: (tab: string) => void;
  navbarHeight: number;
}

const TabList: React.FC<TabListProps> = ({ tabs, activeTab, onTabClick, navbarHeight }) => {
  return (
    <div className="sticky bg-white  z-40" style={{ top: `${navbarHeight}px` }}>
      <div className="md:center md:w-[66.6%] md:px-[15%] mx-auto">
        <div role="tablist" className="tabs tabs-bordered">
          {tabs.map((tabName) => (
            <button
              key={tabName}
              role="tab"
              className={`font-mono tracking-wide text-[#5C5C5C] tab ${activeTab === tabName ? "tab-active" : ""}`}
              onClick={() => onTabClick(tabName)}
            >
              {tabName}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TabList;
