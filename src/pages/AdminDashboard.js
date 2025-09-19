import React from 'react';
import './AdminDashboard.css'; // Create this new CSS file
import { FaPlus, FaPen, FaTrash } from 'react-icons/fa';

const AdminDashboard = () => {
  // Mock data for demonstration
  const books = [
    { id: 1, title: 'Quantum Computing Explained', author: 'Dr. Evelyn Reed' },
    { id: 2, title: 'The Martian', author: 'Andy Weir' },
  ];

  return (
    <div className="admin-dashboard-page container">
      <div className="admin-header">
        <h1>Book Inventory Management</h1>
        <button className="add-book-btn"><FaPlus /> Add New Book</button>
      </div>

      <div className="admin-table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Title</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>
                  <button className="action-btn edit"><FaPen /></button>
                  <button className="action-btn delete"><FaTrash /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;