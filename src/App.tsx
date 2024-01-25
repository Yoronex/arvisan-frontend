import MainMenu from './components/toolbox/MainMenu';
import VisualizationSettings from './components/toolbox/VisualizationSettings';
import VisualizationWrapper from './components/visualization/VisualizationWrapper';
import ReturnButton from './components/toolbox/ReturnButton';

const SIDEBAR_WIDTH = '18rem';

function App() {
  return (
    <>
      <div className="" style={{ }}>
        <MainMenu />
        <div className="position-absolute vh-100 px-3 pb-3 z-2 d-flex flex-row gap-3" style={{ paddingTop: '6rem' }}>
          <VisualizationSettings cardWidth={SIDEBAR_WIDTH} />
          <ReturnButton />
        </div>
      </div>
      <div className="w-100 vh-100">
        <VisualizationWrapper sidebarWidth={SIDEBAR_WIDTH} />
      </div>
    </>
  );
}

export default App;
