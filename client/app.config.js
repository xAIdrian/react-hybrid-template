import 'dotenv/config';

export default {
  "expo": {
    "name": "ReactTemplate",
    "slug": "ReactTemplate",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/images/icon.png",
    "scheme": "myapp",
    "userInterfaceStyle": "automatic",
    "splash": {
      "image": "./assets/images/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    "assetBundlePatterns": ["**/*"],
    "ios": {
      "supportsTablet": true,
      "bundleIdentifier": "com.ship.posturepro"
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/images/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      "package": "com.ship.posturepro",
    },
    "web": {
      "bundler": "metro",
      "output": "static",
      "favicon": "./assets/images/favicon.png"
    },
    "plugins": ["expo-router"],
    "experiments": {
      "typedRoutes": true
    },
    "extra": {
      "apiUrl": process.env.API_URL,
      "revCatAppleKey": process.env.REV_CAT_APPLE_API_URL,
      "eas": {
        "projectId": "0ef5208a-29fe-4b98-998c-975261bf1feb"
      }
    },
  }
}
