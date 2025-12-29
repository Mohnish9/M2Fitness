import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../utils/authContext';
import { CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

export default function AuthSuccessRouter() {
  const navigate = useNavigate();
  const location = useLocation();
  const { returnPath, pendingAction, setPendingAction, setReturnPath } = useAuth();

  useEffect(() => {
    // Show success message
    const timer = setTimeout(() => {
      // Determine where to redirect
      const redirectPath = returnPath || location.state?.from || '/dashboard';
      
      // Show toast based on pending action
      if (pendingAction) {
        switch (pendingAction.type) {
          case 'save':
            toast.success('✅ ' + pendingAction.message);
            break;
          case 'like':
            toast.success('❤️ ' + pendingAction.message);
            break;
          case 'comment':
            toast.success('💬 ' + pendingAction.message);
            break;
          case 'share':
            toast.success('🔗 ' + pendingAction.message);
            break;
          case 'post':
            toast.success('📝 ' + pendingAction.message);
            break;
          case 'follow':
            toast.success('👥 ' + pendingAction.message);
            break;
          case 'start-workout':
            toast.success('🎯 ' + pendingAction.message);
            break;
          case 'download':
            toast.success('📥 ' + pendingAction.message);
            break;
          case 'get-plan':
            toast.success('🎯 ' + pendingAction.message);
            break;
          default:
            toast.success('Welcome back!');
        }
        setPendingAction(null);
      } else {
        toast.success('Welcome back to M2Fitnes!');
      }

      // Clear return path and navigate
      setReturnPath(null);
      navigate(redirectPath, { replace: true });
    }, 1000);

    return () => clearTimeout(timer);
  }, [navigate, returnPath, location, pendingAction, setPendingAction, setReturnPath]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-orange-50 flex items-center justify-center p-4">
      <div className="text-center space-y-6">
        <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full mx-auto flex items-center justify-center animate-pulse">
          <CheckCircle2 className="w-12 h-12 text-white" />
        </div>
        <div>
          <h1 className="text-3xl mb-2">Success!</h1>
          <p className="text-gray-600">Redirecting you back...</p>
        </div>
      </div>
    </div>
  );
}