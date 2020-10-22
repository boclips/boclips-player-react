# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.2.2] - 2020-10-22

- Upgrading dependencies

## [1.2.1] - 2020-10-09

- Using latest boclips-player version

## [1.2.0] - 2020-09-01

### Changed

- Can now set a segment when instantiating the player.

## [1.1.4] - 2020-08-18

### Security

- Upgrade dependencies in `package-lock.json` to fix vulnerabilities

## [1.1.3] - 2020-04-30

### Changed

- Update boclips-player version to `3.0.2`

## [1.1.2] - 2020-04-30

### Changed

- Update boclips-player version to `3.0.1`

## [1.1.1] - 2020-04-30

### Fixed

- No change: required for release process fix

## [1.1.0] - 2020-04-09

### Fixed

- Refactored the player code to use hooks

## [Unreleased]

## [1.0.3] - 2020-03-12

### Security

- Upgrade `boclips-player`
- Upgrade dependencies in `package-lock.json` to fix vulnerabilities

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
