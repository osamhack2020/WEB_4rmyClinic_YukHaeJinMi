export const ROOT = process.env.REACT_APP_DEV_SERVER ? process.env.REACT_APP_DEV_SERVER : "https://api.4rmy.app";
process.env.REACT_APP_DEV_SERVER && console.log("graphql endpoint : ", ROOT);

export const GRAPHQL_ENDPOINT = ROOT + "/graphql/";
export const IMG_UPLOAD_ENDPOINT = ROOT + "/api/upload/";