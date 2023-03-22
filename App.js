import React, { useState } from 'react';
import {View, Text, TextInput, Button} from 'react-native';
import auth from '@react-native-firebase/auth';

export const App = () => {
  const [ phoneNumber, setPhoneNumber ] = useState('');
  const [ authCode, setAuthCode ] = useState('');
  const [ confirm, setConfirm ] = useState('');
  const [ uid, setUid ] = useState('');
  const [ userPhoneNumber, setUserPhoneNumber ] = useState('');

  const signInWithPhoneNumber = async() => {
    const confirmation = await auth().signInWithPhoneNumber('+82' + phoneNumber.slice(1));
    setConfirm(confirmation)
  };

  const confirmCode = async() => {
    const data = await confirm.confirm(authCode);
    console.log('[data]', data);
    
    setUid(data.user.uid);
    setUserPhoneNumber(data.user.phoneNumber);
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      }}
    >
      {/* 핸드폰 번호 입력 */}
      <View
        style={{
          flexDirection: 'row',
          marginBottom: 5,
        }}
      >
        <TextInput
          placeholder='핸드폰번호 입력'
          maxLength={11}
          value={phoneNumber}
          onChangeText={text => setPhoneNumber(text)}
        />
        <Button 
          title="전송"
          onPress={signInWithPhoneNumber}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
        }}
      >
        <TextInput
          placeholder='인증번호 입력'
          maxLength={11}
          value={authCode}
          onChangeText={text => setAuthCode(text)}
        />
        <Button 
          title="확인"
          onPress={confirmCode}
        />
      </View>

      <View>
        {uid ?
          <Text>{uid}</Text>
        : null
        }
        {userPhoneNumber ?
          <Text>{userPhoneNumber}</Text>
        : null
        }
      </View>
    </View>
  )
}