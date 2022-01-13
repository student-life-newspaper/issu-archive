export const monthArr = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

export const issueSchoolYear = (date) => {
  const issueJSDate = new Date(date);
  const issueYear = issueJSDate.getFullYear();
  return (issueJSDate.getMonth() + 1) <= 6
    ? `${(issueYear - 1).toString()}-${issueYear.toString()}`
    : `${issueYear.toString()}-${(issueYear + 1).toString()}`;
};
