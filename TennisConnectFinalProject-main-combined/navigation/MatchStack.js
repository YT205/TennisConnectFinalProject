import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Match from "./Match";
import User from "./User";
import Sort from "./MatchFilter"

const screens = {
    Players: {
        screen: Match
    },
    Details: {
        screen: User
    }
    ,
    Filter: {
        screen : Sort
    }
}

const MatchStack = createStackNavigator(screens);

export default createAppContainer(MatchStack);