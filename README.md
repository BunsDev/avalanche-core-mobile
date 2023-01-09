# Core X Mobile

## Getting Started

First, clone the repo.

```zsh
git clone git@github.com:ava-labs/avalanche-wallet-apps.git
cd avalanche-wallet-apps/
```

Next, install the dependencies.

```zsh
yarn setup
```

Notes: Before running yarn setup, you will need to generate an npm token from your npmjs account and add that as an environment variable named `NPM_TOKEN` on your mac (for example, `.zshenv` if using zsh or `.bash_profile` if not). This is necessary for yarn to be able to download Ava Labs' private libraries/sdks


## Add config files

### Environment file
Create a `.env.development` and `.env.production` files in the root of the project. The contents of the .env files are in 1Password. Ask permission to access it (the vault name is Mobile team). Once access is given copy and paste the contents from the 1Password Secure Note into your local .env files. 

IMPORTANT: the `.env` files are never to be committed to the repo, and are already added to .gitignore. 

### Android configs
Download `keystore.properties` from 1Password and place it in the `android` folder

## Setup dev environment

Follow [these](https://reactnative.dev/docs/environment-setup) steps to setup dev environment; make sure to select 
**React Native CLI Quickstart** tab and select appropriate Development & Target OS.

## Launch iOS App

First install iOS dependencies.

```zsh
# install cocoapods
sudo gem install cocoapods
```

Now you can run the app

```zsh
# launch iOS simulator and start the app
yarn ios
```

## Launch Android App

Follow the steps in the React Native docs for [configuring your Android dev environment](https://reactnative.dev/docs/environment-setup).

```zsh
# launch android emulator and start the app
yarn android
```

## Tests

You can run the test suite with

```zsh
yarn test
```

## Custom fonts

To add custom font, add it to src/assets folder and then run: 
```zsh
yarn link
```

## Navigation System

https://whimsical.com/mobile-navigation-system-4WaXLt2DgAutCmbfFF6wpS

## Wallet Connect Flows

https://whimsical.com/wallet-connect-flows-9QqTTDNdktBePx6vDR9oeX

## App Signing
[Documentation](docs/app_signing.md)

## Release Process
[Documentation](docs/release_process.md)

## Known issues
### Apple M1 chips

Exclude arch `arm64`

Prefix all comands with `arch -x86_64`

Examples:
```zsh
arch -x86_64 pod install
```

```zsh
arch -x86_64 yarn ios
```

### `pod install` fails on Apple M1 chips

Install ffi
```zsh
sudo arch -x86_64 gem install ffi
```
