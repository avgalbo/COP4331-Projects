import React, { Component, useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import bp from '../Path.js';
import AsyncStorage from '@react-native-async-storage/async-storage';

//HomeScreen for Employee
function HomeScreen({ navigation }) {
  //Variables
  const [Name, setName] = useState("");
  const [message, setMessage] = useState(null);
  const url = bp.buildPath("api/account");

  //UserInfo
  useEffect(() => {
    async function getUserData() {
      var Token = (await AsyncStorage.getItem('token_data')).toString();
      try {
        const response = await fetch(url, { method: 'get', headers: { "Content-Type": "application/json", "authorization": Token } });
        var ud = JSON.parse(await response.text());
        if (ud.err_code) {
          setMessage(ud.description + Token);
        } else {
          var name = ud.first_name + ' ' + ud.last_name;
          //Getting info needed for this page
          setName(name);
        }

      } catch (e) {
        setMessage(' ' + e.message);
      }
    }
    //Calls Async Function
    getUserData();
  });


  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
      // source={require("../images/testphoto.jpg")}
      >
        {/* Navigation Bar */}
        <View style={styles.topbar}>
          <TouchableOpacity
            color="black"
            style={styles.DrawerButton}
            onPress={() => navigation.openDrawer()}
          >
            <Feather name="align-justify" size={50} color="white" />
          </TouchableOpacity>
          <Text style={styles.topbartext}> Home</Text>
        </View>
        {/*Break*/}
        <Text>{"\n"}</Text>
        {/* CheckIn */}
        <View style={styles.active}>
          <Text style={styles.activetext}>{Name}   </Text>
          <Text style={styles.activetext}>You're logged in! Let's get to work.</Text>
        </View>
        <Text style={styles.activetext}>{message}</Text>
      </ImageBackground>
    </View>
  );
}

//Profile Screen
function ProfileScreen({ navigation }) {
  const [message, setMessage] = useState(null);
  const [FirstName, setFName] = useState(null);
  const [LastName, setLName] = useState(null);
  const [PhoneNumber, setPNumber] = useState(null);
  const [Email, setEmail] = useState(null);
  const [UserName, setUName] = useState(null);
  const [Password, setPass] = useState(null);
  //Getting user Info
  const urlA = bp.buildPath("api/account");

  useEffect(() => {
    async function getUserData() {
      var Token = (await AsyncStorage.getItem('token_data')).toString();
      const response = await fetch(urlA, { method: 'get', headers: { "Content-Type": "application/json", "authorization": Token } });
      //Get user info everytime we lode the page
      try {

        var ud = JSON.parse(await response.text());

        //Getting info needed for this page
        setFName(ud.first_name);
        setLName(ud.last_name);
        setPNumber(ud.phone);
        setEmail(ud.email);
        setUName(ud.username);
        setPass("*******");
      } catch (e) {
        setMessage(' ' + e.message);
      }
    }
    getUserData();
  }, []);

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
      // source={require("../images/testphoto.jpg")}
      >
        {/* Navigation Bar */}
        <View style={styles.topbar}>
          <TouchableOpacity
            color="black"
            style={styles.DrawerButton}
            onPress={() => navigation.openDrawer()}
          >
            <Feather name="align-justify" size={50} color="white" />
          </TouchableOpacity>
          <Text style={styles.topbartext}> Profile</Text>
        </View>
        {/*Break*/}
        <Text>{"\n"}</Text>
        <Text style={styles.ProfileInfo}>{message}</Text>
        <View style={styles.Profile}>
          <Feather name='user' size={60} color="orange" />
          <Text style={styles.ProfileInfo}>FirstName: {FirstName}</Text>
          <Text style={styles.ProfileInfo}>LastName: {LastName}</Text>
          <Text style={styles.ProfileInfo}>PhoneNumber: {PhoneNumber}</Text>
          <Text style={styles.ProfileInfo}>Email: {Email}</Text>
          <Text style={styles.ProfileInfo}>UserName: {UserName}</Text>
          <Text style={styles.ProfileInfo}>Password: {Password}</Text>
        </View>
      </ImageBackground>
    </View >
  );
}

//Task Screen
function TaskScreen({ navigation }) {
  const [UC, setUC] = useState([]);
  const [C, setC] = useState([]);
  var ItemsArray = [];
  let ItemsDB = {};
  const [message, setMessage] = useState(null);
  const [messageUC, setMessageUC] = useState(null);
  const [messageC, setMessageC] = useState(null);
  var check = 0;

  //Combined UseEffect
  useEffect(() => {
    //#1
    async function getInv() {
      var Token = (await AsyncStorage.getItem('token_data')).toString();
      const response = await fetch(urlI, { method: 'get', headers: { "Content-Type": "application/json", "authorization": Token } });
      try {
        var ud = JSON.parse(await response.text());
        for (var i = 0; i < ud.length; i++) {
          ItemsArray[i] = ud[i].name + '#' + ud[i].description + '#' + ud[i].img + '#' + ud[i].item_id;
          ItemsDB[ud[i].item_id.toString()] = {
            "name": ud[i].name,
            "desc": ud[i].description,
            "img": ud[i].img
          }
        }
      } catch (e) {
        setMessage(' ' + e.message);
      }
    }
    getInv();

    //#2
    async function getUC() {
      var Token = (await AsyncStorage.getItem('token_data')).toString();
      const response = await fetch(urlU, { method: 'get', headers: { "Content-Type": "application/json", "authorization": Token } });
      try {
        var ud = JSON.parse(await response.text());
        if (ud.err_code) {
          setMessageUC(' ' + ud.description);
        }
        else {
          let itemObj;
          let itemID;
          for (var i = 0; i < ud.length; i++) {
            itemID = ud[i].item_id.toString();
            itemObj = ItemsDB[itemID];
            // Deleted item = is invalid.
            if (typeof itemObj === "undefined")
              continue;
            setUC(item => [...item, itemObj.name + '#' + ud[i].quantity + '#' + ud[i].room_id + '#' + ud[i].order_id]);
          }
        }
      } catch (e) {
        setMessageUC(' ' + e.message);
      }
    }
    getUC();

    //#3
    async function getC() {
      var Token = (await AsyncStorage.getItem('token_data')).toString();
      const response = await fetch(urlC, { method: 'get', headers: { "Content-Type": "application/json", "authorization": Token } });
      try {
        var ud = JSON.parse(await response.text());
        if (ud.err_code) {
          setMessageC(' ' + ud.description);
        }
        else {
          let itemObj;
          let itemID;
          for (var i = 0; i < ud.length; i++) {
            itemID = ud[i].item_id.toString();
            itemObj = ItemsDB[itemID];
            // Deleted item = is invalid.
            if (typeof itemObj === "undefined")
              continue;
            setC(item => [...item, itemObj.name + '#' + ud[i].quantity + '#' + ud[i].room_id + '#' + ud[i].order_id]);
          }
        }
      } catch (e) {
        setMessageC(' ' + e.message);
      }
    }
    getC();
  }, []);

  //INVENTORY
  const urlI = bp.buildPath("api/inventory");

  //UNCLAIMED ORDERS
  const urlU = bp.buildPath("api/orders/unclaimed");
  const UCOrderList = (props) => {

    const ClaimOrd = async event => {
      var Token = (await AsyncStorage.getItem('token_data')).toString();
      const urlCO = bp.buildPath("api/orders/claim/" + props.order);
      try {
        const response = await fetch(urlCO, { method: 'get', headers: { "Content-Type": "application/json", "authorization": Token } });
        var check = JSON.parse(await response.text());
        if (check.err_code) {
          setMessageUC(' ' + check.description);
        } else {
          setMessageUC('Ordered Claimed');
          setMessageC('Ordered Claimed');
          //Makes it look like it changing
          let Aray = [...UC];
          var index = Aray.indexOf(props.name + '#' + props.quantity + '#' + props.room + '#' + props.order);
          if (index > -1) {
            //Puts the item in to C
            setC(items => [...items, Aray[index]]);
            //Removes the item from UC
            Aray.splice(index, 1);
          }
          setUC(Aray);
        }
      } catch (e) {
        setMessageUC(' ' + e.message);
      }
    };

    return (
      <View style={styles.Tasks}>
        <View style={styles.separator}>
          <Text style={styles.taskinfo}>{" "}Room: {props.room}{" "}</Text>
          <Text style={styles.taskinfo}>{" "}Order: {props.quantity} {props.name}{" "}</Text>
          <TouchableOpacity
            color="black"
            style={styles.claimButton}
            onPress={ClaimOrd}
          >
            <Text>Claim</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  //TODO ORDERS
  const urlC = bp.buildPath("api/orders/my");
  const COrderList = (props) => {

    const MarkOrder = async event => {
      setMessageC('');
      var Token = (await AsyncStorage.getItem('token_data')).toString();
      const urlMO = bp.buildPath("api/orders/fulfill/" + props.order);
      try {
        const response = await fetch(urlMO, { method: 'delete', headers: { "Content-Type": "application/json", "authorization": Token } });
        var check = JSON.parse(await response.text());
        if (check.err_code) {
          setMessageC(' ' + check.description);
          if (check.err_code === 200) {
            //Makes it look like it changing
            let Aray = [...C];
            var index = Aray.indexOf(props.name + '#' + props.quantity + '#' + props.room + '#' + props.order);
            if (index > -1) {
              //Removes the item from C
              Aray.splice(index, 1);
            }
            setC(Aray);
          }
        }
      } catch (e) {
        setMessageC(' ' + e.message);
      }
    }

    return (
      <View style={styles.Tasks}>
        <View style={styles.separator}>
          <Text style={styles.taskinfo}>{" "}Room: {props.room}{" "}</Text>
          <Text style={styles.taskinfo}>{" "}Order: {props.quantity} {props.name}{" "}</Text>
          <TouchableOpacity
            color="black"
            style={styles.claimButton}
            onPress={MarkOrder}
          >
            <Text>Mark</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.backgroundImage}
      // source={require("../images/testphoto.jpg")}
      >
        {/* Navigation Bar */}
        <View style={styles.topbar}>
          <TouchableOpacity
            color="black"
            style={styles.DrawerButton}
            onPress={() => navigation.openDrawer()}
          >
            <Feather name="align-justify" size={50} color="white" />
          </TouchableOpacity>
          <Text style={styles.topbartext}> Orders</Text>
        </View>
        {/*Break*/}
        <Text>{"\n"}</Text>
        <Text style={{ color: 'red' }}>{message}</Text>
        {/*Break*/}
        <Text>{"\n"}</Text>
        {/* List of Tasks */}
        <View style={styles.listoftasks}>
          <Text style={styles.title}>UNCLAIMED ORDERS</Text>
          <Text style={{ color: 'red' }}>{messageUC}</Text>
          <ScrollView style={{ height: '45%' }}>
            {
              UC.map(itm =>
                <UCOrderList key={itm.split('#')[3]} name={itm.split('#')[0]} quantity={itm.split('#')[1]} room={itm.split('#')[2]} order={itm.split('#')[3]} />
              )
            }
          </ScrollView>
          <Text>{"\n"}</Text>
          <Text style={styles.title}>TODO ORDERS</Text>
          <Text style={{ color: 'red' }}>{messageC}</Text>
          <ScrollView style={{ height: '45%' }}>
            {
              C.map(itm =>
                <COrderList key={itm.split('#')[3]} name={itm.split('#')[0]} quantity={itm.split('#')[1]} room={itm.split('#')[2]} order={itm.split('#')[3]} />
              )
            }
          </ScrollView>
        </View>
        {/*Break*/}
        <Text>{"\n"}</Text>
      </ImageBackground>
    </View>
  );
}

//Drawer
const Drawer = createDrawerNavigator();

//Actual Screen
export default class EmployeeScreen extends Component {
  //Message
  constructor() {
    super();
    this.state = {
      message: " ",
    };
  }

  //Login Screen
  render() {
    return (
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerType="slide"
          drawerStyle={styles.Drawer}
          drawerContent={props => {
            return (
              <DrawerContentScrollView {...props}>
                <DrawerItemList {...props} />
                <DrawerItem label="Logout" onPress={this.handlerClick} />
              </DrawerContentScrollView>
            );
          }}
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Profile" component={ProfileScreen} />
          <Drawer.Screen name="Tasks" component={TaskScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    );
  }

  handlerClick = () => {
    try {
      this.props.navigation.navigate('Login');
    } catch (e) {
      this.setState({ message: e.message });
    }
  };
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    fontFamily: "-apple-system, BlinkMacSystemFont Segoe UI",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    backgroundColor: '#3D3D3D',
    opacity: 1,
  },
  Drawer: {
    backgroundColor: "#14CCA4",
    fontSize: 50,
    color: "red",
  },
  topbar: {
    flexDirection: "row",
    backgroundColor: "#14CCA4",
    width: "100%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    paddingTop: 20,
    elevation: 11,
  },
  topbartext: {
    fontSize: 40,
    color: "white",
    fontWeight: 'bold',
  },
  LogoutButton: {
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#BC3908",
    width: "100%",
    borderRadius: 5,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  logouttext: {
    color: "black",
    fontSize: 25,
  },
  active: {
    backgroundColor: '#6D7275',
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
    borderRadius: 10,
    padding: 100,
    width: "99%",
    opacity: 1,
  },
  activetext: {
    fontSize: 30,
    color: "white",
  },
  ActiveButton: {
    backgroundColor: "#14CCA4",
    borderRadius: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  activebuttontext: {
    fontSize: 30,
    padding: 5,
    color: "black",
  },
  Profile: {
    backgroundColor: '#6D7275',
    textAlign: 'center',
    borderRadius: 5,
    padding: 10,
    width: "99%",
    opacity: 1,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  ProfileInfo: {
    fontSize: 25,
    color: "white",
  },
  EditButton: {
    flexDirection: "row",
    backgroundColor: "#BC3908",
    alignContent: "center",
    justifyContent: "center",
    width: "30%",
    borderRadius: 5,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  editbuttontext: {
    fontSize: 30,
    color: "black",
  },
  BreakButton: {
    backgroundColor: "#14CCA4",
    padding: 10,
    flexDirection: "row",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  breaktext: {
    fontSize: 30,
  },
  listoftasks: {
    maxHeight: "70%",
    width: "80%",
  },
  Tasks: {
    padding: 0,
    borderRadius: 1,
    backgroundColor: "white",
    borderColor: "#6D7275",
    borderWidth: 10,
  },
  separator: {
    flex: 1,
    borderWidth: 2,
    borderColor: "black",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  taskinfo: {
    fontSize: 30,
  },
  claimButton: {
    backgroundColor: "#14CCA4",
    padding: 10,
    flexDirection: "row",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,
    elevation: 11,
  },
  title: {
    fontSize: 25,
    color: 'green'
  }
});