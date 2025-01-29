import dynamic from 'next/dynamic';

// Import Home component with SSR disabled
const Home = dynamic(() => import('../components/Home'), {
  ssr: false
});

export default function HomePage() {
  return <Home />;
}
