function initMap() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: {lat: 41.85, lng: -87.65}
    });
    directionsDisplay.setMap(map);

    var onChangeHandler = function() {
        calculateAndDisplayRoute(directionsService, directionsDisplay);
    };
    document.getElementById('start').addEventListener('change', onChangeHandler);
    document.getElementById('end').addEventListener('change', onChangeHandler);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
    var waypts = [];
    //waypts.push({
    //             location: 'chicago, il',
    //             stopover: true
    //           });

    //waypts.push({
    //             location: 'madison, wi',
    //             stopover: true
    //           });
    directionsService.route({
        origin: document.getElementById('start').value,
        destination: document.getElementById('end').value,
        waypoints: waypts,
        travelMode: 'DRIVING'
    }, function(response, status) {
        if (status === 'OK') {
            directionsDisplay.setDirections(response);

            var legs = response.routes[0].legs;

            var totalTime = 0;
            var totalDistance = 0;
            for (var i = 0; i  < legs.length; i ++) {
                totalDistance += legs[i].distance.value;
                totalTime += legs[i].duration.value;
            }
            document.getElementById("side-panel").innerHTML = totalTime/60;
        } else {
            window.alert('Directions request failed due to ' + status);
        }
    });
}