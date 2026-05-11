import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { ArrowLeft, Package, CheckCircle } from 'lucide-react';
import { useFreshProduce } from '../../contexts/FreshProduceContext';

export function FarmerOrderSummary() {
  const navigate = useNavigate();
  const { periods, markFarmerReady, getFarmerOrderSummary } = useFreshProduce();

  const [farmerId, setFarmerId] = useState('');
  const [farmerName, setFarmerName] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [confirmedAt, setConfirmedAt] = useState<Date | null>(null);
  const [currentPeriod, setCurrentPeriod] = useState<any>(null);

  useEffect(() => {
    const storedId = sessionStorage.getItem('farmerId');
    const storedName = sessionStorage.getItem('farmerName');

    if (!storedId || !storedName) {
      navigate('/agricultor');
      return;
    }

    setFarmerId(storedId);
    setFarmerName(storedName);

    const closedPeriods = periods.filter((p) => p.status === 'cerrado');

    if (closedPeriods.length === 0) {
      navigate('/agricultor/home');
      return;
    }

    const recentClosed = closedPeriods.sort(
      (a, b) => b.endDate.getTime() - a.endDate.getTime()
    )[0];

    setCurrentPeriod(recentClosed);

    const summary = getFarmerOrderSummary(storedId, recentClosed.id);

    if (summary?.confirmedReady) {
      setIsReady(true);
      setConfirmedAt(summary.confirmedAt || null);
    }
  }, [navigate, periods, getFarmerOrderSummary]);

  if (!currentPeriod) {
    return null;
  }

  const orderedProducts = [
    {
      productName: 'Lechuga Carola',
      quantityOrdered: 1,
      unit: 'unidad',
    },
    {
      productName: 'Tomate cherry rojo',
      quantityOrdered: 500,
      unit: 'gr',
    },
    {
      productName: 'Albahaca',
      quantityOrdered: 1,
      unit: 'atado',
    },
  ];

  const getProductIcon = (productName: string) => {
    const name = productName.toLowerCase();

    if (name.includes('tomate')) return '🍅';
    if (name.includes('brócoli') || name.includes('brocoli')) return '🥦';
    if (name.includes('espinaca')) return '🥬';
    if (name.includes('lechuga')) return '🥬';
    if (name.includes('albahaca')) return '🌿';
    if (name.includes('perejil')) return '🌿';
    if (name.includes('cilantro')) return '🌿';
    if (name.includes('apio')) return '🥬';
    if (name.includes('beterraga')) return '🫜';
    if (name.includes('rabanito')) return '🔴';

    return '🌿';
  };

  const handleMarkReady = () => {
    setShowConfirmDialog(true);
  };

  const handleConfirm = () => {
    markFarmerReady(farmerId, currentPeriod.id);
    setIsReady(true);
    setConfirmedAt(new Date());
    setShowConfirmDialog(false);
    setShowSuccess(true);
  };

  if (showSuccess) {
    return (
      <div className="min-h-screen bg-[#FAFAF7] flex items-center justify-center p-4">
        <div className="text-center max-w-md animate-bounce-in">
          <div className="w-28 h-28 bg-[#E8F5E9] rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-16 h-16 text-[#388E3C]" />
          </div>

          <h1 className="text-3xl font-bold text-[#1C1C1C] mb-4">
            ¡Perfecto! Le avisamos a Buena Tierra.
          </h1>

          <p className="text-xl text-[#757575] mb-8 leading-relaxed">
            Ellos te contactarán para coordinar la entrega.
          </p>

          <button
            onClick={() => navigate('/agricultor/home')}
            className="w-full h-16 bg-[#2E7D32] text-white rounded-xl font-bold text-xl hover:bg-[#1B5E20] transition-colors"
          >
            Volver al inicio
          </button>
        </div>
      </div>
    );
  }

  const totalProducts = orderedProducts.length;

  return (
    <div className="min-h-screen bg-[#FAFAF7] pb-28">
      <header className="bg-white border-b border-[#E8E8E0] px-4 py-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/agricultor/home')}
            className="p-2 hover:bg-[#F2F2EC] rounded-lg transition-colors"
          >
            <ArrowLeft className="w-6 h-6 text-[#1C1C1C]" />
          </button>

          <div>
            <h1 className="text-xl font-bold text-[#1C1C1C]">
              Tu pedido de esta semana
            </h1>
            <p className="text-sm text-[#757575]">{currentPeriod.name}</p>
          </div>
        </div>
      </header>

      <div className="p-4">
        <div className="bg-[#E8F5E9] border border-[#2E7D32] rounded-2xl p-6 mb-6 text-center animate-fade-in">
          <h2 className="text-2xl font-bold text-[#1B5E20] mb-3">
            Esto es lo que los clientes de Buena Tierra necesitan de ti:
          </h2>

          <p className="text-lg text-[#757575]">
            Prepara estos productos para la entrega
          </p>
        </div>

        <div className="space-y-4 mb-6">
          {orderedProducts.map((item, index) => (
            <div
              key={`${item.productName}-${index}`}
              className="bg-white rounded-2xl p-8 text-center shadow-md animate-fade-in"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="mb-4">
                <span className="text-4xl">
                  {getProductIcon(item.productName)}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-[#1C1C1C] mb-4">
                {item.productName}
              </h3>

              <div className="bg-[#E8F5E9] rounded-xl p-4 inline-block">
                <p
                  className="font-bold text-[#2E7D32]"
                  style={{ fontSize: '48px', lineHeight: '1.2' }}
                >
                  {item.quantityOrdered} {item.unit}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-white rounded-2xl p-6 mb-6 text-center">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Package className="w-6 h-6 text-[#2E7D32]" />
            <h3 className="text-xl font-bold text-[#1C1C1C]">Resumen total</h3>
          </div>

          <p className="text-lg text-[#757575]">
            En total tienes{' '}
            <strong className="text-[#2E7D32]">{totalProducts}</strong>{' '}
            {totalProducts === 1 ? 'producto' : 'productos'} para preparar
          </p>
        </div>

        <div className="bg-[#FFF9E6] border border-[#F9A825] rounded-2xl p-6 mb-6 animate-fade-in">
          <div className="flex items-start gap-3">
            <div className="text-3xl">📅</div>

            <div>
              <h3 className="text-lg font-bold text-[#1C1C1C] mb-2">
                Importante
              </h3>

              <p className="text-base text-[#757575] leading-relaxed">
                Coordina la entrega con Buena Tierra antes del{' '}
                <strong className="text-[#1C1C1C]">
                  {new Date(
                    currentPeriod.endDate.getTime() + 2 * 24 * 60 * 60 * 1000
                  ).toLocaleDateString('es-PE', {
                    day: '2-digit',
                    month: 'long',
                  })}
                </strong>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-[#E8E8E0] p-4 z-10">
        {!isReady ? (
          <button
            onClick={handleMarkReady}
            className="w-full h-20 bg-[#2E7D32] text-white rounded-2xl font-bold transition-colors hover:bg-[#1B5E20] flex items-center justify-center gap-3"
            style={{ fontSize: '24px' }}
          >
            <span className="text-3xl">✅</span>
            Ya tengo todo listo
          </button>
        ) : (
          <div className="bg-[#E8E8E0] rounded-2xl p-6 text-center">
            <div className="flex items-center justify-center gap-3 mb-2">
              <CheckCircle className="w-6 h-6 text-[#388E3C]" />
              <p className="text-lg font-bold text-[#1C1C1C]">
                Ya confirmaste tu pedido
              </p>
            </div>

            {confirmedAt && (
              <p className="text-sm text-[#757575]">
                Confirmado el{' '}
                {confirmedAt.toLocaleDateString('es-PE', {
                  day: '2-digit',
                  month: 'short',
                })}{' '}
                a las{' '}
                {confirmedAt.toLocaleTimeString('es-PE', {
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </p>
            )}
          </div>
        )}
      </div>

      {showConfirmDialog && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowConfirmDialog(false)}
          />

          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-2xl shadow-2xl z-50 w-full max-w-md p-8 animate-fade-in-scale">
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🤔</div>

              <h2 className="text-2xl font-bold text-[#1C1C1C] mb-3">
                ¿Estás seguro que tienes todo listo?
              </h2>

              <p className="text-lg text-[#757575]">
                Le avisaremos a Buena Tierra para coordinar la entrega
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setShowConfirmDialog(false)}
                className="flex-1 h-14 border-2 border-[#E8E8E0] text-[#757575] rounded-xl text-lg font-medium hover:bg-[#F2F2EC] transition-colors"
              >
                No, volver
              </button>

              <button
                onClick={handleConfirm}
                className="flex-1 h-14 bg-[#2E7D32] text-white rounded-xl text-lg font-bold hover:bg-[#1B5E20] transition-colors"
              >
                Sí, confirmar ✓
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}