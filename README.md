# EpicViewer

EpicViewer is a web app that connects to NASA’s EPIC (Earth Polychromatic Imaging Camera) API to let users explore satellite images of Earth by date and image type. Built using vanilla JavaScript, this tool fetches and displays imagery in an interactive, user-friendly format.

## Features

- Choose between `natural` and `enhanced` EPIC image types
- Automatically fetch the most recent available imagery dates
- Select a date to see all satellite images taken that day
- Click individual timestamps to display the corresponding Earth image
- View metadata like date and image type in a live footer
- User alerts for invalid dates or empty API responses
- Fully client-side — no server setup required


## Live Demo
[Demo](https://sntran4.github.io/epicviewer/)

## Technologies Used

- **JavaScript (ES6+)**
- **HTML5/CSS3**
- **NASA EPIC API**  
  [https://epic.gsfc.nasa.gov](https://epic.gsfc.nasa.gov)

## How It Works

1. User selects image type: `natural` or `enhanced`.
2. App fetches available dates for that type using the NASA API.
3. User picks a date (within the allowed range).
4. The app fetches all image metadata for the selected date.
5. A clickable list of timestamps appears.
6. Clicking a timestamp displays the corresponding Earth image.
