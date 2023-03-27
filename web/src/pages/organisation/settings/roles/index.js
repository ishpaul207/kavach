import React from 'react';
import { Skeleton, Space, Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getOrganisation } from '../../../../actions/organisations';
import OrganisationRoleList from './components/RoleList';

function OrganisationRoles() {
  const { orgID } = useParams();
  const dispatch = useDispatch();
  React.useEffect(() => {
    dispatch(getOrganisation(orgID));
  }, [orgID, dispatch]);

  const { loadingOrg, role, loading } = useSelector((state) => {
    return {
      loadingOrg: state.organisations.loading,
      role: state.profile.roles[state.organisations.selected],
      loading: state.profile.loading,
    };
  });

  return (
    <Space direction="vertical">
      {loading && loadingOrg ? (
        <Skeleton />
      ) : (
        <>
          <div className="organisation-descriptions-header">
            <div className="organisation-descriptions-title">
              <h2 className="organisation-title-main">Roles</h2>
            </div>
            {role === 'owner' ? (
              <div style={{ display: 'flex', justifyContent: 'end' }}>
                <Link
                  key="2"
                  to={{
                    pathname: `/organisation/${orgID}/settings/roles/create`,
                  }}
                >
                  <Button type="primary">Create New Role</Button>
                </Link>
              </div>
            ) : null}
          </div>
          <OrganisationRoleList orgID={orgID} role={role} />
        </>
      )}
    </Space>
  );
}

export default OrganisationRoles;
