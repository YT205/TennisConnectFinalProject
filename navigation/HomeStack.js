import { createStackNavigator } from "react-navigation-stack"
import { createAppContainer } from "react-navigation";
import Home from "./Home"
import editAccount from "./editAccount"


const screens = {
    Account: {
        screen: Home
    },
    Edit: {
        screen: editAccount
    }
}

const HomeStack = createStackNavigator(screens);

export default createAppContainer(HomeStack);