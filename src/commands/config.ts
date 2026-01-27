/**
 * Config command - View and modify configuration
 */

import chalk from 'chalk';
import { readConfig, getConfigPath, setConfigValue, type PostcardAIConfig } from '../lib/config.js';

type ConfigKey = keyof PostcardAIConfig;

const EDITABLE_KEYS: ConfigKey[] = ['environment'];
const ALL_KEYS: ConfigKey[] = [
  'organizationName',
  'organizationSlug',
  'organizationId',
  'environment',
  'keyId',
  'apiKey',
];

export async function configGet(key?: string): Promise<void> {
  const config = readConfig();

  if (!config) {
    console.log(chalk.yellow('Not logged in. No configuration to show.'));
    console.log(`Run ${chalk.cyan('postcardai login')} to authenticate.`);
    process.exit(1);
  }

  if (key) {
    // Show specific key
    if (!ALL_KEYS.includes(key as ConfigKey)) {
      console.log(chalk.red(`Unknown config key: ${key}`));
      console.log(`Available keys: ${ALL_KEYS.join(', ')}`);
      process.exit(1);
    }

    const value = config[key as ConfigKey];

    // Mask the API key
    if (key === 'apiKey') {
      console.log(value.slice(0, 20) + '...');
    } else {
      console.log(value);
    }
  } else {
    // Show all config
    console.log(chalk.bold('Current configuration:'));
    console.log('');
    console.log(`  ${chalk.dim('organizationName')}: ${config.organizationName}`);
    console.log(`  ${chalk.dim('organizationSlug')}: ${config.organizationSlug}`);
    console.log(`  ${chalk.dim('organizationId')}:   ${config.organizationId}`);
    console.log(`  ${chalk.dim('environment')}:      ${config.environment}`);
    console.log(`  ${chalk.dim('keyId')}:            ${config.keyId}`);
    console.log(`  ${chalk.dim('apiKey')}:           ${config.apiKey.slice(0, 20)}...`);
    console.log('');
    console.log(chalk.dim(`Config file: ${getConfigPath()}`));
  }
}

export async function configSet(key: string, value: string): Promise<void> {
  const config = readConfig();

  if (!config) {
    console.log(chalk.yellow('Not logged in. No configuration to modify.'));
    console.log(`Run ${chalk.cyan('postcardai login')} to authenticate.`);
    process.exit(1);
  }

  if (!EDITABLE_KEYS.includes(key as ConfigKey)) {
    console.log(chalk.red(`Cannot modify key: ${key}`));
    console.log(`Editable keys: ${EDITABLE_KEYS.join(', ')}`);
    process.exit(1);
  }

  // Validate value
  if (key === 'environment') {
    if (value !== 'live' && value !== 'test') {
      console.log(chalk.red('Environment must be "live" or "test"'));
      process.exit(1);
    }
  }

  const success = setConfigValue(key as ConfigKey, value as PostcardAIConfig[ConfigKey]);

  if (success) {
    console.log(chalk.green(`Set ${key} = ${value}`));
  } else {
    console.log(chalk.red('Failed to update configuration'));
    process.exit(1);
  }
}

export async function configPath(): Promise<void> {
  console.log(getConfigPath());
}
