#!/usr/bin/env bash

set -x -e

app=source
version="$(< version/version)"
release_name="v$version"
echo "$release_name" \
    > release/name
echo "This is $release_name" \
    > release/notes

npm install -g corepack@latest
corepack enable
corepack prepare pnpm@latest-10 --activate
pnpm config set store-dir ../../../root/.pnpm-store

pushd $app
  pnpm install --frozen-lockfile
  pnpm build
  pnpm version "$version" \
      --no-git-tag-version \
      --force
popd

cp -R ${app}/dist/ ${app}/package.json ${app}/README.md dist/
