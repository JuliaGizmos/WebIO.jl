# WebIO Frontend

These packages contain all the necessary frontend code required for WebIO.

## Directory Structure
The various WebIO providers are set up as a monorepo -- multiple packages
exist within a single repository -- via lerna.
The core code is contained in the `webio/` directory.
The `*-provider/` directories contain the code necessary to setup WebIO
in that provider's environment (e.g. Mux or Jupyter).

## Development Environment
Ensure npm is installed on your machine.
From this directory, run `npm install`.
This should install all necessary dependencies in `node_modules/` as well
as bootstrap the monorepo (so that the core webio package is symlinked
within all of the provider packages' own `node_modules/`).

## Building
If code for a single provider is changed, you can run `npm run build` from
the root directory of that provider. To build the code for all providers,
run `npm run build` from this directory (which will recursively call
`npm run build` within all the provider directories).

## Publishing
**todo: how to publish to npm**
