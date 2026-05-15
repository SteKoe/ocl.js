# AGENTS.md — Code Quality Guard Rails

This file defines the non-negotiable quality standards for `ocl.js`. All agents, contributors, and automated tools **must** enforce these rules on every change.

---

## 1. Pipeline — Required Order

Every change must pass all four steps **in this order**:

```
npm ci → npm run lint → npm run test → npm run build
```

- `npm run lint` — ESLint must exit 0 with no errors
- `npm run test` — runs the full Vitest suite
- `npm run build` — clean build: `clean → test → tsup` (TypeScript must compile without errors)

**Never skip or reorder these steps.**

---

## 2. Linting

**Tool:** ESLint with `@typescript-eslint` (config: `.eslintrc`)

- Base rule set: `eslint:recommended` + `plugin:@typescript-eslint/recommended`
- Scope: all `.ts` files (excludes `node_modules/` and `dist/`)
- Three rules are intentionally relaxed — do **not** re-enable them:
  - `@typescript-eslint/no-explicit-any` — `any` is permitted
  - `@typescript-eslint/explicit-module-boundary-types` — return types on exports are optional
  - `@typescript-eslint/no-unused-expressions` — off

Fix before commit: `npm run lint:fix`

---

## 3. TypeScript

**Config:** `tsconfig.json`

- Target: `ESNext`, module: `ESNext`, moduleResolution: `node`
- `declaration: true` — type declarations are emitted alongside JS output
- `sourceMap: true` — source maps must be emitted
- `strict` is **not** enabled — do not add it without a separate dedicated migration
- Compilation must exit 0 with **zero errors** — warnings that surface as errors are not acceptable
- Tests and examples are excluded from `tsc`; the `tsx` runtime handles them at test time
- Custom ambient declarations live under `types/` — add new module shims there, never inline them

---

## 4. Testing

**Framework:** Vitest 4, transpiled at runtime via `tsx`

| Rule | Detail |
|---|---|
| File naming | `*.spec.ts` — Vitest glob is `test/**/*.spec.ts` |
| Assertion style | `expect(...)` only — do not use `assert` or `should` |
| Shared helpers | Use `expectOclRuleValidatesToTrue` / `expectOclRuleValidatesToFalse` from `test/matcher.ts` |
| Fixtures | Use `FixtureFactory` from `test/fixture.factory.ts` for domain objects |
| Slow tests | Gate behind `describe.skipIf(!process.env.RUN_SLOW_TESTS)` with `{ timeout: 5000 }` per test |
| Coverage scope | `@vitest/coverage-v8` measures `lib/` only; interface and barrel files are excluded |

All tests must pass before any build or release.

---

## 5. Naming Conventions

| Construct | Convention | Example |
|---|---|---|
| Classes | PascalCase | `OclEngine`, `ForAllExpression` |
| Interfaces | `I` prefix + PascalCase | `IFooBar.ts` |
| Files | PascalCase, one class per file | `OclEngine.ts` |
| Methods / properties | camelCase | `addOclExpression()` |
| Enum values | SCREAMING_SNAKE_CASE | `Operator.NOT_EQUAL` |
| Private module-level helpers | underscore prefix | `_resolvePath`, `_parseAndEvaluate` |
| Spec files | `*.spec.ts` | `oclIsUndefined.spec.ts` |

---

## 6. Code Design Patterns

- **Visitor pattern** is the core architecture — `Expression.evaluate(visitor)` is the accept method; do not bypass it
- **Abstract class hierarchy** — new expression types must extend the appropriate base (`Expression`, `IteratorExpression`, `BodyBasedExpression`, etc.)
- **Fluent API** — all mutating methods on `OclEngine` must return `this` (e.g., `addOclExpression`, `removeOclExpression`)
- **Static factory** — prefer `OclEngine.create()` over `new OclEngine()` in examples and docs
- **Barrel exports** — sub-modules re-export through `index.ts`; keep barrel files free of logic

---

## 7. Documentation

- All **public API** must have JSDoc (`/** */` blocks) with `@param`, `@returns`, and `@throws` where applicable
- OCL-domain methods additionally require `@oclSpecification`, `@oclExpression`, and `@oclExample` tags
- Generated docs are produced by `npm run generate:docs` — do not hand-edit generated files

---

## 8. Inline Suppressions

Inline lint suppressions are a last resort. When used:

- Prefer the narrowest scope (`eslint-disable-next-line`, not `eslint-disable`)
- Always include a comment explaining **why** the suppression is justified
- Legacy `// tslint:disable-next-line:` comments exist from a prior toolchain — do not add new ones; use ESLint suppressions instead

---

## 9. Releases

- Releases are **only** cut from the `main` branch via `npm run prepare:release` (runs slow tests) followed by `npx semantic-release --ci`
- Version bumps follow **Semantic Versioning** and are determined automatically from commit messages by `semantic-release`
- Only the compiled `dist/` output is published to npm (see `.npmignore`)

---

## 10. Dependencies

- Managed by **Renovate** — minor and patch updates are auto-merged; major updates require manual review
- Minimum release age before update is **5 days**
- Use `npm ci` (not `npm install`) in CI and scripts to ensure reproducible installs from the lockfile
- Node.js version: `24.15.0` (pinned in `.nvmrc`); CI uses `lts/*`

---

## Quick Reference

```bash
npm run lint          # check — must be zero errors
npm run lint:fix      # auto-fix
npm run test          # run all specs
npm run test:fast     # alias for npm run test
npm run build         # clean → test → tsup
npm run test:coverage # coverage report (HTML, lib/ only)
```
