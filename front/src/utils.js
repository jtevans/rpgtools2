class Utils {
  static ucfirst(str) {
    if (!str) {
      return str;
    }
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

export default Utils;