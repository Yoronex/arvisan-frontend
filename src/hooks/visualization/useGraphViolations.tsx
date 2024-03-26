import { MutableRefObject, useContext, useEffect } from 'react';
import cytoscape from 'cytoscape';
import { VisibilityOptions } from '../../helpers/enums';
import { ViolationsContext } from '../../context';

export default function useGraphViolations(
  cy: MutableRefObject<cytoscape.Core | undefined>,
) {
  const { violations, visibility } = useContext(ViolationsContext);

  return useEffect(() => {
    if (!cy.current) return;

    const violationIds = {
      dependencyCycles: violations.dependencyCycles.map((c) => c.path.map((p) => p.id)).flat(),
      subLayers: violations.subLayers.map((s) => s.id),
    };

    const allIds = [...violationIds.dependencyCycles, ...violationIds.subLayers];
    const highlightIds: string[] = [];
    const visibleIds: string[] = [];
    if (visibility.dependencyCycles === VisibilityOptions.HIGHLIGHTED) {
      highlightIds.push(...violationIds.dependencyCycles);
    } else if (visibility.dependencyCycles === VisibilityOptions.VISIBLE) {
      visibleIds.push(...violationIds.dependencyCycles);
    }
    if (visibility.subLayers === VisibilityOptions.HIGHLIGHTED) {
      highlightIds.push(...violationIds.subLayers);
    } else if (visibility.subLayers === VisibilityOptions.VISIBLE) {
      visibleIds.push(...violationIds.subLayers);
    }

    cy.current.edges().forEach((e: cytoscape.EdgeSingular) => {
      e.removeClass('violation');
      e.removeClass('hidden');

      const idWithRandom = e.id();
      const id = idWithRandom.split('--')[0] || '';

      // Edge should be highlighted
      if (highlightIds.includes(id)) {
        e.addClass('violation');
        // Edge is a violation and should not be made visible
      } else if (allIds.includes(id) && !visibleIds.includes(id)) {
        e.addClass('hidden');
      }

      // Edge is not a violation and should be made invisible
      if (!allIds.includes(id) && visibility.nonViolations === VisibilityOptions.INVISIBLE) {
        e.addClass('hidden');
      }
    });
  }, [cy, violations, visibility]);
}
