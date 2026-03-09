import { PenSquareIcon, Trash2Icon } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router';
import { formateDate } from '../lib/utils';
import toast from 'react-hot-toast';
import api from '../lib/axios';

const NoteCard = ({ note, setNotes }) => {
  const handleDelete = async (e, id) => {
    e.preventDefault(); // get rid of nav behabviour
    if (!window.confirm('Are you sure you want delete this note?')) return;

    try {
      await api.delete(`/notespace/${id}`);
      setNotes((prev) => prev.filter((note) => note._id !== id)); // the note will be deleted in UI after clicking the button
      toast.success('Note deleted succesfully!');
    } catch (error) {
      console.log('Error in handleDelete', error);
      toast.error('Failed to delete note.');
    }
  };
  return (
    <Link
      to={`/note/${note._id}`}
      className='card bg-base-100 hover:shadow-lg transition-all duration-200 border-t-4 border-solid border-[#00FF9D]'
    >
      <div className='card-body'>
        <h3 className='card-title text-base-content'>{note.title}</h3>
        <p className='text-base-content/70 line-clamp-3'>{note.content}</p>
        <div className='card-actions justify-between items-center mt-4'>
          <span className='text-sm text-base-content/60'>
            {formateDate(new Date(note.createdAt))}
          </span>
          <div className='flex items-center gap-1'>
            <PenSquareIcon className='size-4' />
            <button
              className='btn btn-ghose btn-xs text-error'
              onClick={(e) => handleDelete(e, note._id)}
            >
              <Trash2Icon class='size-4' />
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default NoteCard;
