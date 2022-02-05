import { Modal, Button } from "antd";
import { useEffect, useState } from "react";
import { Input } from "antd";
import { addTask } from "../pages/api/api";

const AddModal = (props) => {
  const [visible, setVisible] = useState(props.visible);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalText, setModalText] = useState("Content of the modal");

  const [text, setText] = useState(null);
  const handleOk = () => {
    setModalText("Adding your todo...");
    setConfirmLoading(true);

    addTask({ title: text }, (err, result) => {
      props.tasksValue();
      setConfirmLoading(false);
      setVisible(false);
      setModalText("TODO successfully added!");
      setText(null);
    });
  };
  const showModal = () => {
    setVisible(true);
  };
  const handleCancel = () => {
    setVisible(false);
  };

  const handleChange = (e) => {
    setText(e);
  };

  return (
    <>
      <section className="add" onClick={showModal}>
        <span className="plus">+</span> <span>ADD A NEW TODO</span>
      </section>
      <Modal
        title="Create a TODO"
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
      >
        <Input
          onChange={(e) => handleChange(e.target.value)}
          placeholder="Enter a task description"
          value={text}
        />
      </Modal>
    </>
  );
};

export default AddModal;
