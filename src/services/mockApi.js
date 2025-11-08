// In a real app, this would be replaced with actual API calls to a backend server.
import quantumCover from '../assets/quantumcomputingexplained.jpg';
import martianCover from '../assets/The-Martian.jpg';
import coverMockingbird from '../assets/mockingbird.jpg';
import coverPride from '../assets/pride-and-prejudice.jpg';
import coverCatcher from '../assets/thecatcherintherye.jpg';
import coverGatsby from '../assets/thegreatgatsby.jpg';
import cover1984 from '../assets/1984.jpg';

const mockBooks = [
  {
    id: 1,
    title: 'Quantum Computing Explained',
    author: 'Dr. Evelyn Reed',
    genre: 'Science',
    cover: quantumCover,
    rating: 4.5,
    synopsis: 'A deep dive into the future of computing, making complex quantum concepts accessible to all.',
    releaseDate: '2018-05-12',
    pages: 384,
    description: 'This book demystifies qubits, entanglement, and quantum algorithms with approachable explanations and real-world analogies.'
  },
  {
    id: 2,
    title: 'The Martian',
    author: 'Andy Weir',
    genre: 'Sci-Fi',
    cover: martianCover,
    rating: 4.8,
    synopsis: 'An astronaut becomes stranded on Mars after his team assume him dead, and must rely on his ingenuity to find a way to signal to Earth that he is alive.',
    releaseDate: '2014-02-11',
    pages: 387,
    description: 'A survival story of science and humor as Mark Watney engineers his way across the Martian landscape.'
  },
  {
    id: 3,
    title: 'To Kill a Mockingbird',
    author: 'Harper Lee',
    genre: 'Fiction',
    cover: coverMockingbird,
    rating: 4.7,
    synopsis: 'A young girl witnesses the realities of racial injustice in the Deep South.',
    releaseDate: '1960-07-11',
    pages: 281,
    description: 'Compassionate, dramatic, and deeply moving, this novel takes readers to the roots of human behavior.'
  },
  {
    id: 4,
    title: 'Pride and Prejudice',
    author: 'Jane Austen',
    genre: 'Classic Romance',
    cover: coverPride,
    rating: 4.6,
    synopsis: 'Elizabeth Bennet navigates issues of manners, upbringing, morality, and marriage.',
    releaseDate: '1813-01-28',
    pages: 279,
    description: 'A witty romantic comedy about the importance of marrying for love, not simply for money.'
  },
  {
    id: 5,
    title: 'The Catcher in the Rye',
    author: 'J. D. Salinger',
    genre: 'Classic Literature',
    cover: coverCatcher,
    rating: 4.2,
    synopsis: 'Holden Caulfield recounts days in New York City after being expelled from school.',
    releaseDate: '1951-07-16',
    pages: 277,
    description: 'A story of teenage angst and alienation that has influenced generations of readers.'
  },
  {
    id: 6,
    title: 'The Great Gatsby',
    author: 'F. Scott Fitzgerald',
    genre: 'Classic Literature',
    cover: coverGatsby,
    rating: 4.4,
    synopsis: 'A mysterious millionaire pursues a former lover during the Jazz Age.',
    releaseDate: '1925-04-10',
    pages: 180,
    description: 'A portrait of the Roaring Twenties and the elusive promise of the American Dream.'
  },
  {
    id: 7,
    title: '1984',
    author: 'George Orwell',
    genre: 'Dystopian Fiction',
    cover: cover1984,
    rating: 4.7,
    synopsis: 'A chilling depiction of a totalitarian regime and constant surveillance.',
    releaseDate: '1949-06-08',
    pages: 328,
    description: 'A dystopian classic exploring truth, power, and the erasure of reality.'
  }
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
    // Simple mock logic - accept any email/password for testing
    if (email && password) {
        const name = email.split('@')[0];
        const role = email.includes('librarian') ? 'librarian' : 'member';
        return Promise.resolve({
            token: "fake-token",
            user: { name: name, email: email, role: role }
        });
    }
    return Promise.reject("Invalid credentials");
};