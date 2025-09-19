import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { AuthProvider } from '@/context/AuthContext';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ErrorBoundary from '@/components/ErrorBoundary';
import LoadingSpinner from '@/components/LoadingSpinner';
import '@/styles/globals.css';

export default function App({ Component, pageProps }: AppProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Prevent hydration mismatch
    setIsHydrated(true);
  }, []);

  // Show loading spinner during hydration
  if (!isHydrated) {
    return <LoadingSpinner fullScreen text="Loading Writers Hub..." />;
  }

  return (
    <ErrorBoundary>
      <AuthProvider>
        <div className="min-h-screen bg-gray-50">
          <Header />
          <main className="pt-16">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </ErrorBoundary>
  );
}