async function getImages(query) {
    const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&client_id=xLDIF5bhv9kEy_Kzn-trghoB8qrvzHGEfrDTdUNogzw`);
    const json = await response.json();
    renderImages(json.results);
  }
  
  function renderImages(data) {
    const thumbs = document.getElementById("thumbs");
    thumbs.innerHTML = "";
  
    const displayImage = document.getElementById("displayImage");
    if (data.length > 0) {
      displayImage.src = data[0].urls.full;
      displayImage.alt = data[0].alt_description;
    }
  
    data.forEach((imageObj) => {
      const img = document.createElement("img");
      img.src = imageObj.urls.full;
      img.alt = imageObj.alt_description;
      img.tabIndex = data.indexOf(imageObj);
  
      const updateDisplayImage = () => {
        displayImage.src = imageObj.urls.full;
        displayImage.alt = imageObj.alt_description;
        document.querySelectorAll('img').forEach(img => img.classList.remove('selected'));
        img.classList.add('selected');
      };
  
      img.addEventListener("keypress", (event) => event.key === "Enter" && updateDisplayImage());
      img.addEventListener("click", updateDisplayImage);
  
      thumbs.appendChild(img);
    });
  }
  
  document.addEventListener("DOMContentLoaded", () => getImages("dog"));
  
  const form = document.getElementById("searchForm");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const myQuery = event.target.myQuery.value;
    getImages(myQuery);
  });
  
  const hideBtn = document.getElementById('hideThumbs');
  hideBtn.addEventListener('click', () => {
    thumbs.classList.toggle('hidden');
    form.classList.toggle('hidden');
    hideBtn.classList.toggle('butLeft');
  });