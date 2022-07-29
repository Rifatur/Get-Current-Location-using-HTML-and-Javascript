const button = document.querySelector("button");
const ShowData = document.getElementById("showbtn")

button.addEventListener("click", () => {
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }
});

function onSuccess (possition){
    let{latitude, longitude} = possition.coords
  
    fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${"aee1286cfcfa4cb2847023afa2baf12b"}`)
    .then(response => response.json()).then(result => {
        let allDetails = result.results[0].components;
        let {state_district,country} = allDetails;
        console.log(allDetails);
        ShowData.innerText =`${state_district},${country}`;
    })
}
function onError(error){
    console.log(error);
    if(error.code == 1 ){
        button.innerHTML("You Denied the request");
    }
    else if(error.code == 2){
        button.innerHTML("Location Not available");
    }
    else{
        button.innerHTML("Somting went wrong");
    }
    button.setAttribute("disabled", "true");

}