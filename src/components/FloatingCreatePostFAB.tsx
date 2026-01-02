import { createPortal } from 'react-dom';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';

export default function FloatingCreatePostFAB() {
  const navigate = useNavigate();

  if (typeof document === 'undefined') return null;

  return createPortal(
    <div
      style={{
        position: 'fixed',
        bottom: '90px', // ABOVE bottom nav
        right: '16px',
        zIndex: 999999,
      }}
      className="md:hidden"
    >
      <button
        onClick={() => navigate('/community/create-post')}
        style={{
          width: 64,
          height: 64,
          borderRadius: '9999px',
          background:
            'linear-gradient(135deg, rgb(249,115,22), rgb(168,85,247))',
          boxShadow: '0 20px 40px rgba(0,0,0,0.35)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          border: 'none',
        }}
        aria-label="Create Post"
      >
        <Plus size={32} color="white" strokeWidth={3} />
      </button>
    </div>,
    document.body
  );
}
