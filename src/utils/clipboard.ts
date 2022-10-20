const clipboard = {
  copy: function (str: string) {
    let textarea;
    let result;

    try {
      textarea = document.createElement("textarea");
      textarea.setAttribute("readonly", "true");
      textarea.setAttribute("contenteditable", "true");
      textarea.style.position = "fixed"; // prevent scroll from jumping to the bottom when focus is set.
      textarea.value = str;

      document.body.appendChild(textarea);

      textarea.focus();
      textarea.select();

      const range = document.createRange();
      range.selectNodeContents(textarea);

      const sel = window.getSelection();
      if (sel) {
        sel.removeAllRanges();
        sel.addRange(range);
      }

      textarea.setSelectionRange(0, textarea.value.length);
      result = document.execCommand("copy");
      return result;
    } catch (err) {
      console.error(err);
      result = null;
      return false;
    } finally {
      if (textarea) {
        document.body.removeChild(textarea);
      }
    }
  },
};

export default clipboard;
