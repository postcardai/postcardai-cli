#!/usr/bin/env node

/**
 * PostcardAI CLI
 * Command-line interface for PostcardAI
 */

import { Command } from 'commander';
import { login } from './commands/login.js';
import { logout } from './commands/logout.js';
import { whoami } from './commands/whoami.js';
import { configGet, configSet, configPath } from './commands/config.js';

const program = new Command();

program
  .name('postcardai')
  .description('PostcardAI CLI - Send postcards from the command line')
  .version('0.1.0');

// Login command
program
  .command('login')
  .description('Authenticate with PostcardAI')
  .option('--no-browser', 'Do not automatically open browser')
  .action(async (options) => {
    await login({ noBrowser: options.browser === false });
  });

// Logout command
program
  .command('logout')
  .description('Remove stored credentials')
  .action(async () => {
    await logout();
  });

// Whoami command
program
  .command('whoami')
  .description('Show current authentication status')
  .option('--verify', 'Verify credentials with the API')
  .action(async (options) => {
    await whoami({ verify: options.verify });
  });

// Config command
const configCommand = program
  .command('config')
  .description('View and modify configuration');

configCommand
  .command('get [key]')
  .description('Get configuration value(s)')
  .action(async (key?: string) => {
    await configGet(key);
  });

configCommand
  .command('set <key> <value>')
  .description('Set a configuration value')
  .action(async (key: string, value: string) => {
    await configSet(key, value);
  });

configCommand
  .command('path')
  .description('Show configuration file path')
  .action(async () => {
    await configPath();
  });

// Parse arguments
program.parse();
