const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let ready = false
let imagesLoaded = 0
let totalImages = 0

// Unsplash API
const count = 30;
const imageOrientation = 'portrait'
const apiKey = '-H_8kX0xcg8yJHaBSNj0M4IwAU5EQetemgzhhFUG-Ao';
const apiUrl = `https://api.unsplash.com/photos/random?client_id=${apiKey}&orientation=${imageOrientation}&count=${count}`;

function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true
        loader.hidden = true
        console.log(ready)
    }
}

// Helper Function to Set Attributes on DOM Elements
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// Create Elements For Links & Photos, Add to DOM
function displayPhotos() {
    //also ni menyre tjeter per me rregullu 
    //imagesLoaded = 0
    //totalImages = photosArray.length
    totalImages += photosArray.length
    console.log(totalImages)
  // Run function for each object in photosArray
  photosArray.forEach((photo) => {
    // Create <a> to link to full photo
    const item = document.createElement('a');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });
    // Create <img> for photo
    const img = document.createElement('img');
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });


    img.addEventListener('load', imageLoaded)

    // Put <img> inside <a>, then put both inside imageContainer Element
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from Unsplash API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
  } catch (error) {
    // Catch Error Here
  }
}

// Check to see if scrolling near bottom of page, Load More Photos
window.addEventListener('scroll', () => {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
      ready = false;
    getPhotos();
  }
});

// On Load
getPhotos();
