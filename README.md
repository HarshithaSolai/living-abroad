# Living Abroad

This is a simple react application useful for people recently moved to a new place or people living away from their native country.

### Prerequisites
* Node
* Yarn or NPM

## Starting the Application 

```
yarn start or npm start
```

## Features

1. Currency :currency_exchange: - Useful for currency conversion between two currency codes.

2. Weather :sun_with_face: - View the weather forecast of your current location. :construction: [ Work In Progress to compare weather between two places]

3. Quality of Life :innocent: - View & Compare the quality of life between two locations (based on various categories like housing, transportation, etc., ). All the information listed here are fetched from external API by Teleport.

4. Cost of Living :moneybag: - View & Compare the cost of living (grocery items, house rent, restaurants, etc.,) between two locations.

## Public free APIs used in the Application : 

1. [ipify API](https://www.ipify.org/) - Finding the IP Address of the Client 

2. [ipapi](https://ipapi.co/) - Fetching the user information like city, country, currency, geo-locations using IP Address

3. [exchangerateAPI](https://www.exchangerate-api.com/) - Currency Conversion API 

4. [Sunset and sunrise times API](https://sunrise-sunset.org/) - fetch sunset and sunrise data for a given latitude and longitude.

5. [Teleport](https://developers.teleport.org/) - Fetch list of urban cities, quality of life and quality score data. 

6. [Cost of Living API](https://github.com/zackharley/cost-of-living-api) - Fetch cost of living data for a city (Forked from Github)

Self-Deployed Endpoint - https://cost-of-living-app.herokuapp.com/cityname

## Deployment

Living Abroad website is deployed using Netlify. Check the [Live Demo](https://livingabroad.netlify.app) here.