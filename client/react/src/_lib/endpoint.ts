const DEV = process.env.REACT_APP_DEV_SERVER ? true : false;
export const ROOT = DEV ? process.env.REACT_APP_DEV_SERVER : "https://api.4rmy.app";
DEV && console.log("graphql endpoint : ", ROOT);

export const GRAPHQL_ENDPOINT = ROOT + "/graphql/";
export const IMG_UPLOAD_ENDPOINT = ROOT + "/api/upload/";
export const SUBSCRIPTION_ENDPOINT = DEV ? "ws://localhost:8000/graphql/" : "ws://api.4rmy.app/graphql/";