import React from 'react';
import { View, Text } from 'react-native';

import { useAuth } from '../../hooks/auth';

import Button from '../../components/Button';

const Dashboard: React.FC = () => {
  const { signOut } = useAuth();

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#202020',
        padding: 40,
      }}
    >
      <Text
        style={{
          fontFamily: 'NunitoSans-SemiBold',
          color: '#ececec',
          fontSize: 20,
          padding: 20,
        }}
      >
        Dashboard
      </Text>
      <Button onPress={signOut}>sign out</Button>
    </View>
  );
};

export default Dashboard;
