'use strict';

// const apiKey = '24e55d012f8e4b09a53668b3783c5750'

const searchURL = 'https://api.github.com/users/';


function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson, maxResults) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the owner array, stopping at the max number of results
  for (let i = 0; i < responseJson.length & i < maxResults; i++){
    // for each video object in the items
    //array, add a list item to the results 
    //list with the article title, source, author,
    //description, and image
    $('#results-list').append(
      `<h3>${responseJson[i].full_name}</h3>
      <li>
      <p>Repo:<a href="${responseJson[i].owner.html_url}">${responseJson[i].name}</a></p>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getUserRepo(query, maxResults=10) {
  const params = {
    q: query,
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + query + '/repos';

  console.log(url);

  // const options = {
  //   headers: new Headers({
  //     "X-Api-Key": apiKey})
  // };

  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson, maxResults))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}

function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getUserRepo(searchTerm, maxResults);
  });
}

$(watchForm);