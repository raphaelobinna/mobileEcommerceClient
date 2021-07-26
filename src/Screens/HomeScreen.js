import React, {useEffect} from 'react';
import { FlatList } from 'react-native';
import { Box, Text } from 'react-native-design-utility'
import CategoryCard from '../commons/CategoryCard';

const logger = async({navigation}) => {
    console.log('running')
     const logger = await AsyncStorage.getItem('@Logged_in')
    console.log('logger', logger)
    if(logger === 'false') navigation.navigate('Auth')
  }
  logger()

const categories = [
    {
        id: 1,
        title: 'Grocery',
        image: require('../../assets/img/cart.png')
    },
    {
        id: 2,
        title: 'Drugs',
        image: require('../../assets/img/drugs.png')
    },
    {
        id: 3,
        title: 'Pets',
        image: require('../../assets/img/pets.png')
    },
    {
        id: 4,
        title: 'Video Games',
    }
]

export const HomeScreen = () => {

    const renderItem = ({item}) => <CategoryCard {...item} />

    const keyExtractor = (item) => String(item.id)

    const separator = () => <Box h={2} bg="#F5F5F5" />

    return (
        <Box f={1} >
            <Box h={140} bg="red" w='100%' >

            </Box>
            <Box f={1} >
                <FlatList 
                    data={categories}
                    renderItem={renderItem}
                    keyExtractor={keyExtractor}
                    numColumns={3}
                    ItemSeparatorComponent={separator}
                />
            </Box>
        </Box>
    )
}