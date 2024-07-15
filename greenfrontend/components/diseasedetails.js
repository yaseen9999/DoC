import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image , ScrollView} from 'react-native';

const Diseasedetails = ({ route }) => {
  const { response } = route.params;
  const [displayType, setDisplayType] = useState('name'); // Default to showing name

  return (
    <View>
      <View>
      <Text style={styles.text1}>{response.name}</Text>
        
      </View>
      <View>
      <Text style={styles.image}>{response.image}</Text>
        
      </View>
      <View style={styles.column}>
        
        <TouchableOpacity style={styles.button} onPress={() => setDisplayType('description')}>
          <Text style={styles.buttonText}>Description</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setDisplayType('medication')}>
          <Text style={styles.buttonText}>Medication</Text>
        </TouchableOpacity>
      </View>
      
      {/* Show content based on displayType */}
      <View style={styles.contents}>
        {displayType === 'name' && <Text style={styles.text}>{response.name}</Text>}
        {displayType === 'description' && <Text style={styles.text}>{response.description}</Text>}
        {displayType === 'medication' && <Text style={styles.text}>{response.medication}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  column: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft:40,
    gap:20,
  },
  button: {
    borderRadius: 25,
    padding: 5,
    alignItems: 'center',
    justifyContent: 'center',
   
    width: '38%',
    backgroundColor: '#28B581',
    marginBottom: 20,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  text: {
    fontSize: 15,
    marginTop: 10,
    color: 'black',

  },
  text1: {
    fontSize: 25,
    marginTop: 45,
   
    color: 'black',
    marginBottom: 20,
    marginTop:60,
    marginLeft:70,
  },
  image: {
    width: 120,
    height: 160,
    marginBottom: 20,
  },
  contents:{
    justifyContent:'center',
    marginLeft:20,
    marginRight:20,
  }
});

export default Diseasedetails;
