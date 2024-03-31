const Api_Key = 'AIzaSyBcyfaAihhZ2sghktMI0qsaYxq6S9_Aq8s'; // 구글 지오코딩 API 키
let intervalIdRandomLocation; // 랜덤 지역 시간을 업데이트하는 setInterval의 ID를 저장하기 위한 변수

function generateRandomCoordinatesAndTime() {
    const randomLatitude = (Math.random() * (90 - (-90)) + (-90)).toFixed(7);
    const randomLongitude = (Math.random() * (180 - (-180)) + (-180)).toFixed(7);

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

                // 기존에 실행 중인 setInterval 함수를 제거
                clearInterval(intervalIdRandomLocation);

                // 새로운 setInterval 함수를 설정하고 ID를 저장
                intervalIdRandomLocation = setInterval(() => {
                    const currentTime = new Date();
                    const timeAtLocation = currentTime.toLocaleTimeString('en-US', {timeZone: timeZoneId, hour12: true});
                    timeAtRandomLocation.innerText = `${timeAtLocation}`;

                    // 배경색 설정 함수 호출
                    setBackgroundLeft(timeAtLocation); // 랜덤 좌표의 시간을 기준으로 설정
                }, 1000);

                    // setBackgroundRight 함수 호출
                    setBackgroundRight(currentTime.innerText); // 사용자의 현재 시간을 기준으로 배경색 설정

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

function setBackgroundLeft(timeAtLocation) {
    console.log("Time at random location:", timeAtLocation);

    // 시간대에 따라 다른 배경색을 설정
    let gradient;
    const currentTime = new Date();
    let hours = parseInt(timeAtLocation.split(':')[0]); // 시간을 추출
    const amPm = timeAtLocation.split(' ')[1]; // AM 또는 PM 확인

    // PM 시간대인 경우, 시간을 12시간 추가하여 24시간 단위로 변환
    if (amPm === "PM" && hours !== 12) {
        hours += 12;
    } else if (amPm === "AM" && hours === 12) { // 오전 12시는 0시로 변환
        hours = 0;
    }

    if (hours >= 0 && hours < 1) {
        gradient = 'linear-gradient(180deg, rgba(6, 0, 20, 1) 0%, rgba(6, 0, 20, 1) 100%)'; // 새벽
    } else if (hours >= 1 && hours < 2) {
        gradient = 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 3, 69, 1) 100%)'; // 아침
    } else if (hours >= 2 && hours < 3) {
        gradient = 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 4, 93, 1) 100%)'; // 오후
    } else if (hours >= 3 && hours < 4) {
        gradient = 'linear-gradient(180deg, rgba(0, 8, 49, 1) 0%, rgba(29, 79, 138, 1) 100%)'; // 오후
    } else if (hours >= 4 && hours < 5) {
        gradient = 'linear-gradient(180deg, rgba(0, 49, 124, 1) 0%, rgba(137, 113, 76, 1) 100%)'; // 오후
    } else if (hours >= 5 && hours < 6) {
        gradient = 'linear-gradient(180deg, rgba(0, 83, 207, 1) 0%, rgba(255, 192, 97, 1) 100%)'; // 오후
    } else if (hours >= 6 && hours < 7) {
        gradient = 'linear-gradient(180deg, rgba(38, 125, 255, 1) 0%, rgba(255, 230, 193, 1) 100%)'; // 오후
    } else if (hours >= 7 && hours < 8) {
        gradient = 'linear-gradient(180deg, rgba(38, 125, 255, 1) 0%, rgba(255, 244, 231, 1) 100%)'; // 오후
    } else if (hours >= 8 && hours < 9) {
        gradient = 'linear-gradient(180deg, rgba(38, 125, 255, 1) 0%, rgba(236, 241, 255, 1) 100%)'; // 오후
    } else if (hours >= 9 && hours < 10) {
        gradient = 'linear-gradient(180deg, rgba(6, 105, 255, 1) 0%, rgba(137, 163, 255, 1) 100%)'; // 오후
    } else if (hours >= 10 && hours < 12) {
        gradient = 'linear-gradient(180deg, rgba(0, 87, 255, 1) 0%, rgba(45, 107, 255, 1) 50%, rgba(117, 147, 255, 1) 100%)'; // 오후
    } else if (hours >= 12 && hours < 13) {
        gradient = 'linear-gradient(180deg, rgba(0, 56, 255, 1) 0%, rgba(35, 89, 255, 1) 50%, rgba(79, 118, 255, 1) 100%)'; // 오후
    } else if (hours >= 13 && hours < 16.5) {
        gradient = 'linear-gradient(180deg, rgba(0, 56, 255, 1) 0%, rgba(35, 89, 255, 1) 50%, rgba(120, 117, 255, 1) 100%)'; // 오후
    } else if (hours >= 16.5 && hours < 17) {
        gradient = 'linear-gradient(180deg, rgba(0, 56, 255, 1) 0%, rgba(32, 81, 255, 1) 30%, rgba(255, 189, 209, 1) 100%)'; // 오후
    } else if (hours >= 17 && hours < 18) {
        gradient = 'linear-gradient(180deg, rgba(32, 81, 255, 1) 0%, rgba(255, 147, 113, 1) 100%)'; // 오후
    } else if (hours >= 18 && hours < 19) {
        gradient = 'linear-gradient(180deg, rgba(32, 81, 255, 1) 0%, rgba(255, 111, 65, 1) 100%)'; // 오후
    } else if (hours >= 19 && hours < 20) {
        gradient = 'linear-gradient(180deg, rgba(14, 62, 233, 1) 0%, rgba(255, 111, 65, 1) 80%, rgba(255, 168, 0, 1) 100%)'; // 오후
    } else if (hours >= 20 && hours < 21) {
        gradient = 'linear-gradient(180deg, rgba(3, 0, 128, 1) 0%, rgba(255, 71, 46, 1) 90%, rgba(255, 138, 0, 1) 100%)'; // 오후
    } else if (hours >= 21 && hours < 22) {
        gradient = 'linear-gradient(180deg, rgba(2, 1, 85, 1) 0%, rgba(127, 0, 53, 1) 100%)'; // 오후
    } else if (hours >= 22 && hours < 23) {
        gradient = 'linear-gradient(180deg, rgba(0, 0, 7, 1) 0%, rgba(97, 1, 121, 1) 100%)'; // 오후
    } else if (hours >= 23 && hours < 23.5) {
        gradient = 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(72, 34, 82, 1) 100%)'; // 오후
    } else if (hours >= 23.5 && hours < 24) {
        gradient = 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(55, 55, 55, 1) 100%)'; // 오후
    }
    // 배경색 적용
    document.querySelector('.left-half').style.background = gradient;
    // 배경색이 어두운 경우에만 글자 색을 하얀색으로 변경
    const isDarkBackground = (hours >= 0 && hours < 6) || (hours >= 19 && hours < 24);
    const textColor = isDarkBackground ? 'white' : 'black';
    const textElements = document.querySelectorAll('.left-half p'); // 수정된 쿼리 선택자
    textElements.forEach(element => {
    element.style.color = textColor;
    });
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
                // 주소 정보가 정확하지 않은 경우, 다시 랜덤 좌표 생성 및 시간 정보 업데이트
                setTimeout(generateRandomCoordinatesAndTime, 5000); // 5초 후 다시 시도
            }
        })
        .catch(error => console.error('Error fetching location data:', error));
}

function refreshLeftHalf() {
    generateRandomCoordinatesAndTime();
}

function showLocation(position) {
    const latitude = position.coords.latitude.toFixed(7);
    const longitude = position.coords.longitude.toFixed(7);

    const locationText = document.getElementById('locationText');
    locationText.innerText = `${latitude},${longitude}`;

    getLocationName(latitude, longitude, function(locationName) {
        const userLocationName = document.getElementById('userLocationName');
        userLocationName.innerText = locationName;
    });

    const currentTime = document.getElementById('currentTime');
    setInterval(() => {
        const now = new Date();
        const timeString = now.toLocaleTimeString('en-US', { hour12: true });
        currentTime.innerText = `${timeString}`;
    }, 1000);
}


function setBackgroundRight(timeAtLocation) {
    console.log("Time at user's location:", timeAtLocation);

    // 시간대에 따라 다른 배경색을 설정
    let gradient;
    let hours = parseInt(timeAtLocation.split(':')[0]); // 시간을 추출
    const amPm = timeAtLocation.split(' ')[1]; // AM 또는 PM 확인

    // PM 시간대인 경우, 시간을 12시간 추가하여 24시간 단위로 변환
    if (amPm === "PM" && hours !== 12) {
        hours += 12;
    } else if (amPm === "AM" && hours === 12) { // 오전 12시는 0시로 변환
        hours = 0;
    }

    if (hours >= 0 && hours < 1) {
        gradient = 'linear-gradient(180deg, rgba(6, 0, 20, 1) 0%, rgba(6, 0, 20, 1) 100%)'; // 새벽
    } else if (hours >= 1 && hours < 2) {
        gradient = 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 3, 69, 1) 100%)'; // 아침
    } else if (hours >= 2 && hours < 3) {
        gradient = 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(0, 4, 93, 1) 100%)'; // 오후
    } else if (hours >= 3 && hours < 4) {
        gradient = 'linear-gradient(180deg, rgba(0, 8, 49, 1) 0%, rgba(29, 79, 138, 1) 100%)'; // 오후
    } else if (hours >= 4 && hours < 5) {
        gradient = 'linear-gradient(180deg, rgba(0, 49, 124, 1) 0%, rgba(137, 113, 76, 1) 100%)'; // 오후
    } else if (hours >= 5 && hours < 6) {
        gradient = 'linear-gradient(180deg, rgba(0, 83, 207, 1) 0%, rgba(255, 192, 97, 1) 100%)'; // 오후
    } else if (hours >= 6 && hours < 7) {
        gradient = 'linear-gradient(180deg, rgba(38, 125, 255, 1) 0%, rgba(255, 230, 193, 1) 100%)'; // 오후
    } else if (hours >= 7 && hours < 8) {
        gradient = 'linear-gradient(180deg, rgba(38, 125, 255, 1) 0%, rgba(255, 244, 231, 1) 100%)'; // 오후
    } else if (hours >= 8 && hours < 9) {
        gradient = 'linear-gradient(180deg, rgba(38, 125, 255, 1) 0%, rgba(236, 241, 255, 1) 100%)'; // 오후
    } else if (hours >= 9 && hours < 10) {
        gradient = 'linear-gradient(180deg, rgba(6, 105, 255, 1) 0%, rgba(137, 163, 255, 1) 100%)'; // 오후
    } else if (hours >= 10 && hours < 12) {
        gradient = 'linear-gradient(180deg, rgba(0, 87, 255, 1) 0%, rgba(45, 107, 255, 1) 50%, rgba(117, 147, 255, 1) 100%)'; // 오후
    } else if (hours >= 12 && hours < 13) {
        gradient = 'linear-gradient(180deg, rgba(0, 56, 255, 1) 0%, rgba(35, 89, 255, 1) 50%, rgba(79, 118, 255, 1) 100%)'; // 오후
    } else if (hours >= 13 && hours < 16.5) {
        gradient = 'linear-gradient(180deg, rgba(0, 56, 255, 1) 0%, rgba(35, 89, 255, 1) 50%, rgba(120, 117, 255, 1) 100%)'; // 오후
    } else if (hours >= 16.5 && hours < 17) {
        gradient = 'linear-gradient(180deg, rgba(0, 56, 255, 1) 0%, rgba(32, 81, 255, 1) 30%, rgba(255, 189, 209, 1) 100%)'; // 오후
    } else if (hours >= 17 && hours < 18) {
        gradient = 'linear-gradient(180deg, rgba(32, 81, 255, 1) 0%, rgba(255, 147, 113, 1) 100%)'; // 오후
    } else if (hours >= 18 && hours < 19) {
        gradient = 'linear-gradient(180deg, rgba(32, 81, 255, 1) 0%, rgba(255, 111, 65, 1) 100%)'; // 오후
    } else if (hours >= 19 && hours < 20) {
        gradient = 'linear-gradient(180deg, rgba(14, 62, 233, 1) 0%, rgba(255, 111, 65, 1) 80%, rgba(255, 168, 0, 1) 100%)'; // 오후
    } else if (hours >= 20 && hours < 21) {
        gradient = 'linear-gradient(180deg, rgba(3, 0, 128, 1) 0%, rgba(255, 71, 46, 1) 90%, rgba(255, 138, 0, 1) 100%)'; // 오후
    } else if (hours >= 21 && hours < 22) {
        gradient = 'linear-gradient(180deg, rgba(2, 1, 85, 1) 0%, rgba(127, 0, 53, 1) 100%)'; // 오후
    } else if (hours >= 22 && hours < 23) {
        gradient = 'linear-gradient(180deg, rgba(0, 0, 7, 1) 0%, rgba(97, 1, 121, 1) 100%)'; // 오후
    } else if (hours >= 23 && hours < 23.5) {
        gradient = 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(72, 34, 82, 1) 100%)'; // 오후
    } else if (hours >= 23.5 && hours < 24) {
        gradient = 'linear-gradient(180deg, rgba(0, 0, 0, 1) 0%, rgba(55, 55, 55, 1) 100%)'; // 오후
    }

    // 배경색 적용
    document.querySelector('.right-half').style.background = gradient;
    // 배경색이 어두운 경우에만 글자 색을 하얀색으로 변경
    const isDarkBackground = (hours >= 0 && hours < 6) || (hours >= 19 && hours < 24);
    const textColor = isDarkBackground ? 'white' : 'black';
    const textElements = document.querySelectorAll('.right-half p'); // 수정된 쿼리 선택자
    textElements.forEach(element => {
    element.style.color = textColor;
    });
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

const root = document.querySelector('html');

// Real cursor element
const cursor = document.createElement('div');
cursor.classList.add('cursor');
root.appendChild(cursor);

// Following extra cursor elements
const numFollowers = 10; // 원하는 follower의 수
const followers = [];
const delayBetweenFollowers = 120; // follower 간의 딜레이 (밀리초)
const easingFactor = 0.3; // 이동 속도를 결정하는 이징 팩터

for (let i = 0; i < numFollowers; i++) {
    const follower = document.createElement('div');
    follower.classList.add('cursor', 'cursor__follower');
    followers.push(follower);
    root.appendChild(follower);
}

root.addEventListener('mousemove', (e) => {
    setPosition(cursor, e);
    followers.forEach((follower, index) => {
        const delay = delayBetweenFollowers * (index + 0); // 각 follower에 대한 딜레이 설정
        setTimeout(() => setPosition(follower, e), delay);
    });
});

function setPosition(element, e) {
    element.style
    .transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
}

