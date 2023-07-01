## Mflix - Your Movie Companion

Mflix is a dynamic web application built with React, Bootstrap, and React-Bootstrap, designed to be your ultimate movie companion. With Mflix, you can explore, discover, and engage with a vast collection of movies, enhancing your movie-watching experience.

### Key Features:

1. **Movie Catalog**: Mflix utilizes the Axios library to fetch movie data from a reliable API source. The application provides an extensive catalog of movies, including essential details such as title, genre, release year, and ratings. The user-friendly interface allows for effortless navigation through the vast movie collection.

2. **Search and Filter**: Mflix offers a powerful search functionality, enabling users to find movies based on specific keywords

3. **User Authentication and Personalization**: Mflix allows users to create accounts, securely log in, and personalize their movie preferences. By signing up or logging in, users gain access to additional features such as creating a favorites list, leaving reviews, and receiving personalized movie recommendations based on their viewing history.

4. **Favorites List**: Once logged in, users can easily save movies to their favorites list with a single click. This feature enables users to curate a personalized collection of movies they love and want to revisit in the future. Accessing and managing the favorites list is convenient, providing quick reference and movie suggestions.

5. **Reviews and Ratings**: Mflix provides a platform for users to leave reviews and ratings for movies they have watched. Users can share their opinions, provide feedback, and contribute to the overall movie community. The application calculates average ratings based on user reviews, helping others make informed decisions about which movies to watch.

6. **Responsive Design**: Mflix's user interface is built using Bootstrap and React-Bootstrap, ensuring a responsive and visually appealing experience across various devices and screen sizes. Whether you're browsing movies on a desktop, tablet, or mobile device, Mflix adapts seamlessly to provide an optimized viewing experience.

Mflix is the go-to destination for all movie enthusiasts. From exploring new releases and discovering hidden gems to curating your own favorites list and engaging with the movie community, Mflix aims to elevate your movie-watching journey with its user-centric features and immersive interface. Get ready to dive into the captivating world of movies with Mflix. Enjoy the show!

## Documentation:

### 1. Setup Instructions

#### a. Prerequisites

Before setting up the development environment, ensure that you have the following software installed on your machine:
- Node.js (version 12 or above)
- npm (Node Package Manager)

#### b. Clone the Repository

1. Open your terminal or command prompt.
2. Navigate to the directory where you want to clone the repository.
3. Run the following command to clone the repository:
   
   ```
   git clone https://github.com/umairayub-dev/MoviesReact
   ```
#### c. Install Dependencies

1. Navigate to the project directory using the following command:
   
    ```
    cd MoviesReact 
    ```
   
2. Install the project dependencies by running the following command:
   
    ```
    npm install 
    ```

### 2. Running the Application

#### a. Development Server

To run the React application locally for development purposes, use the following steps:

1. Open your terminal or command prompt.
2. Navigate to the project directory if you are not already in it.
3. Start the development server by running the following command:
   
    ```
    npm run dev 
    ```

#### b. Opening the Application

After starting the development server, you can open the React application in a web browser using the following steps:

1. Open your preferred web browser.
2. Enter the following URL in the address bar:
   
   http://localhost:3000
   
3. Press Enter, and the application should load in the browser.

That's it!

### 3. Folder Structure:

The project's folder structure is organized as follows:

- *public*: Contains files that are publicly accessible, such as the HTML template and static assets.
  - `vite.svg`: Logo or icon used for the application.
  - `_redirects`: Configuration file for server redirects (if used).

- *src*: Contains the main source code of the application.
  - *components*: Contains reusable React components used throughout the application.
    - `LoadingMoviesSkeleton.jsx`: Component that displays a loading skeleton while movies are being fetched.
    - `MovieCard.jsx`: Component that represents a single movie card in the movies grid.
    - `MoviesGrid.jsx`: Component that displays a grid of movie cards.
    - `MyNavbar.jsx`: Component that represents the navigation bar of the application.
    - `MyPagination.jsx`: Component that handles pagination functionality.
    - `ReviewForm.jsx`: Component that renders a form for users to submit reviews.
    - `ScreenshotCarousel.jsx`: Component that displays a carousel of movie screenshots.
    - `Stars.jsx`: Component that renders star ratings.
    - `Toast.jsx`: Component that renders a single toast notification.
    - `ToastContainer.jsx`: Component that manages and displays multiple toast notifications.

  - *Context*: Contains React context providers and reducers for managing application state.
    - *Auth*: Contains authentication-related context and reducers.
      - `AuthContext.jsx`: Context provider for managing authentication state.
      - `AuthReducer.js`: Reducer function for updating authentication state.
      
    - *Favorites*: Contains context for managing favorites functionality.
      - `FavoritesContext.jsx`: Context provider for managing favorites state.
      
    - *Toast*: Contains context for managing toast notifications.
      - `ToastContext.jsx`: Context provider for managing toast notifications state.

  - *Hooks*: Contains custom React hooks used in the application.
    - `useToast.js`: Custom hook for displaying toast notifications.

  - *Pages*: Contains the main pages or views of the application.
    - `FavoritesPage.jsx`: Page that displays the user's favorite movies.
    - `HomePage.jsx`: Landing page of the application.
    - `LoginPage.jsx`: Page for user login.
    - `MovieDetailsPage.jsx`: Page that shows detailed information about a specific movie.
    - `MoviesPage.jsx`: Page that displays a list of movies.
    - `NotFoundPage.jsx`: Page shown when a requested page is not found.
    - `SignupPage.jsx`: Page for user registration or signup.


### 4. API Integration

The yts.mx API is integrated into the application to fetch movie data. The following steps outline the process of integrating the API:

1. Import the required modules or libraries for making API requests. In this example, Axios is used.

2. Construct the API request URL with the appropriate endpoint and parameters. The URL structure for fetching movies is as follows:
   ```javascript
   https://yts.mx/api/v2/list_movies.json?page=<page>&query_term=<query>
   ```
   - The `<page>` parameter specifies the page number for pagination.
   - The `<query>` parameter is optional and represents the search query for filtering movies.

3. Make the API request using the `axios.get()` method and provide the constructed URL as the argument.

4. Handle the API response using promises or async/await syntax. The response contains movie data that can be extracted and used in the application.

5. Update the application state or perform any necessary operations with the fetched data.

Here's an example of the API integration code used to fetch movies in your application:

```javascript
import axios from 'axios';

const getMovies = async () => {
  setLoading(true);
  const query = searchParams.get('query');
  const apiUrl = query
    ? `https://yts.mx/api/v2/list_movies.json?page=${searchParams.get('page')}&query_term=${query}`
    : `https://yts.mx/api/v2/list_movies.json?page=${searchParams.get('page')}`;

  try {
    const response = await axios.get(apiUrl);
    const { data } = response.data;
    setResponse(data);
    setMovies(data.movies);
  } catch (error) {
    console.error("Error fetching movie data:", error);
    if (error.response && error.response.status === 404) {
      setError("Movie not found.");
    } else {
      setError("Error fetching movie data. Please try again later.");
    }
  } finally {
    setLoading(false);
  }
};
```

In this example, the `getMovies` function is responsible for fetching movies from the yts.mx API. It checks if a search query is provided and constructs the appropriate API request URL. The `axios.get` method is used to make the API request, and the response data is used to update the application state. Any errors that occur during the API request are handled and appropriate error messages are set in the state.

### 5. App Routes

Protected routes are implemented in the application to restrict access to certain routes that require authentication. In the provided code snippet, the implementation of protected routes can be observed. Here's an explanation of how it works:

The AuthContext is used to access the authentication state, which contains information about the current user.

The Routes component is used to define the application routes.

Each Route component represents a specific route in the application, identified by the path prop. The element prop specifies the component to render when the route matches.

For routes that require authentication, such as the "Favorites" page, a conditional rendering is used to check if there is a currentUser in the authentication state. If there is no currentUser, the user is redirected to the "Login" page using the Navigate component from React Router. Otherwise, the protected route is rendered as usual.

Here's an overview of the routes in the provided code:

"/" - The home page, accessible to all users.

"/movies" - The movies page, accessible to all users.

"/favorites" - The favorites page, which requires authentication. If the user is not authenticated, they will be redirected to the "Login" page.

"/login" - The login page, accessible only to users who are not authenticated. If the user is already authenticated (a currentUser exists), they will be redirected to the home page.

"/signup" - The signup page, accessible only to users who are not authenticated. If the user is already authenticated (a currentUser exists), they will be redirected to the home page.

"/movie/:id" - The movie details page, accessible to all users.

"*" - The not found page, rendered for any unknown routes.

### 6. Design Matching

The design of the application is implemented to match the data received from the API, providing a visually appealing and user-friendly interface. Here are the key points regarding the design matching in your React movies app:

CSS and UI Framework: The application utilizes Bootstrap and React-Bootstrap as the CSS and UI framework, respectively. Bootstrap offers a comprehensive set of pre-styled components, responsive grid system, and CSS classes that help create consistent and visually pleasing designs. React-Bootstrap is a library that integrates Bootstrap components into React applications, providing convenient ways to use Bootstrap components as React components.

By leveraging Bootstrap and React-Bootstrap, the application achieves a cohesive and visually consistent design throughout the user interface. These frameworks provide a range of pre-designed components and styles that can be easily customized to match the data received from the API. The result is a clean and professional-looking design that enhances the overall user experience of the React movies app.

### 7. Add to Favorites Functionality
The "Add to Favorites" functionality in this application is implemented using the React Context API, specifically createContext, useReducer, and custom context provider components. Here's an explanation of how it works:

Context Setup: First, the FavoritesContext is created using createContext(). This context will hold the global state and provide it to the components that need access to it.

Initial State and Reducer: The initial state for the favorites is defined, which includes an array of favorite items. The FavoritesReducer function is created to handle state updates based on different actions.

Context Provider: The FavoritesContextProvider component is defined to wrap the relevant parts of this application with the favorites context. It uses useReducer to create a state and dispatch function based on the FavoritesReducer and initial state.

Initializing and Storing State: The initializeStateFromLocalStorage function is responsible for initializing the state from local storage, if available. It checks if the stored state is different from the current state and updates the state accordingly using the INITIALIZE_STATE action.

Effects: Two useEffect hooks are used. The first one runs on component mount to initialize the state from local storage. The second one runs whenever the state changes and stores it in local storage.

Providing State: The FavoritesContext.Provider component wraps the children components and provides the state and dispatch function to them via the value prop. This allows components consuming the FavoritesContext to access and modify the favorites state.

Actions: The FavoritesReducer handles three types of actions: INITIALIZE_STATE, ADD_TO_FAVORITES, and REMOVE_FROM_FAVORITES. The ADD_TO_FAVORITES action adds an item to the favorites array, while the REMOVE_FROM_FAVORITES action removes an item from the favorites array based on its ID.

By using the FavoritesContext and the provided reducer, components can access the favorites state and dispatch actions to add or remove items from the favorites list. The state is stored in local storage to persist the favorites across page refreshes.

To use the "Add to Favorites" functionality in this application, you can wrap the relevant components with the FavoritesContextProvider and access the favorites state and dispatch actions within the components that need to interact with favorites.

### 8. Toast Notifications
The integration of Toast Notifications into this application is achieved using the React Context API. Here's how it works:

Context Setup: The ToastContext is created using createContext(). This context will hold the state for managing toast notifications and provide it to the components that need access to it.

Reducer: The toastReducer function is created to handle state updates based on different actions. In this case, the reducer handles two actions: ADD_TOAST and REMOVE_TOAST. The ADD_TOAST action adds a new toast notification to the state, while the REMOVE_TOAST action removes a toast notification from the state based on its ID.

Context Provider: The ToastContextProvider component is defined to wrap the relevant parts of your application with the toast context. It uses useReducer to create a state and dispatch function based on the toastReducer and initial state.

Providing State: The ToastContext.Provider component wraps the children components and provides the state and dispatch function to them via the value prop. This allows components consuming the ToastContext to access and modify the toast notifications state.

To use Toast Notifications in this application, follow these steps:

Wrap the relevant components with the ToastContextProvider. This will make the toast state and dispatch available to those components.

When you want to display a toast notification, dispatch an action of type ADD_TOAST and pass the toast object as the action payload. The toast object typically contains properties like id, message, type, and duration. The id property is used for identifying and removing the toast notification later.

To remove a toast notification, dispatch an action of type REMOVE_TOAST and pass the toast object with the matching id as the action payload.

By integrating Toast Notifications in your application using the provided context and reducer, you can easily manage and display toast notifications for various actions and events. You can customize the appearance and behavior of the toast notifications using CSS or UI components of your choice.
