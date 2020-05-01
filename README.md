# econify-challenge

## Getting started
To run the server:
* Run `npm install`, then
* Run `npm run test`, then
* Run `npm run prod`

## Note
I wrote synchronous code being unaware of the asynchronous nature of most javascript libraries until I near the end. In hindsight, I should have designed my code around an in-memory database anyway though it wasn't required.

## Problem details

Please implement a Node.JS server with a GraphQL based API that has the abilities to Create, Read, Update, & Delete Locations & Events. We would also like to be able to query and find all the locations & events belonging to an organization, as well as the reverse: being able to query a location(s) / event(s) and having the ability to find the organization it belongs to.

This is what the schema of the the (persistent) database should look like:

    Organization- Name- CreatedAt- UpdatedAt
    Locations (belongs to Organization):- Name- Address- Latitude- Longitude- CreatedAt- UpdatedAt
    Events (belongs to Organization):- Name- Date / Time (can modify these columns to fit your needs better. Doesn’t have to be exactly one column)- Description- CreatedAt- UpdatedAt

Bonus: When a user submits a location with an address, the latitude & longitude is gathered via the Google Places API
