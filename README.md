# Avalanche Wallet Apps

## Getting Started

First, clone the repo.

```zsh
git clone git@github.com:ava-labs/avalanche-wallet-apps.git
cd avalanche-wallet-apps/
```

Next, install the dependencies.

```zsh
yarn install
```

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

## iOS & Android versioning

To update version of apps set new version in package.json and run
```zsh
yarn postversion
```
This will set versionName (bundle version string) to one set in package.json and increment versionCode (bundle version)
by one. 

## Custom fonts

To add custom font, add it to src/assets folder and then run: 
```zsh
yarn link
```

## Releasing apps

### Android

Make release AAB
```zsh
cd android
./gradlew bundleRelease
```
and then upload generated aab file to [play console](https://play.google.com/console)

#### Manual signing
Build unsigned aab (remove `buildTypes.release.signingConfig` entry from `build.gradle` file)

Sign with:
```zsh
jarsigner -verbose -sigalg SHA256withRSA -digestalg SHA-256 -keystore xample.jks bundle.aab keystoreAlias
```

### iOS

1. In **Info.plist** set flags `NSAllowsArbitraryLoads` & `NSExceptionAllowsInsecureHTTPLoads` to `false`
2. Open Xcode
3. Configure app to be built using the Release scheme, go to `Product → Scheme → Edit Scheme`. Select the `Run` tab in the sidebar, then set the `Build Configuration` dropdown to `Release`
4. Set build target to `Any iOS device`
5. Go to `Product → Archive` and follow wizard steps

### Nightly builds - Android
```zsh
cd android
./gradlew assembleNightly
```


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
