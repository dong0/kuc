import { Notification } from "./index.ts";

export default {
  title: "desktop/notification",
  argTypes: {
    text: { name: "text" },
    duration: { name: "duration" },
    type: {
      name: "type",
      options: ["success", "info", "danger"],
      control: {
        type: "select",
      },
    },
  },
};
const template = (args) => {
  const notification = new Notification({ ...args });
  notification.addEventListener("close", (event) => {
    console.log(event);
  });
  const root = document.createElement("div");
  const openButton = document.createElement("button");
  openButton.textContent = "open";
  openButton.addEventListener("click", (event) => {
    notification.open();
  });
  const closeButton = document.createElement("button");
  closeButton.textContent = "close";
  closeButton.addEventListener("click", (event) => {
    notification.close();
  });

  root.appendChild(openButton);
  root.appendChild(closeButton);
  return root;
};
export const Base = template.bind({});
Base.args = {
  text: "不正です!!",
  type: "info",
};
export const Base1 = template.bind({});
Base1.args = {
  text: "Duration 3 seconds",
  type: "info",
  duration: 3000,
};
