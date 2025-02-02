import React from 'react';
import { Form, Input, Space, Button } from 'antd';
import MediaSelector from '../../../components/MediaSelector';
import { checker, maker } from '../../../utils/sluger';
import { AddDefaultApplication } from './AddDefaultApplication';
import { Link } from 'react-router-dom';

const { TextArea } = Input;

const layout = {
  labelCol: {
    span: 7,
  },
  wrapperCol: {
    span: 12,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 10,
    span: 14,
  },
};

const ApplicationForm = ({ onCreate, data = {} }) => {
  const [form] = Form.useForm();
  const urlParams = new URLSearchParams(window.location.search);
  const isDefault = urlParams.get('is_default');

  const onReset = () => {
    form.resetFields();
  };

  const onTitleChange = (string) => {
    form.setFieldsValue({
      slug: maker(string),
    });
  };

  return (
    <div>
      <Link key="1" to={`/applications/type`}>
        <Button type="primary"> Back to manage applications</Button>
      </Link>
      {isDefault !== 'true' ? (
        <Form
          {...layout}
          form={form}
          initialValues={{ ...data }}
          name="create-application"
          onFinish={(values) => {
            onCreate(values);
            onReset();
          }}
        >
          <Form.Item
            name="name"
            label="Name"
            rules={[
              {
                required: true,
                message: 'Please enter the name!',
              },
              { min: 3, message: 'Name must be minimum 3 characters.' },
              { max: 50, message: 'Name must be maximum 50 characters.' },
            ]}
          >
            <Input onChange={(e) => onTitleChange(e.target.value)} />
          </Form.Item>
          <Form.Item
            name="slug"
            label="Slug"
            rules={[
              {
                required: true,
                message: 'Please enter the name!',
              },
              {
                pattern: checker,
                message: 'Please enter valid slug!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="Logo" name="medium_id">
            <MediaSelector />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <TextArea />
          </Form.Item>
          <Form.Item
            name="url"
            label="URL"
            rules={[
              {
                required: true,
                message: 'Please enter the URL!',
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Space>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
              <Button htmlType="button" onClick={onReset}>
                Reset
              </Button>
            </Space>
          </Form.Item>
        </Form>
      ) : (
        <AddDefaultApplication />
      )}
    </div>
  );
};

export default ApplicationForm;
