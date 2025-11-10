import React from "react";

export const SideBar: React.FC = () => {
  return (
    <div className="sticky top-8 border-l border-gray-300 pl-4">
      <p className="mb-2 font-medium uppercase tracking-wider">On this page</p>
      <ul className="text-sm flex flex-col gap-1">
        <li>
          <a href="#overview">Overview</a>
        </li>
        <li>
          <a href="#usage">Usage</a>
        </li>
      </ul>
    </div>
  );
};
