const button = document.getElementById('search-button');

const input = document.getElementById('city-input');
const cityName = document.getElementById('city-name');
const cityTime = document.getElementById('city-time');
const cityTemp = document.getElementById('city-temp');
const userLocation = document.getElementById('user-location');

async function getData(cityName){
    const promise = await fetch(`http://api.weatherapi.com/v1/current.json?key=d7e06e44eb3e43859ec233729242211&q=${cityName}&aqi=yes`);
    console.log(promise);
    return await promise.json();
};

button.addEventListener('click', async ()=>{
    const value = input.value;
    const result = await getData(value);
    changePara(result);
});

async function getDatabycords(lat,long){
    const promise = await fetch(`http://api.weatherapi.com/v1/current.json?key=d7e06e44eb3e43859ec233729242211&q=${lat},${long}&aqi=yes`);

    return await promise.json();
};

async function getLocation(position){
    const result = await getDatabycords(position.coords.latitude,position.coords.longitude);
    input.value = result.location.name;
    changePara(result);
}

function failedLocation(){
    console.log('there was an error');
    cityName.innerText=`Location not found. Something goes wrong`;
}
// const test = document.getElementById('test');
// test.addEventListener('click', ()=>{
//     input.value = 'Lucknow';
// });

userLocation.addEventListener('click', async ()=>{
    navigator.geolocation.getCurrentPosition(getLocation,failedLocation);
})



function changePara(result){
    cityName.innerText=`${result.location.name} , ${result.location.region} , ${result.location.country}`;
    cityTime.innerText = result.location.localtime;
    cityTemp.innerText = `${result.current.temp_c} degree celcius`;
}