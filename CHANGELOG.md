# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.1] - 2019-07-15

### Security
- Bump `mixin-deep` for https://www.npmjs.com/advisories/1013 - only `package-lock.json`
- Bump `set-value` for https://www.npmjs.com/advisories/1012 - only `package-lock.json`

## [1.0.0] - 2018-06-05

### Added
- Changelog
- Added a demo harness for manual verification of features
- Concourse pipeline configuration
- Automatic instantiation of a `boclips-player`
- Automatic loading of a video given the `videoUri` prop
- Destroy `boclips-player` on unmount
- Provide `boclips-player` instance via `playerRef` prop callback
- Wire up `boclips-player` options to `options` prop
- Automatic loading of video when `videoUri` prop changes