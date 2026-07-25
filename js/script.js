/*
===========================================
FlightDeck Overlay V3
Script.js
===========================================
*/

console.log("FlightDeck Overlay gestartet");

/*
===========================================
Elemente
===========================================
*/

const flight = document.getElementById("flight");
const aircraft = document.getElementById("aircraft");
const departure = document.getElementById("departure");
const arrival = document.getElementById("arrival");
const fl = document.getElementById("fl");
const time = document.getElementById("time");
const status = document.querySelector(".status");

/*
===========================================
Flightdaten laden
===========================================
*/

async function loadFlightData() {

    try {

        const response = await fetch("data/flight.json");

        if (!response.ok) {
            throw new Error("flight.json konnte nicht geladen werden.");
        }

        const data = await response.json();

        updateOverlay(data);

    }

    catch (error) {

        console.error(error);

    }

}

/*
===========================================
Overlay aktualisieren
===========================================
*/

function updateOverlay(data) {

    flight.textContent = data.flight ?? "-";
    aircraft.textContent = data.aircraft ?? "-";
    departure.textContent = data.departure ?? "-";
    arrival.textContent = data.arrival ?? "-";
    fl.textContent = data.flightLevel ?? "-";
    time.textContent = data.flightTime ?? "-";

    setStatus(data.status);

}

/*
===========================================
Status
===========================================
*/

function setStatus(currentStatus) {

    const dot = document.querySelector(".dot");

    if (!dot) return;

    switch (currentStatus) {

        case "LIVE":

            status.lastChild.textContent = " LIVE";

            dot.style.background = "#38D66B";
            dot.style.boxShadow = "0 0 10px #38D66B";

            break;

        case "VATSIM":

            status.lastChild.textContent = " VATSIM";

            dot.style.background = "#3BA6FF";
            dot.style.boxShadow = "0 0 10px #3BA6FF";

            break;

        case "OFFLINE":

            status.lastChild.textContent = " OFFLINE";

            dot.style.background = "#999999";
            dot.style.boxShadow = "0 0 10px #999999";

            break;

        default:

            status.lastChild.textContent = " UNKNOWN";

            dot.style.background = "#FF9800";
            dot.style.boxShadow = "0 0 10px #FF9800";

    }

}

/*
===========================================
Automatisch aktualisieren
===========================================
*/

loadFlightData();

setInterval(loadFlightData, 5000);