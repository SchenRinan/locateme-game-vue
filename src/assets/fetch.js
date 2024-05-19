const axios = require('axios');

async function fetchLandmarks(numLocations) {
  try {
    // Construct Overpass query to fetch tourist attractions
    const query = `
      [out:json];
      (
        node["tourism"="attraction"];
        way["tourism"="attraction"];
        relation["tourism"="attraction"];
      );
      out ${numLocations};
    `;

    // Send POST request to Overpass API
    const response = await axios.post('https://overpass-api.de/api/interpreter', { data: query });

    // Extract relevant information from the API response
    const landmarks = response.data.elements.map(element => ({
      name: element.tags.name || 'Unnamed Place',
      description: element.tags.description || 'No description available',
      coordinates: {
        latitude: element.lat,
        longitude: element.lon,
      },
      wikipedia_link: `https://en.wikipedia.org/wiki/${encodeURIComponent(element.tags.name)}`
    }));

    return landmarks;
  } catch (error) {
    console.error('Error fetching landmarks:', error);
    return [];
  }
}

// Example usage: Fetch 10 landmarks
fetchLandmarks(10)
  .then(landmarks => {
    console.log('Fetched landmarks:', landmarks);
  })
  .catch(error => {
    console.error('Error:', error);
  });
