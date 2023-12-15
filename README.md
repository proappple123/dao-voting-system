# Motoko Bootcamp - DAO Adventure - Template - Guided Project

> This repository is a template project for the graduation phase of the DAO Adventure. To check out the complete DAO Adventure repository, [click here](https://github.com/motoko-bootcamp/dao-adventure).

## Goal

The goal of this project is to build a DAO that controls a webpage.

In it's most simple version, the project should have the following features:

- Users can login with their **Internet Identity**.
- Users can create a proposal to change the text displayed on the webpage.
- Users can consult and vote on proposals.
- If a proposal is accepted, the text on the webpage is automatically changed.

You are free to add more features to the project (token, improved voting system, DAO-controlled treasury), but the ones listed above are the minimum features to be eligible for graduation.

## Requirements

In addition, you also need to make sure that your project follows these requirements:

- Your project is written in **Motoko** (backend) and deployed on the **Internet Computer**.
- Your code is open source and available on **GitHub.**

## Getting Started

Make sure that [Node.js](https://nodejs.org/en/) `>= 16.x` and [`dfx`](https://internetcomputer.org/docs/current/developer-docs/build/install-upgrade-remove) `>= 0.15.x` are installed on your system.

Run the following commands in a new, empty project directory:

```sh
dfx start --clean --background # Run dfx in the background
npm run setup # Install packages, deploy canisters, and generate type bindings
npm start # Start the development server
```

## Technology Stack

- [Vite](https://vitejs.dev/): high-performance tooling for front-end web development.
- [Svelte](https://svelte.dev/): a radical and innovative JavaScript framework for building user interfaces.
- [Motoko](https://internetcomputer.org/docs/current/motoko/main/motoko): A high-level language for smart contracts on the Internet Computer.
- [Sass](https://sass-lang.com/): an extended syntax for CSS stylesheets.
- [Prettier](https://prettier.io/): code formatting for a wide range of supported languages.
- [MOPS](https://mops.one/) : a package manager for Motoko with fully on-chain package registry.

## Documentation

- [Vite developer docs](https://vitejs.dev/guide/)
- [Learn Svelte](https://learn.svelte.dev/tutorial/welcome-to-svelte)
- [Internet Computer docs](https://internetcomputer.org/docs/current/developer-docs/ic-overview)
- [Motoko Book](https://web3.motoko-book.dev/)
- [Motoko Bootcamp](https://www.motokobootcamp.com/)
- [MOPS](https://docs.mops.one/quick-start)
- [`dfx.json` reference schema](https://internetcomputer.org/docs/current/references/dfx-json-reference/)

## Tips and Tricks

- Customize your project's code style by editing the `.prettierrc` file and then running `npm run format`.
- Reduce the latency of update calls by passing the `--emulator` flag to `dfx start`.
- Split your frontend and backend console output by running `npm run frontend` and `npm run backend` in separate terminals.
