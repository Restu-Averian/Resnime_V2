/**
 *
 * @param {String} string
 */
const formatWord = (string) => {
  return string
    ?.split(" ")
    ?.map(
      (str) =>
        `${str?.charAt(0)?.toUpperCase()}${str?.slice(1)?.toLowerCase()}`,
    )
    ?.join(" ");
};
export default formatWord;
