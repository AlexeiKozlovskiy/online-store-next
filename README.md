# <img src="./public/img/spruce-logo.svg" alt="image" width="30" height="30"> Online-store-next

This is NextJS app rewrite version my previous [React app](https://github.com/AlexeiKozlovskiy/online-store-react), with some additions. For deploy app utilized vercel with, hosted https://www.kozlovsky.space

Due to the use of a free host services for the backend, database, and the application itself, there may be delays
response in first load. Backend host have a &#34;cold start&#34;. For example, a click on a product card, or the first
request for a geting list of of products or click by product category in the main page and side filters in product page.
First fetching data is can take near 1-3 minutes, further is fast. You may need to reload the page.

## Backend part in this [repo](https://github.com/AlexeiKozlovskiy/online-store-nest).

For the project configured ci/cd, you can see the actions and PR comments.

## Common stack

- TS
- React
- Next
- Redux Toolkit
- React Query
- React Hook Form
- React Loading Skeleton
- React Pagination
- React Select
- React Slider
- Material UI
- Jest

## Getting Started

To run this project locally, follow these steps:

- Clone this repository. `https://github.com/AlexeiKozlovskiy/online-store-next.git`
- Checkout to the development branch `git checkout develop`
- Install dependencies using `npm install`.
- Rename `.env.local.example` to `.env.local`.
- Run `npm run dev` or `npm run start`.

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

# <img src="https://wakatime.com/badge/user/018d3b7f-99dd-4b60-ab6b-4d807848fdb5/project/018de4e5-fbe2-4aaa-b92b-3fd594c0ee93.svg" alt="wakatime image" width="162" height="18">
