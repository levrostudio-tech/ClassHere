import React from 'react';

export default function DeviceFrame({ children }) {
  // Viewport-aware proportional auto-scaling for desktop screens
  const [scale, setScale] = React.useState(1);
  const [isMobileScreen, setIsMobileScreen] = React.useState(() => {
    return typeof window !== 'undefined' && window.innerWidth <= 480;
  });

  const PHONE_WIDTH = 412;
  const PHONE_HEIGHT = 820;

  React.useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth <= 480;
      setIsMobileScreen(mobile);

      if (mobile) {
        setScale(1);
        return;
      }

      // Available vertical space for device frame (accounting for padding & outer bezel)
      const PADDING_V = 36; // 18px top & bottom padding
      const availableHeight = window.innerHeight - PADDING_V;
      const computedScale = Math.min(1, Math.max(0.55, availableHeight / PHONE_HEIGHT));
      setScale(Number(computedScale.toFixed(3)));
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // On native mobile viewports (e.g. viewing directly on smartphone)
  if (isMobileScreen) {
    return (
      <div className="h-[100dvh] w-full bg-white flex flex-col font-sans selection:bg-blue-500 selection:text-white overflow-hidden">
        <main className="flex-1 flex flex-col h-full w-full relative bg-white overflow-hidden">
          {children}
        </main>
      </div>
    );
  }

  // Desktop viewport with authentic simulated device frame cleanly centered
  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-2 sm:p-4 font-sans selection:bg-blue-500 selection:text-white overflow-y-auto">
      {/* Proportional Device Frame Scaled Container */}
      <div
        className="relative shrink-0 my-auto transition-transform duration-150 ease-out"
        style={{
          width: `${Math.round(PHONE_WIDTH * scale)}px`,
          height: `${Math.round(PHONE_HEIGHT * scale)}px`,
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: `${PHONE_WIDTH}px`,
            height: `${PHONE_HEIGHT}px`,
            transform: `scale(${scale})`,
            transformOrigin: '0 0',
          }}
          className="bg-white rounded-[44px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6),0_0_0_10px_#1e293b] ring-1 ring-slate-700/50 flex flex-col overflow-hidden select-none"
        >
          {/* Screen Content */}
          <main className="flex-1 flex flex-col overflow-hidden relative bg-white pt-2 sm:pt-3">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
