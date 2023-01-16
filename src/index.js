const electron = require ('electron')

const app = electron.app // electron module
const BrowserWindow = electron.BrowserWindow //enables UI
const Menu = electron.Menu // menu module
const { ipcRenderer } = electron;


app.on('ready', _ => {
  win = new BrowserWindow({
    width: 900,
    height: 1000,
    icon: __dirname + "/favicon.ico",
  });
  const template = [
    {
      label: "Refresh", // Refreshes or reloads the page when clicked
      role: "reload",
    },

    {
      label: "Zoom in",
      role: "zoomin",
    },

    {
      label: "Zoom out",
      role: "zoomout",
    },
    { label: "Reset zoom", role: "resetzoom" },

    {
      label: "Exit",
      role: "quit", // closes app when clicked
    },
  ];

  myTray.setToolTip("my app");
  myTray.on("click", onClick);
  myTray.on("right-click", onRightClick);
  function onClick(event, bounds) {
    //click event bounds
    const { x, y } = bounds; //get window height and width
    const { height, width } = mainWindow.getBounds();
    if (mainWindow.isVisible()) {
      mainWindow.hide();
    } else {
      const yPosition = process.platform === "darwin" ? y : y - height;
      mainWindow.setBounds({
        x: x - width / 2,
        y: yPosition,
        height: height,
        width: width,
      });
      mainWindow.show();
    }
  }
  function onRightClick() {
    const menuConfig = Menu.buildFromTemplate([
      {
        label: "Quit",
        click: () => {
          app.quit();
        },
      },
    ]);
    myTray.popUpContextMenu(menuConfig);
  }
  
  const menu = Menu.buildFromTemplate(template); // sets the menu
  Menu.setApplicationMenu(menu);

  win.loadURL("https://hnz.li/wiki"); // loads this URL
})
