
import { GitCommit, Code2, TestTube2, Package, Rocket } from 'lucide-react';
import type { PipelineStage, SimulationScenario } from './types';

export const SCENARIOS: SimulationScenario[] = [
    {
        id: 'happy',
        name: 'Happy Path',
        description: 'All stages pass successfully',
        color: 'emerald'
    },
    {
        id: 'lint-fail',
        name: 'Fail Linting',
        description: 'Code style violations detected',
        failAtStage: 'lint',
        color: 'amber'
    },
    {
        id: 'test-fail',
        name: 'Fail Unit Tests',
        description: 'Test assertions failed',
        failAtStage: 'test',
        color: 'orange'
    },
    {
        id: 'deploy-fail',
        name: 'Deploy Crash',
        description: 'Production deployment error',
        failAtStage: 'deploy',
        color: 'red'
    }
];

export const INITIAL_STAGES: PipelineStage[] = [
    { id: 'commit', name: 'Commit', icon: <GitCommit size={20} />, status: 'pending', logs: [] },
    { id: 'lint', name: 'Lint', icon: <Code2 size={20} />, status: 'pending', logs: [] },
    { id: 'test', name: 'Unit Test', icon: <TestTube2 size={20} />, status: 'pending', logs: [] },
    { id: 'build', name: 'Build', icon: <Package size={20} />, status: 'pending', logs: [] },
    { id: 'deploy', name: 'Deploy', icon: <Rocket size={20} />, status: 'pending', logs: [] }
];

export const STAGE_LOGS: Record<string, { success: string[]; fail: string[] }> = {
    commit: {
        success: [
            '> git checkout main',
            '> git pull origin main',
            '✓ Branch up to date',
            '> Triggering workflow: deploy.yml',
            '✓ Workflow started on runner ubuntu-latest'
        ],
        fail: []
    },
    lint: {
        success: [
            '> npm run lint',
            '> eslint src/**/*.ts --fix',
            '✓ No ESLint warnings',
            '> sqlfluff lint dags/*.sql',
            '✓ SQL linting passed (0 violations)',
            '✓ All checks passed'
        ],
        fail: [
            '> npm run lint',
            '> eslint src/**/*.ts',
            '✗ ERROR: Unexpected console statement (no-console)',
            '✗ ERROR: Missing semicolon (semi)',
            '✗ 2 problems (2 errors, 0 warnings)',
            '❌ Lint stage FAILED - Pipeline halted'
        ]
    },
    test: {
        success: [
            '> npm run test',
            '> jest --coverage --ci',
            '  PASS  src/utils/transform.test.ts',
            '  PASS  src/dags/etl_pipeline.test.py',
            '  PASS  src/models/snowflake.test.sql',
            '✓ Tests: 47 passed, 0 failed',
            '✓ Coverage: 89.3% (threshold: 80%)'
        ],
        fail: [
            '> npm run test',
            '> jest --coverage --ci',
            '  PASS  src/utils/transform.test.ts',
            '  FAIL  src/dags/etl_pipeline.test.py',
            '    ✗ test_null_handling',
            '    Expected: 0, Received: NULL',
            '✗ Tests: 46 passed, 1 failed',
            '❌ Test stage FAILED - Pipeline halted'
        ]
    },
    build: {
        success: [
            '> npm run build',
            '> tsc --noEmit',
            '✓ TypeScript compilation successful',
            '> docker build -t app:$SHA .',
            '  Step 1/8: FROM node:18-alpine',
            '  Step 8/8: HEALTHCHECK --interval=30s',
            '✓ Image built: app:a3f2b1c (234MB)',
            '> docker push registry.io/app:a3f2b1c',
            '✓ Image pushed to registry'
        ],
        fail: []
    },
    deploy: {
        success: [
            '> kubectl apply -f k8s/deployment.yaml',
            '  deployment.apps/etl-service configured',
            '> kubectl rollout status deployment/etl-service',
            '  Waiting for rollout to finish: 1/3 replicas',
            '  Waiting for rollout to finish: 2/3 replicas',
            '✓ deployment "etl-service" successfully rolled out',
            '> Running smoke tests...',
            '✓ Health check: 200 OK',
            '✓ Deployed to PRODUCTION 🚀'
        ],
        fail: [
            '> kubectl apply -f k8s/deployment.yaml',
            '  deployment.apps/etl-service configured',
            '> kubectl rollout status deployment/etl-service',
            '  Waiting for rollout to finish: 1/3 replicas',
            '  error: deployment exceeded deadline',
            '✗ ERROR 500: Container crashed - OOMKilled',
            '> kubectl rollback deployment/etl-service',
            '  rollback completed',
            '❌ Deploy stage FAILED - Rolled back'
        ]
    }
};
