# @postcardai/cli

Command-line interface for PostcardAI - authenticate and manage your PostcardAI account from the terminal.

## Installation

```bash
# Using npx (recommended)
npx @postcardai/cli login

# Or install globally
npm install -g @postcardai/cli
```

## Commands

### Login

Authenticate with your PostcardAI account:

```bash
postcardai login
```

This will:
1. Generate a device code
2. Open your browser to authorize the device
3. Wait for you to approve the request
4. Store your API key securely in `~/.postcardai/config.json`

Options:
- `--no-browser` - Don't automatically open the browser

### Logout

Remove stored credentials:

```bash
postcardai logout
```

### Who Am I

Check your current authentication status:

```bash
postcardai whoami
```

Options:
- `--verify` - Verify credentials are still valid with the API

### Config

View and modify configuration:

```bash
# Show all config
postcardai config get

# Get specific value
postcardai config get environment

# Set value
postcardai config set environment test

# Show config file path
postcardai config path
```

## Configuration

Credentials are stored in `~/.postcardai/config.json` with the following structure:

```json
{
  "apiKey": "pcai_sk_live_xxx",
  "keyId": "key_abc123",
  "organizationId": "org_...",
  "organizationName": "Acme Inc",
  "organizationSlug": "acme-inc",
  "environment": "live"
}
```

The configuration file is created with `0600` permissions (owner read/write only).

## Environment Variables

- `POSTCARDAI_API_URL` - Override the API base URL (default: `https://api.postcard.ai/v1`)

## MCP Server Integration

After authenticating with the CLI, the [PostcardAI MCP Server](../mcp-server) will automatically use your stored credentials. No additional configuration needed.

## License

MIT
