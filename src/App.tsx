import MainMenu from './components/toolbox/MainMenu';
import VisualizationSettings from './components/toolbox/VisualizationSettings';

function App() {
  return (
    <>
      <div className="" style={{ }}>
        <MainMenu />
        <VisualizationSettings />
      </div>
      <div className="w-100 vh-100 bg-danger">
        <p>Hello world!</p>
      </div>
    </>
  );
}

export default App;
