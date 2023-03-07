var markers = {} ;

function searchChanged(map, box, person) {
    var places = box.getPlaces();

    if (!places) return;

    if (places.length == 0) {
        return;
    }

    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, place; place = places[i]; i++) {
        var image = {
            url: place.icon,
            size: new google.maps.Size(71, 71),
            origin: new google.maps.Point(0, 0),
            anchor: new google.maps.Point(17, 34),
            scaledSize: new google.maps.Size(25, 25)
        };

        if(markers[person]) markers[person].setMap(null);
        var mark = new google.maps.Marker({
            map: map,
            icon: image,
            title: person,
            position: place.geometry.location,
            draggable: true,
        });
        markers[person] = mark;

        bounds.extend(place.geometry.location);
    }

    map.fitBounds(bounds);
}

function initMap() {
    var latlng = new google.maps.LatLng(40.716948, -74.003563);
    var options = {
        zoom: 14, center: latlng,
        mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    var map = new google.maps.Map(document.getElementById("map"), options);

    var youBox = new google.maps.places.SearchBox((document.getElementById('you-input')));
    google.maps.event.addListener(youBox, 'places_changed', function () { searchChanged(map, youBox, "You"); });

    var per1Box = new google.maps.places.SearchBox((document.getElementById('per1-input')));
    google.maps.event.addListener(per1Box, 'places_changed', function () { searchChanged(map, per1Box, "Person1"); });
}

function initMapCallback() { }