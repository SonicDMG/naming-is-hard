# Naming-is-hard "Near Us"
Our “Near Us” app is based on “Among Us,” a game of teamwork and betrayal — in space! But instead of space, this app showcases the value of multi-region (on Earth) using Astra DB. 

The mission: get your data close to your users, or DIE.

For this app, we used an Astra organization to share across our team, along with three regions across the world: one in the US, one in EMEA, and one in APAC. The goal of the game is to complete the task of building a sentence before you get murdered. However, if you’re too far from your datacenter, you’ll be slowed down and brought closer to a humiliating death.

We used both GraphQL and gRPC to illustrate the decrease in latency with the new gRPC API, and because we’re multi-tasking folk, we also took the opportunity to provide initial gRPC feedback to both the development and document teams based on our experience. 

Lastly, we deployed this exciting app on Netlify React App  for your viewing pleasure, and configured it to work with a K8s stack.

Ready to play? May the odds be ever in your favor.

https://naming-is-hard.netlify.app/

## 1. Install dependencies
```shell
npm install
```

## 2. Generate .env file with astra-setup
Execute the following command in your terminal to hook up to Astra and auto generate your .env file. (Use this for now until I get everything setup in our Astra org)
```shell
TODO
```

## 3. Run the app using Netlify
```shell
netlify dev
```

## 3a. run the app in K8s

1. Have a k8s cluster, failing that install something like [k3d](https://k3d.io/) `curl -s https://raw.githubusercontent.com/rancher/k3d/main/install.sh | bash`
2. Install [Helm](https://helm.sh). If you don't have and want a quick install in bash just run `curl https://raw.githubusercontent.com/helm/helm/main/scripts/get-helm-3 | bash`
3. run `./deploy-in-k3d.sh`
4. Open a local port `kubectl port-forward $(kubectl get pods -l app.kubernetes.io/name=naming-is-hard -o custom-columns=NAME:metadata.name --no-headers) 3000:3000`
5. open your browser to http://localhost:3000

### Update your app in K8s

1. run `./update-app-in-k3d.sh`
2. Open a local port `kubectl port-forward $(kubectl get pods -l app.kubernetes.io/name=naming-is-hard -o custom-columns=NAME:metadata.name --no-headers) 3000:3000`
3. reload your browser

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
