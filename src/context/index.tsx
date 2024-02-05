import { PropsWithChildren } from 'react';
import LayerContextProvider from './LayerContext';
import DomainContextProvider from './DomainContext';
import VisualizationHistoryProvider from './VisualizationHistory';
import VisualizationContextProvider from './VisualizationContext';
import VisualizationLayoutContextProvider from './VisualizationLayoutContext';
import NodeHighlightContextProvider from './NodeHighlightContext';

export { LayerContext } from './LayerContext';
export { DomainContext } from './DomainContext';
export { VisualizationHistory } from './VisualizationHistory';
export { VisualizationContext } from './VisualizationContext';
export { VisualizationLayoutContext } from './VisualizationLayoutContext';
export { NodeHighlightContext } from './NodeHighlightContext';

export function ContextProviders({ children }: PropsWithChildren) {
  return (
    <LayerContextProvider>
      <DomainContextProvider>
        <VisualizationHistoryProvider>
          <VisualizationContextProvider>
            <VisualizationLayoutContextProvider>
              <NodeHighlightContextProvider>
                {children}
              </NodeHighlightContextProvider>
            </VisualizationLayoutContextProvider>
          </VisualizationContextProvider>
        </VisualizationHistoryProvider>
      </DomainContextProvider>
    </LayerContextProvider>
  );
}
