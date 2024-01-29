import MainMenu from './components/navigation/MainMenu';
import VisualizationWrapper from './components/visualization/VisualizationWrapper';
import ReturnButton from './components/navigation/ReturnButton';
import ToolSideBar from './components/navigation/ToolSideBar';

const SIDEBAR_WIDTH = '18rem';

function App() {
  return (
    <>
      <div className="" style={{ }}>
        <MainMenu />
        <div className="position-absolute vh-100 px-3 pb-3 z-2 d-flex flex-row gap-3" style={{ paddingTop: '6rem' }}>
          <ToolSideBar cardWidth={SIDEBAR_WIDTH} />
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
