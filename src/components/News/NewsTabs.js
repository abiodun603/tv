import React from 'react';
import { Tabs, Tab } from 'react-tabs-scrollable';
import 'react-tabs-scrollable/dist/rts.css';

const NewsTabs = ({ activeTab = 0, categories, onTabSelected }) => {
  return (
    <Tabs activeTab={activeTab} onTabClick={onTabSelected}>
      {/* generating an array to loop through it  */}
      {categories.map((item) => (
        <Tab key={item.key}>{item.label}</Tab>
      ))}
    </Tabs>
  );
};

export default NewsTabs;
