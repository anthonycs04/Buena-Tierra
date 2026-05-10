import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { Calendar, Package, LogOut } from 'lucide-react';
import { useFreshProduce } from '../../contexts/FreshProduceContext';

export function FarmerHome() {
  const navigate = useNavigate();
  const { activePeriod, farmerProducts, getFarmerOrderSummary, periods } = useFreshProduce();
  const [farmerName, setFarmerName] = useState('');
  const [farmerId, setFarmerId] = useState('');

  useEffect(() => {
    const storedName = sessionStorage.getItem('farmerName');
    const storedId = sessionStorage.getItem('farmerId');

    if (!storedName || !storedId) {
      navigate('/agricultor');
      return;
    }

    setFarmerName(storedName);
    setFarmerId(storedId);

    // Check if there's a closed period that needs confirmation
    const closedPeriods = periods.filter((p) => p.status === 'cerrado');
    if (closedPeriods.length > 0) {
      // Get the most recent closed period
      const recentClosed = closedPeriods.sort(
        (a, b) => b.endDate.getTime() - a.endDate.getTime()
      )[0];

      const summary = getFarmerOrderSummary(storedId, recentClosed.id);

      // If farmer has products in this period but hasn't confirmed ready, show order summary
      if (summary && !summary.confirmedReady) {
        navigate('/agricultor/order-summary');
        return;
      }
    }
  }, [navigate, periods, getFarmerOrderSummary]);

  const handleLogout = () => {
    sessionStorage.removeItem('farmerId');
    sessionStorage.removeItem('farmerName');
    navigate('/agricultor');
  };

  const myProducts = activePeriod
    ? farmerProducts.filter(
        (p) => p.farmerId === farmerId && p.periodId === activePeriod.id
      )
    : [];

  const hasUploadedProducts = myProducts.length > 0;

  const getDaysRemaining = (endDate: Date) => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  return (
    <div className="min-h-screen bg-[#FAFAF7] p-4 pb-24">
      {/* Header */}
      <div className="mb-8 animate-fade-in">
        <h1 className="text-3xl font-bold text-[#1C1C1C] mb-2">
          Hola, {farmerName} 👋
        </h1>
        <p className="text-lg text-[#757575]">Bienvenido a tu portal</p>
      </div>

      {/* Active Period Card */}
      {activePeriod ? (
        <div className="bg-[#E8F5E9] border-2 border-[#2E7D32] rounded-2xl p-6 mb-6 animate-fade-in-scale">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-[#2E7D32] rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-sm font-medium text-[#757575]">Período abierto</p>
              <h2 className="text-xl font-bold text-[#1B5E20]">
                {activePeriod.name}
              </h2>
            </div>
          </div>

          <div className="bg-white rounded-xl p-4 mb-4">
            <p className="text-base text-[#757575] mb-2">
              Tienes hasta el{' '}
              <strong className="text-[#1C1C1C]">
                {activePeriod.endDate.toLocaleDateString('es-PE', {
                  day: '2-digit',
                  month: 'long',
                  year: 'numeric',
                })}
              </strong>{' '}
              para subir tus productos
            </p>
            <div className="flex items-center gap-2 text-[#F9A825] font-bold text-lg">
              <Calendar className="w-5 h-5" />
              <span>Quedan {getDaysRemaining(activePeriod.endDate)} días</span>
            </div>
          </div>

          {hasUploadedProducts && (
            <div className="bg-[#F1F8E9] rounded-xl p-4 mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Package className="w-5 h-5 text-[#2E7D32]" />
                <p className="text-sm font-medium text-[#1C1C1C]">
                  Tienes {myProducts.length} productos subidos
                </p>
              </div>
              <div className="space-y-1">
                {myProducts.slice(0, 3).map((p) => (
                  <p key={p.id} className="text-sm text-[#757575]">
                    • {p.productName}: {p.quantity} {p.unit}
                  </p>
                ))}
                {myProducts.length > 3 && (
                  <p className="text-sm text-[#2E7D32] font-medium">
                    + {myProducts.length - 3} más
                  </p>
                )}
              </div>
            </div>
          )}

          <button
            onClick={() => navigate('/agricultor/upload')}
            className="w-full h-16 bg-[#2E7D32] hover:bg-[#1B5E20] text-white rounded-xl font-bold text-xl transition-colors flex items-center justify-center gap-3"
          >
            {hasUploadedProducts ? (
              <>
                <span>✏️</span>
                Ver y editar mis productos
              </>
            ) : (
              <>
                <span>📦</span>
                Subir mis productos
              </>
            )}
          </button>
        </div>
      ) : (
        <div className="bg-white rounded-2xl p-8 text-center animate-fade-in">
          <div className="text-6xl mb-4">🌱</div>
          <h2 className="text-xl font-bold text-[#1C1C1C] mb-3">
            Por ahora no hay nada que hacer
          </h2>
          <p className="text-lg text-[#757575] leading-relaxed">
            Cuando Buena Tierra abra el siguiente período, podrás subir tus
            productos aquí.
          </p>
        </div>
      )}

      {/* Help Card */}
      <div className="bg-white rounded-2xl p-6 mb-6">
        <h3 className="text-lg font-bold text-[#1C1C1C] mb-3">¿Necesitas ayuda?</h3>
        <p className="text-base text-[#757575] mb-4">
          Llama a Buena Tierra si tienes dudas o problemas
        </p>
        <a
          href="tel:+51999888777"
          className="flex items-center justify-center gap-2 w-full h-14 border-2 border-[#2E7D32] text-[#2E7D32] rounded-xl font-bold text-lg hover:bg-[#F1F8E9] transition-colors"
        >
          📞 +51 999 888 777
        </a>
      </div>

      {/* Logout */}
      <button
        onClick={handleLogout}
        className="w-full flex items-center justify-center gap-2 text-[#757575] hover:text-[#1C1C1C] transition-colors text-base py-4"
      >
        <LogOut className="w-5 h-5" />
        Cerrar sesión
      </button>
    </div>
  );
}
