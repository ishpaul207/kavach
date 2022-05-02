import React from 'react';
import { Descriptions, Tag, Table, Skeleton } from 'antd';
import { useParams } from 'react-router-dom';
import { getOrganisationPolicyByID } from '../../../../../actions/policy';
import { useSelector } from 'react-redux';

export default function ViewOrganisationPolicy() {
  const { policyID, orgID } = useParams();
  const span = 2;
  const nestedTableColumns = [
    {
      title: 'Resource',
      dataIndex: 'resource',
      key: 'resource',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => {
        return record.actions.map((action) => {
          return (
            <Tag key={action} color="blue">
              {action}
            </Tag>
          );
        });
      },
    },
  ];

  const { policy, loading } = useSelector((state) => {
    return {
      policy: {
        ...state.policy.organisation[orgID][policyID],
        roles:
          state.policy.organisation[orgID][policyID]?.roles.map((rId) => ({
            ...state.roles.organisation[orgID]?.[rId],
          })) || [],
      },
      loading: state.policy.loading,
    };
  });

  const fetchPolicy = () => {
    getOrganisationPolicyByID(policyID);
  };

  React.useEffect(() => {
    fetchPolicy();
    //eslint-disable-next-line
  }, []);

  return (
    <div>
      {loading ? (
        <Skeleton />
      ) : (
        <Descriptions title={`Policy detail`} bordered>
          <Descriptions.Item label="Name" span={span}>
            {policy?.name}
          </Descriptions.Item>
          <br />
          <Descriptions.Item label="Description" span={span}>
            {policy?.description}
          </Descriptions.Item>
          <br />
          <Descriptions.Item label="Permissions" span={span}>
            <Table
              bordered={false}
              columns={nestedTableColumns}
              dataSource={policy?.permissions}
              rowKey={'id'}
              pagination={false}
            />
          </Descriptions.Item>
          <br />
          <Descriptions.Item label="Roles" span={span}>
            {policy?.roles.map((role) => {
              return (
                <Tag key={role.id} color="blue">
                  {role?.name}
                </Tag>
              );
            })}
          </Descriptions.Item>
        </Descriptions>
      )}
    </div>
  );
}
