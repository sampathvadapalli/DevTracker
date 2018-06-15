# Dev-Academy-Tracker

Dev Academy Tracker Tool, based on React and Node, is a web application which keeps track of and manages all the cards requested from different departments by managers. It also updates the status of each card request from the time of submission till the request has been resolved. It tracks cards that were created in the tracker and in workday. The tool facilitates role based access which allows associates of different levels to interact with it differently.

JIRA: [DEVACDMY-12465](https://jira2.cerner.com/browse/DEVACDMY-12465)

## Getting Started (Installation)

### Requirements
Node and Node Packet Manager (NPM)
## Setup

### Environment Setup
This project requires Node and NPM.

#### Windows and macOS:

1.Go to [here](https://nodejs.org/en/)

2.Select the button to download the LTS build that is "Recommended for most users".

3.Install Node by double-clicking on the downloaded file and following the installation prompts.

#### Ubuntu 16.04:

The easiest way to install the most recent LTS version of Node 6.x is to use the [package manager](https://nodejs.org/en/download/package-manager/#debian-and-ubuntu-based-linux-distributions) to get it from the Ubuntu binary distributions repository. This can be done very simply by running the following two commands on your terminal:

```curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -```

```sudo apt-get install -y nodejs```

### Project Setup

In the command prompt, navigate to the project directory and run the following commands:

1.Install all the dependencies required to run the project - ```npm install```

2.Install the webpack - ```install webpack-cli -D```

## Running project

1.Start the webpack to watch your files - ```npm run webpack```

2.In another command prompt start the local host - ```npm start```

3.Now, go to localhost:8080/login

## Running tests

```npm run test```

```npm run coverage```


