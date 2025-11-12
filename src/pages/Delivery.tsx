import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type DeliveryStatus = 'preparing' | 'cooking' | 'ready' | 'delivering' | 'delivered';

interface StatusStep {
  id: DeliveryStatus;
  label: string;
  icon: string;
  description: string;
}

const statusSteps: StatusStep[] = [
  {
    id: 'preparing',
    label: 'Pesanan Diterima',
    icon: '📝',
    description: 'Pesanan Anda telah diterima dan sedang diproses',
  },
  {
    id: 'cooking',
    label: 'Sedang Dimasak',
    icon: '👨‍🍳',
    description: 'Chef sedang menyiapkan makanan Anda',
  },
  {
    id: 'ready',
    label: 'Siap Diantar',
    icon: '✅',
    description: 'Makanan Anda sudah siap dan menunggu pengantaran',
  },
  {
    id: 'delivering',
    label: 'Sedang Dikirim',
    icon: '🚚',
    description: 'Pesanan Anda sedang dalam perjalanan ke meja Anda',
  },
  {
    id: 'delivered',
    label: 'Telah Sampai',
    icon: '🎉',
    description: 'Pesanan Anda telah sampai. Selamat menikmati!',
  },
];

export default function Delivery() {
  const navigate = useNavigate();
  const [currentStatus, setCurrentStatus] = useState<DeliveryStatus>('preparing');
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const statusOrder: DeliveryStatus[] = ['preparing', 'cooking', 'ready', 'delivering', 'delivered'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      if (currentIndex < statusOrder.length - 1) {
        currentIndex++;
        setCurrentStatus(statusOrder[currentIndex]);
        setProgress(((currentIndex + 1) / statusOrder.length) * 100);
      } else {
        clearInterval(interval);
      }
    }, 3000); // Change status every 3 seconds

    // Initial progress
    setProgress((1 / statusOrder.length) * 100);

    return () => clearInterval(interval);
  }, []);

  const currentStatusIndex = statusSteps.findIndex(step => step.id === currentStatus);

  return (
    <div className="min-h-screen pt-24 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-800 dark:text-kitchen-light">
          Status Pengantaran
        </h1>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="relative">
            <div className="flex justify-between mb-4">
              {statusSteps.map((step, index) => (
                <div
                  key={step.id}
                  className={`flex flex-col items-center flex-1 ${
                    index < statusSteps.length - 1 ? 'mr-2' : ''
                  }`}
                >
                  <div
                    className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl transition-all duration-500 ${
                      index <= currentStatusIndex
                        ? 'bg-kitchen-gold text-white scale-110'
                        : 'bg-gray-300 dark:bg-gray-600 text-gray-500'
                    }`}
                  >
                    {step.icon}
                  </div>
                  <p
                    className={`text-sm font-medium mt-2 text-center ${
                      index <= currentStatusIndex
                        ? 'text-kitchen-gold dark:text-kitchen-gold'
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                  >
                    {step.label}
                  </p>
                </div>
              ))}
            </div>

            {/* Progress Line */}
            <div className="absolute top-8 left-0 right-0 h-1 bg-gray-300 dark:bg-gray-600 -z-10">
              <div
                className="h-full bg-kitchen-gold transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Current Status Card */}
        <div className="bg-white dark:bg-kitchen-brown/30 rounded-xl shadow-lg p-8 text-center mb-8">
          <div className="text-8xl mb-4 animate-bounce">
            {statusSteps[currentStatusIndex]?.icon}
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-kitchen-light mb-2">
            {statusSteps[currentStatusIndex]?.label}
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            {statusSteps[currentStatusIndex]?.description}
          </p>
        </div>

        {/* Status Timeline */}
        <div className="space-y-4">
          {statusSteps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center p-4 rounded-lg transition-all duration-300 ${
                index <= currentStatusIndex
                  ? 'bg-kitchen-gold/20 dark:bg-kitchen-gold/30 border-2 border-kitchen-gold'
                  : 'bg-gray-100 dark:bg-gray-800 border-2 border-transparent'
              }`}
            >
              <div className="text-4xl mr-4">{step.icon}</div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 dark:text-kitchen-light">
                  {step.label}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {step.description}
                </p>
              </div>
              {index < currentStatusIndex && (
                <span className="text-2xl">✓</span>
              )}
              {index === currentStatusIndex && (
                <span className="text-2xl animate-pulse">⟳</span>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate('/menu')}
            className="px-6 py-3 bg-kitchen-gold hover:bg-kitchen-brown text-white rounded-lg font-medium transition-colors"
          >
            Pesan Lagi
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500 text-gray-800 dark:text-kitchen-light rounded-lg font-medium transition-colors"
          >
            Kembali ke Home
          </button>
        </div>
      </div>
    </div>
  );
}

