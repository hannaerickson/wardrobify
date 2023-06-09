# Wardrobify

Team:

* Person 1 - Ryan Holzer - Hats Microservice
* Person 2 - Hanna Erickson - Shoes Microservice

## Design

## Shoes microservice
The first major model created for my microservice ws the "Shoe" model. Specifiec on the shoe model is a manufacturer, model name, shoe color, and an optional picture url. There is also a foreign key relationship to a single bin. A Bin Value Object was created based off the provided Bin model. The reason for this is so that we can access that model from a separate microservice. Primary integration with the wardrobe microservice happens in our poller.py file. This file fetches data from the database for all instances of our Bin object. These instances are looped through and made into BinVO objects that we can then access in our Shoes microservice in order to refernce back to the Bin model. Finally, views are created in order to display instances of shoes and bins per the specified request method. For the React front end, I decided to create a separate form to handle the creation of shoes. Bootstrap templates were used to render this form using React class based components. Inspiration from Conference Go was taken for the list of Shoes, using Bootstrap cards to display our dynamic data. A few links were added both to the main page as well as the list page to navigate, and a delete functionality was added to the list view.

## Hats microservice

For the hats microservice, the first step I took was creating a Hat class, which inherits from Django's built-in Model class. I gave it the specified properties for the exercise, passing in Charfield for strings, PositiveSmallIntegerField for small ints, and URLField for urls. I then created a LocationVO model, so I could poll the wardrobe microservice for data regarding locations, and store it in my LocationVO objects. This allowed me to create RESTful API views to create hats within a specific location (matching the location with my locationVO), list all hats within a location, and delete them.

In React, I started by creating a hats list class, which made an API call in fetch the data from my database, and used JSX to render my virtual DOM into the DOM. Using conference GO, I was able to recreate a hatsColumn functional component, to ensure that each hat displayed in in a column (up to 4, then back to the first). I then created a form to create a new hat, again by making an API call, this time a POST request which gathered information from my form to send to the corresponding url. I imported the form to display at the top of my hats list page, for ease of the user when creating hats. Lastly, I added a delete function to a button, which made a API call with method: "DELETE" to select a hat by its id, and delete it from the database. I used minimal bootstrap templates for some rough styling and design.
