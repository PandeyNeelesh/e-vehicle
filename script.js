// Declare global variables
let map;
let markers = [];

// Initialize and display the map
function initMap() {
  const mapOptions = {
    center: { lat: 37.7749, lng: -122.4194 },
    zoom: 12,
  };

  map = new google.maps.Map(document.getElementById("map"), mapOptions);

  // Add event listener for marker click events
  map.addListener("click", closeInfoWindow);
}

// Fetch charging station data from your server or a third-party API
function getChargingStationData() {
  // Replace this placeholder code with actual code to fetch charging station data
  const chargingStationData = [
    {
      name: "Station 1",
      location: { lat: 37.773972, lng: -122.431297 }, // Charging station 1 coordinates
    },
    {
      name: "Station 2",
      location: { lat: 37.783723, lng: -122.408979 }, // Charging station 2 coordinates
    },
    // Add more charging station data as needed
  ];

  // Update markers on the map
  updateMarkers(chargingStationData);
}

// Update markers on the map based on charging station data
function updateMarkers(chargingStationData) {
  // Clear existing markers
  clearMarkers();

  // Loop through the charging station data and add new markers
  for (const station of chargingStationData) {
    addMarker(station);
  }
}

// Add a marker to the map for a charging station
function addMarker(station) {
  const marker = new google.maps.Marker({
    position: station.location,
    map: map,
    title: station.name,
  });

  // Create info window content
  const infoWindowContent = `<h3>${station.name}</h3>`;

  // Create info window for marker
  const infoWindow = new google.maps.InfoWindow({
    content: infoWindowContent,
  });

  // Add event listener for marker click
  marker.addListener("click", () => {
    // Close any previously open info window
    closeInfoWindow();

    // Open info window for clicked marker
    infoWindow.open(map, marker);
  });

  // Store the marker in the markers array
  markers.push(marker);
}

// Close the currently open info window
function closeInfoWindow() {
  for (const marker of markers) {
    marker.infoWindow.close();
  }
}

// Clear all markers from the map
function clearMarkers() {
  // Loop through the markers array and remove each marker from the map
  for (const marker of markers) {
    marker.setMap(null);
  }
  // Clear the markers array
  markers = [];
}

// Example function to show/hide charging station markers based on user selection
function toggleChargingStations(checked) {
  if (checked) {
    // Show markers on the map
    for (const marker of markers) {
      marker.setMap(map);
    }
  } else {
    // Hide markers from the map
    for (const marker of markers) {
      marker.setMap(null);
    }
  }
}

// Example function to zoom in to a specific marker
function zoomToMarker(markerIndex) {
  map.setZoom(15);
  map.setCenter(markers[markerIndex].getPosition());
}
