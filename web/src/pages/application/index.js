import React from 'react';
import ApplicationList from './components/ApplicationList';
import { Button, Skeleton } from 'antd';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getApplications } from '../../actions/application';
import ErrorComponent from '../../components/ErrorsAndImage/ErrorComponent';
function Application() {
  const dispatch = useDispatch();
  React.useEffect(() => {
    fetchApplications();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const fetchApplications = () => {
    dispatch(getApplications());
  };

  const { applicationData, loadingApps, role, loadingRole, orgID } = useSelector((state) => {
    const applicationIds = state.organisations.details[state.organisations.selected]?.applications;
    return {
      applicationData: applicationIds.map((id) => state.applications.details[id]),
      loadingApps: state.applications.loading,
      role: state.profile.roles[state.organisations.selected],
      loadingRole: state.profile.loading,
      orgID: state.organisations.selected
    };
  });

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        {loadingRole ? (
          <Skeleton />
        ) : role === 'owner' && orgID!==1 ? (
          loadingApps ? (
            <Skeleton />
          ) : 
            <Link key="1" to="/applications/type">
              <Button type="primary">New Application</Button>
            </Link>
          )
         : null}
      </div>
      {loadingApps ? (
        <Skeleton />
      ) : applicationData.length ? (
        <ApplicationList
          applicationList={applicationData}
          permission={loadingRole ? false : role === 'owner'}
          loading={loadingApps}
        />
      ) : (
        <ErrorComponent title="You have 0 applications" link="/organisation" message="Go Home" />
      )}
    </div>
  );
}

export default Application;
