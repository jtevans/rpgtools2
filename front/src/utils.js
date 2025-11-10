class Utils {
  static ucfirst(str) {
    if (!str) {
      return str;
    }

    if (typeof str != 'string') {
      str = str.toString();
    }

    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

export default Utils;