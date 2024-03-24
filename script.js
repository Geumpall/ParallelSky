const Api_Key = 'AIzaSyDUnv8unF8eyeWxNhfF37MAFUJ_2ipTeJQ'; // Google Geocoding API 키

        function generateRandomCoordinatesAndTime() {
            const randomLatitude = Math.random() * (90 - (-90)) + (-90);
            const randomLongitude = Math.random() * (180 - (-180)) + (-180);

            const randomCoordinates = document.getElementById('randomCoordinates');
            randomCoordinates.innerText = `${randomLatitude}, ${randomLongitude}`;

            const timestamp = Math.floor(new Date().getTime() / 1000);

            const timezoneUrl = `https://maps.googleapis.com/maps/api/timezone/json?location=${randomLatitude},${randomLongitude}&timestamp=${timestamp}&key=${Api_Key}`;
            fetch(timezoneUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'OK') {
                        const timeZoneId = data.timeZoneId;
                        const timeAtRandomLocation = document.getElementById('timeAtRandomLocation');
                        setInterval(() => {
                            const currentTime = new Date();
                            const timeAtLocation = currentTime.toLocaleTimeString('en-US', {timeZone: timeZoneId});
                            timeAtRandomLocation.innerText = `${timeAtLocation}`;
                        }, 1000);

                        getLocationName(randomLatitude, randomLongitude, function(locationName) {
                            const locationNameAtRandomLocation = document.getElementById('locationNameAtRandomLocation');
                            locationNameAtRandomLocation.innerText = locationName;
                        });
                    } else {
                        console.error('Failed to fetch timezone data:', data.error_message);
                    }
                })
                .catch(error => console.error('Error fetching timezone data:', error));
        }

        function getLocationName(latitude, longitude, callback) {
            const geocodingUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${Api_Key}`;
            
            fetch(geocodingUrl)
                .then(response => response.json())
                .then(data => {
                    if (data.status === 'OK') {
                        const address = data.results[0].formatted_address;
                        callback(address);
                    } else {
                        console.error('Failed to fetch location data:', data.error_message);
                    }
                })
                .catch(error => console.error('Error fetching location data:', error));
        }
        
        function showLocation(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
        
            const locationText = document.getElementById('locationText');
            locationText.innerText = `${latitude},${longitude}`;
        
            // Corrected parameter name from getLocationName to locationName
            getLocationName(latitude, longitude, function(locationName) {
                const userLocationName = document.getElementById('userLocationName');
                userLocationName.innerText = locationName;
            });
        
            const currentTime = document.getElementById('currentTime');
            setInterval(() => {
                const now = new Date();
                currentTime.innerText = `${now.toLocaleTimeString()}`;
            }, 1000);
        
            generateRandomCoordinatesAndTime();
        }
        
        function showError(error) {
            const locationText = document.getElementById('locationText');
            locationText.innerText = `Unable to retrieve your location (${error.code}): ${error.message}`;
        }
        
        if ("geolocation" in navigator) {
            navigator.geolocation.getCurrentPosition(showLocation, showError);
        } else {
            const locationText = document.getElementById('locationText');
            locationText.innerText = "Geolocation is not supported by your browser";
        }