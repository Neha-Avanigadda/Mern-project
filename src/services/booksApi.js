const API_BASE_URL = 'http://localhost:4000/api';

// Get all books
export const getAllBooks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/books`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch books');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Network error fetching books');
  }
};

// Get book by ID
export const getBookById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/books/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch book');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Network error fetching book');
  }
};

// Search books
export const searchBooks = async (query) => {
  try {
    const response = await fetch(`${API_BASE_URL}/books?search=${encodeURIComponent(query)}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Failed to search books');
    }

    return data;
  } catch (error) {
    throw new Error(error.message || 'Network error searching books');
  }
};

