import './style.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { app, stateManager, store } from './core/GameEngine.js';
import { DevPanel } from './ui/DevPanel.tsx';
import { BottomNavBar } from './ui/BottomNavBar.tsx';
import { CurrencyHUD } from './ui/CurrencyHUD.tsx';
import { WeaponPanel } from './ui/WeaponPanel.tsx';
import { RewardDustPopup } from './ui/RewardDustPopup.tsx';
import { RewardCorePopup } from './ui/RewardCorePopup.tsx';

const canvasElem = document.getElementById('game-canvas');
canvasElem.replaceWith(app.view);
app.view.id = 'game-canvas';

document.body.appendChild(app.view);


function UI() {
  const [dustReward, setDustReward] = React.useState<number | null>(null);
  const [coreReward, setCoreReward] = React.useState<number | null>(null);

  React.useEffect(() => {
    const dustCb = ({ amount }: any) => setDustReward(amount);
    const coreCb = ({ amount }: any) => setCoreReward(amount);
    store.on('reward:dust', dustCb);
    store.on('reward:core', coreCb);
    return () => {
      store.off('reward:dust', dustCb);
      store.off('reward:core', coreCb);
    };
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col justify-end pointer-events-none">
      <CurrencyHUD />
      <WeaponPanel />
      {dustReward !== null && (
        <RewardDustPopup amount={dustReward} onClose={() => setDustReward(null)} />
      )}
      {coreReward !== null && (
        <RewardCorePopup amount={coreReward} onClose={() => setCoreReward(null)} />
      )}
      <DevPanel />
      <BottomNavBar />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('ui-layer'));
root.render(<UI />);

stateManager.goTo('MainScreen');

