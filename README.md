# Assignment 5

#### E2E / UI Testing

---

Time for some more testing. We are going to focus on testing the UI this week. We will be using [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) to create ui-integration tests and [Cypress](https://www.cypress.io/) to create E2E tests.

**Group size**: 1 person

---

## The Assignment

Copy the Github repo into your own repository and make it private.

Node v16 is required for this project to run.

Run the following commands to get started:

`npm install`

`npm run prisma:init` (this will generate a dev.db file with the proper schema defined in ./prisma/schema.prisma)

`npm run dev` (for development)

`npm run build` (to build production bundle (good to run e2e against))

`npm start` (to serve production version of the application)

`npm run test:e2e` (to run cypress in the command line)

`npx cypress open` (to open cypress in interactive GUI)

- Write a Cypress test that validates the TODO list is empty
- Write a Cypress test that adds a new item to the list
- Write a Cypress test that adds a second item to the list
- Write a Cypress test that removes one item from the list

Create a Github actions workflow that runs these tests on every push.
Make sure to create a command to clean the database and run the e2e test suit in `package.json` so that the Action can call that command.

Create UI tests using react-testing-library.

- Mock the api using [Mock Service Worker (MSW)](https://github.com/mswjs/msw)
- Write a test that asserts that loading is displayed when the response is not correct
- Write a test that asserts that a single item is in the list when the <Home /> component is loaded
- Write a test that adds a new item to the list
- Write a test that removes an item from the list

Make sure to have the test command and test:e2e command separately in `package.json` so that the Github action workflow can run them in parallel (separate job).

---

## Handin

Add me (arnif) as collaborator to the repository. Also make sure to send the link in Canvas when handing in the assignment.
Your solution should have implemented the tests cases described above. If you want to add any feel free to do so. The Github action workflow should be running these tests in a separate job (please note only running tests is required, linting, prettier etc were taken care of in previous assignments 😊).

Good luck and Have fun :)
