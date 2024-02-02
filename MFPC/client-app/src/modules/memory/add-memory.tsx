import React, { useState, useContext } from "react";
import { Card, Form, Input, Result, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { AddMemoryRequest } from "../../interfaces/Requests";
import { Button } from "antd";
import { MemoryContext } from "./memory-store.tsx";
import { observer } from "mobx-react";
import FormContainer from "../../shared-components/FormContainer.tsx";
import NavBar from "../navbar.tsx";
import { Container } from "@mui/material";

const AddMemory = observer(() => {
  const memoryStore = useContext(MemoryContext);
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { TextArea } = Input;

  const add = (values: AddMemoryRequest) => {
    setIsAddButtonDisabled(true);

    memoryStore
      .addMemory(values)
      .then(() => {
        if (memoryStore.addResponse == 1) {
          setShowSuccessMessage(true);
        }
      })
      .catch((error) => {
        setIsAddButtonDisabled(false);
      });

    setIsAddButtonDisabled(false);
  };

  return (
    <Container>
      <NavBar />

      {showSuccessMessage === false ? (
        <FormContainer>
          <h1 style={{ color: "#0a46aa" }}>Add your thoughts</h1>

          <Card bordered={false}>
            <Form name="basic" onFinish={add}>
              <Form.Item
                label={"Date"}
                name="date"
                rules={[{ required: true, message: "Date is required" }]}
                hasFeedback
              >
                <Input
                  placeholder="2023-02-23"
                  suffix={
                    <Tooltip title={"Date"}>
                      <InfoCircleOutlined style={{ color: "#df7153" }} />
                    </Tooltip>
                  }
                />
              </Form.Item>

              <Form.Item
                label={"Mood"}
                name="mood"
                rules={[{ required: true, message: "Mood is required" }]}
                hasFeedback
              >
                <Input
                  placeholder="Happy/Excited/Shy/Sad/Angry/..."
                  suffix={
                    <Tooltip title={"How did you feel today?"}>
                      <InfoCircleOutlined style={{ color: "#df7153" }} />
                    </Tooltip>
                  }
                />
              </Form.Item>

              <Form.Item
                label={"Text"}
                name="text"
                rules={[{ required: true, message: "A message is required" }]}
                hasFeedback
              >
                <TextArea rows={4} placeholder="How was your day?" />
              </Form.Item>

              <Button
                disabled={isAddButtonDisabled}
                htmlType="submit"
                style={{ color: "#0a46aa" }}
              >
                {"Add"}
              </Button>
            </Form>
          </Card>
        </FormContainer>
      ) : (
        <Result
          status="success"
          title="Your memory is successfully added!"
          subTitle="Come back tomorrow and note down your thoughts from the day"
        />
      )}
    </Container>
  );
});

export default AddMemory;
