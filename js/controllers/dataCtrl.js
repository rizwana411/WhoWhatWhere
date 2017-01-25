w3App.controller("dataCtrl", function ($scope, $http, $routeParams, $window) {
    var markers = [];
    var itemName = $routeParams.menuName;
    
    $('.title').css({visibility: 'visible'});
    $('#header').removeClass('header-con');
    
    var location = angular.element('#location').val();
    if (location.length < 1) {
        location = '';
    }

    $scope.fetchData = [];

    $http({
        method: 'GET',
        url: '/search?location=' + location + '&term=' + itemName + ''
    }).then(function successCallback(response) {

        var data = response.data;
        $scope.fetchData = data;
        loadGoogleMarkers();
    }, function errorCallback(response) {
        console.log('search data error', response);
    });

    loadGoogleMarkers();
    $scope.gotoMarker = function (event) {
        var id = event.currentTarget.id;

        for (var i = 0; i < markers.length; i++) {
            var marker = markers[i];
            if (marker.id === id) {
                $(marker).click();
            }
        }
    };

    $scope.gotoBusiness = function (url) {
        console.log('item', url);
        $window.open(url, '_blank');
    }

    function loadGoogleMarkers() {
        var locations = $scope.fetchData;
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 15,
            center: new google.maps.LatLng(-33.92, 151.25),
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var infowindow = new google.maps.InfoWindow();
        var bounds = new google.maps.LatLngBounds();

        var marker, i;

        function setPopup(item) {
            var contentString = '<div id="{{' + item.id + '}}" ng-mouseover="gotoMarker($event)">' +
                '<a class="item-name item-styles" href="'+item.url + '"  target="_blank"  >Name:' + item.name + '</a>' +
                '<p class="item-styles">Phone:' + item.phone + '</p>' +
                '<p class="item-styles">Address:' + item.address + '</p><p class="item-styles">Rating:' + item.rating + '</p></div>';
            return contentString;
        }

        for (i = 0; i < locations.length; i++) {

            var coords = locations[i].cords;
            marker = new google.maps.Marker({
                id: locations[i].id,
                position: new google.maps.LatLng(coords.lat, coords.lon),
                map: map
            });

            markers.push(marker);

            bounds.extend(marker.position);

            google.maps.event.addListener(marker, 'mouseover', (function (marker, i) {
                return function () {
                    infowindow.setContent(setPopup(locations[i]));
                    infowindow.open(map, marker);
                    $('.grid').css('background-color', '');
                }
            })(marker, i));
            google.maps.event.addListener(marker, 'click', (function (marker, i) {
                return function () {
                    $('#' + marker.id).css('background-color', "#ccc");
                    console.log( marker,$('#' + marker.id));
                    console.log( $('#' + marker.id).offset().top)
                    $('.right-div').animate({
                        scrollTop: $('#' + marker.id).offset().top - 130
                    }, 2000);
                }
            })(marker, i));
        }

        map.fitBounds(bounds);
    }

});
