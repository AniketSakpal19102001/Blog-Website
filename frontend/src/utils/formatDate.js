const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { day: "numeric", month: "short", year: "numeric" };

  const day = date.toLocaleString("en-US", { day: "numeric" });
  const month = date.toLocaleString("en-US", { month: "short" });
  const year = date.toLocaleString("en-US", { year: "numeric" });

  return `${day} ${month}, ${year}`;
};

export default formatDate;
