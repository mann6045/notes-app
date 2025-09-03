import React from "react";
import { Link } from "react-router-dom";

const NoteList = ({ notes, onDelete }) => {
  return (
    <div className="container">
      <h2 className="text-2xl font-bold mb-4">Your Notes</h2>
      <Link
        to="/add"
        className="bg-green-500 text-white px-4 py-2 rounded mb-4 inline-block"
      >
        Add Note
      </Link>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {notes.length === 0 ? (
          <p>No notes available.</p>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="border rounded p-4 shadow hover:shadow-lg"
            >
              <h3 className="font-bold text-lg">{note.title}</h3>
              <p>{note.content}</p>
              <div className="mt-2 flex justify-between">
                <Link
                  to={`/edit/${note.id}`}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Edit
                </Link>
                <button
                  onClick={() => onDelete(note.id)}
                  className="bg-red-500 text-white px-2 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default NoteList;