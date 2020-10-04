console.log("endpoint.ts : ", process.env.REACT_APP_DEV_SERVER);
const ROOT = process.env.REACT_APP_DEV_SERVER ? process.env.REACT_APP_DEV_SERVER : "https://clinic-af2szzytra-an.a.run.app";

export const GRAPHQL_ENDPOINT = ROOT + "/graphql/";
export const AUTH_ENDPOINT = ROOT + "/auth/token/";