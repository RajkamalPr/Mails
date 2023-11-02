import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { token, url } from '../const';
import MailBox from './mailBox';

const MailBoxes = () => {
    const [boxName, setBoxName] = useState('');
    const [mailBox, setMailboxs] = useState<any>(null);

    const mailBoxes = () => {
        fetch(`${url}/mail/boxes`, {
            method: 'GET',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((json) => {
                setMailboxs(json);
            })
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        mailBoxes();
    }, []);

    const handleMailboxClick = (name: string) => {
        setBoxName(name);
    };

    return (
        <>
            <MailBox mailType={boxName} />
            <Text style={{ margin: 14, fontWeight: 'bold', fontSize: 20 }}>All Mail Boxes</Text>
            <View>
                {mailBox && Object.keys(mailBox).map((item: string, index: number) => (
                    <TouchableOpacity
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            height: 50,
                            backgroundColor: '#E6E6FA',
                            margin: 4,
                        }}
                        key={`${item} ${index}`}
                        onPress={() => handleMailboxClick(item)}
                    >
                        <Text style={{ marginLeft: 14 }}>{item}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </>
    );
};

export default MailBoxes;
