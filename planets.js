
const spritesheet = new Image();
spritesheet.src = 'assets/spritesheet2.png'; // Path to your spritesheet

const planetSize = 64; // Size of planet sprites

const moonSize = planetSize / 4;
const minDistance = 100; // Minimum distance between planets and moons

// Orbit control for moons
const moonOrbitSpeeds = [];


// y is row, x is column
const spriteData = {
    // Stars are 2nd row, 1 2 3. 
    'Star1': { x: 0*planetSize, y: 0*planetSize, width: planetSize, height: planetSize  },
    'Star2': { x: 1*planetSize, y: 0*planetSize, width: planetSize, height: planetSize },
    'Star3': { x: 2*planetSize, y: 0*planetSize, width: planetSize, height: planetSize },
    'Wormhole':{x:3*planetSize, y: 0*planetSize, width: planetSize, height: planetSize},
    'Mushroom':{x:4*planetSize, y: 0*planetSize, width: planetSize, height: planetSize},
    'RockyPlanet':{ x: 0*planetSize, y: 1*planetSize, width: planetSize, height: planetSize },
    'WetPlanet':{ x: 1*planetSize, y: 1*planetSize, width: planetSize, height: planetSize },
    'DryPlanet':{ x: 2*planetSize, y: 1*planetSize, width: planetSize, height: planetSize },
    'IcyPlanet':{ x: 3*planetSize, y: 1*planetSize, width: planetSize, height: planetSize },
    'VolcanicPlanet':{ x: 4*planetSize, y:1*planetSize, width: planetSize, height: planetSize },
    'ManMadePlanet':{ x: 5*planetSize, y:1*planetSize, width: planetSize, height: planetSize },
    'GreenPlanet':{ x: 6*planetSize, y:1*planetSize, width: planetSize, height: planetSize },
    'Atmosphere0':{x: 0*planetSize, y: 2*planetSize, width: planetSize, height: planetSize},
    'Atmosphere1':{x: 1*planetSize, y: 2*planetSize, width: planetSize, height: planetSize},
    'Atmosphere2':{x: 2*planetSize, y: 2*planetSize, width: planetSize, height: planetSize},
    'Atmosphere3':{x: 3*planetSize, y: 2*planetSize, width: planetSize, height: planetSize},
    'Atmosphere4':{x: 4*planetSize, y: 2*planetSize, width: planetSize, height: planetSize},
    'Atmosphere5':{x: 5*planetSize, y: 2*planetSize, width: planetSize, height: planetSize},
    'Atmosphere6':{x: 6*planetSize, y: 2*planetSize, width: planetSize, height: planetSize},
    'Atmosphere7':{x: 7*planetSize, y: 2*planetSize, width: planetSize, height: planetSize},
    "Skriptz":{x: 0*planetSize, y: 3*planetSize, width: planetSize, height: planetSize},
    "Frunta":{x: 1*planetSize, y: 3*planetSize, width: planetSize, height: planetSize},
    "Margtargs":{x: 2*planetSize, y: 3*planetSize, width: planetSize, height: planetSize},
    "Minkletons":{x: 3*planetSize, y: 3*planetSize, width: planetSize, height: planetSize},
    "Ibbles":{x: 4*planetSize, y: 3*planetSize, width: planetSize, height: planetSize},
    "cosínae":{x: 5*planetSize, y: 3*planetSize, width: planetSize, height: planetSize},
    "Mavs":{x: 6*planetSize, y: 3*planetSize, width: planetSize, height: planetSize},
    "Dogs":{x: 0*planetSize, y: 4*planetSize, width: planetSize, height: planetSize},
    "Kittens":{x: 1*planetSize, y: 4*planetSize, width: planetSize, height: planetSize},


}
const biomeSpriteMap = {
    'Wet': 'WetPlanet',
    'Rocky': 'RockyPlanet',
    'Dry': 'DryPlanet',
    'Icy': 'IcyPlanet',
    'Green': 'GreenPlanet',
    'Volcanic': 'VolcanicPlanet',
    'ManMade': 'ManMadePlanet',
};


const planetNames = {
    'Skriptz': { 
        'Wet': ['Circuit Sea', 'Dataflow', 'Hydronet'],
        'Rocky': ['Harddrive Hills', 'Silicon Spires', 'Rockcode'],
        'Dry': ['Byte Dunes', 'Dust Cache', 'Deserted Servers'],
        'Icy': ['Frozen Cache', 'Cryoflux', 'Icefirewall'],
        'Green': ['Datagrove', 'Biosynth Forest', 'Green Code'],
        'Volcanic': ['Meltdown', 'Lavaflow Error', 'Overheat'],
        'ManMade': ['Codebase', 'Core City', 'Mechanized Hub']
    },
    'Frunta': { 
        'Wet': ['Watermeer', 'Slangenhaven', 'Vlot Nest'],
        'Rocky': ['Steenkrag', 'Slangrands', 'Bergsteen'],
        'Dry': ['Zandtong', 'Woestijnoog', 'Droogsteek'],
        'Icy': ['Ijstong', 'Slangenkou', 'Sneeuwstaart'],
        'Green': ['Groennest', 'Blad Slang', 'Bosrand'],
        'Volcanic': ['Vuurtong', 'Lavastaart', 'Rookgif'],
        'ManMade': ['Slangenmarkt', 'Handelstad', 'Industrie Slang']
    },    
    'Margtargs': { 
        'Wet': ['Bloodwater', 'Red River', 'Swamp of Fury'],
        'Rocky': ['Battle Crag', 'Warcliff', 'Skullstone'],
        'Dry': ['Scorched Sands', 'Dune of Bones', 'Bloodsand'],
        'Icy': ['Frostclash', 'Icefang', 'Glacier Warzone'],
        'Green': ['Hunter’s Vale', 'Fangwood', 'Bloodforest'],
        'Volcanic': ['Firefight', 'Moltenclash', 'Lava Pit'],
        'ManMade': ['Warfactory', 'Bloodforge', 'Iron Death']
    },
    'Minkletons': { 
        'Wet': ['Puddleland', 'Tiny Bay', 'Tinkertown Wetlands'],
        'Rocky': ['Pebble Hills', 'Cliffgarden', 'Gnome Ridge'],
        'Dry': ['Dusty Hollow', 'Little Sands', 'Quiet Dunes'],
        'Icy': ['Snowy Nook', 'Icecap Hill', 'Frosty Patch'],
        'Green': ['Leafy Glen', 'Tinywood', 'Meadow Garden'],
        'Volcanic': ['Steamworks', 'Tinker’s Forge', 'Hot Springs'],
        'ManMade': ['Tinker Town', 'Gnome City', 'Mechanica Village']
    },
    'Ibbles': { 
        'Wet': ['Lakepaw', 'Wetfurs', 'Fishhaven'],
        'Rocky': ['Clawcliffs', 'Rockpaw', 'Pawridge'],
        'Dry': ['Sandyburrow', 'Dusttail', 'Hightail'],
        'Icy': ['Frostpaws', 'Snowtail', 'Coldfang'],
        'Green': ['Pawforest', 'Furrymeadow', 'Leafpaw'],
        'Volcanic': ['Lavafur', 'Emberfang', 'Ashpaws'],
        'ManMade': ['Pet Haven', 'Clawdom', 'Enginepaw']
    },
    'cosínae': { 
        'Wet': ['hugwater', 'nearcove', 'warmbay'],
        'Rocky': ['cliffhug', 'noulderden', 'bearrock'],
        'Dry': ['buggydune', 'bearclaw Desert', 'softsand'],
        'Icy': ['snowhug', 'frostpaw Valley', 'icyfur Peaks'],
        'Green': ['foresthug', 'beargrove', 'furryvalley'],
        'Volcanic': ['hotpaw Ridge', 'firepaw Den', 'cinderclaw'],
        'ManMade': ['hugville', 'nearhouse', 'snugglecity']
    },
    'Mavs': { 
        'Wet': ['Oceana', 'Delta Prime', 'Aquaterra'],
        'Rocky': ['Rockwell', 'Stonehaven', 'Mount Grey'],
        'Dry': ['Sandwell', 'Dunesway', 'Aridson'],
        'Icy': ['Frostreach', 'Icewind', 'Glacial Heights'],
        'Green': ['Greenshade', 'Verdant Peak', 'Emerald Plains'],
        'Volcanic': ['Lavaside', 'Firewell', 'Smoky Ridge'],
        'ManMade': ['Neo Earth', 'Steelcity', 'Techworld']
    },
    'Kittens': {
        'Wet': ['Purrisland', 'Kitty Pool', 'Whisker Bay'],
        'Rocky': ['Scratching Post', 'Claw Canyon', 'Meowtain Range'],
        'Dry': ['Sandy Paw', 'Litterbox', 'Meowdune'],
        'Icy': ['Frosty Whiskers', 'Coldnap', 'Snowpaw Tundra'],
        'Green': ['Catnip Forest', 'Whiskerwood', 'Purrgreen Meadows'],
        'Volcanic': ['Furball Eruption', 'Lava Nap', 'Hotclaw Peak'],
        'ManMade': ['Nyan City', 'Meowropolis', 'Catspital']
    },
    'Dogs': {
        'Wet': ['Splashbone', 'Lakebark', 'Fetchwater Bay'],
        'Rocky': ['Bone Ridge', 'Howlstone', 'Diggin’ Canyon'],
        'Dry': ['Dusty Tail', 'Doghouse Dunes', 'Hotpaw Desert'],
        'Icy': ['Snowbark', 'Frostfetch', 'Cold Nose Peak'],
        'Green': ['Barkwood', 'Fetchington Park', 'Tailwag Grove'],
        'Volcanic': ['Lavafetch', 'Hotdog Hill', 'Molten Bone'],
        'ManMade': ['Dogopolis', 'Barktropolis', 'Sniff City']
}


};




// Function to draw a sprite from the spritesheet
export function drawSprite(ctx, spriteName, x, y, width = spriteData[spriteName].width, height = spriteData[spriteName].height) {
    const sprite = spriteData[spriteName];
    ctx.drawImage(spritesheet, sprite.x , sprite.y, 64, 64, x, y, width, height);
}
// Function to check distance between two points (for overlap prevention)
function distance(x1, y1, x2, y2) {
    return Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
}
// Function to get a random value from an array
function getRandom(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}
// Function to check if a planet/moon is too close to others
function isTooClose(x, y, objects, minDist) {
    for (let obj of objects) {
        if (distance(x, y, obj.x, obj.y) < minDist) {
            return true; // Too close
        }
    }
    return false;
}

// Create planets with random moons and tech levels, without overlapping
export function createPlanetGraph(canvas, numPlanets, biomes, species, techLevels) {
    const planets = [];
    console.log(planets)

    for (let i = 0; i < numPlanets; i++) {
        let planetX, planetY;

        // Ensure planets don't overlap
        do {
            planetX = Math.random() * canvas.width * 2 - canvas.width;
            planetY = Math.random() * canvas.height * 2 - canvas.height;
        } while (isTooClose(planetX, planetY, planets, minDistance) && 
        distance(planetX, planetY, canvas.width/2, canvas.height+2) < minDistance*10);

        let planet = makePlanet(planetX, planetY, getRandom(biomes));

        // Randomly add moons (0-4) to each planet, ensuring no overlap
        let numMoons = Math.floor(Math.random() * 5);

        for (let j = 0; j < numMoons; j++) {
            let moonX, moonY, distanceFromPlanet;

            // Ensure moons don't overlap with each other or the planet
            do {
                distanceFromPlanet = Math.random() * 30 + 25 + (j * 5); // Distance from planet?
                moonX = planet.x + Math.random() * distanceFromPlanet * 2 - distanceFromPlanet;
                moonY = planet.y + Math.random() * distanceFromPlanet * 2 - distanceFromPlanet;
            } while (isTooClose(moonX, moonY, planet.moons, moonSize) || distance(moonX, moonY, planet.x, planet.y) < moonSize * 2);
            let planetaryBiomes = biomes;
            planetaryBiomes.push(planet.biome);
            let moonBiome = getRandom(planetaryBiomes);
            let moon = makeMoon(moonX, moonY, moonBiome, distanceFromPlanet);
            planet.moons.push(moon);

            // Determine moon's orbit speed (closer moons orbit faster)
            moonOrbitSpeeds.push(0.0003 * (150 - distanceFromPlanet) + (Math.random()/100)); // Speed based on distance
        }

        // Randomly add tech level stars to planets
        if (planet.biome == 'ManMade') {
            planet.techLevel = 3;
        } else {
        planet.techLevel = getRandom(techLevels);
        }
        if (planet.techLevel > 0) {
            planet.species = getRandom(species[planet.techLevel]);

            
            planet.name = getRandom(planetNames[planet.species][planet.biome]);
            
        }
        
        if (planet.techLevel > 1) {
            for (let j = 0; j < planet.moons.length; j++) {
                // 50% chance for each moon to be inhabited if tech level 3
                // 10% chance if tech level 2
                // + 10% chance if biome is matching planet 
                let inhabited = Math.random() * 100 < (planet.techLevel === 3 ? 50 : 10) - (planet.moons[j].biome === planet.biome ? 10 : 0);

                planet.moons[j].species = inhabited ? planet.species : null;
            

        }
    }
    planets.push(planet);
}

    return planets;
}


function makePlanet(x, y, biome) {
    const planet = {
        x: x,
        y: y,
        name: null,
        biome: biome,
        connected: false,
        connections: [],
        techLevel: null,
        species: null,   
        infected: false,
        fruitBodies: [],
        moons: [],
        spores: 0,
        maxSpores: Math.random() * (50 ** (Math.random()*3)),
        atmosphere: Math.random() > 0.5,
        atmosphere_frame: Math.floor(Math.random()*50%8) 
    };
    return planet;
}

function makeMoon(x, y, biome, distanceFromPlanet){
    const moon = {
        x: x,
        y: y,
        biome: biome,
        distanceFromPlanet: distanceFromPlanet,
        angle: Math.random() * 2 * Math.PI, //Random initial angle for orbit
        species: null,  
        infected: false,
        fruitBodies: [],
        spores: 0,
        maxSpores: Math.random() * 10 ** Math.random(1,3),
    };
    return moon;
}

// Render the planet graph
export function drawPlanets(canvas, ctx, offsetX, offsetY, planets) {
    ctx.fillStyle = 'black'; // Set space background
    ctx.fillRect(0, 0, canvas.width, canvas.height); // Clear with black background

    // Draw connections between planets (interplanetary trade and spore propagation)
    drawConnections(ctx, planets, offsetX, offsetY, );

    planets.forEach(planet => {
        // Draw planet
      
        drawPlanet(ctx, planet.x + offsetX, planet.y + offsetY, planet.biome, planet.techLevel);
        
        if (planet.atmosphere) {
            let sprite_name = "Atmosphere"+planet.atmosphere_frame
            drawSprite(ctx, sprite_name, planet.x + offsetX, planet.y + offsetY);
            planet.atmosphere_frame += 1;
            planet.atmosphere_frame = planet.atmosphere_frame % 8;
        }
        // Draw moons and animate their orbits
        planet.moons.forEach((moon, index) => {
            // Update moon's position based on its orbit
            moon.angle += moonOrbitSpeeds[index]; // Orbit speed based on proximity
            moon.x = planet.x + Math.cos(moon.angle) * moon.distanceFromPlanet;
            moon.y = planet.y + Math.sin(moon.angle) * moon.distanceFromPlanet;

            // Draw connection line between planet and moon (fainter)
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)'; // Fainter line
            ctx.beginPath();
            ctx.moveTo(planet.x + offsetX + planetSize / 2 , planet.y + offsetY + planetSize / 2);
            ctx.lineTo(moon.x + offsetX + moonSize / 2, moon.y + offsetY + moonSize / 2);
            ctx.stroke();

            // Draw moon
            drawMoon(ctx, moon.x + offsetX, moon.y + offsetY, moon.biome);
        });
    });
}

// Function to draw a planet with a specific biome and tech level
function drawPlanet(ctx, x, y, biome, techLevel) {
    // Draw planet sprite based on biome
    drawSprite(ctx, biomeSpriteMap[biome], x, y);

    // Draw tech level stars
    if (techLevel > 0) {
        let starSprite = `Star${techLevel}`;  // Select the correct star sprite based on tech level
        drawSprite(ctx, starSprite, x, y-planetSize); // Draw the star over the planet
    }
}
// Function to draw a moon with a specific biome
function drawMoon(ctx, x, y, biome) {
    const scaledSize = moonSize ;
    ctx.fillStyle = getBiomeColor(biome);
    ctx.fillRect(x , y , scaledSize, scaledSize);
}

// Utility function to get color based on biome
function getBiomeColor(biome) {
    switch (biome) {
        case 'Wet': return '#3498db'; // Blue for Wet
        case 'Rocky': return '#95a5a6'; // Grey for Rocky
        case 'Dry': return '#e67e22'; // Orange for Dry
        case 'Green': return '#2ecc71'; // Green for Green biome
        case 'Volcanic': return '#e74c3c'; // Red for Volcanic
        default: return '#ffffff'; // White for default
    }
}

// Draw lines between planets to show connections
function drawConnections(ctx, planets, offsetX = 0, offsetY = 0,) {
    ctx.strokeStyle = '#ffffff'; // White lines for interplanetary trade
    ctx.lineWidth = 1;

    for (let i = 0; i < planets.length; i++) {
        for (let j = i + 1; j < planets.length; j++) {
            const planetA = planets[i];
            const planetB = planets[j];

            // Draw line if within certain distance (indicating trade routes or spore spread)
            if (distance(planetA.x, planetA.y, planetB.x, planetB.y) < 400) {
                ctx.beginPath();
                ctx.moveTo(planetA.x + offsetX + planetSize /2, planetA.y + offsetY + planetSize /2);
                ctx.lineTo(planetB.x + offsetX + planetSize /2, planetB.y + offsetY + planetSize /2);
                ctx.stroke();
            }
        }
    }
}


export function verifyPlanets(planets) {
    let planetCount = planets.length;
    for (let i = 0; i < planets.length; i++) {
        for (let j = i + 1; j < planets.length; j++) {
            const planetA = planets[i];
            const planetB = planets[j];

            // Draw line if within certain distance (indicating trade routes or spore spread)
            if (distance(planetA.x, planetA.y, planetB.x, planetB.y) < 350) {
                planetA.connected = true
                planetA.connections.push(planetB);
            }   
        }

}
}
function dfs(g, start){
    const stack = [start];
    const vis = new Set();
    const res = [];
    while (stack.length) {
        const vert = stack.pop();

        if (!vis.has(vert)){
            vis.add(vert)
            res.push(vert)

            for (const neighbour of vert.connections){
                stack.push(neighbour)}
            
        }
    }
    return res;
}

function dfs2(node){
    if (!node) {
        return [];
    }

    const stack = [node];
    const result = [];

    while (stack.length > 0) {
        const current = stack.pop();
        result.push(current.value)

        if(current.connections){
            for(const neighbour in current.connections){
                stack.push(neighbour)
            }
        }
    }
    return result;
}

export function makeWormholes(planets){
    var wormholes = []
    var visitedPlanets = [];
    var activeWormhole = 0
    while (visitedPlanets.length < planets.length){
        var planet;
        do{planet = getRandom(planets)}
        while(visitedPlanets.includes(planet))
        visitedPlanets.push(planet)
        var children = dfs2(planet);
        console.log(children)
        for(let i=0;i<children.length;i++){
            if(!visitedPlanets.includes(children[i])){
                visitedPlanets.push(children[i])
            }
        }
        
        if(visitedPlanets.length != planets.length && !activeWormhole){
            activeWormhole = getRandom(visitedPlanets)
        }
    }
    return wormholes
    }

