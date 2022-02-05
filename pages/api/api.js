const URL =
  "https://fkmfxjhh92.execute-api.us-east-1.amazonaws.com/dev/api/tasks";

export const getTasks = (callback) => {
  fetch(`${URL}/`, {
    method: "GET",
  })
    .then((resp) => resp.json())
    .then((result) => callback(null, result))
    .catch((err) => callback(err, null));
};

export const addTask = (data, callback) => {
  fetch(`${URL}/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((result) => callback(null, result))
    .catch((err) => callback(err, null));
};

export const deleteTask = (id, callback) => {
  fetch(`${URL}/${id}`, { method: "DELETE" })
    .then((resp) => resp.json())
    .then((result) => callback(null, result))
    .catch((err) => callback(err, null));
};

export const editTask = (data, id, callback) => {
  fetch(`${URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((resp) => resp.json())
    .then((result) => callback(null, result))
    .catch((err) => callback(err, null));
};
