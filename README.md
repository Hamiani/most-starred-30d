# Most Starred GitHub Repositories

A small React app that lists the most starred GitHub repositories created in the last 30 days. The data comes directly from the GitHub Search API, and clicking a repository card opens its page on GitHub.

## Features

- Lists the most starred repositories created in the last 30 days, sorted by stars.
- One repository per card, showing its rank, owner avatar, name, description, stars, open issues, and creation date.
- Click a card to open the repository on GitHub in a new tab.
- Infinite scroll: more results load as you scroll.
- Light and dark theme that follows your system preference.
- Responsive layout, from mobile to desktop.

## Tech Stack

- [React](https://reactjs.org/) 16.8, bootstrapped with [Create React App](https://github.com/facebook/create-react-app) (react-scripts 3.0)
- [axios](https://www.npmjs.com/package/axios) for HTTP requests
- [react-infinite-scroller](https://www.npmjs.com/package/react-infinite-scroller) for infinite scroll
- [moment](https://www.npmjs.com/package/moment) for date differences
- Plain CSS, with theme colors defined as CSS custom properties

## Getting Started

Prerequisites: Node.js and npm.

```bash
npm install
npm start
```

Then open [http://localhost:3000](http://localhost:3000).

### Node.js 17 and later

react-scripts 3 uses webpack 4, which needs OpenSSL's legacy provider. On Node 17+ you may see `ERR_OSSL_EVP_UNSUPPORTED`. You can either use Node 16 LTS, or run react-scripts directly with the flag:

```bash
NODE_OPTIONS=--openssl-legacy-provider node node_modules/react-scripts/bin/react-scripts.js start
NODE_OPTIONS=--openssl-legacy-provider node node_modules/react-scripts/bin/react-scripts.js build
```

If your npm config sets `node-options`, npm overrides `NODE_OPTIONS` when running scripts, so `npm start` and `npm run build` can still fail. Use the direct commands above in that case.

## Scripts

| Command | Description |
| --- | --- |
| `npm start` | Runs the app in development mode on port 3000. |
| `npm test` | Runs the tests in watch mode. Use `CI=true npm test` for a single run. |
| `npm run build` | Creates an optimized production build in `build/`. |
| `npm run deploy` | Builds the app and publishes `build/` to the `master` branch with gh-pages. |

The deploy script needs `gh-pages`, which is not listed in `package.json`. Install it first with `npm install --save-dev gh-pages`. The project has no `homepage` field, so add one if the app is served from a sub-path.

## How It Works

1. The app requests repositories created after the date 30 days ago, sorted by stars:
   ```
   https://api.github.com/search/repositories?q=created:>YYYY-MM-DD&sort=stars&order=desc&per_page=100&page=N
   ```
2. Each page of 100 results is appended to the list as you scroll.
3. Loading stops after page 10, because the GitHub Search API returns at most 1,000 results per query.
4. Unauthenticated requests share GitHub's search rate limit (10 requests per minute). If results stop loading, wait a minute and scroll again.

Each card links to the repository's `html_url` and opens it in a new tab.

## Project Structure

```
src/
├── API/GITHUB-API.js        GitHub Search API request
├── CSS/Css.css              Hero, card, and loader styles
├── Repositories-list/
│   ├── index.js             RepositoryList: state, pagination, infinite scroll
│   └── Repository.js        Repository card, linked to its GitHub page
├── App.js                   App shell
├── index.css                Global styles and light/dark theme tokens
└── App.test.js              Smoke test
```

## Tests

`App.test.js` is a smoke test that renders the app. It calls the GitHub API, so it needs network access.

## Challenge Brief

The task is to implement a small webapp that lists the most starred GitHub repositories created in the last 30 days, using the sorted JSON data fetched directly from the GitHub API.

1. As a user, I can list the most starred GitHub repositories created in the last 30 days.
2. As a user, I see the results as a list, with one repository per row.
3. As a user, I can see for each repository: its name, its description, its number of stars, its number of issues, and the username and avatar of its owner.
4. As a user, I can keep scrolling and new results appear (pagination).

## Credits

Built with [react-infinite-scroller](https://www.npmjs.com/package/react-infinite-scroller), [axios](https://www.npmjs.com/package/axios), and [moment](https://www.npmjs.com/package/moment).



