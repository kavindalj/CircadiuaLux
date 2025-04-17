import React, { useState } from 'react';
import { MdDashboard, MdPeople, MdSettings, MdLogout } from 'react-icons/md';

const CaretakerSidebar = () => {
  const [activeItem, setActiveItem] = useState('Dashboard');

  const navItems = [
    { label: 'Dashboard', icon: MdDashboard, link: '###########' },
    { label: 'Patients', icon: MdPeople, link: '###########' },
    { label: 'Settings', icon: MdSettings, link: '###########' },
  ];

  const handleNavClick = (label) => {
    setActiveItem(label);
  };

  return (
    <div style={styles.sidebar}>
      <ul style={styles.navList}>
        {navItems.map(({ label, icon: Icon, link }) => (
          <li key={label} style={styles.navItemWrapper}>
            <a
              href={link}
              onClick={() => handleNavClick(label)}
              style={{
                ...styles.navButton,
                color: activeItem === label ? '#34A8DD' : '#757575',
              }}
              onMouseEnter={(e) => {
                if (activeItem !== label) e.currentTarget.style.color = '#555';
              }}
              onMouseLeave={(e) => {
                if (activeItem !== label) e.currentTarget.style.color = '#757575';
              }}
            >
              <Icon style={styles.navIcon} />
              <span>{label}</span>
            </a>
          </li>
        ))}
      </ul>

      <div style={styles.logoutContainer}>
        <a
          href="###########"
          style={styles.logoutButton}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#c82333';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#dc3545';
          }}
        >
          <MdLogout style={styles.navIcon} />
          <span>Log Out</span>
        </a>
      </div>
    </div>
  );
};

const styles = {
  sidebar: {
    width: '200px',
    backgroundColor: '#f7f7f7',
    padding: '20px 0',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '92vh',
    boxShadow: '1px 0 5px rgba(0, 0, 0, 0.1)',
    borderRight: '1px solid #34A8DD',
  },
  navList: {
    listStyle: 'none',
    padding: '34px 0px 0px 0px',
    margin: 0,
    width: '100%',
  },
  navItemWrapper: {
    width: '100%',

    display: 'flex',
    justifyContent: 'center',
  },
  navButton: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    fontSize: '15px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    gap: '10px',
    padding: '10px 20px 10px 40px', // Dashboard icon and text padding
    width: '100%',
    justifyContent: 'flex-start',
  },
  navIcon: {
    fontSize: '18px',
  },
  logoutContainer: {
    padding: '20px',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    fontWeight: 'bold',
    color: '#dc3545',
    fontSize: '15px',
    textDecoration: 'none',
    gap: '10px',
    cursor: 'pointer',
    transition: 'color 0.2s ease',
    padding: '25px 25px',
    width: '100%',
    justifyContent: 'flex-start',
  },
};

export default CaretakerSidebar;
