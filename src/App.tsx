import MainMenu from './components/toolbox/MainMenu';
import VisualizationSettings from './components/toolbox/VisualizationSettings';
import Visualization from './components/visualization/Visualization';

const SIDEBAR_WIDTH = '18rem';

function App() {
  return (
    <>
      <div className="" style={{ }}>
        <MainMenu />
        <VisualizationSettings cardWidth={SIDEBAR_WIDTH} />
      </div>
      <div className="w-100 vh-100">
        <Visualization sidebarWidth={SIDEBAR_WIDTH} />
      </div>
    </>
  );
}

export default App;
