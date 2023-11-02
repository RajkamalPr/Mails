import { useEffect, useState } from "react"
import { Text, View } from "react-native"
import { token, url } from "../const";

const MailBox = ({ mailType }: any) => {
    const [loading, setLoading] = useState(true);
    const [boxData, setBoxData] = useState<any>({})

    useEffect(() => {
        console.log('MailType ', mailType)
        if (mailType) {
            fetch(`${url}/mail/${mailType}/all?limit=100&offset=0`, {
                method: 'GET',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
                .then(res => res.json())
                .then((json) => {
                    setBoxData(json);
                })
                .catch((error) => {
                    console.error('Error fetching data:', error);
                });
        }
    }, [mailType])

    useEffect(() => {
        console.log('Boxdata ', boxData)
        if (boxData && Object.keys(boxData).length > 0) {
            setLoading(false);
        }
    }, [boxData])

    return (
        <View>
            {!loading ? (
                <View style={{ display: 'flex', margin: 20 }}>
                    <Text style={{ fontWeight: 'bold' }}>Name: {boxData.box.name}</Text>
                    <View>
                        <Text style={{ fontWeight: 'bold' }}>Total: {boxData.box.messages.total}</Text>
                        <Text style={{ fontWeight: 'bold' }}>New Message: {boxData.box.messages.new}</Text>
                    </View>
                </View>
            ) : (
                <View>
                    <Text>Name: Loading...</Text>
                    <View>
                        <Text>Message: Loading...</Text>
                        <View>
                            <Text>Total: Loading...</Text>
                            <Text>New Message: Loading...</Text>
                        </View>
                    </View>
                </View>
            )}
        </View>
    )
}

export default MailBox
