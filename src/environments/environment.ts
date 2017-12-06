// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyDsBLutQhR0T0Eczx1HhHvQqSVH1c-jyeA",
    authDomain: "imdbdemo-4c472.firebaseapp.com",
    databaseURL: "https://imdbdemo-4c472.firebaseio.com",
    projectId: "imdbdemo-4c472",
    storageBucket: "imdbdemo-4c472.appspot.com",
    messagingSenderId: "423437263922"
  }
};
