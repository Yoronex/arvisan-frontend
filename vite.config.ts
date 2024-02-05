// eslint-disable-next-line import/no-extraneous-dependencies
import { defineConfig } from 'vite';
// eslint-disable-next-line import/no-extraneous-dependencies
import react from '@vitejs/plugin-react';
import { execSync } from 'node:child_process';

interface CommitInfo {
  hash: string;
  shortHash: string;
  date: Date;
  tags: string[];
}

function getCommitInfo(): CommitInfo {
  const shortHash = execSync('git rev-parse --short HEAD').toString().trim();
  const lastCommit = execSync('git log -1').toString();
  const tags = execSync('git tag --contains HEAD').toString().trim().split(' ');
  const lastCommitLines = lastCommit.split('\n').map((l) => l.trim());

  const hash = lastCommitLines[0].split(' ')[1].trim();
  const dateLine = lastCommitLines.find((l) => l.includes('Date:'));
  const date = new Date(dateLine.substring(dateLine.indexOf('Date:') + 1).trim());

  return {
    hash, shortHash, date, tags: tags.filter((t) => t.length > 0),
  };
}

const commitInfo = getCommitInfo();

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        secure: false,
      },
    },
    host: true,
  },
  define: {
    LAST_COMMIT_INFO: JSON.stringify(commitInfo),
  },
});
