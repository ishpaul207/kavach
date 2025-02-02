import React from 'react';
import { Button, Table, Popconfirm, Modal } from 'antd';
import { deleteApplicationToken } from '../../../actions/token';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { PlusOutlined } from '@ant-design/icons';
import CreateTokenForm from '../token/CreateTokenForm';

const ApplicationDetail = ({ data = {}, visible, setVisible, setTokenFlag }) => {
  const dispatch = useDispatch();
  const history = useHistory();

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '15%',
    },
    {
      title: 'Api Token',
      dataIndex: 'token',
      key: 'token',
      width: '15%',
    },
    {
      title: 'Action',
      dataIndex: 'operation',
      width: '20%',
      render: (_, record) => {
        return (
          <span>
            <Popconfirm
              title="Sure to Revoke?"
              onConfirm={() =>
                dispatch(deleteApplicationToken(record.id, data.id)).then(() => history.go(0))
              }
            >
              <Link to="" className="ant-dropdown-link">
                <Button type="danger">Revoke</Button>
              </Link>
            </Popconfirm>
          </span>
        );
      },
    },
  ];

  return (
    <>
      <Table
        bordered
        columns={columns}
        dataSource={data && data.tokens ? data.tokens : []}
        rowKey={'id'}
        pagination={false}
      />

      <Button style={{ marginTop: 5 }} onClick={() => setVisible(true)}>
        {<PlusOutlined />}New api key
      </Button>

      <Modal
        visible={visible}
        title="Create New API Token"
        onOk={() => setVisible(false)}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <CreateTokenForm
          appID={data && data.id ? data.id : null}
          setVisible={setVisible}
          setTokenFlag={setTokenFlag}
        />
      </Modal>
    </>
  );
};

export default ApplicationDetail;
