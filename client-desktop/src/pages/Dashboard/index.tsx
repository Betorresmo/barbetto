import React from 'react';
import { FiUser, FiPower, FiClock } from 'react-icons/fi';

import { Container, Header, Content } from './styles';

import logoImg from '../../assets/logo.svg';
import contentImg from '../../assets/tempDashboardImg.svg';

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Header>
        <FiUser size={35} />
        <img src={logoImg} />
        <FiPower size={35} />
      </Header>
      <Content>
        <img src={contentImg} alt="" />
      </Content>
    </Container>
  );
};

export default Dashboard;
