// https://the-guild.dev/graphql/config/docs/user/usage

module.exports = {
  schema: "./server/schema.graphql",
  documents: ["./src/**/*.ts", "./src/**/*.tsx", "!./**/__generated__/**/*"],
};
