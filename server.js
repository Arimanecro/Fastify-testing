import getTimezone from "./tz.js";
import app from './app.js';

app({
  logger: {
    prettyPrint: {
      translateTime: "dd.mm HH:MM:ss",
      ignore: "pid,hostname",
      customPrettifiers: {
        time: getTimezone,
      },
    },
    ignoreTrailingSlash: true,
    caseSensitive: false,
  },
});