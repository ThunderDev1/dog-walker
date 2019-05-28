# dog-walker :dog2:

React typescript demo app to invite fellow dog owners to walks with your dog :)

![Demo Gif](https://statics.blob.core.windows.net/public/dog-walker3.gif)

The app showcases the following features:

- OpenId authentication with [IdentityServer](https://identityserver.io)
- Fully installable [PWA](https://developers.google.com/web/progressive-web-apps/)
- Web notifications using [FCM](https://firebase.google.com/docs/cloud-messaging/)
- Interactive map with [Mapbox](https://www.mapbox.com/)

The corresponding backend project is [dog-walker-api](https://github.com/ThunderDev1/dog-walker-api)

## Using this project

You will need to setup a few things:

- Setup identity server: an example can be found in one of my other repos [reactjs-ts-identityserver](https://github.com/ThunderDev1/reactjs-ts-identityserver)
- Create a free Mapbox account and set the following environment variables
  - MAPBOX_TOKEN
  - MAPBOX_STYLE

- Create a firebase account and add the config file src/config/firebase.ts
- Set the messagingSenderId in serviceWorker.js file

`npm install`

`npm start`

#### Production build
You need to add your own webpack.prod.ts file and specify your own endpoints and mabox key.
I'm hosting this app on [Azure Storage static website](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-blob-static-website)

`npm run build`
