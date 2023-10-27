import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";
import { Form, Select, Button } from "antd";
import _ from "lodash";

const FormItem = Form.Item;
const { Option } = Select;

const App = (props) => {
  const [error2Touched, setError2Touched] = useState(false);
  const [renderRequireMark, setRenderRequireMark] = useState(false);
  useEffect(() => {
    props.form.setFieldsValue({ error2: "" });
  }, []);

  const handleRequiredMark = (value) => {
    console.log(value);
    if (!_.isEmpty(value)) {
      setRenderRequireMark(true);
    } else {
      setRenderRequireMark(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.form.validateFields((errors, values) => {
      if (!values.error2) {
        setError2Touched(true);
        // setRenderRequireMark(false);
        console.log(values);
      } else {
        setError2Touched(false);
        // setRenderRequireMark(true);
        console.log(values);
      }
    });
  };

  const { getFieldDecorator } = props.form;

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem
        label={
          <span>
            {renderRequireMark && <span style={{ color: "red" }}>*</span>}
            Items Count
          </span>
        }
        validateStatus={error2Touched ? "error" : ""}
        hasFeedback={error2Touched}
      >
        {getFieldDecorator("error2")(
          <Select
            style={{ width: "100%" }}
            onChange={(e) => handleRequiredMark(e)}
          >
            <option value="">---Select---</option>
            <Option value="1">Option 1</Option>
            <Option value="2">Option 2</Option>
            <Option value="3">Option 3</Option>
          </Select>
        )}
      </FormItem>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form>
  );
};

const WrappedApp = Form.create()(App);

ReactDOM.render(<WrappedApp />, document.getElementById("container"));
