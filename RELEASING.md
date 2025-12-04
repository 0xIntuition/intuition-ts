# Release Workflow

This project uses [Changesets](https://github.com/changesets/changesets) for version management and publishing.

# TL;DR

```bash
pnpm changeset
pnpm changeset version
pnpm build
pnpm release
pnpm release:stable
```

## Alpha Release Workflow

# Enter prerelease mode for "alpha"

`pnpm bun changeset pre enter alpha`

## Creating a Changeset

After making changes to a package:

```bash
pnpm changeset
```

You'll be prompted to:

1. Select which packages changed
2. Choose the bump type (patch/minor/major)
3. Write a summary of the changes

This creates a markdown file in `.changeset/` describing your changes.

## Publishing Alpha Releases

### 1. Version Bump (Alpha)

Generate alpha prerelease versions:

```bash
pnpm changeset version --snapshot alpha
```

This will:

- Update package versions to `x.y.z-alpha-TIMESTAMP`
- Update CHANGELOGs
- Delete consumed changeset files

### 2. Build Packages

```bash
pnpm build
```

### 3. Publish to npm

```bash
pnpm changeset publish --tag alpha
```

This publishes packages to npm with the `alpha` dist-tag.

### 4. Create Git Tag

```bash
git add .
git commit -m "Release alpha versions"
git push
```

## Publishing Stable Releases

### 1. Version Bump (Stable)

Generate stable versions:

```bash
pnpm changeset version
```

### 2. Build Packages

```bash
pnpm build
```

### 3. Publish to npm

```bash
pnpm changeset publish
```

This publishes packages to npm with the `latest` dist-tag.

### 4. Create Git Tag

```bash
git add .
git commit -m "Release stable versions"
git push --follow-tags
```

## Install Alpha Versions

Users can install alpha versions with:

```bash
npm install @0xintuition/protocol@alpha
# or specific version
npm install @0xintuition/protocol@1.0.0-alpha-20231204
```

## Notes

- **Manual Process**: All steps are manual - no GitHub Actions
- **Alpha Format**: `x.y.z-alpha-TIMESTAMP` (e.g., `1.0.0-alpha-20231204143000`)
- **Stable Format**: `x.y.z` (e.g., `1.0.0`)
- **Both Coexist**: Alpha and stable versions exist simultaneously on npm

## Troubleshooting

### Authentication Error

If you get an authentication error when publishing:

```bash
npm login
```

Or set the npm token:

```bash
npm config set //registry.npmjs.org/:_authToken YOUR_TOKEN
```

### Publish Failed

If publish fails partway through:

1. Check which packages were published successfully on npm
2. You can retry `pnpm changeset publish` - it will skip already-published packages

### Wrong Version Format

If you accidentally ran `pnpm changeset version` without `--snapshot alpha`:

1. Reset the changes: `git checkout .`
2. Re-run with the correct flags: `pnpm changeset version --snapshot alpha`
