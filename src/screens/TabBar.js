/* 
const Admin = createStackNavigator(
    { Admin: {
    screen: AdminScreen,
    navigationOptions: {
      headerTitle: <CustomHeaderTitle screen='admin' />
        }
      }
    });
  
   const Family = createStackNavigator(
    {
     Family: {
        screen: FamilyScreen,
        navigationOptions: {
        headerLeft: null,
        headerTitle: <CustomHeaderTitle screen='family' />
        }
       }
      }
  );
  
  const ChatStack = createStackNavigator({
    CreateChat: CreateChatScreen
  });
  
  const TabStack = createBottomTabNavigator(
    {
      School: School,
      Admin: Admin,
      Family: Family
    },
    {
  navigationOptions: ({ navigation }) => ({
  
    tabBarIcon: () => {
      const { routeName } = navigation.state;
      return <Image id={1} source={require('./app/img/school_logo.png')} />
    },
    tabBarLabel: navigation.state.routeName
  }),
  tabBarOptions: {
    activeTintColor: 'tomato',
    inactiveTintColor: 'gray',
    style: {
      backgroundColor: 'black',
      height: 55
    }
  }
  
    }
  );
  
  const RootStack = createStackNavigator({
    Root: ChatStack,
    Tabs: TabStack
  })
  
  export default class App extends Component {
    render() { return (
        <Provider store={store}>
          <RootStack />
        </Provider>
      );
    }
  }
   */
