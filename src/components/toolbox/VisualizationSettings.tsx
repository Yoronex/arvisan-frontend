import React from 'react';
import {
  Card, CardBody, CardHeader, CardTitle,
} from 'react-bootstrap';
import RangeSlider from '../MultiRangeSlider';

const RANGE_MIN = 0;
const RANGE_MAX = 20;

export default function VisualizationSettings() {
  const [dependencyRange, setDependencyRange] = React
    .useState<[number, number]>([RANGE_MIN, RANGE_MAX]);

  return (
    <div className="position-absolute vh-100 px-3 pb-3" style={{ paddingTop: '6rem' }}>
      <Card className="h-100 shadow" style={{ width: '18rem' }}>
        <CardHeader>
          <CardTitle>
            Settings
          </CardTitle>
        </CardHeader>
        <CardBody>
          <RangeSlider
            onChange={setDependencyRange}
            values={dependencyRange}
            min={RANGE_MIN}
            max={RANGE_MAX}
            label="Number of dependencies"
          />
        </CardBody>
      </Card>
    </div>
  );
}
