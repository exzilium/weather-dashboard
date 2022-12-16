// Search for City event listener
const cityValue = $("#searchForm").submit(function () {
  event.preventDefault();
  const userInput = $("#searchFormInput").val();
  console.log(userInput);
  return userInput;
});
