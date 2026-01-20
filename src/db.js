import fs from "node:fs/promises";

const DB_URL = new URL("../db.json", import.meta.url).pathname;
const DEFAULT_DB = { tasks: [] };

export const getDB = async () => {
  try {
    const file = await fs.readFile(DB_URL, "utf-8");
    
    if (file?.trim()) {
      const db = JSON.parse(file);
      return db;
    }
  } catch (error) {
    if (error?.code !== "ENOENT") {
      console.error("Error accessing DB");
      throw error;
    }
  }

  await saveDB(DEFAULT_DB);
  return DEFAULT_DB;
};

export const saveDB = async (db) => {
  const content = JSON.stringify(db, null, 2);
  await fs.writeFile(DB_URL, content);
};
