import './style.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { app, stateManager, store } from './core/GameEngine.js';
import { sectors as defaultSectors } from './data/galaxy.js';
import { DevPanel } from './ui/DevPanel.tsx';
import { BottomNavBar } from './ui/BottomNavBar.tsx';
import { CurrencyHUD } from './ui/CurrencyHUD.tsx';
import { WeaponPanel } from './ui/WeaponPanel.tsx';
import { RewardDustPopup } from './ui/RewardDustPopup.tsx';
import { RewardCorePopup } from './ui/RewardCorePopup.tsx';
import { UnlockSectorModal } from './ui/UnlockSectorModal.tsx';

const container = document.getElementById('canvas-container');
container.appendChild(app.view);
app.view.id = 'game-canvas';
app.view.style.width = '100%';
app.view.style.height = '100%';

// initialize galaxy sectors once
store.initSectors(defaultSectors);


function UI() {
  const [dustReward, setDustReward] = React.useState<number | null>(null);
  const [coreReward, setCoreReward] = React.useState<number | null>(null);
  const [unlockId, setUnlockId] = React.useState<string | null>(null);

  React.useEffect(() => {
    const dustCb = ({ amount, source }: any) => {
      if (source !== 'attack') setDustReward(amount);
    };
    const coreCb = ({ amount }: any) => setCoreReward(amount);
    const uiCb = (s: any) => setUnlockId(s.ui.unlockSectorId);
    store.on('reward:dust', dustCb);
    store.on('reward:core', coreCb);
    store.on('update', uiCb);
    return () => {
      store.off('reward:dust', dustCb);
      store.off('reward:core', coreCb);
      store.off('update', uiCb);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col justify-between items-center pointer-events-none">
      <CurrencyHUD />
      <WeaponPanel />
      {dustReward !== null && (
        <RewardDustPopup amount={dustReward} onClose={() => setDustReward(null)} />
      )}
      {coreReward !== null && (
        <RewardCorePopup amount={coreReward} onClose={() => setCoreReward(null)} />
      )}
      {unlockId && (
        <UnlockSectorModal
          sectorId={unlockId}
          onClose={() => store.closeUnlockModal()}
          onUnlock={() => store.unlockSector(unlockId)}
        />
      )}
      <DevPanel />
      <BottomNavBar />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('ui-layer'));
root.render(<UI />);

stateManager.goTo('MainScreen');

