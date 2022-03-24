import React, { Component, useState } from 'react';
import { StyleSheet, Text, View, ImageBackground, Button, TextInput, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { render } from 'react-dom';
import bp from '../Path.js';

export default class PasswordChange extends Component {
  constructor() {
    super()
    this.state =
    {
      message: '',
      Email: ''
    }
  }

  doPassReset = async () => {

    if (this.state.Email === '') {
      this.setState({message:"Please enter your information"});
    }
    else {
      const urlPR = bp.buildPath("api/account/letmein/" + this.state.Email);
      try {
        const response = await fetch(urlPR, { method: 'get', headers: { "Content-Type": "application/json" } });
        var res = JSON.parse(await response.text());
        if (res.err_code) {
          this.setState({message: res.description});
        }

      } catch (e) {
        this.setState({message: ' ' + e.message});
      }
    }
  };

  goBack = () => {
    this.props.navigation.navigate('Login');
  };

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground
          style={styles.backgroundImage}
          source={require("../images/gradient.png")}
        >
          {/*Break*/}
          <Text>{"\n"}</Text>
          <View style={styles.blanck}>
            <View style={{ flexDirection: 'column' }}>
              <Text style={styles.title}> Password Reset </Text>
              <TouchableOpacity
                color="black"
                style={styles.button}
                onPress={this.goBack}
              >
                <View style={styles.button_pack}>
                  <Text style={styles.button}>Back</Text>
                </View>
              </TouchableOpacity>
            </View>
            {/*Break*/}
            <Text>{"\n"}</Text>

            {/* Email */}
            <View style={styles.email_pack}>
              <Feather name="smartphone" size={30} color="black" />
              <TextInput
                style={styles.email}
                placeholder="Enter Your Phone Number"
                onChangeText={(val) => {
                  this.setState({Email:val});
                }}
              />
            </View>
            {/*Break*/}
            <Text>{"\n"}</Text>

            {/* Status */}
            <View>
              <Text style={styles.status}>{this.state.message}</Text>
            </View>
            {/*Break*/}
            <Text>{"\n"}</Text>

            {/* Reset */}
            <TouchableOpacity
              color="black"
              title="LOGIN"
              style={styles.button}
              onPress={this.doPassReset}
            >
              <View style={styles.button_pack}>
                <Text style={styles.button}>Reset</Text>
              </View>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
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
    justifyContent: "center",
    alignItems: "center",
    opacity: 1,
  },
  email: {
    textAlign: "left",
    fontSize: 20,
    backgroundColor: "lightgrey",
    borderRadius: 5,
    height: 50,
    width: "80%",
  },
  button: {
    textAlign: "center",
    fontSize: 30,
    backgroundColor: "#14CCA4",
    borderRadius: 5,
    fontWeight: "bold",
    height: 40,
    color: "white",
  },
  status: {
    fontSize: 20,
    textAlign: "center",
    color: "#BC3908",
    fontWeight: "bold",
  },
  blanck: {
    padding: 20,
    backgroundColor: "black",
    borderRadius: 5,
    width: "75%",
  },
  email_pack: {
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "lightgrey",
    borderRadius: 5,
  },
  button_pack: {
    justifyContent: "center",
    flexDirection: "row",
    backgroundColor: "#14CCA4",
    borderRadius: 5,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    color: "white",
  },
});