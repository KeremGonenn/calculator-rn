import { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      resultText: "",
      calculationText: "",
    };
    this.operators = ["DEL", "+", "-", "*", "/"];
  }

  calculateResult() {
    const text = this.state.resultText;
    console.log(text, eval(text));
    this.setState({
      calculationText: eval(text),
    });
  }

  validate() {
    const text = this.state.resultText;
    switch (text.slice(-1)) {
      case "+":
      case "-":
      case "*":
      case "/":
        return false;
    }
    return true;
  }

  buttonPressed(text) {
    console.log(text);

    if (text == "=") {
      return this.validate() && this.calculateResult();
    }

    this.setState({
      resultText: this.state.resultText + text,
    });
  }

  operate(operators) {
    switch (operators) {
      case "DEL":
        let text = this.state.resultText.split("");
        text.pop();
        this.setState({
          resultText: text.join(""),
        });
        break;
      case "+":
      case "-":
      case "*":
      case "/":
        const lastChar = this.state.resultText.split("").pop();

        if (this.operators.indexOf(lastChar) > 0) return;

        if (this.state.text == "") return;
        this.setState({
          resultText: this.state.resultText + operators,
        });
    }
  }

  render() {
    let rows = [];
    let nums = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 9],
      [".", 0, "="],
    ];
    for (let i = 0; i < 4; i++) {
      let row = [];
      for (let j = 0; j < 3; j++) {
        row.push(
          <TouchableOpacity
            key={nums[i][j]}
            onPress={() => this.buttonPressed(nums[i][j])}
            style={styles.btn}
          >
            <Text style={styles.btnText}>{nums[i][j]}</Text>
          </TouchableOpacity>
        );
      }
      rows.push(
        <View key={i} style={styles.row}>
          {row}
        </View>
      );
    }

    let ops = [];
    for (let i = 0; i < 5; i++) {
      ops.push(
        <TouchableOpacity
          key={this.operators[i]}
          style={styles.btn}
          onPress={() => this.operate(this.operators[i])}
        >
          <Text style={[styles.btnText, styles.white]}>
            {this.operators[i]}
          </Text>
        </TouchableOpacity>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.results}>
          <Text style={styles.resultText}>{this.state.resultText}</Text>
        </View>
        <View style={styles.calculation}>
          <Text style={styles.calculationText}>
            {this.state.calculationText}
          </Text>
        </View>
        <View style={styles.buttons}>
          <View style={styles.numbers}>{rows}</View>
          <View style={styles.operators}>{ops}</View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  calculationText: {
    fontSize: 24,
    color: "white",
  },
  resultText: {
    fontSize: 30,
    color: "white",
  },
  btnText: {
    fontSize: 30,
  },
  white: {
    color: "white",
  },
  btn: {
    flex: 1,
    alignItems: "center",
    alignSelf: "stretch",
    justifyContent: "center",
  },
  row: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  results: {
    flex: 2,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  calculation: {
    flex: 1,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  buttons: {
    flexGrow: 7,
    flexDirection: "row",
  },
  numbers: {
    flex: 3,
    backgroundColor: "#434343",
  },
  operators: {
    flex: 1,
    justifyContent: "space-around",
    backgroundColor: "#636363",
  },
});
