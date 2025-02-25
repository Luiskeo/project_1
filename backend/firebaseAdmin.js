import admin from "firebase-admin";
import { readFile } from "fs/promises";

const serviceAccount = JSON.parse(await readFile(new URL("../firebase-key.json", import.meta.url)));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
