import React from 'react';
import { useSelector } from 'react-redux';
import { Layout, Divider, Button, Popover, List, Avatar } from 'antd';
import { AppstoreOutlined } from '@ant-design/icons';
import AccountMenu from './AccountMenu';
import OrganisationSelector from './OrganisationSelector';
import { Link } from 'react-router-dom';

function Header() {
  const apps = useSelector((state) =>
    state.organisations.selected > 0
      ? state.organisations.details[state.organisations.selected].applications || []
      : [],
  );
  return (
    <Layout.Header className="layout-header">
      <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
        <Divider type="vertical" />
        <Link to="/organisation">
          <Button>New Organisation</Button>
        </Link>
        <OrganisationSelector />
        {apps.length > 0 ? (
          <>
            <Divider type="vertical" />
            <Popover
              placement="bottom"
              content={
                <List
                  grid={{
                    gutter: 16,
                    xs: 1,
                    sm: 2,
                    md: 4,
                    lg: 4,
                    xl: 6,
                    xxl: 3,
                  }}
                  dataSource={apps}
                  renderItem={(item) => (
                    <List.Item>
                      <a href={item.url} style={{ textDecoration: 'none', color: 'inherit' }}>
                        {item.medium && item.medium.url ? (
                          <img alt="logo" className="menu-logo" src={item.medium.url.proxy} />
                        ) : (
                          <Avatar shape="square" size={35}>
                            {item.name.charAt(0)}
                          </Avatar>
                        )}
                        <p>{item.name}</p>
                      </a>
                    </List.Item>
                  )}
                />
              }
              trigger="click"
            >
              <AppstoreOutlined />
            </Popover>
          </>
        ) : null}
        <Divider type="vertical" />
        <AccountMenu style={{ float: 'right' }} />
      </div>
    </Layout.Header>
  );
}

export default Header;
