import React from 'react';
import {
  Card, CardBody, CardHeader, CardTitle, Form, FormCheck,
} from 'react-bootstrap';
import RangeSlider from '../MultiRangeSlider';

const RANGE_MIN = 0;
const RANGE_MAX = 20;

interface Props {
  cardWidth: string | number;
}

export default function VisualizationSettings({ cardWidth }: Props) {
  const [dependencyRange, setDependencyRange] = React
    .useState<[number, number]>([RANGE_MIN, Number.POSITIVE_INFINITY]);
  const [dependentRange, setDependentRange] = React
    .useState<[number, number]>([RANGE_MIN, Number.POSITIVE_INFINITY]);

  const [showInternalRelationships, setShowInternalRelationships] = React.useState(true);
  const [showExternalRelationships, setShowExternalRelationships] = React.useState(true);

  const [showDependencyRelationships, setShowDependencyRelationships] = React.useState(true);
  const [showDependentRelationships, setShowDependentRelationships] = React.useState(false);

  return (
    <div className="position-absolute vh-100 px-3 pb-3 z-2" style={{ paddingTop: '6rem' }}>
      <Card className="h-100 shadow" style={{ width: cardWidth }}>
        <CardHeader>
          <CardTitle>
            Settings
          </CardTitle>
        </CardHeader>
        <CardBody>
          <Form className="mb-4">
            <RangeSlider
              onChange={setDependencyRange}
              values={dependencyRange}
              min={RANGE_MIN}
              max={RANGE_MAX}
              label="Number of dependencies"
            />
            <FormCheck
              onChange={(event) => setShowDependencyRelationships(event.target.checked)}
              checked={showDependencyRelationships}
              type="switch"
              label="Query & show dependency relationships"
            />
          </Form>
          <Form>
            <RangeSlider
              onChange={setDependentRange}
              values={dependentRange}
              min={RANGE_MIN}
              max={RANGE_MAX}
              label="Number of dependents"
            />
            <FormCheck
              onChange={(event) => setShowDependentRelationships(event.target.checked)}
              checked={showDependentRelationships}
              type="switch"
              label="Query & show dependent relationships"
            />
          </Form>

          <hr />

          <Form>
            <FormCheck
              onChange={(event) => setShowInternalRelationships(event.target.checked)}
              checked={showInternalRelationships}
              type="switch"
              label="Show internal relationships"
            />
            <FormCheck
              onChange={(event) => setShowExternalRelationships(event.target.checked)}
              checked={showExternalRelationships}
              type="switch"
              label="Show external relationships"
            />
          </Form>
        </CardBody>
      </Card>
    </div>
  );
}
