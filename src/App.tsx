import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import TheoryPage from './modules/CiCdPipeline/TheoryPage';
import SimulatorPage from './modules/CiCdPipeline/SimulatorPage';
import SnowflakeDeploymentModule from './modules/SnowflakeDeployment';
import GitBranchingModule from './modules/GitBranching';
import AgileLifecycleModule from './modules/AgileLifecycle';
import GitHubActionsModule from './modules/GitHubActions';
import PlaceholderModule from './components/PlaceholderModule';
import OverviewPage from './components/OverviewPage';

const App: React.FC = () => {
  return (
    <BrowserRouter basename="/DevOps">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<OverviewPage />} />
          <Route path="pipeline" element={<Navigate to="/theory" replace />} />
          <Route path="theory" element={<TheoryPage />} />
          <Route path="simulator" element={<SimulatorPage />} />
          <Route path="snowflake" element={<SnowflakeDeploymentModule />} />
          <Route path="branching" element={<GitBranchingModule />} />
          <Route path="agile" element={<AgileLifecycleModule />} />
          <Route path="actions" element={<GitHubActionsModule />} />
          <Route path="docker" element={<PlaceholderModule title="Docker Basics" />} />
          <Route path="k8s" element={<PlaceholderModule title="Kubernetes" />} />
          <Route path="*" element={<PlaceholderModule title="404 Not Found" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;