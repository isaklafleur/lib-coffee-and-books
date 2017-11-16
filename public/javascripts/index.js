document.addEventListener("DOMContentLoaded", () => {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 7
  });

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      position => {
        const center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        map.setCenter(center);
        getShop();
      },
      () => {
        console.error("Error in the geolocation service.");
        const ironhackBCN = {
          lat: 41.3977381,
          lng: 2.090471916
        };
        map.setCenter(ironhackBCN);
        getShop();
      }
    );
  } else {
    console.error("Browser does not support geolocation.");
  }

  const geocoder = new google.maps.Geocoder();

  document.getElementById("submit").addEventListener("click", () => {
    geoCodeAddress(geocoder, map);
  });

  function geoCodeAddress(geocoder, resultsMap) {
    const address = document.getElementById("address").value;
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK") {
        resultsMap.setCenter(results[0].geometry.location);

        const icon = {
          path: "M-20,0a20,20 0 1,0 40,0a20,20 0 1,0 -40,0",
          fillColor: "#FF0000",
          fillOpacity: 0.6,
          anchor: new google.maps.Point(0, 0),
          strokeWeight: 0,
          scale: 1
        };

        const marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location,
          icon: icon
        });
        document.getElementById(
          "latitude"
        ).value = results[0].geometry.location.lat();
        document.getElementById(
          "longitude"
        ).value = results[0].geometry.location.lng();
      } else {
        alert(`Geocode was not successful for the following reason: ${status}`);
      }
    });
  }

  function getShop() {
    axios
      .get("http://localhost:3000/api")
      .then(response => {
        placeShops(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  function placeShops(shops) {
    shops.forEach(shop => {
      const center = {
        lat: shop.location.coordinates[1],
        lng: shop.location.coordinates[0]
      };
      const marker = new google.maps.Marker({
        position: center,
        map,
        title: shop.name
      });
    });
  }
});
