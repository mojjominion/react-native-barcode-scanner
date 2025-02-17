import * as React from 'react';
import { StyleSheet, View, Text, Button } from 'react-native';
import { BroadcastReceiver } from 'react-native-broadcast-receiver';

export default function App() {
  const [scanned, setScanned] = React.useState<string[]>(['']);

  React.useEffect(() => {
    const sub = BroadcastReceiver.addEventListner(d => {
      setScanned(x => [...x, JSON.stringify(d.data)]);
    });
    return () => sub.remove();
  }, []);

  return (
    <View style={styles.container}>
      {scanned.map((t, i) => (
        <Text key={i}>Scanned: {t}</Text>
      ))}
      <Button
        title="Send code"
        onPress={() => {
          BroadcastReceiver.sendEvent('code');
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: 60,
    height: 60,
    marginVertical: 20,
  },
});
