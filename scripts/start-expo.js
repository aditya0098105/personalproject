#!/usr/bin/env node
const { spawn } = require('node:child_process');
const process = require('node:process');

const userArgs = process.argv.slice(2);
const filteredArgs = userArgs.filter((arg, index, array) => {
  if (arg === '--offline' || arg === '--online') {
    return false;
  }
  if (arg === '--no-offline-fallback') {
    return false;
  }
  return true;
});

const explicitOffline = userArgs.includes('--offline');
const explicitOnline = userArgs.includes('--online');
const disableFallback = userArgs.includes('--no-offline-fallback');

let attemptedOffline = explicitOffline;

function runExpo(offline) {
  const args = ['expo', 'start', ...filteredArgs];

  if (offline && !args.includes('--offline')) {
    args.push('--offline');
  }

  const child = spawn('npx', args, {
    stdio: 'inherit',
    env: process.env,
  });

  child.on('error', (error) => {
    console.error('Failed to launch Expo CLI:', error.message);
    if (!offline && !attemptedOffline && !disableFallback) {
      console.warn('\nRetrying with Expo offline mode...\n');
      attemptedOffline = true;
      runExpo(true);
    } else {
      process.exitCode = 1;
    }
  });

  child.on('exit', (code, signal) => {
    if (signal) {
      process.kill(process.pid, signal);
      return;
    }

    if (code === 0 || code === null) {
      process.exit(code ?? 0);
    }

    if (!offline && !attemptedOffline && !disableFallback) {
      console.warn(`\nExpo CLI exited with code ${code}. Retrying with --offline...\n`);
      attemptedOffline = true;
      runExpo(true);
      return;
    }

    process.exit(code);
  });
}

runExpo(explicitOffline && !explicitOnline);
