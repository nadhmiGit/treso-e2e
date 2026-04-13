# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Run all tests (runs bddgen first automatically via pretest hook)
npm test

# Run tests with browser visible
npm run test:headed

# Run by tag
npm run test:regression        # @regression scenarios
npm run test:smoke             # @smoke scenarios

# Run a single feature file
npx bddgen && npx playwright test --grep "Factures entrantes"

# Run on a specific browser
npm run test:chromium
npm run test:firefox
npm run test:webkit

# Open HTML report
npm report

# Generate AI feature file (uses Anthropic SDK, requires ANTHROPIC_API_KEY)
npx ts-node ai/generate-tests.ts
```

Environment is controlled via `.env`. Key variables: `BASE_URL`, `TEST_USERNAME`, `TEST_PASSWORD`, `HEADLESS`, `WORKERS`, `RETRIES`.

## Architecture

This is a **playwright-bdd** framework: Gherkin `.feature` files are compiled by `bddgen` into Playwright test files before each run. `playwright.config.ts` wires everything together via `defineBddConfig`.

### The BDD pipeline

```
features/**/*.feature
      ↓ (bddgen, runs automatically via pretest)
.playwright-mcp/ (generated test files)
      ↓ (playwright test)
steps/**/*.step.ts  ←→  pages/*.page.ts
```

Step definitions are **global** — all files under `steps/` share the same step registry. Duplicate step text across files will cause a runtime error.

### Fixture chain

```
fixtures/custom-fixtures.ts   ← defines authenticatedPage (performs login, waits for /invoice-hub/)
      ↓
steps/authentication/fixtures.ts  ← createBdd(test) → exports Given/When/Then bound to authenticatedPage
      ↓
steps/*.step.ts  ← import Given/When/Then from ./authentication/fixtures
```

Every step file must import `Given/When/Then` from `steps/authentication/fixtures.ts`, not directly from `playwright-bdd`. This is what makes `authenticatedPage` available as a fixture in step destructuring.

### Page Object conventions

- All page objects live in `pages/` and are exported from `pages/index.ts`
- Pages that need `goto()` extend `BasePage` (e.g. `Login`); pages that are navigated to via UI interaction do not (e.g. `OutgoingInvoicesPage`, `IncomingInvoicesPage`)
- Locators are `readonly` class properties assigned in the constructor
- Pages that need dynamic/parameterised locators store `private readonly page: Page`
- All `expect()` assertions live inside page object methods, not in step files
- Prefer `getByRole()` and `getByText()` over `locator()` and CSS selectors; use `data-cy` attributes only when role selectors are ambiguous

### Step file conventions

- Module-level `let fooPage: FooPage` instantiated inside the `Given` step
- Use `authenticatedPage` fixture (not `page`) for any scenario requiring login
- Empty destructure `async ({})` when the fixture isn't needed; typed params for `{string}` Cucumber expressions
- `Given('I am authenticated', ...)` is defined once in `steps/authentication/login.step.ts` — do not redefine it

### Adding a new feature area

1. Create `pages/foo.page.ts`, export from `pages/index.ts`
2. Create `steps/foo.step.ts` (import `Given/When/Then` from `./authentication/fixtures`)
3. Create `features/foo.feature`
4. Use `Given I am on the X page` as the Background step (handles auth + navigation in one step) to avoid redefining the shared `Given I am authenticated` step

### Tags

| Tag | Purpose |
|-----|---------|
| `@regression` | Full regression suite |
| `@smoke` | Smoke suite |
| `@login` | Login-specific scenarios |
| `@outgoing-invoices` | Outgoing invoices scenarios |
