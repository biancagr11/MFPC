import React, { useState, useContext } from "react";
import { Card, Form, Input, Result, Tooltip } from "antd";
import { InfoCircleOutlined } from "@ant-design/icons";
import { UpdateMemoryRequest } from "../../interfaces/Requests";
import { Button } from "antd";
import { MemoryContext } from "./memory-store.tsx";
import { observer } from "mobx-react";
import FormContainer from "../../shared-components/FormContainer.tsx";
import NavBar from "../navbar.tsx";
import { Container } from "@mui/material";
import { useParams } from "react-router-dom";

const UpdateMemory = observer(() => {
  const memoryStore = useContext(MemoryContext);
  const { selectedMemory } = memoryStore;
  const [isUpdateButtonDisabled, setIsUpdateButtonDisabled] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const { TextArea } = Input;
  const { id } = useParams();


  const update = (values: UpdateMemoryRequest) => {
    values.id = parseInt(id === undefined ? "0" : id, 10);
    values.date = values.date == undefined ? selectedMemory.date : values.date;
    values.mood = values.mood == undefined || values.mood == "" ? selectedMemory.mood : values.mood;
    values.text = values.text == undefined || values.text == "" ? selectedMemory.text : values.text;

    setIsUpdateButtonDisabled(true);

    memoryStore
      .updateMemory(values)
      .then(() => {
        if (memoryStore.addResponse == 1) {
          setShowSuccessMessage(true);
        }
      })
      .catch((error) => {
        setIsUpdateButtonDisabled(false);
      });

      setIsUpdateButtonDisabled(false);
  };

  return (
    <Container>
      <NavBar />

      {showSuccessMessage === false ? (
        <FormContainer>
          <h1 style={{ color: "#0a46aa" }}>Update memory</h1>

          <Card bordered={false}>
            <Form name="basic" onFinish={update}>
              <Form.Item
                label={"Date"}
                name="date"
                hasFeedback
              >
                <Input
                  defaultValue={selectedMemory.date.toString()}
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
                hasFeedback
              >
                <Input
                  placeholder="Happy/Excited/Shy/Sad/Angry/..."
                  defaultValue={selectedMemory.mood}
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
                hasFeedback
              >
                <TextArea defaultValue={selectedMemory.text} rows={4} placeholder="How was your day?" />
              </Form.Item>

              <Button
                disabled={isUpdateButtonDisabled}
                htmlType="submit"
                style={{ color: "#0a46aa" }}
              >
                {"Update"}
              </Button>
            </Form>
          </Card>
        </FormContainer>
      ) : (
        <Result
          status="success"
          title="Your memory is successfully updated!"
          subTitle="Come back tomorrow and note down your thoughts from the day"
        />
      )}
    </Container>
  );
});

export default UpdateMemory;
