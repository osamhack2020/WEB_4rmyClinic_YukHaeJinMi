export const ROOT = process.env.REACT_APP_DEV_SERVER ? process.env.REACT_APP_DEV_SERVER : "https://clinic-af2szzytra-an.a.run.app";
console.log("graphql endpoint : ", ROOT);

export const GRAPHQL_ENDPOINT = ROOT + "/graphql/";
export const IMG_UPLOAD_ENDPOINT = ROOT + "/api/upload/";