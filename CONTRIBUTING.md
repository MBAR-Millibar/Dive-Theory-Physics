# Contributing to Dive Theory Physics

Contributions are welcome. This project uses the MIT License - by submitting a pull request you agree your contribution will be released under the same terms.

## What to contribute

- Bug fixes and calculation corrections
- New diving-related calculators or enhancements to existing ones
- UI and UX improvements
- Documentation improvements
- Internationalization and translation improvements

If you are unsure whether a feature fits, open an issue first to discuss it.

## Ground rules for calculation changes

Diving calculators are safety-sensitive. Any calculation change should include:

1. A reference to the source (for example PADI, DSAT, NOAA, or another published standard) in a code comment.
2. A clear explanation in the pull request description of what changed and why.
3. Test coverage or at least reproducible validation steps with sample inputs and expected outputs.

Calculation errors in a diving app can have real safety consequences, so these pull requests receive extra scrutiny.

## Workflow

1. Fork the repository and create a branch (`feat/...` or `fix/...`).
2. Run `pnpm dev` and verify changes in the browser.
3. Run `pnpm lint` and `pnpm build` - both must pass.
4. Open a pull request against `main` with a clear description.
5. Include screenshots for UI changes.

## Commit convention

Follow Conventional Commits:

| Prefix | Use for |
|---|---|
| `feat:` | New features |
| `fix:` | Bug fixes |
| `docs:` | Documentation only |
| `refactor:` | Code changes with no behavior change |
| `style:` | Formatting and whitespace |
| `chore:` | Tooling and dependencies |

## Reporting bugs

Open an issue in this repository and include:

- Browser and OS
- Steps to reproduce
- Expected vs actual result
- For calculation bugs: exact inputs, units, and expected output source

## Safety disclaimer

This project is provided as is, without warranty of any kind. Calculations must not be used as a substitute for proper dive training, certified dive tables, or dive computers. Contributors and maintainers accept no responsibility for incorrect results or their consequences.
