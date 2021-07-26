import { PropTypes } from 'mobx-react';
import React from 'react';

import {View, Image} from 'react-native'
import { Box, Text } from 'react-native-design-utility';

export default function CategoryCard (props){

    return(

        <Box w={1/3} bg="white" h={120} center>
           {props.image && ( 
                <Box center mb="sm" >
                <Image source={props.image } />
            </Box>
           )}
            <Box center >
            <Text size="sm" center capitalizeEach color="greyDarker">{props.title}</Text>
            </Box>
        </Box> 

    )

}