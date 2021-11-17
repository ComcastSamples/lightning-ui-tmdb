# lightning-ui-tmdb

Sample Lightning app using TMDB for backend

### Quickstart

Get an api key from [TMDB API](https://developers.themoviedb.org/3/getting-started/introduction)
and put the key in `src/api/index.js`

```
git clone git@github.com:ComcastSamples/lightning-ui-tmdb.git
cd lightning-ui-tmdb
npm install -g @lightningjs/cli
npm i
npm start
```

### What's Inside
[Lightning Core](https://github.com/rdkcentral/Lightning) |
[Lightning SDK](https://github.com/rdkcentral/Lightning-SDK) |
[Lightning CLI](https://github.com/rdkcentral/Lightning-CLI) |
[Lightning UI](https://github.com/rdkcentral/Lightning-UI-Components) |
[Jest](https://jestjs.io/) |

## Detailed Getting Started

1. Install [node](https://nodejs.org/en/download/).

    The build image is based on latest LTS. It is strongly recommended that all developers use the same version to avoid inconsistencies between libraries.  Using NVM (Node Version Manager) is an easy way to switch between Node versions.

    Docs and Installation Instructions on [Github](https://github.com/nvm-sh/nvm).

    Examples:

    ```
    nvm install lts/*
    ```

    After installing, tell NVM to use that version:

    ```
    nvm use lts/*
    ```

2. Install dependencies:

    ```
    npm i
    ```

3. Start the server:

    **Development**

    ```
    npm start
    ```

    This should point your browser to http://127.0.0.1:8080/#home.

    If you make code changes, the app will update and refresh using lng dev server.
