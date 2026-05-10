import { Outlet } from 'react-router';
import { FreshProduceProvider } from '../contexts/FreshProduceContext';

export function FarmerLayout() {
  return (
    <FreshProduceProvider>
      <div className="min-h-screen bg-[#FAFAF7]">
        <Outlet />
      </div>
    </FreshProduceProvider>
  );
}
