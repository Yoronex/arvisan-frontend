import { PropsWithChildren } from 'react';
import LayerContextProvider from './LayerContext';
import DomainContextProvider from './DomainContext';
import VisualizationHistoryProvider from './VisualizationHistory';
import GraphContextProvider from './GraphContext';
import VisualizationLayoutContextProvider from './VisualizationLayoutContext';
import GraphHighlightContextProvider from './GraphHighlightContext';
import ViolationsContextProvider from './ViolationsContext';

export { LayerContext } from './LayerContext';
export { DomainContext } from './DomainContext';
export { VisualizationHistory } from './VisualizationHistory';
export { ViolationsContext } from './ViolationsContext';
export { GraphContext } from './GraphContext';
export { VisualizationLayoutContext } from './VisualizationLayoutContext';
export { GraphHighlightContext } from './GraphHighlightContext';

export function ContextProviders({ children }: PropsWithChildren) {
  return (
    <LayerContextProvider>
      <DomainContextProvider>
        <VisualizationHistoryProvider>
          <ViolationsContextProvider>
            <GraphContextProvider>
              <VisualizationLayoutContextProvider>
                <GraphHighlightContextProvider>
                  {children}
                </GraphHighlightContextProvider>
              </VisualizationLayoutContextProvider>
            </GraphContextProvider>
          </ViolationsContextProvider>
        </VisualizationHistoryProvider>
      </DomainContextProvider>
    </LayerContextProvider>
  );
}
