const listYear = () => {
  let now = new Date().getFullYear();
  let count = now - 100;
  let years = [];
  while (now > count) {
    years.push(now);
    --now;
  }
  return years;
};

export default listYear;
