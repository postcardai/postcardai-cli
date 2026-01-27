# Contributing to PostcardAI CLI

Thank you for your interest in contributing to the PostcardAI CLI!

## Development Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/daveosterjr/postcardai-cli.git
   cd postcardai-cli
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Build:
   ```bash
   npm run build
   ```

4. Test locally:
   ```bash
   node dist/index.js login
   ```

## Adding New Commands

1. Create a new command file in `src/commands/`
2. Export your command function
3. Register in `src/index.ts`
4. Update the README with the new command

## Code Style

- Use TypeScript for all source code
- Follow existing code formatting
- Add helpful descriptions for CLI commands

## Pull Requests

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Reporting Issues

- Use GitHub Issues to report bugs
- Include Node.js version and CLI version
- Provide the command you ran and the error output

## Questions?

Feel free to open an issue or reach out to support@postcard.ai.
