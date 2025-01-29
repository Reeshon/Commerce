import { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { SessionProvider } from 'next-auth/react';

// Import styles
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/globals.css';

// Dynamic imports for client-side components
const FirebaseAuthProvider = dynamic(
  () => import('../components/FirebaseAuthProvider'),
  { ssr: false }
);

function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  // Client-side bootstrap initialization
  useEffect(() => {
    if (typeof window !== 'undefined') {
      require('bootstrap/dist/js/bootstrap.bundle.min.js');
    }
  }, []);

  return (
    <SessionProvider session={session}>
      <FirebaseAuthProvider>
        <Component {...pageProps} />
      </FirebaseAuthProvider>
    </SessionProvider>
  );
}

export default MyApp;
