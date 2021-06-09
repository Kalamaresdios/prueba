import { View,Text,Image,Dimensions} from 'react-native';
import React from "react";

export default function DetalleItem ({ route }){

   //const [libro, setLibro] = React.useState('')
   const infolibro=route.params.libro.item

   const win = Dimensions.get('window');
  return (

 <View>
    <Image 
        style={{
         width: win.width,height: 300}}
        source={{uri: infolibro.image}}
      />

 <View style={{flexDirection: 'row'}}>
    <Text style={{
       fontSize: 30,
       backgroundColor: 'white',
      }}> {infolibro.title}
    </Text>
      
    <Text style={{
       fontSize: 20,

       backgroundColor: 'white',
      }}> {infolibro.published}
    </Text>
 </View>
 
    <Text style={{
       fontSize: 20,
       backgroundColor: 'white',
      }}> De: {infolibro.author}
    </Text>

    <Text style={{
       fontSize: 20,paddingTop:10,
       backgroundColor: 'white',
      }}> Género: {infolibro.genre}
    </Text>

    <Text style={{
       fontSize: 20,paddingTop:2,
       backgroundColor: 'white',
      }}> {infolibro.description}
    </Text>

   </View>
);}