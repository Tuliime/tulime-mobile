let serverURL: string;
if (!process.env.NODE_ENV || process.env.NODE_ENV === "development") {
  serverURL = "http://localhost:8000";
} else {
  serverURL = serverURL = "some prod server url";
}

export { serverURL };
