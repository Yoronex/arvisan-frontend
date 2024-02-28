import {
  Card, CardBody, CardHeader, Nav, Tab,
} from 'react-bootstrap';
import { ReactNode } from 'react';
import ToolboxVisualization from '../toolbox/visualization';
import ToolboxNavigation from '../toolbox/navigator';
import ToolboxAnalysis from '../toolbox/analysis';

interface Props {
  cardWidth: string | number;
}

interface TabItem {
  title: string;
  key: string;
  children: ReactNode;
}

export default function ToolSideBar({ cardWidth }: Props) {
  const tabs: TabItem[] = [
    { title: 'Navigation', key: 'navigation', children: <ToolboxNavigation /> },
    { title: 'Visualization', key: 'visualization', children: <ToolboxVisualization /> },
    { title: 'Analysis', key: 'analysis', children: <ToolboxAnalysis /> },
  ];

  return (
    <Card className="h-100 shadow overflow-y-auto" style={{ width: cardWidth }}>
      <Tab.Container defaultActiveKey={tabs[1].key}>
        <CardHeader className="">
          <Nav variant="tabs">
            {tabs.map((tab) => (
              <Nav.Item key={tab.key}>
                <Nav.Link eventKey={tab.key}>{tab.title}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </CardHeader>
        <CardBody>
          <Tab.Content>
            {tabs.map((tab) => (
              <Tab.Pane key={tab.key} eventKey={tab.key}>
                {tab.children}
              </Tab.Pane>
            ))}
          </Tab.Content>
        </CardBody>
      </Tab.Container>
    </Card>
  );
}
