document.addEventListener("DOMContentLoaded", () => {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 10,
    center: { lat: 41.3977381, lng: 2.090471916 }
  });

  const geocoder = new google.maps.Geocoder();

  document.getElementById("submit").addEventListener("click", () => {
    geocodeAddress(geocoder, map);
  });

  function geocodeAddress(geocoder, resultsMap) {
    const address = document.getElementById("address").value;
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK") {
        resultsMap.setCenter(results[0].geometry.location);
        const marker = new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location
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
});
