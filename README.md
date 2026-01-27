# PostcardAI CLI

[![npm version](https://img.shields.io/npm/v/@postcardai/cli.svg)](https://www.npmjs.com/package/@postcardai/cli)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

Command-line interface for [PostcardAI](https://postcard.ai). Authenticate and manage your account from the terminal.

## Installation

```bash
# Using npx (no install needed)
npx @postcardai/cli login

# Or install globally
npm install -g @postcardai/cli
postcardai login
```

## Commands

### login

Authenticate with your PostcardAI account:

```bash
postcardai login
```

This will:
1. Generate a device code
2. Open your browser to authorize
3. Store credentials in `~/.postcardai/config.json`

Options:
- `--no-browser` - Don't auto-open browser

### logout

Remove stored credentials:

```bash
postcardai logout
```

### whoami

Check authentication status:

```bash
postcardai whoami
```

Options:
- `--verify` - Verify with API

### config

View and modify configuration:

```bash
# Show all config
postcardai config get

# Get specific value
postcardai config get environment

# Set value
postcardai config set environment test

# Show config path
postcardai config path
```

## Configuration File

Stored at `~/.postcardai/config.json`:

```json
{
  "apiKey": "pcai_sk_live_xxx",
  "keyId": "key_abc123",
  "organizationId": "org_...",
  "organizationName": "Acme Inc",
  "environment": "live"
}
```

File is created with `0600` permissions (owner read/write only).

## MCP Integration

After logging in, the [PostcardAI MCP Server](https://github.com/daveosterjr/postcardai-mcp) automatically uses your credentials. No extra configuration needed.

```json
{
  "mcpServers": {
    "postcardai": {
      "command": "npx",
      "args": ["-y", "@postcardai/mcp-server"]
    }
  }
}
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `POSTCARDAI_API_URL` | Override API URL |

## Documentation

- [Full Documentation](https://docs.postcard.ai)
- [API Reference](https://docs.postcard.ai/api-reference)

## License

MIT
