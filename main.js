import { createPlanetGraph, drawPlanets, verifyPlanets, drawSprite, makeWormholes} from 'planets.js';

// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Variables for dragging and map movement
let isDragging = false;
let dragStartX, dragStartY;
let offsetX = 0, offsetY = 0;

// Variables for touch dragging
let isTouchDragging = false;

// Zoom stuff 
let scale = 1;
const zoomFactor = 0.1;
const maxZoom = 3;
const minZoom = 0.5;

// Spore-related data
let totalSpores = 0;
let sporesPerSecond = 0;

const biomes = ['Wet', 'Rocky', 'Dry','Icy', 'Green','Wet', 'Rocky', 'Dry','Icy', 'Green', 'Volcanic','ManMade'];
const species = {
    0:[], // 0 means uninhabited
    1:['Skriptz', // Hostile towards others
       'Frunta', // Basically our analogy for the dutch
       'Margtargs', // Easy to symbiose with 
       'Minkletons' // Pretty boring, keep to themselves
    ],
    2:[
        'Ibbles', // Love of animals
        'cosínae', // Big friendly family
        'Mavs' // Humans
    ],
    3:[
        'Kittens', // Space Kittens
        'Dogs', // Space Dogs
        ],
};      






const techLevels = [0, 0, 0, 0, 1, 1, 1, 2, 2, 3]; // 4 0s, 3 1s, 2 2s, 1 3s, 0 4s
const maxTech = 4; 

// Initialize the game by creating planets
function reset() {
    var planets = createPlanetGraph(canvas, 40, biomes, species, techLevels); // Create 10 planets with random moons
    var wormholes = makeWormholes(planets)
    return planets
    
}
var planets = reset()


// Spore generation system (placeholder)
function updateSpores(planets) {
    const sporeCountEle = document.getElementById('sporeCount');
    planets.forEach(planet => {
        for (let i = 0; i < planet.moons.length; i++) {
          if (planet.moons[i].infected)
            sporesPerSecond += planet.moons[i].spores;
        }
        if (planet.infected) {
          sporesPerSecond += planet.spores;
        }
    });

    totalSpores += sporesPerSecond / 120; 
    // SporecountEle is our div element
    sporeCountEle.innerText = totalSpores;
    sporesPerSecond = 0; 
}


// Start the game loop
// Function to check if a point (x, y) is inside a planet's bounding box
function isPointInPlanet(x, y, planet) {
    const dx = x - (planet.x);
    const dy = y - (planet.y);
    ctx.fillRect(planet.x + offsetX, planet.y + offsetY, 64, 64);
    return Math.sqrt(dx * dx + dy * dy) < 64
}

// Show planet info when clicked
function showPlanetInfo(planet) {
    const infoBox = document.getElementById('planetInfo');
    const planetName = document.getElementById('planetName');
    const planetBiome = document.getElementById('planetBiome');
    const planetSpecies = document.getElementById('planetSpecies');
    const planetTechLevel = document.getElementById('planetTechLevel');
    const moonList = document.getElementById('moonList');
    const speciesIcon = document.getElementById('speciesIcon')
    const iconctx = speciesIcon.getContext('2d');
    iconctx.fillStyle = 'gray'; // Set space background
    iconctx.fillRect(0, 0, canvas.width, canvas.height); // Clear with black background
    planetName.textContent = planet.name;
    planetBiome.textContent = planet.biome;
    planetSpecies.textContent = planet.species || 'None';
    planetTechLevel.textContent = planet.techLevel;

    infoBox.style.display = 'block';
    console.log(planet.name)
    // Create a UL for each moon
    moonList.innerHTML = '';
    planet.moons.forEach(moon => {
        const moonItem = document.createElement('li');
        moonItem.textContent = `Moon: ${moon.biome} -Species: ${moon.species || 'None'}`;
        moonList.appendChild(moonItem);
    });
    infoBox.appendChild(moonList);
    if (planet.species){
        speciesIcon.style.display = 'block';
        drawSprite(iconctx, planet.species,0,0)
    } else {
        speciesIcon.style.display = 'none';
    }
}

// !! Begin Listeners 
// Zoom Attempt
canvas.addEventListener('wheel', (event) => {
    if (event.deltaY < 0) {
        scale = Math.min(scale + zoomFactor, maxZoom); // Zoom in
    } else {
        scale = Math.max(scale - zoomFactor, minZoom); // Zoom out
    }
    event.preventDefault();
});
// Touch zoom (pinch to zoom)
let initialDistance = null;
canvas.addEventListener('touchmove', (e) => {
    if (e.touches.length === 2) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (initialDistance) {
            if (distance > initialDistance) {
                scale = Math.min(scale + zoomFactor, maxZoom); // Pinch out -> zoom in
            } else {
                scale = Math.max(scale - zoomFactor, minZoom); // Pinch in -> zoom out
            }
        }
        initialDistance = distance;
    }
});
// Hide planet info
document.getElementById('closeInfo').addEventListener('click', () => {
    document.getElementById('planetInfo').style.display = 'none';
});

// Detect planet clicks (mouse click)
canvas.addEventListener('click', (e) => {
    const rect = canvas.getBoundingClientRect();
    const mouseX = (e.clientX - rect.left - offsetX) 
    const mouseY = (e.clientY - rect.top - offsetY) 

    for (let i = 0; i < planets.length; i++) {
        var planet_clicked = false; 
        const planet = planets[i];
        if (isPointInPlanet(mouseX, mouseY, planet)) {
            showPlanetInfo(planet); // Show the info pop-up for the clicked planet
            planet_clicked = true
            return;
        }

    } if (!planet_clicked) {
        document.getElementById('planetInfo').style.display = 'none';
    }
});

// Detect planet taps (touch)
canvas.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    const rect = canvas.getBoundingClientRect();
    const touchX = (touch.clientX - rect.left - offsetX) 
    const touchY = (touch.clientY - rect.top - offsetY) 

    for (let i = 0; i < planets.length; i++) {
        const planet = planets[i];
        if (isPointInPlanet(touchX, touchY, planet)) {
            showPlanetInfo(planet); // Show the info pop-up for the touched planet
            return;
        }
    }
});

// Event listeners for drag functionality (mouse and touch)
canvas.addEventListener('mousedown', (e) => {
    isDragging = true;
    dragStartX = e.clientX - offsetX;
    dragStartY = e.clientY - offsetY;
  
});
      function isPointInBody(x, y, body) {
            const dx = x - body.x;
            const dy = y - body.y;
            return Math.sqrt(dx * dy + dy * dy) < body.radius;
        }

canvas.addEventListener('mousemove', (e) => {
    if (isDragging) {
        offsetX = e.clientX - dragStartX;
        offsetY = e.clientY - dragStartY;
    }
  

    // Check if mouse is touching a planet
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    for (let i = 0; i < planets.length; i++) {
        const planet = planets[i];
        if (isPointInBody(mouseX, mouseY, planet)) {
            alert("Touching")
        }
    }
});

canvas.addEventListener('mouseup', () => {
    isDragging = false;
});

canvas.addEventListener('mouseleave', () => {
    isDragging = false;
});

// Touch dragging functionality
canvas.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];
    isTouchDragging = true;
    dragStartX = touch.clientX - offsetX;
    dragStartY = touch.clientY - offsetY;
});

canvas.addEventListener('touchmove', (e) => {
    if (isTouchDragging) {
        const touch = e.touches[0];
        offsetX = touch.clientX - dragStartX;
        offsetY = touch.clientY - dragStartY;
    }
});

canvas.addEventListener('touchend', () => {
    isTouchDragging = false;
});

// !! 
// Main game loop using requestAnimationFrame
function gameLoop() {
    updateSpores(planets); // Update spore generation logic
    drawPlanets(canvas, ctx, offsetX, offsetY, planets, scale);  // Redraw planets and moons with their updated positions
    requestAnimationFrame(gameLoop); // Continuously loop the game
}


gameLoop(planets);