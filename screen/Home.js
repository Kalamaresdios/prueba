import React from 'react'
import {useNavigation} from '@react-navigation/native'
import NetInfo from "@react-native-community/netinfo"

import DetalleItem from './DetalleItem'
import {
  Text, View , NativeModules, Image,TouchableOpacity,
  Dimensions,FlatList,SafeAreaView,
  AsyncStorage
   } from 'react-native';

const {CustomNative}=NativeModules;

export default function Home({navigation}){

  const [libros,setLibros]=React.useState([]);
  const [isConnect, setConnect] = React.useState(false);

  React.useEffect(() =>{
    
    async function conexion() {
      await NetInfo.fetch().then(state => {
      setConnect(state.isConnected)
      //console.log(isConnect)
      });
      if(!isConnect){
      await NetInfo.fetch().then(state => {
      setConnect(state.isConnected)
      //console.log(isConnect)
      });
      }
    }

    async function recuperarAPI() {
      console.log('ONLINE')

        fetch('https://fakerapi.it/api/v1/books?_quantity=2')
        .then((res) => res.json())
        .then(
          function(json){
          setLibros(json.data)
          }
        ).catch((error) => console.error(error))
        //console.log(libros);
        //console.log('guardarASYNCSTORAGE')
        //console.log(JSON.stringify(libros));

        if(libros.lenght>0){
          await AsyncStorage.setItem('cache',JSON.stringify(libros))}
    }

    async function recuperarASYNCSTORAGE(){
      try {
        console.log('OFFLINE');
        
        let libroscache= await AsyncStorage.getItem('cache')
        //console.log(JSON.parse(libroscache));

        setLibros(JSON.parse(libroscache))
      } catch (error){}
    }

    conexion()
    if(isConnect){
      recuperarAPI()
    }else{
      recuperarASYNCSTORAGE()
      }
  },[]);

  function Modulo (){
   
    const [suma,setSuma]=React.useState('');

    React.useEffect(() => {
      CustomNative.Sumar((data) => {
      setSuma(data)
     })
    },[]);

    return (
    <View>
      <Text style={{
       fontSize: 30,
       backgroundColor: 'white',
      }}> 2+2= {suma}</Text>
    </View>
    );
  }
  
  function Lista () {
    
    const win = Dimensions.get('window')
 
    return (
            <FlatList
                data={libros}
                keyExtractor={item => `${item.title}`}
                vertical
                showsVerticalScrollIndicator={false}
                renderItem={ ({item}) => (
        <TouchableOpacity 
          onPress= {() => navigation.navigate(
                      'Detalle', {libro: { item }})}
          style={{borderColor: 'blue', borderWidth: 4,borderRadius: 4}}>

          <Text key={item.title} style={{
            fontSize: 20,
        }}> {item.title}
          </Text>
        
          <Text key={item.author} style={{
            fontSize: 16,
        }}> {item.author}
          </Text>

        <Image
          style={{
           width: win.width,height: 300}}
          source={{uri: item.image}}
        />

        </TouchableOpacity>
                )}
              />
  )}

  return (
      <SafeAreaView style={{flex: 1}}>
        {Modulo()}
        {Lista()}
      </SafeAreaView>
  );
}