import 'dotenv/config';

export default {
  name: 'Skyhitz',
  description: "Beatmakers' app",
  slug: 'skyhitz',
  privacy: 'public',
  githubUrl: 'https://github.com/skyhitz/mobile',
  platforms: ['ios', 'android', 'web'],
  version: '0.4.0',
  orientation: 'portrait',
  primaryColor: '#1A1B1F',
  icon: './assets/images/icon.png',
  scheme: 'skyhitz',
  updates: {
    fallbackToCacheTimeout: 0,
  },
  ios: {
    bundleIdentifier: 'com.skyhitz.skyhitz',
    buildNumber: '0.4.0',
    icon: './assets/images/icon-1024x1024.png',
    appStoreUrl: 'https://itunes.apple.com/us/app/skyhitz/id1105406020',
    associatedDomains: ['applinks:v9nr.app.link'],
    infoPlist: {
      NSCameraUsageDescription:
        'Allow access to upload pictures to your profile.',
      NSPhotoLibraryUsageDescription:
        'Allow access to your library so you can upload original music videos.',
      UIBackgroundModes: ['audio'],
    },
  },
  android: {
    package: 'com.skyhitz.skyhitz',
    versionCode: 40,
    icon: './assets/images/icon-1024x1024.png',
    adaptiveIcon: {
      backgroundColor: '#1A1B20',
      foregroundImage: './assets/images/ic_launcher.png',
    },
    playStoreUrl:
      'https://play.google.com/store/apps/details?id=com.skyhitz.skyhitz',
  },
  web: {
    use: 'nextjs',
  },
  facebookAppId: '564403243666491',
  facebookDisplayName: 'Skyhitz',
  facebookScheme: 'fb564403243666491',
  splash: {
    backgroundColor: '#1A1B1F',
    resizeMode: 'contain',
    image: './assets/images/icon-1024x1024.png',
  },
  assetBundlePatterns: ['assets/images/*', 'assets/fonts/*'],
};
