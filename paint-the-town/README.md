# Paint the Town Mobile App

Paint the Town is an iOS App which aims to get people both active and creative. Inspired by the drawings that people create using fitness apps such as Strava, the aim was to make something specifically for creating your own artwork across a map.

The app draws your path, with the option to change colours, change line-thickness and pause, will the option to display as a satellite view or a standard map. You can also save your image and add to it later, which could allow for collaboration between users in future versions.

## Getting Started

### Prerequisites

To host the app locally, you will need [Node](https://nodejs.org/en/download/) installed on your machine. Follow the link for instructions on how to do this. 

### Installing
Fork and clone the [repository from Github](https://github.com/louillustrator/Project-FrontEnd).

Navigate into the directory on your command line and run ```npm install``` to install the required dependencies. These are as follows:
* Axios: ^0.18.0,
* Expo: ^27.1.1,
* Firebase: ^5.4.2,
* Lodash: ^4.17.10,
* React: ^16.5.0,
* ReactDOM: ^16.5.0,
* React Native: ~0.55.2,
* React Native Circular Action Menu: ^0.5.0,
* React Native Color Picker: ^0.4.0,
* React Native Elements: ^0.19.1,
* React Native Vector Icons: ^5.0.0,
* React Navigation: ^2.12.1,
* React Router Native: ^4.3.0

You will also need to install the [Expo mobile app](https://itunes.apple.com/gb/app/expo-client/id982107779?mt=8) to open Paint the Town.

In order to run the test suite, you will also need the following:
* Enzyme: ^3.6.0,
* Enzyme Adapter React 16: ^1.5.0,
* Jest CLI: ^23.5.0,
* Jest Expo: ^27.0.1,
* React Native Scripts: 1.14.0,
* React Test Renderer: 16.3.1

### Running the App
Run ```npm start``` in the command line to host the app. Once loaded, this will display a QR code in the command line, which can be scanned by your iOS camera to open the app through the Expo app.

## Testing
To run the tests, run ```npm test``` in your command line. 

Unit testing is used, including snapshot testing and function testing, to check the components. This includes testing that the components are rendering, and rendering correctly, as well as testing which parent and child elements exist and that child elements are receiving the required props.

## Authors
* Hazel Normandale - *github.com/normanhaze*
* Louise Wright - *github.com/louillustrator*
* Tara Galloway - *github.com/crylittlesister*
* Rosie Amphlett - *github.com/rosieamphlett*
* Robert Davidson - *github.com/robd33*
* Ilina K - *github.com/sylfie*

Advice and support provided by the Northcoders team.
