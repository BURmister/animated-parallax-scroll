import { useRef } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Animated, useWindowDimensions, useColorScheme, FlatList, Image, ImageBackground } from 'react-native';


const images = [
   'https://creativechair.org/wp-content/uploads/2019/06/Lawrence-Azerrad.-Featured.jpg',
   'https://i.pinimg.com/originals/d8/a8/04/d8a80491cf795daa2c210ec6c14cf77f.png',
   'https://m.media-amazon.com/images/I/91+NXqWcyJL._UF1000,1000_QL80_.jpg',
];

const description = [
   'Californication is the seventh studio album by the American rock band Red Hot Chili Peppers, released on June 8, 1999, on Warner Bros. Records. It was produced by Rick Rubin. Along with Blood Sugar Sex Magik, Californication is one of the band’s best selling albums.',
   "Californication marked the return of guitarist John Frusciante, who had previously appeared on Mother's Milk and Blood Sugar Sex Magik, and shifted the band's style. The lyrics incorporated the sexual innuendos already associated with the band, but added themes including death, suicide, California, drugs, globalization and travel.",
   `Californication is the Chili Peppers' most commercially successful studio release internationally, with over fifteen million copies sold worldwide, and more than six million in the United States alone. As of 2002, the album had sold over four million copies in Europe. The record produced several hits for the band, including "Otherside", "Californication" and the Grammy Award-winning "Scar Tissue". Californication peaked at number three on the US Billboard 200.`,
   `The record marked a significant change in style for the band: Rolling Stone's Greg Tate noted that "while all previous Chili Peppers projects have been highly spirited, Californication dares to be spiritual and epiphanic". Another critic, Billboard's Paul Verna, mentioned that the album brought out "the group's softer, melodic side", as opposed to their previous six albums.`,
];

export default function App() {
   const { height, width } = useWindowDimensions();
   const colorScheme = useColorScheme();

   const scrollY = useRef(new Animated.Value(0)).current;
   const barBackground = scrollY.interpolate({
      inputRange: [0, height],
      outputRange: ['#ffffff00', '#fff'],
      extrapolate: 'clamp',
   });

   return (
      <View style={[styles.container, { backgroundColor: colorScheme === 'light' ? '#fff' : '#1E293B' }]}>
         <Animated.ScrollView
            style={{ flex: 1 }}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollY } } }], { useNativeDriver: true })}
            // onScroll={(event) => console.log(event.nativeEvent.contentOffset.y)}
         >
            <View style={{ overflow: 'hidden', backgroundColor: colorScheme === 'light' ? '#b7becb33' : '#273754' }}>
               <Animated.View
                  style={{
                     height: height / 2,
                     width: width,
                     transform: [{ translateY: scrollY }],
                     opacity: scrollY.interpolate({
                        inputRange: [0, height],
                        outputRange: [1, 0],
                        extrapolate: 'clamp',
                     }),
                  }}
               >
                  <ImageBackground
                     source={{ uri: 'https://upload.wikimedia.org/wikipedia/commons/1/16/Rhcp-live-pinkpop05.jpg' }}
                     resizeMode="cover"
                     blurRadius={4}
                     style={{ flex: 1, justifyContent: 'center' }}
                  >
                     <FlatList
                        horizontal
                        data={images}
                        keyExtractor={(_, index) => index.toString()}
                        // snapToInterval={width}
                        contentContainerStyle={{ padding: 32 }}
                        showsHorizontalScrollIndicator={false}
                        bounces={false}
                        // pagingEnabled
                        scrollEventThrottle={32}
                        decelerationRate="fast"
                        ItemSeparatorComponent={() => {
                           return <View style={{ width: 32, height: '100%' }} />;
                        }}
                        renderItem={({ item }) => {
                           return (
                              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                 <Image
                                    style={{
                                       height: height / 4,
                                       width: width / 2,
                                       borderRadius: 10,
                                    }}
                                    source={{ uri: item }}
                                 />
                              </View>
                           );
                        }}
                     />
                  </ImageBackground>
               </Animated.View>
            </View>
            <View style={{ paddingVertical: 32, paddingHorizontal: 16 }}>
               <Text style={{ marginBottom: 32, fontSize: 24, fontWeight: '800', color: colorScheme === 'light' ? '#333' : '#fff' }}>
                  Red Hot Chili Peppers
               </Text>
               {description.map((item, index) => {
                  return (
                     <Text key={index} style={{ marginBottom: 16, lineHeight: 22, fontSize: 16, color: colorScheme === 'light' ? '#333' : '#fff' }}>
                        {item}
                     </Text>
                  );
               })}
            </View>
         </Animated.ScrollView>
         <StatusBar style="auto" />
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
   },
});
