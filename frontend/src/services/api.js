const API_URL = "http://localhost:5000";

export const getMovies = async (search = "") => {
  const url = search
    ? `${API_URL}/movies?search=${encodeURIComponent(search)}`
    : `${API_URL}/movies`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch movies");
  }

  return response.json();
};

export const getMovieById = async (id) => {
  const response = await fetch(`${API_URL}/movies/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch movie");
  }

  return response.json();
};

export const loginUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data;
};

export const signupUser = async (userData) => {
  const response = await fetch(`${API_URL}/auth/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
    body: JSON.stringify(userData),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Signup failed");
  }

  return data;
};

export const getMyRatings = async (accessToken) => {
  const response = await fetch(`${API_URL}/comments/my`, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch ratings");
  }

  return data;
};

export const createComment = async (movieId, commentData, accessToken) => {
  const response = await fetch(
    `${API_URL}/comments/${movieId}/comments`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
      body: JSON.stringify(commentData),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to post comment");
  }

  return data;
};

export const getMyComments = async (accessToken) => {
  const response = await fetch(
    `${API_URL}/comments/profile/mycomments`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      credentials: "include",
    }
  );

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to fetch your ratings");
  }

  return data;
};