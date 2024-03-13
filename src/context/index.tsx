import { PropsWithChildren } from 'react';
import LayerContextProvider from './LayerContext';
import BreadcrumbsContextProvider from './BreadcrumbsContext';
import VisualizationHistoryProvider from './VisualizationHistory';
import GraphContextProvider from './GraphContext';
import VisualizationLayoutContextProvider from './VisualizationLayoutContext';
import GraphHighlightContextProvider from './GraphHighlightContext';
import ViolationsContextProvider from './ViolationsContext';
import ColoringContextProvider from './ColoringContext';

export { LayerContext } from './LayerContext';
export { BreadcrumbsContext } from './BreadcrumbsContext';
export { VisualizationHistory } from './VisualizationHistory';
export { ViolationsContext } from './ViolationsContext';
export { GraphContext } from './GraphContext';
export { VisualizationLayoutContext } from './VisualizationLayoutContext';
export { GraphHighlightContext } from './GraphHighlightContext';

export function ContextProviders({ children }: PropsWithChildren) {
  return (
    <LayerContextProvider>
      <VisualizationHistoryProvider>
        <BreadcrumbsContextProvider>
          <ViolationsContextProvider>
            <GraphContextProvider>
              <VisualizationLayoutContextProvider>
                <GraphHighlightContextProvider>
                  <ColoringContextProvider>
                    {children}
                  </ColoringContextProvider>
                </GraphHighlightContextProvider>
              </VisualizationLayoutContextProvider>
            </GraphContextProvider>
          </ViolationsContextProvider>
        </BreadcrumbsContextProvider>
      </VisualizationHistoryProvider>
    </LayerContextProvider>
  );
}
