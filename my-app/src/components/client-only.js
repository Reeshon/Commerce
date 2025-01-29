import { useEffect, useState } from 'react';

export default function ClientOnly({ children }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return (
      <div className="container text-center py-5">
        <div>Loading...</div>
      </div>
    );
  }

  return <>{children}</>;
}