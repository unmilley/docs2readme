# docs2readme

> Generate a complete `README.md` from Markdown documentation.

`docs2readme` is a lightweight CLI that keeps your project documentation DRY by generating a section of your `README.md` from individual Markdown files.

Instead of maintaining the same documentation in multiple places, write it once inside the `docs/` directory and let `docs2readme` assemble everything automatically.

## Features

- 🚀 Fast and dependency-light
- 📄 Generates README from multiple Markdown files
- 📚 Uses the README table of contents as the source of truth
- 🔒 Safe block replacement using HTML markers
- 🧪 Fully tested with Vitest
- 🧩 Simple architecture with small focused modules
- 💬 Friendly CLI output powered by `consola`

## Installation

```bash
npm install --save-dev docs2readme

pnpm add -D docs2readme

yarn add -D docs2readme
```

## Usage

```bash
docs2readme
```

By default it expects:

```text
docs/
README.md
```

Custom locations:

```bash
docs2readme \
  --docs ./documentation \
  --readme ./README.md
```

Verbose mode:

```bash
docs2readme --verbose
```

## README Structure

The table of contents must be enclosed with the following markers:

```md
<!-- docs2readme:table:start -->

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)

<!-- docs2readme:table:end -->
```

The generated documentation is inserted into:

```md
<!-- docs2readme:docs:start -->

Generated content...

<!-- docs2readme:docs:end -->
```

Only the content between these markers is replaced.

Everything else remains untouched.

## Directory Structure

Example project:

```text
.
├── README.md
└── docs
    ├── introduction.md
    ├── installation.md
    └── usage.md
```

Each Markdown file corresponds to an anchor from the table of contents.

Example:

```md
- [Installation](#installation)
```

↓

```text
docs/installation.md
```

## Example

README:

```md
<!-- docs2readme:table:start -->

- [Installation](#installation)
- [Usage](#usage)

<!-- docs2readme:table:end -->

...

<!-- docs2readme:docs:start -->
<!-- docs2readme:docs:end -->
```

Directory:

```text
docs/
├── installation.md
└── usage.md
```

Run:

```bash
docs2readme
```

Result:

```md
<!-- docs2readme:docs:start -->

# Installation

...

# Usage

...

<!-- docs2readme:docs:end -->
```

## CLI

```text
docs2readme [options]

Options:

  -d, --docs <directory>     Documentation directory
  -r, --readme <file>        README file
      --verbose              Enable verbose logging
      --help                 Show help
  -v  --version              Show version
```

## Why?

Keeping documentation synchronized is tedious.

Instead of copying Markdown into your README every time something changes, maintain small focused documentation files and generate the final README automatically.

This keeps documentation:

- easier to write
- easier to review
- easier to maintain
- always consistent

## Testing

The project uses **Vitest 4**.

- Pure utilities are tested with unit tests.
- File services are tested against a real temporary filesystem.
- Application orchestration is tested with mocked services.

This approach provides fast, reliable, and maintainable test coverage.

<summary>local development</summary>

- Clone this repository
- Install latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

</details>

## License

[MIT][license-href]. Made with 💛

[npm-version-src]: https://img.shields.io/npm/v/docs2readme?style=flat&colorA=18181B&colorB=fbd38d
[npm-version-href]: https://npmjs.com/package/docs2readme
[npm-downloads-src]: https://img.shields.io/npm/dm/docs2readme?style=flat&colorA=18181B&colorB=fbd38d
[npm-downloads-href]: https://npmjs.com/package/docs2readme
[license-src]: https://img.shields.io/github/license/unmilley/docs2readme.svg?style=flat&colorA=18181B&colorB=fbd38d
[license-href]: https://github.com/unmilley/docs2readme/blob/main/LICENSE
