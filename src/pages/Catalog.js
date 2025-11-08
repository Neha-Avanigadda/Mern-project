import React, { useState } from "react";
import { Grid, Container } from "@mui/material";
import BookCard from "../components/BookCard";


const dummyBooks = [
  { id: 2, title: "1984", author: "George Orwell", genre: "Dystopian", coverImage: "https://picsum.photos/200/300?2" },
  { id: 3, title: "Harry Potter", author: "J.K. Rowling", genre: "Fantasy", coverImage: "hi" },
  { id: 4, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Classic", coverImage: "https://picsum.photos/200/300?1" },
  { id: 5, title: "1984", author: "George Orwell", genre: "Dystopian", coverImage: "https://picsum.photos/200/300?2" },
  { id: 6, title: "Harry Potter", author: "J.K. Rowling", genre: "Fantasy", coverImage: "hi" },
];


export default function Catalog() {
  const [books, setBooks] = useState(dummyBooks);

  const handleBorrow = (bookId) => {
    alert(`Book with ID ${bookId} borrowed successfully!`);
  };

  return (
    <Container sx={{ mt: 4 }}>
      <Grid container spacing={3}>
        {books.map((book) => (
          <Grid item key={book.id}>
            <BookCard book={book} onBorrow={handleBorrow} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
