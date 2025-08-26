# 🎬 Moodflix

Welcome to Moodflix! A sleek and modern web application for discovering and searching for movies. Built with React and powered by The Movie Database (TMDB) API, Moodflix provides a seamless and visually appealing experience for finding your next favorite film.

## ✨ Features

-   **Dynamic Movie Search**: Instantly search through thousands of movies with a real-time search bar.
-   **Debounced API Requests**: Smart search functionality that waits for you to stop typing before fetching results, ensuring a smooth and efficient experience.
-   **Discover Popular Movies**: By default, browse through a curated list of the most popular movies currently available.
-   **Trending Movies Section**: See what's currently hot with a special horizontally-scrolling section for trending films.
-   **Pagination**: Easily navigate through multiple pages of movie results.
-   **Smooth Loading & Error States**: The UI provides clear feedback with loading spinners and error messages.
-   **Back to Top**: A convenient button to quickly scroll back to the top of the page.
-   **Responsive Design**: A clean and modern interface that looks great on all devices, from mobile phones to desktops.

## 🚀 Getting Started

Follow these instructions to get a local copy of Moodflix up and running on your machine.

### Prerequisites

-   Node.js (v14 or later)
-   npm or yarn

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/Rahul151004/moodflix.git
    cd moodflix
    ```

2.  **Install dependencies:**
    ```sh
    npm install
    ```
    or
    ```sh
    yarn install
    ```

3.  **Set up your environment variables:**

    You'll need an API key from The Movie Database (TMDB). You can get one for free by creating an account [here](https://www.themoviedb.org/signup).

    Once you have your key, create a file named `.env` in the root of your project and add your API key like this:

    ```
    VITE_TMDB_API_KEY=your_tmdb_api_key_here
    ```

4.  **Run the development server:**
    ```sh
    npm run dev
    ```
    The application should now be running on `http://localhost:5173` (or another port if 5173 is in use).

## 🛠️ Technologies Used

-   **React**: A JavaScript library for building user interfaces.
-   **Vite**: A next-generation frontend tooling for fast development.
-   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
-   **The Movie Database (TMDB) API**: The source of all movie data.
