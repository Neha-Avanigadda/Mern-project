// In a real app, this would be replaced with actual API calls to a backend server.
import cover1 from '../assets/book-cover-1.jpg';
import cover2 from '../assets/book-cover-2.jpg';

const mockBooks = [
  { id: 1, title: 'Quantum Computing Explained', author: 'Dr. Evelyn Reed', genre: 'Science', cover: cover1, rating: 4.5, synopsis: 'A deep dive into the future of computing, making complex quantum concepts accessible to all.' },
  { id: 2, title: 'The Martian', author: 'Andy Weir', genre: 'Sci-Fi', cover: cover2, rating: 4.8, synopsis: 'An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.' },
  // ... Add more books
];

export const getFeaturedBooks = async () => {
  return new Promise(resolve => setTimeout(() => resolve(mockBooks.slice(0, 4)), 500));
};

export const getAllBooks = async () => {
  return new Promise(resolve => setTimeout(() => resolve(mockBooks), 500));
};

export const getBookById = async (id) => {
  const book = mockBooks.find(b => b.id === parseInt(id));
  return new Promise(resolve => setTimeout(() => resolve(book), 500));
};

export const loginUser = async (email, password) => {
    // Simple mock logic
    if (email === "librarian@library.com" && password === "admin123") {
        return Promise.resolve({
            token: "fake-admin-token",
            user: { name: "Admin Librarian", email: "librarian@library.com", role: "librarian" }
        });
    }
    if (email === "member@library.com" && password === "member123") {
        return Promise.resolve({
            token: "fake-member-token",
            user: { name: "John Doe", email: "member@library.com", role: "member" }
        });
    }
    return Promise.reject("Invalid credentials");
};