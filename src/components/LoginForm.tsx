import React, { useState, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock } from 'react-icons/fa';
import ReCAPTCHA from 'react-google-recaptcha';
import Notificacion from './notificacion';

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const [error, setError] = useState<string>('');
  const [mensaje, setMensaje] = useState<string>('');
  const [estado, setEstado] = useState<'ok' | 'error' | null>(null);
  const [presionado, setPresionado] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPresionado(false); // Reinicia el estado para forzar que la notificación vuelva a aparecer
    setError('');

    if (!captchaToken) {
      setError('Por favor completa el CAPTCHA');
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/validar_usuario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          usuario: email,
          password: password
        })
      });

      const result = await response.json();
      console.log('🛂 Respuesta del backend:', result);

      if (result.estado === 'ok') {
        setMensaje(result.mensaje || 'Inicio de sesión exitoso ✅');
        setEstado('ok');
        setPresionado(true);
        localStorage.setItem('auth', 'true');
        setTimeout(() => navigate('/admin'), 1500); // Espera 1.5s antes de redirigir
      } else {
        setMensaje(result.mensaje || 'Credenciales incorrectas ❌');
        setEstado('error');
        setPresionado(true);
      }

    } catch (err) {
      console.error('❌ Error al conectar con el backend:', err);
      setMensaje('Error al conectar con el servidor ❌');
      setEstado('error');
      setPresionado(true);
    }
  };

  return (
    <>
      <div className="flex justify-center items-center w-full absolute top-12 left-0">
        {presionado && estado && (
          <Notificacion mensaje={mensaje} tipo={estado} />
        )}
      </div>

      <div className="flex items-center justify-center min-h-screen bg-dark bg-zenu-pattern bg-cover font-sans">
     
        <form
          onSubmit={handleSubmit}
          className="bg-white bg-opacity-95 p-10 rounded-2xl shadow-2xl w-full max-w-md transition-all duration-300"
        >
          <div className="flex flex-col items-center mb-6">
            <img
              src="/images/sombrero.png"
              alt="Logo Tuchín Zenú"
              className="h-16 w-16 object-contain mb-2 animate-bounce"
            />
            <h1 className="text-3xl font-bold text-primary mb-1">Tuchín Zenú</h1>
            <p className="text-sm text-gray-600">Bienvenido al panel de administrador</p>
          </div>

          <div className="relative mb-5">
            <FaEnvelope className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="relative mb-6">
            <FaLock className="absolute left-3 top-3.5 text-gray-400" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          <div className="mb-4 flex justify-center">
            <ReCAPTCHA
              sitekey="6LdZ734rAAAAAPTJw6M_m6u5oDspBP_MuYFXaZDb"
              onChange={(token: string | null) => setCaptchaToken(token)}
            />
          </div>

          {error && (
            <p className="text-red-600 text-sm mb-3 text-center">{error}</p>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-secondary transition duration-300"
          >
            Ingresar
          </button>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
