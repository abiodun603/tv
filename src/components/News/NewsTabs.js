import React from 'react';
import { Tabs, Tab } from 'react-tabs-scrollable';
import 'react-tabs-scrollable/dist/rts.css';

const NewsTabs = ({ categories }) => {
  // define state with initial value to let the tabs start with that value
  const [activeTab, setActiveTab] = React.useState(0);

  // define a onClick function to bind the value on tab click
  const onTabClick = (e, index) => {
    console.log(e);
    setActiveTab(index);
  };

  return (
    <Tabs activeTab={activeTab} onTabClick={onTabClick}>
      {/* generating an array to loop through it  */}
      {categories.map((item) => (
        <Tab key={item.key}>{item.label}</Tab>
      ))}
    </Tabs>
  );
};

export default NewsTabs;
