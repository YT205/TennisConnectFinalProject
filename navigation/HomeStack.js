import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Home from "./Home";
import editAccount from "./editAccount";
import requests from "./Requests";
import friends from "./Friends";

const screens = {
    Account: {
        screen: Home
    },
    Edit: {
        screen: editAccount
    },
    Requests: {
        screen: requests
    },
    Friends: {
        screen: friends
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);