# Developers

CARTO VL is an open-source library. We are more than happy to receive your contributions to the code and its documentation.

## <a name="prerequisites">Prerequisites</a>

To clone and run this library, you'll need [Node.js](https://nodejs.org/en/download/) >=6.11.5 (which comes with [npm](http://npmjs.com)) installed on your computer. If you're using [yarn](https://yarnpkg.com/en/) instead of npm, please use the last stable version.

## <a name="install">Install</a>

Run this commands from your command line:

```bash
# Clone this repository
$ git clone https://github.com/CartoDB/carto-vl

# Go into the repository
$ cd carto-vl

# Install dependencies
$ yarn

# Bundle the library
$ yarn build
```

## <a name="documentation">Document your changes</a>

This is intended for the end-user of the library and it's the source of [CARTO VL's Official Documentation](https://carto.com/developers/carto-vl/). It's available in the directory `docs/public`.

```bash
# Generate the public documentation
$ yarn docs

# Serve docs and examples
$ yarn serve
```

## <a name="tests">Tests</a>

### Unit tests

<!-- Add description -->

```bash
# Running the tests
$ yarn test

# To watch the unit tests
$ yarn test:watch

# To launch the unit tests in the browser
$ yarn test:browser
```

### Integration tests

Automatically test the **user activity** using local data sources (GeoJSON).

```bash
# Running the tests
$ yarn test:user

# To watch the user tests
$ yarn test:user:watch
```

With these you can also test the **renderer** using local data sources (GeoJSON) and a static map. The local GeoJSON files are located in the `common/sources` directory.

```bash
# Running the tests
$ yarn test:render
```

#### Generating new references

To create new tests, crate a new folder with a new `scenario.js` file and run the following command:

```
yarn test:render:prepare
```

#### Modify old references

Manually remove your old reference images and run this command to create new ones:

```
yarn test:render:prepare
```

#### Filtering tests

Adding `f-` at the beginning of any test folder marks this test to be executed without the rest of the tests.

#### Ignoring tests

Adding `x-` at the beginning of any test folder marks this test to be ignored.

### Acceptance tests (E2E tests)

This end to end tests cover the entire library by performing tests against real servers. This is done through iterative screenshot testing, comparing `test` screenshots against its reference images. To achieve real E2E testing, a Windshaft-cartodb server is deployed within a Docker container.

To install Docker, follow the instructions on https://docs.docker.com/install/

```bash
# Running the tests
$ yarn test:e2e
```

To rebuild the Docker image run: `docker build -t carto/windshaft-cartovl-testing test/acceptance/docker/`

#### Generating new references

To create new tests, crate a new folder with a new `scenario.js` file and run the following command:

```
yarn test:e2e:prepare
```

#### Modify old references

Manually remove your old reference images and run this command to create new ones:

```
yarn test:e2e:prepare
```

#### Filtering tests

Adding `f-` at the beginning of any test folder marks this test to be executed without the rest of the tests.

#### Ignoring tests

Adding `x-` at the beginning of any test folder marks this test to be ignored.

## Workflow

Our main branch is `master`. This branch is stable and has the same content as the last published version. The branch with the new changes for the next **major** or **minor** release is `develop`.

We follow this convention when naming branches:

* Features: `feature/<id>-<description>` (i.e: feature/1303-add-global-histogram-expression)
* Fixes: `fix/<id>-<description>`  (i.e: fix/2065-svg-icons-not-working-in-firefox)
* Hotfix: `hotfix/<id>-<description>` (i.e: hotfix/1342-revert-api-call)
* Release (minor & major): `release/<version>` (i.e: release/v1.2.5)

### What does it mean?

* _Features_ and _Fixes_ are created from `develop`. PRs must be against `develop`.
* _Hotfix_ are created from `master`. They contain very small changes that imply a *patch* release. PRs must be against `master`
* _Release_ branches must be created from `develop` branch.

When a PR is merged into `master` for a patch release, after releasing, we merge `master` back into `develop`, because `develop` always have to be updated with `master`.

## Release

The release workflow is documented internally.

## Docker Images

The Docker configuration lives in [/test/acceptance/docker](/test/acceptance/docker). This configuration includes:

* `/test/acceptance/docker/config/environments/test.js` - [Windshaft](https://github.com/CartoDB/Windshaft-cartodb/tree/master/config/environments) configuration file
* `/test/acceptance/docker/test/support/prepare_db.sh` - Database setup
* `/test/acceptance/docker/prepare.sh` - Tests setup
* `/test/acceptance/docker/deploy.sh` - Windshaft & redis setup

If we change the configuration (due to a change in Windshaft, for example) we have to rebuild the Docker images we're using both locally and in our CI environment:

* [carto/windshaft-cartovl-testing](https://hub.docker.com/r/carto/windshaft-cartovl-testing) (local e2e tests)
* [carto/windshaft-cartovl-testing-pg10](https://hub.docker.com/r/carto/windshaft-cartovl-testing-pg10) (CI - using Postgres 10)
* [carto/windshaft-cartovl-testing-pg11](https://hub.docker.com/r/carto/windshaft-cartovl-testing-pg11) (CI - using Postgres 11)

First of all, you need to have access to [Docker Hub](https://docs.docker.com/docker-hub/) and login from your local machine. If you don't have an account, please request access.

Make the necessary changes in the configuration files and **build** each image using this command:

```sh
$ docker build -t carto/windshaft-cartovl-testing test/acceptance/docker
$ docker build -t carto/windshaft-cartovl-testing-pg10 test/acceptance/docker
$ docker build -t carto/windshaft-cartovl-testing-pg11 test/acceptance/docker
```

And finally, **push** them to Docker Hub:

```sh
$ docker push carto/windshaft-cartovl-testing
$ docker push carto/windshaft-cartovl-testing-pg10
$ docker push carto/windshaft-cartovl-testing-pg11
```
