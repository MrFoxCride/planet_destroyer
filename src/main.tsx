import './style.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { app, stateManager, store, dispatchSystem, nebulaSystem, colonySystem } from './core/GameEngine.js';
import { sectors as defaultSectors } from './data/galaxy.js';
import { planetNames } from './data/planetNames.js';
import { DevPanel } from './ui/DevPanel.tsx';
import { BottomNavBar } from './ui/BottomNavBar.tsx';
import { CurrencyHUD } from './ui/CurrencyHUD.tsx';
import { WeaponPanel } from './ui/WeaponPanel.tsx';
import { PlanetHUD } from './ui/PlanetHUD.tsx';
import { GalaxyButton } from './ui/GalaxyButton.tsx';
import { BackButton } from './ui/BackButton.tsx';
import { RewardDustPopup } from './ui/RewardDustPopup.tsx';
import { RewardCorePopup } from './ui/RewardCorePopup.tsx';
import { UnlockSectorModal } from './ui/UnlockSectorModal.tsx';
import { PlanetActionModal } from './ui/PlanetActionModal.tsx';
import { ColonyPanel } from './ui/ColonyPanel.tsx';
import { DustFlyout } from './ui/DustFlyout.tsx';
import { ExtractionPanel } from './ui/ExtractionPanel.tsx';
import { UnitReadyPopup } from './ui/UnitReadyPopup.tsx';

const isDev = import.meta.env.DEV;

const container = document.getElementById('canvas-container');
container.appendChild(app.view);
app.view.id = 'game-canvas';
app.view.style.width = '100%';
app.view.style.height = '100%';

// initialize galaxy sectors once
store.initNamePool(planetNames);
store.initSectors(defaultSectors);
const startSector = store.get().sectors.find((s) => s.unlocked);
if (startSector && startSector.entities.length) {
  store.selectPlanet(startSector.entities[0]);
}


function UI() {
  const [dustReward, setDustReward] = React.useState<number | null>(null);
  const [coreReward, setCoreReward] = React.useState<number | null>(null);
  const [extractionInfo, setExtractionInfo] = React.useState<any | null>(null);
  const [unitReady, setUnitReady] = React.useState<any | null>(null);
  const [unlockId, setUnlockId] = React.useState<string | null>(null);
  const [flyouts, setFlyouts] = React.useState<{ id: number; amount: number; idx: number }[]>([]);
  const flyoutIndex = React.useRef(0);
  const [screen, setScreen] = React.useState(store.get().currentScreen);

  React.useEffect(() => {
    const dustCb = ({ amount, source }: any) => {
      if (source !== 'attack' && source !== 'colonyTap') setDustReward(amount);
    };
    const flyoutCb = ({ amount }: any) => {
      const id = Date.now() + Math.random();
      const idx = flyoutIndex.current;
      flyoutIndex.current = (flyoutIndex.current + 1) % 5;
      setFlyouts((f) => [...f, { id, amount, idx }]);
      setTimeout(() => {
        setFlyouts((f) => f.filter((fl) => fl.id !== id));
      }, 900);
    };
    const coreCb = ({ amount, source }: any) => {
      if (source !== 'dispatch') setCoreReward(amount);
    };
    const extractionCb = (info: any) => {
      const state = store.get();
      if (
        state.currentScreen === 'MainScreen' &&
        state.planet.id === info.planetId
      ) {
        stateManager.goTo('SectorMap', { sectorId: info.sectorId });
      }
      setExtractionInfo(info);
    };
    const uiCb = (s: any) => setUnlockId(s.ui.unlockSectorId);
    const screenCb = (s: any) => setScreen(s.currentScreen);
    store.on('reward:dust', dustCb);
    store.on('reward:core', coreCb);
    store.on('update', uiCb);
    store.on('update', screenCb);
    store.on('flyout', flyoutCb);
    const craftCb = (info: any) => setUnitReady(info);
    store.on('extraction:completed', extractionCb);
    store.on('craft:completed', craftCb);
    return () => {
      store.off('reward:dust', dustCb);
      store.off('reward:core', coreCb);
      store.off('update', uiCb);
      store.off('update', screenCb);
      store.off('flyout', flyoutCb);
      store.off('extraction:completed', extractionCb);
      store.off('craft:completed', craftCb);
    };
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none">
      {screen === 'MainScreen' && (
        <div
          id="hud-layer"
          className={`${isDev ? 'debug-outline' : ''} absolute top-0 left-0 right-0 pointer-events-none`}
          style={{ height: 'var(--hud-height)' }}
        >
          <CurrencyHUD />
          <PlanetHUD />
        </div>
      )}
      <div
        id="modal-layer"
        className="absolute inset-0 pointer-events-none"
      >
        <BackButton />
        <ExtractionPanel />
        <WeaponPanel />
        <ColonyPanel />
        <GalaxyButton />
        <PlanetActionModal />
      {flyouts.map((f) => (
        <DustFlyout key={f.id} amount={f.amount} index={f.idx} />
      ))}
      {dustReward !== null && (
        <RewardDustPopup amount={dustReward} onClose={() => setDustReward(null)} />
      )}
      {coreReward !== null && (
        <RewardCorePopup amount={coreReward} onClose={() => setCoreReward(null)} />
      )}
      {extractionInfo && (
        <RewardCorePopup
          amount={extractionInfo.amount}
          planetName={extractionInfo.name}
          onClose={() => {
            store.removePlanet(extractionInfo.sectorId, extractionInfo.planetId);
            setExtractionInfo(null);
          }}
        />
      )}
      {unitReady && (
        <UnitReadyPopup
          unitType={unitReady.type}
          onClose={() => {
            store.claimCraft(unitReady.id);
            setUnitReady(null);
          }}
        />
      )}
      {unlockId && (
        <UnlockSectorModal
          sectorId={unlockId}
          onClose={() => store.closeUnlockModal()}
          onUnlock={() => store.unlockSector(unlockId)}
        />
      )}
        <DevPanel />
      </div>
      <div
        id="navbar-layer"
        className={`${isDev ? 'debug-outline' : ''} absolute bottom-0 left-0 right-0 pointer-events-none`}
        style={{ height: 'var(--navbar-height)' }}
      >
        <BottomNavBar />
      </div>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('ui-layer'));
root.render(<UI />);

stateManager.goTo('MainScreen');

setInterval(() => {
  dispatchSystem.update();
  colonySystem.update();
  store.updateExtractions();
  store.updateCraftQueue();
}, 1000);

// expose for debugging
window.dispatchSystem = dispatchSystem;
window.nebulaSystem = nebulaSystem;

