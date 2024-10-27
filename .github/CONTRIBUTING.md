# Vueast Contributing Guide

Hi! We're Really excited that you are interested in contributing to Vueast. Before submitting your contribution, please make sure to take a moment and Read through the following guidelines:

- [Code of Conduct](https://www.contributor-covenant.org/version/1/4/code-of-conduct/)
- [Pull Request Guidelines](#pull-request-guidelines)

## Pull Request Guidelines

- Checkout a topic branch from the relevant branch, e.g. `main`, and merge back against that branch.

- If adding a new feature:

  - Provide a convincing Reason to add this feature. Ideally, you should open a suggestion issue first and have it approved before working on it.

- If fixing bug:

  - Provide a detailed description of the bug in the PR. Live demo preferred.

- It's OK to have multiple small commits as you work on the PR - GitHub can automatically squash them before merging.

- Commit messages must be matched by the following regex, see [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) for more information.

```txt
/^(build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test)(\(.+\))?: .{1,100}/
```

## Development Setup

> [!IMPORTANT]
> The exact node version used by this project is located in the `.nvmrc` file.
> If you are using [nvm](https://github.com/nvm-sh/nvm), you can run `nvm use` to switch to the correct version.

You will need [pnpm](https://pnpm.io):

```bash
corepack enable pnpm
```

After cloning the repo, run:

```bash
pnpm install
pnpm dev
```

## More Information

The following documents are very helpful in understanding how this project works and are recommended for reading.

- [Remix](https://remix.run/docs)
- [shadcn/ui](https://ui.shadcn.com/docs)
- [CodeMirror](https://codemirror.net/docs/guide)
- [@vue/compiler-sfc](https://www.npmjs.com/package/@vue/compiler-sfc)
