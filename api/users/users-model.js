const db = require("../../database/connection");

module.exports = {
  add,
  find,
  findBy,
  findById,
};

async function add(user) {
  try {
    const [id] = await db("users").insert(user, "id");

    return findById(id);
  } catch (error) {
    throw error;
  }
}

function find() {
  return db("users").select("id", "username", "department").orderBy("id");
}

function findBy(filter) {
  return (
    db("users")
      // .select("id", "username", "department")
      .where(filter)
      .orderBy("id")
  );
}

function findById(id) {
  return db("users").where({ id }).first();
}
