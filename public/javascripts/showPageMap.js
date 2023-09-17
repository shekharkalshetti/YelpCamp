mapboxgl.accessToken = mapToken;
const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v12', // style URL
    center: campground.features.geometry.coordinates, // starting position [lng, lat]
    zoom: 10, // starting zoom
});

new mapboxgl.Marker()
    .setLngLat(campground.features.geometry.coordinates)
    .setPopup(
        new mapboxgl.Popup({ offset: 25 })
            .setHTML(
                `<h4> ${campground.title} </h4>`
            )
    )
    .addTo(map)

