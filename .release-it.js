/** @type {import('release-it').Config} */
export default {
  git: {
    changelog: 'echo "## Changelog\\n\\n$(npx @uphold/github-changelog-generator -f unreleased | tail -n +4 -f)"',
    commit: true,
    commitMessage: 'Release `v${version}`',
    push: false,
    requireCommits: true,
    requireUpstream: false,
    tag: false,
    tagArgs: ['-s'],
    tagName: 'v${version}'
  },
  github: {
    autoGenerate: true,
    comments: {
      pr: 'Published on release [`${releaseName}`](${releaseUrl})',
      submit: true
    },
    release: true,
    releaseName: 'v${version}',
    tokenRef: 'GITHUB_TOKEN'
  },
  hooks: {
    'after:bump': `
      changelog="$(npx @uphold/github-changelog-generator -f v\${version})" &&
      changelog="$(printf '%s\n' "$changelog" | sed '/^- Release \`v[0-9]/d')" &&
      printf "%s\n%s\n" "$changelog" "$(test -f CHANGELOG.md && tail -n +2 CHANGELOG.md || true)" > CHANGELOG.md &&
      git add CHANGELOG.md --all
    `
  },
  npm: {
    publish: false,
    skipChecks: true
  }
};
