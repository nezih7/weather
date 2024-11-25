async function weather(event){
	if (event.keyCode === 13 || event.type === "click") {
		city=document.getElementById('city').value;
	if (city=="") {
		alert("pick a city !!!");
		return;
	}
	comma = city.length - 3;
	virgule = city.lastIndexOf(",");
	if (virgule !== -1 && comma === virgule) {
    	console.log("correct");
	}else {
    	alert("Sysntax error");
    	return;
	}	
	//weather
	id="Add_Your_API_Key";
	requestString=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${id}`;
	data=await fetch(requestString);
	if (!data.ok) {
        alert("Not found");
        return;
    }
	response=await data.json();
	//console.log(response)
	//console.log(response);
	element1=document.getElementById("hr");
	element1.style.display="block";
	element2=document.getElementById("wn");
	element2.style.display="block";
						//temperature
	temp=Math.round(response.main.temp-273.15)+"°C";
	document.getElementById("degree").innerHTML=temp;
						//description
	desc=response.weather[0].description;
	document.getElementById("desc").innerHTML=desc;
						//wind
	windspeed=Math.round(response.wind.speed*3.6)+"Km/h";
	document.getElementById("vn").innerHTML=windspeed;
						//hours
	var sec = response.dt;
	var date = new Date(sec * 1000);
	var hoursUTC = date.getUTCHours();
	var minutes = date.getUTCMinutes();
	var tzOffsetSeconds = response.timezone; // Offset in seconds
	var tzOffsetHours = tzOffsetSeconds / 3600; // Convert seconds to hours
	var localHours = hoursUTC + tzOffsetHours;
	if (localHours < 0) {
    	localHours += 24;
	} else if (localHours >= 24) {
    	localHours -= 24;
	}
	var hours = (localHours < 10 ? '0' : '') + localHours;
	var minutesFormatted = (minutes < 10 ? '0' : '') + minutes;
	document.getElementById("ti").innerHTML = hours + ":" + minutesFormatted;
						//sunrize
	var sunriseSec = response.sys.sunrise;
	var datesunrise = new Date(sunriseSec * 1000);
	var hoursSunrise = datesunrise.getUTCHours();
	var hoursrize = hoursSunrise + tzOffsetHours;

// Ensure local sunrise hours stay within 0-23 range
	if (hoursrize < 0) {
    	hoursrize += 24;
	} else if (hoursrize >= 24) {
    	hoursrize -= 24;
	}
	console.log("sunrise "+hoursrize);
						//sunset
	var secset = response.sys.sunset;
	dateset = new Date(secset * 1000);
	hourssett = dateset.getUTCHours();
	hoursset = hourssett + tzOffsetHours;
	if (hoursset < 0) {
    	hoursset += 24;
	} else if (hoursset >= 24) {
    	hoursset -= 24;
	}
	console.log("sunset "+hoursset);
						//abreviation
	lasttwo=city.substring(city.length -2,city.length);
	requestStringC=`https://restcountries.com/v3.1/alpha/${lasttwo}`
	dataC=await fetch(requestStringC);
	//console.log(dataC);
	responseC=await dataC.json();
	//console.log(responseC);
	nom=responseC[0].name.common;
	document.getElementById('country').innerHTML=nom;
						//pics
	desc=desc.toUpperCase();
	if (desc=="CLEAR SKY") {
		if ((hours>=hoursrize)&&(hours<hoursset)) {
			document.getElementById("pic").src="skyclearday.png";
		}
		else{
			document.getElementById("pic").src="skyclearnight.png";
		}
	}
	if ((desc=="FEW CLOUDS")||(desc=="SCATTERED CLOUDS")) {
		if ((hours>=hoursrize)&&(hours<hoursset)) {
			document.getElementById("pic").src="sccloudsday.png";
		}
		else{
			document.getElementById("pic").src="sccloudsnight.png";
		}
	}
	if ((desc=="BROKEN CLOUDS")||(desc=="OVERCAST CLOUDS")) {
		if ((hours>=hoursrize)&&(hours<hoursset)) {
			document.getElementById("pic").src="overcastcloudsday.png";
		}
		else{
			document.getElementById("pic").src="overcastcloudsnight.png";

		}
	}
	if ((desc=="LIGHT RAIN")||(desc=="MODERATE RAIN")||(desc=="HEAVY RAIN")||(desc=="DRIZZLE")) {
		if ((hours>=hoursrize)&&(hours<hoursset)) {
			document.getElementById("pic").src="rainday.png";
		}
		else{
			document.getElementById("pic").src="rainnight.png";
		}
	}
	if ((desc=="HEAVY SNOW")||(desc=="MODERATE SNOW")||(desc=="LIGHT SNOW")) {
		if ((hours>=hoursrize)&&(hours<hoursset)) {
			document.getElementById("pic").src="snowday.png";
		}
		else{
			document.getElementById("pic").src="snownight.png";
		}
	}
	if ((desc=="THUNDERSTORM")||(desc=="MIST")||(desc=="FOG")||(desc=="SMOKE")||(desc=="HAZE")||(desc=="DUST")||(desc=="SAND")||(desc=="ASH")){
		if ((hours>=hoursrize)&&(hours<hoursset)) {
			document.getElementById("pic").src="thuday.png";
		}
		else{
			document.getElementById("pic").src="thunight.png";
		}
	}
	}
	
}




