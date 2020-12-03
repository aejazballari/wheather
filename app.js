window.addEventListener("load", ()=>{
    let long;
    let lat;
    let temperartureDegree = document.querySelector(".temperature-degree");
    let temperatureDescription = document.querySelector(".temperature-description");
    let locationTimezone = document.querySelector(".location-timezone");
    let pic = document.querySelector(".icon");
    let temperatureSection = document.querySelector(".temperature");
    let temperatureSpan = document.querySelector(".temperature span");
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;
            console.log(position);

            const api = `http://api.weatherapi.com/v1/current.json?key=ecc3c70f490847f09a1144918200212&q=anantapur`;
            
            fetch(api)
                .then(response => {
                   return response.json();
                })
                .then(data => {   
                    const {temp_c, temp_f} = data.current;
                    const {text, icon} =  data.current.condition; 
                    temperartureDegree.textContent = temp_f;
                    temperatureDescription.textContent = text;
                    locationTimezone.textContent = data.location.tz_id;
                    pic.innerHTML = `<img src="${icon}" >`;
                    temperatureSection.addEventListener("click", () =>{
                        if(temperatureSpan.textContent === "F"){
                            temperartureDegree.textContent = temp_c;
                            temperatureSpan.textContent = "C";
                        } else {
                            temperartureDegree.textContent = temp_f;
                            temperatureSpan.textContent = "F";
                        }
                    })
                })
        })
    }
})