# Utilities

This repository hosts all sort of small experiments. It uses gh-pages to deploy to Github pages.

## Libraries Used

- react
- react-router
- webpack
- gh-pages

# Notes about developing for Github pages

This repo uses [gh-pages](https://www.npmjs.com/package/gh-pages) which will push dist files `gh-pages` branch. The `deploy` command will run `predeploy` first,  which will build the JS intu a bundle. 

## Resolving bundle location

Github pages for repo are linked to `https://${userName}.github.io/${repoName}` this means that we need to set the index.html to fetch the bundle.js from `/${repoName}/bundle.js`. You can do this by hardcoding the repository name or using a helper library like `git-repo-name`. Here is the output section of the webpack production config.   

    output: {
       path: path.resolve(__dirname, "dist/"),
       publicPath: `/${getRepositoryName()}/`,
       filename: "[name].[contenthash].js",
    },

## Getting work with react router

Github pages don't provide a way to reroute request like **nginx** or even **.htaccess**. Accessing `/utilities/page` will thus return a 404 error because we don't have `/page` folder. There are two ways to address this: 

- Use `<HashRouter/>` instead of `<BrowserRouter>`. This is the simplest solution when using react-router with Github pages. Instead of accessing `/utilities/page` you need to access `/utilities/#/page` instead. This is the approach used in this repository.
- Use a hacky 404.html redirection technique, you can read about it here [here](https://github.com/rafgraph/spa-github-pages).

