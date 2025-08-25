export const updateSearchCount = async (searchTerm, movie) => {
    try {
        const res = await fetch("http://localhost:5000/search", {
            method : "POST",
            headers : { "Content-Type" : "application/json" },
            body: JSON.stringify({searchTerm, movie}),
        });
        return await res.json();
    } catch (error) {
        console.error("Error updating search count:", error);
    }
};

export const getTrendingMovies = async () => {
    try {
        const res = await fetch("http://localhost:5000/trending");
        return await res.json();
    } catch (error) {
        console.error("Error fetching trending movies:", error);
    }
}