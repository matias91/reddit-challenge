# Deviget Reddit Challenge

### [Deploy link](https://deviget-challenge-2021.herokuapp.com/)

## Setup

* Clone this repo: `git clone git@github.com:matias91/reddit-challenge.git`
* Install dependencies: `yarn`
* Start the project: `yarn start`
* Open it in the browser: http://localhost:3000

## Run test:
```
yarn test
```

## Decisions and notes

* The project was started using `create-react-app`, with the redux template. (`create-react-app my-app --template redux`).

* `redux-saga` was added to handle side effects and asynchronous actions.

* `seamless-immutable` is used to create and handle immutable data structures.

* I chose to use functional components and hooks, instead of class components, to improve performance.

* `redux-persist` was implemented, in order to preserve and restore the app state.

* For the list animations, I decided to use `react-transition-group`.

* The app was deployed using [Heroku](heroku.com).
