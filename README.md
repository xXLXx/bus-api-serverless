# Bus Api Serverless

This project is for testing purposes only as a demo for the use of the following technologies:
- [Serverless in AWS template](https://www.serverless.com/framework/docs/)
- [Mongoose](https://mongoosejs.com/)
- [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)

This serves as the backend API for [bus-frontend](https://xxlxx.github.io/bus-frontend/)

## Requirements

- [bus-frontend](https://github.com/xXLXx/bus-frontend)
- yarn (install via [npm](https://classic.yarnpkg.com/en/docs/install/#alternatives-stable))

## Configuration

1. Create a local mongodb. [Follow these steps](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/) for OSX
2. Create an `.env.local` file in the project directory
3. Copy all contents of the existing `.env.local.example` file to your `.env.local`.
4. Set `DB_URI` to the full URI of your connection e.g. mongodb://[host]:[port]/[db].

## Bon Voyage

In the project directory, run:

### `yarn`

This will install all required packages

### `yarn seed`

This will put in the initial data, and routes to test.<br/>
Also take note of your API key. You can find this is the `apitokens` collection.<br/>
You will need this for the frontend

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.
