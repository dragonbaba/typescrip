function readParams(object, structure) {
  if (structure instanceof Array) {
    const result = [];
    const exampleValue = structure[0];
    const rawValues = object;
    for (const rawValue of rawValues) {
      if (exampleValue instanceof Object) {
        if (rawValue === "") {
          if (exampleValue["@nullable"]) {
            result.push(null);
          }
          else {
            throw new Error(`Expecting a non-empty string as a non-null array, but recived a empty string`);
          }
        }
        else {
          result.push(readParams(JSON.parse(rawValue), exampleValue));
        }
      }
      else if (exampleValue === "number") {
        result.push(Number(rawValue));
      }
      else if (exampleValue === "string") {
        result.push(rawValue);
      }
    }
    return result;
  }
  else {
    // structure instanceof Object
    const result = {};
    for (const key of Object.keys(object)) {
      const exampleValue = structure[key];
      const rawValue = object[key];
      if (exampleValue instanceof Object) {
        if (rawValue === "") {
          if (exampleValue["@nullable"]) {
            result[key] = null;
          }
          else {
            throw new Error(`Expecting a non-empty string as a non-null object, but recived a empty string`);
          }
        }
        else {
          result[key] = readParams(JSON.parse(rawValue), exampleValue);
        }
      }
      else if (exampleValue === "number") {
        result[key] = Number(rawValue);
      }
      else if (exampleValue === "string") {
        result[key] = rawValue;
      }
    }
    return result;
  }
}

// 范例
// const pluginName = "Eureka";
// const learningStructure = {
//   "@nullable": true,
//   skillId: "number",
//   baseRequiredUseCount: "number",
//   successRate: "number",
//   useCountToSuccessTransRate: "number"
// };
// const pramStructure = {
//   skillLearnings: [{
//     skillId: "number",
//     learning1: learningStructure,
//     learning2: learningStructure,
//     learning3: learningStructure,
//     learning4: learningStructure,
//     learning5: learningStructure,
//   }]
// };
// const params = readParams(PluginManager.parameters(pluginName), pramStructure);