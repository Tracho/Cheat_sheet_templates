function log_group(value, text) {
 
  if (typeof value === 'array') {
    console.group(index);
    value.forEach((item, index) => {
      console.dir(item);
    });
    console.groupEnd();
  } else {
    console.group(text);
    console.dir(value);
    console.groupEnd();
  }

} export default log_group;