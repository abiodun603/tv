import style from './navbar-searchBox-history.module.scss';

export const SearchBoxHistory = ({ historyItems = [], onElementCLick }) => {
  // const getHistoryItemsList = (array) => {
  //   const queryStack = [];
  //   const outputArray = [];
  //   array.forEach((element) => {
  //     if (!queryStack.includes(element.query)) {
  //       queryStack.push(element.query);
  //       outputArray.push(element);
  //       return;
  //     }
  //   });
  //   return outputArray;
  // };

  return (
    <div className={style.searchHistory}>
      {historyItems.map((item) => (
        <span
          onClick={() => {
            onElementCLick(item.query);
          }}
          className={style.searchHistory__item}
          key={item.id}
        >
          {item.query}
        </span>
      ))}
    </div>
  );
};
