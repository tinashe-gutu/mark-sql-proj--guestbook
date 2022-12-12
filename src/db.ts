import { Client } from "pg";

const client = new Client({ database: "guestbook" });

client.connect();

export async function getSignature() {
  try {
    const queryText = "SELECT signature FROM signatures LIMIT 100";
    const res = await client.query(queryText);
    return res.rows;
  } catch (error) {
    console.error("error when getting signature", error);
    throw error;
  }
}

export async function getSignatureById(id: number) {
  try {
    const queryText = "SELECT signature,message FROM signatures WHERE id=$1";
    const res = await client.query(queryText, [id]);
    console.table(res.rows);
    return res.rows;
  } catch (error) {
    console.error("cannot get signatures by ID", error);
  }
}

export async function setSignature(signature: string, message: string) {
  try {
    const queryText =
      "INSERT INTO signatures (signature,message) VALUES ($1,$2) RETURNING signature,message";
    const res = await client.query(queryText, [signature, message]);
    return res.rows;
  } catch (error) {
    console.error("cannot insert signature", error);
  }
}

export async function updateSignatureById(
  signature: string,
  message: string,
  id: number
) {
  try {
    const queryText =
      "UPDATE signatures set signature=$1, message=$2 WHERE id=$3 RETURNING signature,message";
    const res = await client.query(queryText, [signature, message, id]);
    return res;
  } catch (error) {
    console.error("cannot insert signature", error);
  }
}

export async function deleteSignature(id: number) {
  try {
    const queryText = "DELETE FROM signatures WHERE id=$1 RETURNING *";
    const res = await client.query(queryText, [id]);
    console.log(res);
    return res;
  } catch (error) {
    console.error("cannot insert signature", error);
  }
}
