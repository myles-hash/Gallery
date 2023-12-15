// make our API call to unsplash and get images
async function getImages(query) {
  // make a fetch call to unsplash
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&client_id=xLDIF5bhv9kEy_Kzn-trghoB8qrvzHGEfrDTdUNogzw`
  );

  // turn my response into JSON
  const json = await response.json();
  console.log(json);
  // return the image
  renderImages(json.results);
}

// use the response from unsplash to change the image on the page
function renderImages(data) {
  // remove old images
  document.getElementById("thumbs").innerHTML = "";


  // create a new display image element
const displayImage = document.getElementById("displayImage");

// set the initial display image to the first image from the thumbnails
if (data.length > 0) {
  displayImage.src = data[0].urls.full;
  displayImage.alt = data[0].alt_description;
}

  // loop through my results and render an image for each item
  data.forEach(function (imageObj) {
    // create a new img tag
    const img = document.createElement("img");
    

    // set the src and all of my new img tag
    img.src = imageObj.urls.full;
    img.alt = imageObj.alt_description;
    img.tabIndex = data[imageObj];

    img.addEventListener("keypress", function(event) {
      if (event.key === "Enter") {
          displayImage.src = imageObj.urls.full;
          displayImage.alt = imageObj.alt_description;
          const allImages = document.querySelectorAll('img');
          allImages.forEach(image => image.classList.remove('selected'));
          img.classList.add('selected');
      } });

    const displayImage = document.getElementById("displayImage");

    img.addEventListener('click', () => {
      displayImage.src = imageObj.urls.full;
      displayImage.alt = imageObj.alt_description;
      const allImages = document.querySelectorAll('img');
      allImages.forEach(image => image.classList.remove('selected'));
      img.classList.add('selected');
      });
  
    // append my image to the page
    document.getElementById("thumbs").appendChild(img);
  });
}

document.addEventListener("DOMContentLoaded", function () {
  getImages("dog");
});
// take user input to affect the unsplash query
const form = document.getElementById("searchForm");

form.addEventListener("submit", function (event) {
  // the form is automatically passed the event as a param, which gives us access to:
  event.preventDefault();

  const myQuery = event.target.myQuery.value;
  getImages(myQuery);

});


let hideBtn = document.getElementById('hideThumbs');
hideBtn.addEventListener('click',() => {
  document.getElementById("thumbs").classList.toggle('hidden');
  document.getElementById('searchForm').classList.toggle('hidden');
  hideBtn.classList.toggle('butLeft');
});

