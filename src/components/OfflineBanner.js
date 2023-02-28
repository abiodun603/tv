// import React from 'react';
// import { observer } from 'mobx-react';
// import testAppStore from '../store/mobxStore/testAppStore';
// import dynamic from 'next/dynamic';
// testAppStore = dynamic(() => import('../store/mobxStore/testAppStore'), {
//   ssr: false
// });

// const OfflineBanner = observer(() => {
//   if (!testAppStore.isOnline) {
//     return (
//       <div className="offline-banner">
//         <p>You are currently offline. Please check your internet connection.</p>
//       </div>
//     );
//   }

//   return null;
// });

// export default OfflineBanner;

import { useState, useEffect } from 'react';

function MyComponent() {
  const [isOnline, setIsOnline] = useState(true);
  const [showComponent, setShowComponent] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    const timeoutId = setTimeout(() => {
      setShowComponent(true);
    }, 5000);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);

      clearTimeout(timeoutId);

    };
  }, [isOnline]);

  return (
    <div>
      {!isOnline && <p>{isOnline ? 'Welcome back online' : 'You are Offline, Please Check your Network connection'}</p>}
    </div>
  );
}

export default MyComponent;