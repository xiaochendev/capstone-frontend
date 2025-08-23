import * as Carousel from "./carousel.js";
// import axios from "axios";
axios.defaults.baseURL = "https://api.thecatapi.com/v1/";
axios.defaults.headers.common["x-api-key"] = "live_iK6exUwBqp25oCQXF5MQVOH41oLTQc7IyvmrNUig3193Q2SclRsLrpeVJ3qPWbhU";

// Axios Interceptors
axios.interceptors.request.use((request) => {
  request.metadata = request.metadata || {};
  request.metadata.startTime = new Date().getTime();
  console.log(`✈️ AXIOS Request sent!!: ${request.url}`);
  return request;
});

axios.interceptors.response.use(
  (response) => {
    const endTime = new Date();
    const startTime = response.config.metadata?.startTime || endTime;
    const duration = endTime - startTime;
    console.log(`✅ AXIOS Response received: ${response.config.url}; Request took (${duration} ms)`);
    return response;
  },
  (error) => {
    const endTime = new Date();
    const startTime = error.config?.metadata?.startTime || endTime;
    const duration = endTime - startTime;
    console.warn(`❌ AXIOS Request failed: ${error.config?.url}, Request took (${duration} ms)`);
    return Promise.reject(error);
  }
);


// The breed selection input element.
const breedSelect = document.getElementById("breedSelect");
// The information section div element.
const infoDump = document.getElementById("infoDump");
// The progress bar div element.
const progressBar = document.getElementById("progressBar");
// The get favourites button element.
const getFavouritesBtn = document.getElementById("getFavouritesBtn");

// Step 0: Store your API key here for reference and easy access.
const API_KEY = "live_iK6exUwBqp25oCQXF5MQVOH41oLTQc7IyvmrNUig3193Q2SclRsLrpeVJ3qPWbhU";
const API_URL = "https://api.thecatapi.com/v1/";


/**
 * 1. Create an async function "initialLoad" that does the following:
 * - Retrieve a list of breeds from the cat API using fetch().
 * - Create new <options> for each of these breeds, and append them to breedSelect.
 *  - Each option should have a value attribute equal to the id of the breed.
 *  - Each option should display text equal to the name of the breed.
 * This function should execute immediately.
 */
// //|----------------------------------UN-comment here to test 1 and 2 -----------------------------------------------|
// async function initialLoad(){
//   const url = `${API_URL}breeds?limit=10&page=0`;

//   try {
//     const res = await fetch(url, {
//       headers: {
//         'x-api-key': API_KEY
//       }
//     });
//     // console.log("Fetch response:", res);

//     if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);

//     const breeds = await res.json();

//     console.log("Fetched breeds:", breeds);

//     // display breed names in breedSelect
//     breeds.forEach((breed) => {
//       const option = document.createElement("option");

//       option.value = breed.id;
//       option.textContent = breed.name;
//       breedSelect.appendChild(option);
//     });

//   } catch (error) {
//     console.error("Failed to load breeds", error);
//   }
// }


// /**
//  * 2. Create an event handler for breedSelect that does the following:
//  * - Retrieve information on the selected breed from the cat API using fetch().
//  *  - Make sure your request is receiving multiple array items!
//  *  - Check the API documentation if you're only getting a single object.
//  * - For each object in the response array, create a new element for the carousel.
//  *  - Append each of these new elements to the carousel.
//  * - Use the other data you have been given to create an informational section within the infoDump element.
//  *  - Be creative with how you create DOM elements and HTML.
//  *  - Feel free to edit index.html and styles.css to suit your needs, but be careful!
//  *  - Remember that functionality comes first, but user experience and design are important.
//  * - Each new selection should clear, re-populate, and restart the Carousel.
//  * - Add a call to this function to the end of your initialLoad function above to create the initial carousel.
//  */
// // const url = `${API_URL}breeds/:breed_id`;  
// // const breeds = await fetch('https://api.thecatapi.com/v1/breeds', { headers: { 'x-api-key': API_KEY } }).then(res => res.json());
// // const selectedBreedInfo = breeds.find(breed => breed.id === breedId);

// async function handleBreedSelect() {
//   const selectedBreedId = breedSelect.value;
//   if (!selectedBreedId) return;

//   // Reset UI
//   Carousel.clear();
//   infoDump.innerHTML = "";
//   // Show progress bar
//   progressBar.style.width = "50%";

//    try {
//     const url = `${API_URL}images/search?breed_ids=${selectedBreedId}&limit=10`;

//     const res = await fetch(url, {
//       headers: {
//         "x-api-key": API_KEY,
//       },
//     });

//     if (!res.ok) throw new Error(`Error fetching breed data: ${res.status}`);

//     const cats = await res.json();
//     console.log("Fetched cat images:", cats);

//     // Stop if empty n return error msg
//     if (cats.length === 0) {
//       infoDump.innerHTML = `<p>No images found for this breed.</p>`;
//       return;
//     }

//     // Add images to carousel
//     cats.forEach(cat => {
//       const item = Carousel.createCarouselItem(cat.url, cat.breeds[0]?.name || "Cat", cat.id);
//       Carousel.appendCarousel(item);
//     });


//     // Build info section for the breed (from first cat object)
//     const breedInfo = cats[0].breeds[0];
//     if (breedInfo) {
//       const infoHTML = `
//         <h3>${breedInfo.name}</h3>
//         <p><strong>Origin:</strong> ${breedInfo.origin}</p>
//         <p><strong>Temperament:</strong> ${breedInfo.temperament}</p>
//         <p><strong>Description:</strong> ${breedInfo.description}</p>
//         <a href="${breedInfo.wikipedia_url}" target="_blank">Learn more on Wikipedia</a>
//       `;
//       infoDump.innerHTML = infoHTML;
//     }

//     // Restart carousel
//     Carousel.start();

//   } catch (err) {
//     console.error("Error fetching cat images:", err);
//   } finally {
//     // Hide progress bar
//     progressBar.style.width = "100%";
//     setTimeout(() => {
//       progressBar.style.width = "0%";
//     }, 1000);
//   }
// }

// //|----------------------------------End UN-comment here to test 1 and 2 -----------------------------------------------|


/**
 * 3. Fork your own sandbox, creating a new one named "JavaScript Axios Lab."
 */
/**
 * 4. Change all of your fetch() functions to axios!
 * - axios has already been imported for you within index.js.
 * - If you've done everything correctly up to this point, this should be simple.
 * - If it is not simple, take a moment to re-evaluate your original code.
 * - Hint: Axios has the ability to set default headers. Use this to your advantage
 *   by setting a default header with your API key so that you do not have to
 *   send it manually with all of your requests! You can also set a default base URL!
 */
async function initialLoad() {
  try {
    const res = await axios.get("breeds?limit=10&page=0");
    const breeds = res.data;

    // console.log("Fetched breeds:", breeds);

    breeds.forEach((breed) => {
      const option = document.createElement("option");
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });

    // Load initial breed
    if (breeds.length > 0) {
      breedSelect.selectedIndex = 0;
      handleBreedSelect();
    }
  } catch (err) {
    console.error("Failed to load breeds", err);
  }
}

async function handleBreedSelect() {
  const selectedBreedId = breedSelect.value;
  if (!selectedBreedId) return;

  Carousel.clear();
  infoDump.innerHTML = "";
  progressBar.style.width = "50%";

  try {
    const res = await axios.get(`images/search`, {
      params: {
        breed_ids: selectedBreedId,
        limit: 10
      }
    });

    const cats = res.data;
    console.log("Fetched cat images:", cats);

    if (cats.length === 0) {
      infoDump.innerHTML = `<p>No images found for this breed.</p>`;
      return;
    }

    cats.forEach(cat => {
      const item = Carousel.createCarouselItem(
        cat.url,
        cat.breeds[0]?.name || "Cat",
        cat.id
      );
      Carousel.appendCarousel(item);
    });

    const breedInfo = cats[0].breeds[0];
    if (breedInfo) {
      const infoHTML = `
        <h3>${breedInfo.name}</h3>
        <p><strong>Origin:</strong> ${breedInfo.origin}</p>
        <p><strong>Temperament:</strong> ${breedInfo.temperament}</p>
        <p><strong>Description:</strong> ${breedInfo.description}</p>
        <a href="${breedInfo.wikipedia_url}" target="_blank">Learn more on Wikipedia</a>
      `;
      infoDump.innerHTML = infoHTML;
    }

    Carousel.start();

  } catch (err) {
    console.error("Error fetching cat images:", err);
  } finally {
    progressBar.style.width = "100%";
    setTimeout(() => {
      progressBar.style.width = "0%";
    }, 1000);
  }
}


/*
 * 5. Add axios interceptors to log the time between request and response to the console.
 * - Hint: you already have access to code that does this!
 * - Add a console.log statement to indicate when requests begin.
 * - As an added challenge, try to do this on your own without referencing the lesson material.
 */



/**
 * 6. Next, we'll create a progress bar to indicate the request is in progress.
 * - The progressBar element has already been created for you.
 *  - You need only to modify its "width" style property to align with the request progress.
 * - In your request interceptor, set the width of the progressBar element to 0%.
 *  - This is to reset the progress with each request.
 * - Research the axios onDownloadProgress config option.
 * - Create a function "updateProgress" that receives a ProgressEvent object.
 *  - Pass this function to the axios onDownloadProgress config option in your event handler.
 * - console.log your ProgressEvent object within updateProgess, and familiarize yourself with its structure.
 *  - Update the progress of the request using the properties you are given.
 * - Note that we are not downloading a lot of data, so onDownloadProgress will likely only fire
 *   once or twice per request to this API. This is still a concept worth familiarizing yourself
 *   with for future projects.
 */

/**
 * 7. As a final element of progress indication, add the following to your axios interceptors:
 * - In your request interceptor, set the body element's cursor style to "progress."
 * - In your response interceptor, remove the progress cursor style from the body element.
 */
/**
 * 8. To practice posting data, we'll create a system to "favourite" certain images.
 * - The skeleton of this function has already been created for you.
 * - This function is used within Carousel.js to add the event listener as items are created.
 *  - This is why we use the export keyword for this function.
 * - Post to the cat API's favourites endpoint with the given ID.
 * - The API documentation gives examples of this functionality using fetch(); use Axios!
 * - Add additional logic to this function such that if the image is already favourited,
 *   you delete that favourite using the API, giving this function "toggle" functionality.
 * - You can call this function by clicking on the heart at the top right of any image.
 */
export async function favourite(imgId) {
  try {
    // Get current favourites
    const res = await axios.get("/favourites");
    const favourites = res.data;

    // Check if this image is already a favourite
    const existing = favourites.find(fav => fav.image_id === imgId);

    if (existing) {
      // If it's already a favourite, remove it
      await axios.delete(`/favourites/${existing.id}`);
      console.log(`Removed favourite: ${imgId}`);
    } else {
      // Otherwise, add it to favourites
      await axios.post("/favourites", { image_id: imgId });
      console.log(`Added favourite: ${imgId}`);
    }
  } catch (error) {
    console.error("Error toggling favourite:", error);
  }
}

/**
 * 9. Test your favourite() function by creating a getFavourites() function.
 * - Use Axios to get all of your favourites from the cat API.
 * - Clear the carousel and display your favourites when the button is clicked.
 *  - You will have to bind this event listener to getFavouritesBtn yourself.
 *  - Hint: you already have all of the logic built for building a carousel.
 *    If that isn't in its own function, maybe it should be so you don't have to
 *    repeat yourself in this section.
 */

/**
 * 10. Test your site, thoroughly!
 * - What happens when you try to load the Malayan breed?
 *  - If this is working, good job! If not, look for the reason why and fix it!
 * - Test other breeds as well. Not every breed has the same data available, so
 *   your code should account for this.
 */

// Run after page loads
document.addEventListener("DOMContentLoaded", () => {
  initialLoad();
  breedSelect.addEventListener("change", handleBreedSelect);

  breedSelect.selectedIndex = 0;
  handleBreedSelect(); // Load initial carousel
});

// await initialLoad();
// breedSelect.addEventListener("change", handleBreedSelect);
// breedSelect.selectedIndex = 0;
// handleBreedSelect(); // Load initial carousel