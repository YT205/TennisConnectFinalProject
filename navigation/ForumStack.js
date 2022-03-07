import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Forum from "./Forum";
import Answer from "./Answer";

const screens = {
    Questions: {
        screen: Forum
    },
    Answer: {
        screen: Answer
    }
}

const ForumStack = createStackNavigator(screens);

export default createAppContainer(ForumStack);