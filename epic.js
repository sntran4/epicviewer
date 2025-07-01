"use strict";

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("button").addEventListener("click", fetchData);

    const typeSelect = document.getElementById("type");
    typeSelect.addEventListener("change", checkDates);
    const dateInput = document.getElementById("date");

    let epicData;
    let lastTypeSelected = typeSelect.value;
    let lastDateSelected;

    checkDates();
    // Fetches from api when submit button is clicked
    function fetchData(e) {
        e.preventDefault();
        if (!dateInput.value) {
            alertUser();
            return;
        }
        lastTypeSelected = typeSelect.value;
        lastDateSelected = dateInput.value;
        const queryString = `https://epic.gsfc.nasa.gov/api/${lastTypeSelected}/date/${lastDateSelected}`;

        fetch(queryString)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Not 2xx response");
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                if (data.length <= 0) {
                    throw new Error("Not 2xx response");
                }
                // Save the application state
                epicData = data;
                generateList();
            })
            .catch((error) => {
                console.log(error);
                epicData = [];
                clearLi();
                alertUser();
            });
    }

    const menuUl = document.getElementById("image-menu");
    // Alerts the user if the date is invalid
    function alertUser() {
        if (menuUl.querySelectorAll("p").length == 0) {
            const errorP = document.createElement("p");
            errorP.innerText =
                "Error receiving image data, check date selected.";
            menuUl.appendChild(errorP);
        }
    }

    // Removes the alert if there is one in the menuUl
    function removeAlert() {
        if (menuUl.querySelectorAll("p").length != 0) {
            menuUl.removeChild(menuUl.querySelector("p"));
        }
    }

    menuUl.addEventListener("click", changeImgToDate);
    // Creates all of the li elements that represent an image, append to ul
    function generateList() {
        // Clear children
        removeAlert();
        clearLi();
        for (let i = 0; i < epicData.length; i++) {
            const li = document.createElement("li");
            li.innerText = epicData[i]["date"];
            li.style.cursor = "pointer";
            li.id = i;
            menuUl.appendChild(li);
        }
    }

    // Clears the list elements
    function clearLi() {
        for (const elem of Array.from(menuUl.querySelectorAll("li"))) {
            menuUl.removeChild(elem);
        }
    }

    const earthImg = document.getElementById("earth-image");
    const earthDateFooter = document.getElementById("earth-image-date");
    const earthTitleFooter = document.getElementById("earth-image-title");
    // Change image according to date clicked
    function changeImgToDate(e) {
        earthImg.src = `https://epic.gsfc.nasa.gov/archive/${lastTypeSelected}/${lastDateSelected.replaceAll(
            "-",
            "/"
        )}/jpg/${epicData[e.target.id]["image"]}.jpg`;
        earthDateFooter.innerText = lastDateSelected;
        earthTitleFooter.innerText = lastTypeSelected;
    }

    // Function that checks to see what the available dates are
    function checkDates(e) {
        // Check if the event is fired, or is ran through function call
        const queryString =
            e != null
                ? `https://epic.gsfc.nasa.gov/api/${e.target.value.toLowerCase()}`
                : `https://epic.gsfc.nasa.gov/api/${typeSelect.value}`;

        fetch(queryString)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Not 2xx response");
                } else {
                    return response.json();
                }
            })
            .then((data) => {
                if (data.length <= 0) {
                    throw new Error("Not 2xx response");
                }
                findMostRecentDate(data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    // Find most recent date
    function findMostRecentDate(data) {
        let dateArray = [];
        for (const entry of data) {
            dateArray.push(new Date(entry.date));
        }
        dateArray.sort((a, b) => b - a);
        setMaxDate(dateArray[0]);
    }

    // Sets the max date for the time select
    function setMaxDate(date) {
        const recentDateToString = date.toISOString();
        const recentDate = recentDateToString.split("T")[0];
        dateInput.max = recentDate;
    }
});
