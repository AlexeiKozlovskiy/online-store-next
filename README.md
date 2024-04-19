# <img src="./public/img/spruce-logo.svg" alt="image" width="30" height="30"> Online-store-next 

This is NextJS app rewrite version my previous [React app](https://github.com/AlexeiKozlovskiy/online-store-react), with some additions. For deploy app utilized vercel with, hosted https://www.kozlovsky.space

Due to the use of a free deployment service for the backend, database, and the application itself, there may be delays in response and some bugs in first load. For example, a click on a product card, or the first request for a geting list of products or click by product category in the main page and side filters in product page. First fetching data is can take near 1-3 minutes, further is fast. You may need to reload the page.

## Backend part in this [repo](https://github.com/AlexeiKozlovskiy/online-store-nest).

## Getting Started
To run this project locally, follow these steps:

- Clone this repository. `https://github.com/AlexeiKozlovskiy/online-store-next.git`
- Checkout to the development branch `git checkout develop`
- Install dependencies using `npm install`.
- Rename `.env.local.example` to `.env.local`.
- Run `npm run dev` or `npm run start`.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

