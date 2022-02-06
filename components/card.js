import Link from "next/link";
import { useEffect, useState } from "react";
import moment from "moment";
import { deleteTask, editTask } from "../pages/api/api";
import { Button } from "antd";

const Card = (props) => {
  const [text, setText] = useState(props.task.title);
  const [loading, setLoading] = useState(false);
  const [disabled, setDisabled] = useState(true);

  const title = props.task.title;
  const format = "YYYY-MM-DD HH:mm";
  const date = moment(props.task.creationDate).format(format);

  function handleChange(e) {
    if (e.trim().toLowerCase() != title.trim().toLowerCase()) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }

    setText(e);
  }

  function deactivateTask() {
    setLoading(true);
    deleteTask(props.task.id, (err, result) => {
      setLoading(false);
      props.tasksValue();
    });
  }

  function changeTask() {
    setLoading(true);

    editTask({ title: text }, props.task.id, () => {
      setLoading(false);
      props.tasksValue();
    });
  }

  return (
    <>
      <div className="card-wrapper">
        <div className="input-title">
          <input
            onChange={(e) => {
              handleChange(e.target.value);
            }}
            className="title"
            defaultValue={title}
          />
          <Button disabled={disabled} onClick={changeTask} className="edit">
            CONFIRM
          </Button>
        </div>
        <div className="date-done">
          <div>{date}</div>
          <Button loading={loading} className="done" onClick={deactivateTask}>
            DONE
          </Button>
        </div>
      </div>
    </>
  );
};
export default Card;
