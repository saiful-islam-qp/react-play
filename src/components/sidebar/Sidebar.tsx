import React from "react";

interface Props {}

export const SideBar: React.FC<Props> = ({}) => {
  return (
    <div className="sticky top-8 border-l border-gray-300 pl-4">
      <p className="mb-2 font-medium uppercase tracking-wider">On this page</p>
      <ul>
        <li className="mb-2">
          <a href="#overview">Overview</a>
        </li>
        <li className="mb-2">
          <a href="#usage">Usage</a>
        </li>
      </ul>
    </div>
  );
};
