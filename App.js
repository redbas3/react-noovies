import React, { useCallback, useEffect, useState } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import Entypo from '@expo/vector-icons/Entypo';
import { Ionicons } from '@expo/vector-icons';
import { Text, View, Image } from 'react-native';
import { Asset } from 'expo-asset';
import { Image } from 'expo-image';

const loadFonts = (fonts) => fonts.map(font => Font.loadAsync(font));
const loadImages = (images) => images.map(image => {
  if (typeof image === "string") {
    return Image.prefetch(image);
  }
  else {
    return Asset.loadAsync(image)
  }
});

export default function App() {
  const [appIsReady, setAppIsReady] = useState(false);

  useEffect(() => {
    async function prepare() {
      try {
        const fonts = loadFonts([Ionicons.font, Entypo.font]);
        // await Font.loadAsync(Entypo.font); 
        // await Font.loadAsync(Ionicons.font);

        const images = loadImages([require('./1600x800_1.jpeg'), "https://reactnative.dev/docs/assets/GettingStartedCongratulations.png"]);
        // await Asset.loadAsync(require('./1600x800_1.jpeg'));
        // await Image.prefetch("https://reactnative.dev/docs/assets/GettingStartedCongratulations.png")

        await Promise.all([...fonts, ...images]);

        // Artificially delay for two seconds to simulate a slow loading
        // experience. Please remove this if you copy and paste the code!
        // await new Promise(resolve => setTimeout(resolve, 2000));
      } catch (e) {
        console.warn(e);
      } finally {
        // Tell the application to render
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      // This tells the splash screen to hide immediately! If we call this after
      // `setAppIsReady`, then we may see a blank screen while the app is
      // loading its initial state and rendering its first pixels. So instead,
      // we hide the splash screen once we know the root view has already
      // performed layout.
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      onLayout={onLayoutRootView}>
      <Text>We are done loading!</Text>
      <Entypo name="rocket" size={30} />
      <Image source={"./1600x800_1.jpeg"}></Image>
    </View>
  );
}
