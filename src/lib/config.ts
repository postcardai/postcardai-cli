/**
 * Configuration file management for PostcardAI CLI
 * Stores credentials in ~/.postcardai/config.json
 */

import * as fs from 'node:fs';
import * as path from 'node:path';
import * as os from 'node:os';

export interface PostcardAIConfig {
  apiKey: string;
  keyId: string;
  organizationId: string;
  organizationName: string;
  organizationSlug: string;
  environment: 'live' | 'test';
}

const CONFIG_DIR = path.join(os.homedir(), '.postcardai');
const CONFIG_FILE = path.join(CONFIG_DIR, 'config.json');

/**
 * Ensure the config directory exists with proper permissions
 */
function ensureConfigDir(): void {
  if (!fs.existsSync(CONFIG_DIR)) {
    fs.mkdirSync(CONFIG_DIR, { mode: 0o700 }); // Owner read/write/execute only
  }
}

/**
 * Read the current configuration
 */
export function readConfig(): PostcardAIConfig | null {
  try {
    if (!fs.existsSync(CONFIG_FILE)) {
      return null;
    }
    const content = fs.readFileSync(CONFIG_FILE, 'utf-8');
    return JSON.parse(content) as PostcardAIConfig;
  } catch {
    return null;
  }
}

/**
 * Write configuration to file with secure permissions
 */
export function writeConfig(config: PostcardAIConfig): void {
  ensureConfigDir();

  // Write with restricted permissions (owner read/write only)
  fs.writeFileSync(CONFIG_FILE, JSON.stringify(config, null, 2), {
    mode: 0o600,
    encoding: 'utf-8',
  });
}

/**
 * Delete the configuration file (logout)
 */
export function deleteConfig(): boolean {
  try {
    if (fs.existsSync(CONFIG_FILE)) {
      fs.unlinkSync(CONFIG_FILE);
      return true;
    }
    return false;
  } catch {
    return false;
  }
}

/**
 * Get the config file path
 */
export function getConfigPath(): string {
  return CONFIG_FILE;
}

/**
 * Check if config file exists
 */
export function configExists(): boolean {
  return fs.existsSync(CONFIG_FILE);
}

/**
 * Get a specific config value
 */
export function getConfigValue<K extends keyof PostcardAIConfig>(key: K): PostcardAIConfig[K] | null {
  const config = readConfig();
  return config ? config[key] : null;
}

/**
 * Update a specific config value
 */
export function setConfigValue<K extends keyof PostcardAIConfig>(
  key: K,
  value: PostcardAIConfig[K]
): boolean {
  const config = readConfig();
  if (!config) {
    return false;
  }
  config[key] = value;
  writeConfig(config);
  return true;
}
