'use strict';

// put your own value below!

const apiKey = 'jeIesY0BlVSuyxeWCJ7EhqBMUWewq7FH5Z4Sf1Bg'; 
const searchURL = `https://developer.nps.gov/api/v1/parks`;

function formatQueryParams(params) {
  const queryItems = Object.keys(params)
    .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
  return queryItems.join('&');
}

function displayResults(responseJson) {
  // if there are previous results, remove them
  console.log(responseJson);
  $('#results-list').empty();
  // iterate through the items array
  for (let i = 0; i < responseJson.data.length; i++){
    let park = responseJson.data[i]
    // for each video object in the items 
    //array, add a list item to the results 
    //list with the video title, description,
    //and thumbnail
    $('#results-list').append(
      `<li><h3>${park.fullName}</h3>
      <p>${park.description}</p>
      <a href='${park.url}'>${park.fullName}</a>
      </li>`
    )};
  //display the results section  
  $('#results').removeClass('hidden');
};

function getComplexResults(query, maxResults=10) {
  const params = {
    api_key: apiKey,
    stateCode: query,
    limit: maxResults
  };
  const queryString = formatQueryParams(params)
  const url = searchURL + '?' + queryString;

  console.log(url);
  
  
  //good to go
  fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then(responseJson => displayResults(responseJson))
    .catch(err => {
      $('#js-error-message').text(`Something went wrong: ${err.message}`);
    });
}
//good to go
function watchForm() {
  $('form').submit(event => {
    event.preventDefault();
    const searchTerm = $('#js-search-term').val();
    const maxResults = $('#js-max-results').val();
    getComplexResults(searchTerm, maxResults);
  });
}

$(watchForm);