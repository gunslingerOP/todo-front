import { getTasks } from "./api/api";
import { useState, useEffect } from "react";
import Card from "../components/card";
import AddModal from "../components/modal";
import { Spin } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [tasks, setTasks] = useState(null);
  const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

  useEffect(() => {
    if (!tasks) {
      setIsLoading(true);
    }
    getTodos();
  }, []);

  const taskValueDetector = () => {
    getTodos();
  };

  function getTodos() {
    setIsLoading(true);
    getTasks((err, result) => {
      setTasks(null);
      setTasks(result);
      setIsLoading(false);
    });
  }

  return (
    <div className="main">
      <AddModal tasksValue={taskValueDetector} />
      <Spin indicator={antIcon} spinning={isLoading}>
        {tasks
          ? tasks.map((item, index) => (
              <Card tasksValue={taskValueDetector} key={index} task={item} />
            ))
          : null}
      </Spin>
    </div>
  );
}
