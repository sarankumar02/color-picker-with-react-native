import { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import React from "react";
import ColorPicker from "react-native-wheel-color-picker";
import { Dimensions } from "react-native";
import Clipboard from "@react-native-clipboard/clipboard";
import Header from "../components/Header";
import ModeDropdown from "../components/ModeDropdown";

class MainScreen extends Component {
  state = {
    currentColor: "#FFFFFF",
    swatchesLast: true,
    swatchesEnabled: true,
    disc: false,
    swatchesOnly: false,
    mode: "hex",
  };
  //gets called after you stop dragging the pin
  onColorChangeComplete(value) {
    console.log(this.hex2rgb(value));
    this.setState({ currentColor: value });
  }
  hex2rgb = (hex) => {
    const [r, g, b] = hex.match(/\w\w/g).map((x) => parseInt(x, 16));
    return `rgb(${r},${g},${b})`;
  };

  hexToHSL(H) {
    // Convert hex to RGB first
    let r = 0,
      g = 0,
      b = 0;
    if (H.length == 4) {
      r = "0x" + H[1] + H[1];
      g = "0x" + H[2] + H[2];
      b = "0x" + H[3] + H[3];
    } else if (H.length == 7) {
      r = "0x" + H[1] + H[2];
      g = "0x" + H[3] + H[4];
      b = "0x" + H[5] + H[6];
    }
    // Then to HSL
    r /= 255;
    g /= 255;
    b /= 255;
    let cmin = Math.min(r, g, b),
      cmax = Math.max(r, g, b),
      delta = cmax - cmin,
      h = 0,
      s = 0,
      l = 0;

    if (delta == 0) h = 0;
    else if (cmax == r) h = ((g - b) / delta) % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;

    h = Math.round(h * 60);

    if (h < 0) h += 360;

    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);

    return "hsl(" + h + "," + s + "%," + l + "%)";
  }

  //gets called while your dragging the pin to pick a color
  onColorChange(value) {
    // console.log(value + " color change ");
  }

  setMode(value) {
    console.log("Mode change ", value);
    this.setState({ mode: value });
  }

  getColorBySelectedMode = () => {
    return this.state.mode === "hex"
      ? this.state.currentColor.toUpperCase()
      : this.state.mode === "hsl"
      ? this.hexToHSL(this.state.currentColor)
      : this.hex2rgb(this.state.currentColor);
  };

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <View style={styles.body}>
          <ColorPicker
            color={this.state.currentColor}
            swatchesOnly={this.state.swatchesOnly}
            onColorChange={this.onColorChange.bind(this)}
            onColorChangeComplete={this.onColorChangeComplete.bind(this)}
            thumbSize={30}
            sliderSize={20}
            noSnap={true}
            style={styles.colorPickerStyles}
            row={false}
            swatchesLast={this.state.swatchesLast}
            swatches={this.state.swatchesEnabled}
            discrete={this.state.disc}
          />
          <View style={styles.spacer}>
            <View style={{ width: 120 }}>
              <ModeDropdown
                onModeChange={this.setMode.bind(this)}
              ></ModeDropdown>
            </View>

            <TouchableOpacity
              style={styles.clipboard}
              onPress={() => Clipboard.setString(this.state.currentColor)}
            >
              <View style={{ justifyContent: "center"}}>
                <Text style={styles.colorText}>
                  {this.getColorBySelectedMode()}
                </Text>
              </View>
              <View style={{ height: 50, width: 50 }}>
                <Image
                  source={require("../../assets/images/copy.png")}
                  style={styles.imageStyle}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  body: {
    // paddingHorizontal: Dimensions.get('window').width / 9,
    marginVertical: Dimensions.get("window").height / 9,
    flex: 1,
  },
  colorPickerStyles: {
    paddingHorizontal: Dimensions.get("window").width / 9
  },
  colorText: {
    color: "black",
    fontSize: 18.8,
    fontFamily: "CircularStd-Book",
    fontStyle: "normal",
    textAlign: "center",
    marginBottom:10
  },
  clipboard: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 10,
  },
  imageStyle: {
    resizeMode: "contain",
    flex: 1,
    marginTop: 15,
    marginLeft: 5,
    aspectRatio: 1,
  },
  spacer: {
    flex: 0.2,
    marginTop:10,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
});

export default MainScreen;
