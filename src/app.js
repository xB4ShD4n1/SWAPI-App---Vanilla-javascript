const apiBaseUrl = "https://swapi.dev/api";
const content = document.querySelector("#content");
const pagination = document.querySelector("#pagination");
let page = 1;

document.querySelector("#nav").addEventListener("click", (e) => {
  getData(e.target.textContent.trim().toLowerCase(), page);
});

async function getData(list, page) {
  debugger;
  try {
    const response = await fetch(`${apiBaseUrl}/${list}/?page=${page}`);
    const data = await response.json();
    displayData(data, list, page);
  } catch (error) {
    console.log(error);
    let errorInfo = error;
    const errorHTML = `
      <div class="error">
        <div>Oops!!<div>
        <div>Something go wrong: ${errorInfo}</div>
      </div>
    `;
    content.innerHTML = errorHTML;
  }
}

function displayData(data, list, page) {
  let elements = "";
  pagination.innerHTML = "";
  if (list === "people") {
    data.results.forEach((item) => {
      elements += `
            <div class="wrapper">
              <span><h6>${item.name}</h6></span>
              <span>Height: </span>${item.height}<br>
              <span>Mass: </span>${item.mass}<br>
              <span>Hair color: </span>${item.hair_color}<br>
              <span>Skin color: </span>${item.skin_color}<br>
              <span>Eye color: </span>${item.eye_color}<br>
              <span>Birth year: </span>${item.birth_year}<br>
              <span>Gender: </span>${item.gender}<br>
            </div>
        `;
    });
  }
  if (list === "planets") {
    data.results.forEach((item) => {
      elements += `
            <div class="wrapper">
              <span><h6>${item.name}</h6></span>
              <span>Rotation period: </span>${item.rotation_period}<br>
              <span>Orbital period: </span>${item.orbital_period}<br>
              <span>Diameter: </span>${item.diameter}<br>
              <span>Climate: </span>${item.climate}<br>
              <span>Gravity: </span>${item.gravity}<br>
              <span>Terrain: </span>${item.terrain}<br>
              <span>Surface water: </span>${item.surface_water}<br>
              <span>Population: </span>${item.population}<br>
            </div>
        `;
    });
  }
  if (list === "starships") {
    data.results.forEach((item) => {
      elements += `
            <div class="wrapper">
              <span><h6>${item.name}</h6></span>
              <span>Model: </span>${item.model}<br>
              <span>Manufacturer: </span>${item.manufacturer}<br>
              <span>Cost in credits: </span>${item.cost_in_credits}<br>
              <span>Length: </span>${item.length}<br>
              <span>Max atmosphering speed: </span>${item.max_atmosphering_speed}<br>
              <span>Crew: </span>${item.crew}<br>
              <span>Cargo capacity: </span>${item.cargo_capacity}<br>
              <span>consumables: </span>${item.consumables}<br>
              <span>Passengers: </span>${item.passengers}<br>
              <span>Hyperdrive rating: </span>${item.hyperdrive_rating}<br>
              <span>MGLT: </span>${item.MGLT}<br>
              <span>Starship class: </span>${item.starship_class}<br>
            </div>
        `;
    });
  }
  if (list === "vehicles") {
    data.results.forEach((item) => {
      elements += `
            <div class="wrapper">
              <span><h6>${item.name}</h6></span>
              <span>Model: </span>${item.model}<br>
              <span>Manufacturer: </span>${item.manufacturer}<br>
              <span>Cost in credits: </span>${item.cost_in_credits}<br>
              <span>Length: </span>${item.length}<br>
              <span>Max atmosphering speed: </span>${item.max_atmosphering_speed}<br>
              <span>Crew: </span>${item.crew}<br>
              <span>Passengers: </span>${item.passengers}<br>
              <span>Cargo capacity: </span>${item.cargo_capacity}<br>
              <span>Consumables: </span>${item.consumables}<br>
              <span>Vehicle class: </span>${item.vehicle_class}<br>
            </div>
        `;
    });
  }
  if (list === "films") {
    data.results.forEach((item) => {
      elements += `
            <div class="wrapper">
              <span><h6>${item.title}</h6></span><br>
              <span>Episode: </span>${item.episode_id}<br>
              <span>Opening crawl: </span>${item.opening_crawl}<br>
              <span>Director: </span>${item.director}<br>
              <span>Producer: </span>${item.producer}<br>
              <span>Release date: </span>${item.release_date}<br>
            </div>
        `;
    });
  }
  if (list === "species") {
    data.results.forEach((item) => {
      elements += `
            <div class="wrapper">
              <span><h6>${item.name}</h6></span>
              <span>Classification: </span>${item.classification}<br>
              <span>Designation: </span>${item.designation}<br>
              <span>Average height: </span>${item.average_height}<br>
              <span>Skin colors: </span>${item.skin_colors}<br>
              <span>Hair colors: </span>${item.hair_colors}<br>
              <span>Eye colors: </span>${item.eye_colors}<br>
              <span>Average lifespan: </span>${item.average_lifespan}<br>
              <span>Homeworld: </span>${item.homeworld}<br>
              <span>Language: </span>${item.language}<br>
            </div>
        `;
    });
  }
  content.innerHTML = elements;

  pagination.innerHTML += `
        <button 
          id="prevBtn" 
          onClick="getData('${list}', '${Number(page) - 1}')" 
          href="#" 
          role="button" 
          class="outline"
        >
          Prev.
        </button>
        <button 
          id="nextBtn" 
          onClick="getData('${list}', '${Number(page) + 1}')" 
          href="#" 
          role="button" 
          class="outline"
        >
          Next
        </button>
        <a class="results">${data.count} results</a>
    `;

  if (!data.next && !data.previous) {
    document.getElementById("nextBtn").disabled = true;
    document.getElementById("prevBtn").disabled = true;
  } else if (!data.previous) {
    document.getElementById("prevBtn").disabled = true;
  } else if (!data.next) {
    document.getElementById("nextBtn").disabled = true;
  }
}
