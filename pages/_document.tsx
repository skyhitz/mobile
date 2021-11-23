// @generated: @expo/next-adapter@2.0.6
import { getInitialProps } from '@expo/next-adapter/document';
import Document, { Head, Html, NextScript, Main } from 'next/document';
import React from 'react';
// const GoogleTagManagerId = 'GTM-5HR7H3L';

class CustomDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <meta
            name="title"
            content="Skyhitz - Beats market for music creators"
          />
          <meta
            name="description"
            content="Upload exclusive beats for sale and buy fresh songwriting ideas from other music producers. Join a music community of beatmakers!"
          />
          <meta
            name="keywords"
            content="beats market, beats website, lofi beats, fresh beats, music creators, exclusive beats for sale"
          />
          <meta name="twitter:card" content="app" />
          <meta name="twitter:site" content="@skyhitzio" />
          <meta
            name="twitter:description"
            content="Upload exclusive beats for sale and buy fresh songwriting ideas from other music producers. Join a music community of beatmakers!"
          />
          <meta name="twitter:app:country" content="US" />
          <meta name="twitter:app:name:iphone" content="Skyhitz" />
          <meta name="twitter:app:id:iphone" content="1105406020" />
          <meta name="twitter:app:url:iphone" content="skyhitz://+" />
          <meta name="twitter:app:name:ipad" content="Skyhitz" />
          <meta name="twitter:app:id:ipad" content="1105406020" />
          <meta name="twitter:app:url:ipad" content="skyhitz://+" />
          <meta name="twitter:app:name:googleplay" content="Skyhitz" />
          <meta
            name="twitter:app:id:googleplay"
            content="com.skyhitz.skyhitz"
          />
          <meta
            name="twitter:app:url:googleplay"
            content="https://play.google.com/store/apps/details?id=com.skyhitz.skyhitz"
          />
          <meta property="og:title" content="Skyhitz" />
          <meta
            property="og:description"
            content="Upload exclusive beats for sale and buy fresh songwriting ideas from other music producers. Join a music community of beatmakers!"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/skyhitz/image/upload/c_scale,h_531,q_auto/v1583723774/web/social.png"
          />
          <meta property="og:url" content="https://skyhitz.io" />
          <meta property="fb:app_id" content="564403243666491" />
          <meta property="og:site_name" content="Skyhitz" />
          <meta
            name="p:domain_verify"
            content="418ab0845b3db4cf3f4c9efe8ad0f80e"
          />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <meta name="theme-color" content="#000" />
          <title>Skyhitz - Beats market for music creators</title>
          <link rel="canonical" href="https://skyhitz.io" />
          <link rel="icon" href="/img/favicon.ico" />
          <link
            rel="preload"
            as="font"
            href="/fonts/Raleway-Light.ttf"
            type="font/ttf"
            crossOrigin=""
          />
          <link rel="preload" href="/fonts/fonts.css" as="style" />
          <link href="/fonts/fonts.css" rel="stylesheet" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

// Import the getInitialProps method and assign it to your component to ensure the react-native-web styles are used.
CustomDocument.getInitialProps = getInitialProps;

// OR...

CustomDocument.getInitialProps = async (props) => {
  const result = await getInitialProps(props);
  // Mutate result...
  return result;
};

export default CustomDocument;
