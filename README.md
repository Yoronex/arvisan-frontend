# Architecture Visualization & Analysis (ARVISAN) frontend

This is the frontend for the proof-of-concept architecture
visualizer and analysis tool for the graduation project of Roy Kakkenberg.

## Requirements
- NodeJS 20. Dependencies are installed with npm.
- A working instance of the ARVISAN backend https://github.com/Yoronex/arvisan-backend.

## How to install
To get started quickly, use docker-compose in the [backend repository](https://github.com/Yoronex/arvisan-backend).
This stack contains the backend, frontend, and an empty Neo4j database instance.
The Neo4j database within the Docker stack can also be replaced by a local Neo4j instance (for example Neo4j Desktop).

- Install the ARVISAN backend.
- Install NodeJS 20.
- Install all dependencies: `npm install`.
- Start the application: `npm run dev`.
- The frontend can now be found at http://localhost:5173/.
Requests will automatically be proxied to a running backend instance

## Other problems/questions
### Generating client
The backend client is generated using the `openapi-typescript-codegen` library.
The command to generate the client can be found in `package.json`.
Note that, in order for the command to work, both the backend repository folder and
frontend repository folder need to be placed next to each other.