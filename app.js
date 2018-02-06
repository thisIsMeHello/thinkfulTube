const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

//creates the query object to be sent
function getDataFromApi(searchTerm, callback) {
  const query = {
    maxResults: 20,
    part: 'snippet',
    key: 'AIzaSyBq5kuZ-vFnYlPDd4ikXepEDYYPEsk6cd4',
    q: `${searchTerm}`,
    type: 'video',
  };
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

function renderResult(result) {
  console.log(result);
  $('.js-thumbnailDiv').empty();
  for (let i=0; i<20; i++){
    let firstThumbnail = result.items[i].snippet.thumbnails.medium.url;
    let thumbID = result.items[i].id.videoId;
    let channelID = result.items[i].snippet.channelId;
    let channelTitle = result.items[i].snippet.channelTitle;
    let thumbnailHtml = `
      <figure class="grid returnedResult js-returnedResult">
        <div>
          <a class="thumbnail js-thumbnail" href="https://youtube.com/watch?v=${thumbID}"><img src="${firstThumbnail}"></a>
          <div class="channelTitle">${channelTitle}</div>
        </div>

        <div>
            <a class="moreFrom" href="https://youtube.com/channel/${channelID}">More from this channel</a>
        </div>
      </figure>
    `;
    $('.js-thumbnailDiv').append(thumbnailHtml);
  }
}


$('.js-thumbnailDiv').mouseover(function(){
  console.log("moused over");
  $('.js-thumbnail').attr('src', 'file:////home/dave/Nextcloud/Thinkful/projects/projectAJAX/images/download.png')
});

//Hide search icon on input, bring back on submit

$('.js-query').on('input', function(){
  $('.icon').addClass('hidden');
})

$('.js-search-form').on('submit', function(){
  $('.icon').removeClass('hidden');
})


function renderButtons(){
  $(".js-buttonsDiv").html(`
      <button class="previousPage">previous page</button>
      <button class="nextPage">next page</button>
    `);
}

$('.js-buttonsDiv').on("click", ".nextPage", function(event){
  console.log("next button clicked");
})

$('.js-buttonsDiv').on("click", ".previousPage", function(event){
  console.log("previous button clicked");
})

function watchSubmit() {
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    console.log(query);
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, renderResult);
    renderButtons();
  });
}

$(watchSubmit);

// .items["0"].snippet.thumbnails.high
