# Automated Authorization process for [TD365 Platform](https://td365.com/)

## Overview

This Node.js script automates the login and order placement process on the TD365 platform using browser automation. The primary goal is to streamline the order placement workflow by collecting the necessary cookies for authentication.

## Technologies Used

- **Puppeteer**: A Node library that provides a high-level API to control headless browsers or full browsers over the DevTools Protocol. In this project, Puppeteer is used for browser automation.

- **Puppeteer Plugin Stealth**: A Puppeteer plugin that helps in preventing detection and blocking by websites through stealthy browser automation.

- **puppeteer-extra-plugin-adblocker**: An essential tool for blocking unwanted ads and scripts during the automation process to improve performance and reliability.

- **Axios**: A promise-based HTTP client for making requests to the TD365 platform and handling the authentication process.

## Prerequisites

Before running the script, make sure you have the following installed:

- Node.js: [Download Node.js](https://nodejs.org/)
- npm: npm is included with Node.js, so no need for a separate installation.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/PrantaDas/cookie-harvester.git

2. Change the driectory

    ```bash
    cd cookie-harvester
    ```
3. Install dependencies
    ```bash
    npm install or yarn
    ```
4. Start by 

    ```bash
    npm run dev or yarn dev
    ```
The script will launch a headless browser, navigate to the TD365 platform, log in using the provided credentials, and collect the required cookies for authentication.

### Disclaimer

This script is intended for educational and internal use only. Ensure compliance with the terms of service of the TD365 platform and applicable laws and regulations.

### Contributing

Feel free to contribute to the project by opening issues or submitting pull requests.