let child_process = require("child_process");
const runPy2 = async (filePath, inputPath) => {
  const runPython = `python ${filePath}`;
  return new Promise((resolve, reject) => {
    child_process.exec(runPython, (error, stdout, stderr) => {
      if (error) {
        reject(error.message);
      }
      if (stderr) {
        reject(stderr);
      }
      resolve(stdout);
    });
  });
};
module.exports = runPy2;
