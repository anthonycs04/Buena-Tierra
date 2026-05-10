import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useFreshProduce } from '../../contexts/FreshProduceContext';

export function FarmerLogin() {
  const navigate = useNavigate();
  const { authenticateFarmer } = useFreshProduce();
  const [dni, setDni] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!dni) {
      setError('Por favor ingresa tu DNI o RUC');
      return;
    }

    const farmer = authenticateFarmer(dni);
    if (farmer) {
      // Store farmer ID in session
      sessionStorage.setItem('farmerId', farmer.id);
      sessionStorage.setItem('farmerName', farmer.name);
      navigate('/agricultor/home');
    } else {
      setError('No encontramos ese número. Llama a Buena Tierra para registrarte.');
    }
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-12 animate-fade-in">
          <h1
            className="text-4xl font-bold text-[#2E7D32] mb-2"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Buena Tierra
          </h1>
          <div className="text-5xl mb-4">🌱</div>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8 animate-fade-in-scale">
          <h2 className="text-2xl font-bold text-[#1C1C1C] text-center mb-2">
            ¡Hola! Ingresa con tu DNI o RUC
          </h2>
          <p className="text-center text-[#757575] mb-8 text-lg">
            Si tienes dudas, llama a Buena Tierra
          </p>

          <div className="space-y-6">
            <div>
              <label className="block text-base font-medium text-[#757575] mb-3">
                Tu DNI o RUC
              </label>
              <input
                type="text"
                inputMode="numeric"
                value={dni}
                onChange={(e) => {
                  setDni(e.target.value.replace(/\D/g, ''));
                  setError('');
                }}
                placeholder="Ej: 12345678"
                className="w-full h-16 px-5 text-xl bg-white border-2 border-[#E8E8E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:border-transparent"
                style={{ fontSize: '20px' }}
              />
              {error && (
                <p className="text-[#D32F2F] text-base mt-3 animate-fade-in">
                  {error}
                </p>
              )}
            </div>

            <button
              onClick={handleLogin}
              className="w-full h-16 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl font-bold text-xl transition-colors flex items-center justify-center gap-2"
            >
              Ingresar →
            </button>
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-[#757575]">
              Agricultores registrados pueden ingresar
            </p>
            <p className="text-xs text-[#757575] mt-2">
              📞 Contacto: +51 999 888 777
            </p>
          </div>
        </div>

        {/* Demo Credentials */}
        <div className="mt-6 bg-[#FFF9E6] border border-[#F9A825] rounded-lg p-4 text-sm">
          <p className="font-medium text-[#1C1C1C] mb-2">Demo - Prueba con:</p>
          <div className="space-y-1 text-[#757575]">
            <p>• Juan Mamani: <strong>12345678</strong></p>
            <p>• Rosa Quispe: <strong>23456789</strong></p>
            <p>• Carlos Flores: <strong>34567890</strong></p>
          </div>
        </div>
      </div>
    </div>
  );
}
