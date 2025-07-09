import { useNavigate } from "react-router-dom";
import pb from "../services/pocketbase";

export function Login() {
  const navigate = useNavigate();
  const handleLogin = async () => {
    await pb.collection('users').authWithOAuth2({ provider: 'google' });
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <button
        onClick={handleLogin}
        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
      >
        Iniciar sesión con Google
      </button>
    </div>
  );
}