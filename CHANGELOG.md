# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [3.2.3] - 2024-04-08

- Update vulnerable dependencies:
    - Bump boclips-player to 7.14.1
    - Bump follow-redirects to 1.15.6
    - Bump webpack-dev-middleware to 5.3.4
    - Bump express to 4.19.2

## [3.2.1] - 2024-03-11

- Update boclips-player to latest which includes segment styling

## [3.1.0] - 2023-10-25

- Update boclips-player to latest

## [3.0.2] - 2022-10-21

- Update boclips-player to latest

## [3.0.1] - 2022-10-21

- Update boclips-player to latest
- Drop support for enzyme in favour of react testing library

## [3.0.0] - 2022-10-21

- Bump boclips-player and boclips-js-security to latest
- Update react to 18
 
## [2.9.3] - 2022-08-26

- Bump boclips-player and boclips-js-security to latest
- Upgrade dependencies to address vulnerabilities

## [2.9.2] - 2022-07-21

- Bump boclips-player and bo-js-security to latest

## [2.9.1] - 2022-05-11

- Bump boclips-player to latest

## [2.8.0] - 2022-03-23

- Fix node versions

## [2.5.0] - 2022-03-22

- update boclips-js-security and boclips-player to latest

## [2.4.0] - 2022-03-11

- update player to latest

## [2.3.0] - 2022-03-11

- update player to latest

- ## [2.2.0] - 2022-03-10

- update player to latest

## [2.1.0] - 2022-03-09

- update dependencies
- clean up tests
- use types from boclips-player/dist
- update release.sh
- clean up tsconfig

## [2.0.1] - 2022-03-09

- When building use umd as library target

## [2.0.0] - 2022-03-09

- Update react wrapper to use latest boclips-player

- ## [1.2.7] - 2022-02-03

- Fix vulnerabilities

## [1.2.6] - 2021-10-22

- Fix vulnerabilities

## [1.2.5] - 2021-07-09

- Bump boclips-player to latest

- ## [1.2.4] - 2021-07-09

- Bump boclips-player to latest

## [1.2.3] - 2020-12-07

- Update player to process displayAutogeneratedCaptions option prop

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
