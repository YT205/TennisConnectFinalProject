import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Match from "./Match";
import User from "./User";

const screens = {
    Players: {
        screen: Match
    },
    Details: {
        screen: User
    }
}

const MatchStack = createStackNavigator(screens);

export default createAppContainer(MatchStack);