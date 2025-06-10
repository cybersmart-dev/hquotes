import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';

export default function App() {
    
    const message = (obj) => {
        ToastAndroid.show(obj, ToastAndroid.LONG)
    }
  return (
    <View style={styles.container}>
    
       <Text style={{ fontSize: 20, marginBottom: 40,}}>Login your account</Text>
       <TextInput style={styles.input} placeholder="Enter your name" />
       <TextInput style={[styles.input, { marginTop: 20,}]} placeholder="Enter your password" />
       
       <TouchableOpacity onPress={() => message("Submiting..")} style={styles.button}>
          <Text style={{ color: 'white',}}>Submit</Text>
       </TouchableOpacity>
       
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input:{
    height: 50,
    width: 300,
    paddingHorizontal: 15,
    borderRadius: 12,
    borderColor: 'black',
    borderWidth: 2,
  },
  button:{
    backgroundColor: 'dodgerblue',
    marginTop: 20,
    width: 300,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    
  }
});
