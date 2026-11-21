# auth

Simple auth app. TypeScript, React, Express.

## Structure

```
auth/
└── apps/
    ├── client/   # Vite + React + TS (:5173)
    └── server/   # Express + TS (:3000)
```

## Setup

```bash
npm install
```

## Run

```bash
npm run dev
```

- Client: http://localhost:5173
- Server: http://localhost:3000

The client proxies `/api` to the server.

## Scripts

| Command         | Description             |
| --------------- | ----------------------- |
| `npm run dev`   | Run client and server   |
| `npm run build` | Build server and client |
