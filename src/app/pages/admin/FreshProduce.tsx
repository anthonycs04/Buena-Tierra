import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Calendar, Plus, X, Clock, Package } from 'lucide-react';
import { useFreshProduce } from '../../contexts/FreshProduceContext';

export function FreshProduce() {
  const navigate = useNavigate();
  const { periods, activePeriod, createPeriod, closePeriod } = useFreshProduce();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    startDate: '',
    endDate: '',
  });

  const handleCreatePeriod = () => {
    if (!formData.name || !formData.startDate || !formData.endDate) {
      alert('Por favor completa todos los campos');
      return;
    }

    createPeriod({
      name: formData.name,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate),
      status: 'activo',
    });

    setFormData({ name: '', startDate: '', endDate: '' });
    setShowCreateModal(false);
  };

  const getDaysRemaining = (endDate: Date) => {
    const now = new Date();
    const diff = endDate.getTime() - now.getTime();
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
    return days;
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'activo':
        return { color: '#388E3C', bg: '#E8F5E9', label: 'Activo' };
      case 'cerrado':
        return { color: '#757575', bg: '#F2F2F2', label: 'Cerrado' };
      case 'proximo':
        return { color: '#F9A825', bg: '#FFF9E6', label: 'Próximo' };
      default:
        return { color: '#757575', bg: '#F2F2F2', label: status };
    }
  };

  return (
    <div className="p-4 lg:p-6 pb-20 lg:pb-6 smooth-scroll">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1
            className="text-2xl font-bold text-[#1C1C1C] animate-fade-in"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            🥦 Hortalizas y Frutas
          </h1>
          <p className="text-sm text-[#757575]">Gestión de períodos y stock fresco</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-[#2E7D32] text-white rounded-lg font-medium hover:bg-[#1B5E20] transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Nuevo período
        </button>
      </div>

      {/* Active Period Banner */}
      {activePeriod && (
        <div className="bg-[#E8F5E9] border-2 border-[#2E7D32] rounded-xl p-6 mb-6 animate-fade-in">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="text-sm font-medium text-[#757575]">Período activo</span>
                <span
                  className="px-3 py-1 rounded-full text-xs font-bold"
                  style={{
                    color: getStatusConfig(activePeriod.status).color,
                    backgroundColor: getStatusConfig(activePeriod.status).bg,
                  }}
                >
                  {getStatusConfig(activePeriod.status).label}
                </span>
              </div>
              <h2
                className="text-2xl font-bold text-[#1B5E20] mb-2"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {activePeriod.name}
              </h2>
              <div className="flex items-center gap-4 text-sm text-[#757575]">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {activePeriod.startDate.toLocaleDateString('es-PE', {
                      day: '2-digit',
                      month: 'short',
                    })}{' '}
                    -{' '}
                    {activePeriod.endDate.toLocaleDateString('es-PE', {
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium text-[#F9A825]">
                    Quedan {getDaysRemaining(activePeriod.endDate)} días
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => {}}
                className="px-4 py-2 border border-[#2E7D32] text-[#2E7D32] rounded-lg text-sm font-medium hover:bg-[#F1F8E9] transition-colors"
              >
                Editar período
              </button>
              <button
                onClick={() => {
                  if (confirm('¿Cerrar este período anticipadamente?')) {
                    closePeriod(activePeriod.id);
                  }
                }}
                className="px-4 py-2 bg-[#D32F2F] text-white rounded-lg text-sm font-medium hover:bg-[#B71C1C] transition-colors"
              >
                Cerrar período
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg p-4 mt-4">
            <p className="text-sm text-[#757575] mb-3">Resumen rápido</p>
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <p className="text-2xl font-bold text-[#2E7D32]">12</p>
                <p className="text-xs text-[#757575]">Productos activos</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#2E7D32]">3</p>
                <p className="text-xs text-[#757575]">Agricultores</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#2E7D32]">45</p>
                <p className="text-xs text-[#757575]">Pedidos recibidos</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/admin/fresh-produce/stock')}
              className="w-full h-11 bg-[#2E7D32] text-white rounded-lg font-medium hover:bg-[#1B5E20] transition-colors flex items-center justify-center gap-2"
            >
              <Package className="w-4 h-4" />
              Ver stock consolidado
            </button>
          </div>
        </div>
      )}

      {/* Past Periods */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-5 border-b border-[#E8E8E0]">
          <h2 className="text-lg font-bold text-[#1C1C1C]">Períodos anteriores</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-[#F2F2EC] border-b border-[#E8E8E0]">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#757575]">
                  Período
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#757575]">
                  Inicio
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#757575]">
                  Fin
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#757575]">
                  Estado
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#757575]">
                  Agricultores
                </th>
                <th className="text-left px-4 py-3 text-xs font-medium text-[#757575]">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody>
              {periods
                .filter((p) => p.status !== 'activo')
                .map((period) => (
                  <tr
                    key={period.id}
                    className="border-b border-[#E8E8E0] hover:bg-[#FAFAF7]"
                  >
                    <td className="px-4 py-3 text-sm font-medium text-[#1C1C1C]">
                      {period.name}
                    </td>
                    <td className="px-4 py-3 text-sm text-[#757575]">
                      {period.startDate.toLocaleDateString('es-PE')}
                    </td>
                    <td className="px-4 py-3 text-sm text-[#757575]">
                      {period.endDate.toLocaleDateString('es-PE')}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{
                          color: getStatusConfig(period.status).color,
                          backgroundColor: getStatusConfig(period.status).bg,
                        }}
                      >
                        {getStatusConfig(period.status).label}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-[#757575]">3</td>
                    <td className="px-4 py-3">
                      <button className="text-sm text-[#2E7D32] font-medium hover:underline">
                        Ver resumen →
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>

          {periods.filter((p) => p.status !== 'activo').length === 0 && (
            <div className="text-center py-12">
              <p className="text-[#757575]">No hay períodos anteriores</p>
            </div>
          )}
        </div>
      </div>

      {/* Create Period Modal */}
      {showCreateModal && (
        <>
          <div
            className="fixed inset-0 bg-black/40 z-50"
            onClick={() => setShowCreateModal(false)}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-xl z-50 w-full max-w-md p-6 animate-fade-in-scale">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-[#1C1C1C]">Nuevo período</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-2 hover:bg-[#F2F2EC] rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#757575]" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-[#757575] mb-2">
                  Nombre del período
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Ej: Semana 20 - Mayo"
                  className="w-full h-12 px-4 bg-white border border-[#E8E8E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#757575] mb-2">
                  Fecha de inicio
                </label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) =>
                    setFormData({ ...formData, startDate: e.target.value })
                  }
                  className="w-full h-12 px-4 bg-white border border-[#E8E8E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#757575] mb-2">
                  Fecha de fin
                </label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) =>
                    setFormData({ ...formData, endDate: e.target.value })
                  }
                  className="w-full h-12 px-4 bg-white border border-[#E8E8E0] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#2E7D32]"
                />
              </div>
            </div>

            <div className="flex gap-2 mt-6">
              <button
                onClick={() => setShowCreateModal(false)}
                className="flex-1 h-11 border border-[#E8E8E0] text-[#757575] rounded-xl font-medium hover:bg-[#F2F2EC] transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={handleCreatePeriod}
                className="flex-1 h-11 bg-[#2E7D32] text-white rounded-xl font-medium hover:bg-[#1B5E20] transition-colors"
              >
                Crear período
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
