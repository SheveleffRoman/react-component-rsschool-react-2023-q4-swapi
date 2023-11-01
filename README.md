# Week2

## React. Routing

The task should be based on the previous task. We're using [React Router v6.x ](https://reactrouter.com/en/main/start/overview) in this task.

### What should be done:

1. Create a separate branch for this task from the previous task's branch.
2. All components must be changed to **functional components**, except **Error Boundary** components, as error boundaries in React still need to be class components.
3. All logic should be split into components:
   - If you need an access either to the component's lifecycle or the state **use hooks**.
   - All data should be stored in the **component's state**.
4. Add routing to your application using **React Router**.
5. Add pagination:
   - Implement pagination for your existing item list
   - Display the current page in the browser URL using query parameters (e.g. ?page=2, e.g /search/2).
   - The pagination component should appear after receiving the list of all items.
   - If the user changes items on the page, make a new API call and display the results from the first page.
6. Main page displays search results. On item click page should be split into 2 section:
   - left section will continue to display search results;
   - right section should display details using Router Outlet (show loading indicator while making an additional call for details, add control for closing the section, also section should be closed when user clicks on the left section)
   - Reflect in the url that "Details" section has been opened for the selected item (e.g. /?frontpage=2&details=1).
