import { FC } from 'react';

interface Props {
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
}

export const Pagination: FC<Props> = ({ currentPage, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;

  return (
    <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginTop: '20px' }}>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={{ cursor: currentPage === 1 ? 'not-allowed' : 'pointer' }}
      >
        Previous
      </button>

      <span style={{ alignSelf: 'center' }}>
        Page {currentPage} of {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={{ cursor: currentPage === totalPages ? 'not-allowed' : 'pointer' }}
      >
        Next
      </button>
    </div>
  );
};
