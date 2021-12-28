import React from 'react';
import { Table, Skeleton, Button, Space } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { acceptInvitation, deleteInvitation, getInvitation } from '../../actions/profile';
import ErrorComponent from '../../components/ErrorsAndImage/ErrorComponent';
function InvitationComponent() {
  const dispatch = useDispatch();
  const { invitations, loading } = useSelector((state) => {
    return {
      invitations: state.profile.invitations.map((invitation) => ({
        id: invitation.id,
        orgID: invitation.organisation.id,
        organisation: invitation.organisation.title,
        role: invitation.role,
        inviterID: invitation.invited_by.id,
        invited_by: invitation.invited_by.email,
      })),
      loading: state.profile.loading,
    };
  });

  const onAccept = (value) => {
    const data = {
      organisation_id: value.orgID,
      inviter_id: value.inviterID,
      role: value.role,
    };
    dispatch(acceptInvitation(value.id, data)).then(() => getInvitation());
  };

  const onDecline = (id) => {
    dispatch(deleteInvitation(id)).then(() => getInvitation());
  };

  const columns = [
    {
      title: 'Organisation',
      dataIndex: 'organisation',
      key: 'organisation',
    },
    {
      title: 'Invited by',
      dataIndex: 'invited_by',
      key: 'invited_by',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: '25%',
      render: (text, record) => {
        return (
          <Space>
            <Button
              style={{ backgroundColor: '#6cc644', color: 'white', borderColor: '#6cc644' }}
              onClick={() => onAccept(record)}
            >
              Accept
            </Button>
            <Button type="primary" onClick={() => onDecline(record.id)} danger>
              Decline
            </Button>
          </Space>
        );
      },
    },
  ];

  return loading ? (
    <Skeleton />
  ) : invitations.length > 0 ? (
    <Table columns={columns} dataSource={invitations} pagination={false} bordered={true} he></Table>
  ) : (
    <ErrorComponent title="You have 0 invitations" link="/organisation" message="Go Home" />
  );
}

export default InvitationComponent;
