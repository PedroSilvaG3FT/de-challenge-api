import { buildApp } from "./main";

const start = async () => {
  const app = await buildApp();
  const port = Number(process.env.PORT || 3333);

  try {
    await app.listen({ host: "0.0.0.0", port });
    console.log(`Server listening on ${port}`);
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
