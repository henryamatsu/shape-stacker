# Personal Express App: Shape Stacker

A full stack app that lets you create and position a variety of shapes. The app will remember the shapes you've made and how you've positioned them.

![shape-stacker](https://github.com/user-attachments/assets/9a6ca0f4-26f7-4971-ba0f-ee6bd4351a58)

*Screenshot of shapes page*

## How It’s Made

**Tech Stack:**  
- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Frontend:** EJS, HTML, CSS, JS  

## How It Works
- When a user clicks the **New Shape** button, either a circle or square with a random size and color is generated on the page
- You can click on a shape and drag it to change its position, and its z-index will update so that the most recently clicked shape will always appear in front of all other shapes
- The shapes are stored in the associated database so that the same shapes appear for all users
- There is a limit of 10 concurrent shapes, after which the **New Shape** button will delete the oldest shape to make room for a new one

## Installation

1. Clone repo
2. run `npm install`

## Usage

1. run `node server.js`
2. Navigate to `localhost:8080`

## Inspiration & Credit

README.md layout modified from **CodingWCal**'s template
