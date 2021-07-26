import * as React from 'react';

export const navigationRef = React.createRef();

import { NavigationActions } from 'react-navigation'


// let navigationRef.current?;

// function setTopLevelNavigator(ref) {
//     navigationRef.current? = ref
// }

function navigate(routeName, params) {
    navigationRef.current?.dispatch(
        NavigationActions.navigate({
            routeName,
            params
        })
    )
}

function back() {
    navigationRef.current?.dispatch(NavigationActions.back())
}

function popToTop(immediate = true) {
    navigationRef.current?.dispatch({
        type: NavigationActions.POP_TO_TOP,
        immediate
    })
}

function reset({actions, index}) {
    navigationRef.current?.dispatch({
        type: NavigationActions.RESET,
        index,
        actions
    })
}

export const NavigationService = {
    navigate,
    //setTopLevelNavigator,
    back,
    popToTop,
    reset,
    //navigator: navigationRef.current?
}

//window.NavigationService = NavigationService