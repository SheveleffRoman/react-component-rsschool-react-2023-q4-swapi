## React. Components

### What should be done:

1. Create a separate branch for this task.
2. Language Requirement
   - Use **TypeScript** for the project.
3. Project Setup
   - Initialize the project using [Vite](https://vitejs.dev/guide/) with the [*react-ts* template](https://vite.new/react-ts).
4. Code Quality Tools
    1. ESLint
       - Set up ESLint to throw errors if TypeScript's *any* type is used.
       - Follow the [configuration guide](https://github.com/rolling-scopes-school/tasks/blob/master/react/modules/module01/configs.md).
    2. Prettier
       - Integrate Prettier for code formatting.
    3. Husky
       - Add Husky and configure it to run linting on pre-commit.
    4. package.json commands
       - Add the following npm scripts:
           - `lint`: For running the lint command.
           - `format:fix`: For running Prettier's --write command.
5. Pick a RESTfull api which supports search and pagination (pagination might be reffered as *offset* and *limit* params). E.g. https://pokeapi.co/, for Star Wars fans https://swapi.dev/api, for Star Trek fans https://stapi.co/api-documentation (OpenApi spec can be checked here https://editor.swagger.io/?url=https://stapi.co/api/v1/rest/common/download/stapi.yaml), or you can select another one complying with the requirements.
6. Implement the following requirements:
   - Create a page comprised of 2 horizontal section (a smaller top one, and a bigger bottom one);
   - On the top section put *Search* input and the "Search" button. *Search* component should look for a previously saved search term in the local storage, if there isn't any - leave the input empty;
   - Bottom section should show be used for displaying search results (name and a small description);
   - By default application makes a call to the selected api to get the list of the items with the search term fron the input (only first page). If the input is empty make a call to get all the items;
   - When user modifies the *Search* input and clicks on "Search" button, application makes a call to an api with the newly provided search term (search term should not have any trailing spaces, process the input) to get the results (only first page);
   - The provided search term should be saved to the local storage, if the value exists overwrite it;
7. Wrap application to an error boundary to catch errors. Report an error to a console and show fallback UI (use respective methods for this). Create a button which will throw an error on click to test the functionality.

**Use class components to get access to lifecycle events or state. Using hooks is forbidden at this stage. Patience, it won't last long.**

All logical parts should be set into separate components.