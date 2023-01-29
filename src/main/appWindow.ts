import { app, BrowserWindow, ipcMain, IpcMainEvent } from 'electron';
import path from 'path';
import { events } from './modules/events';
import fs from 'fs';
import { eventSystem } from './modules/eventSystem';

// Electron Forge automatically creates these entry points
declare const APP_WINDOW_WEBPACK_ENTRY: string;
declare const APP_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let appWindow: BrowserWindow;

/**
 * Check if the data files exist
 * If not, create them
 * If they do, delete the ones in the resources folder
 * @returns {void}
 */
function checkDataFiles() {

  // If in development, don't do anything with the data files
  // This is because the data files are in the assets folder not the resources folder
  if(process.env.NODE_ENV === 'development'){
    return;
  }

  // Check if the data files exist
  // If not, create them

  const userDataPath = app.getPath('userData');

  const resources = process.resourcesPath;

  const xmlFolder = path.join(userDataPath, 'xml');
  const dataFolder = path.join(xmlFolder, 'data');
  const langFolder = path.join(xmlFolder, 'lang');

  if(!fs.existsSync(xmlFolder)){
    fs.mkdirSync(xmlFolder);
    fs.mkdirSync(dataFolder);
    fs.mkdirSync(langFolder);
  }

  // Check if the save data exists in the user data folder
  // eslint-disable-next-line no-constant-condition
  if(fs.existsSync(path.join(xmlFolder, 'save_data.xml')) && false){
    // If it does, delete the one in the resources folder
    console.log('Save data exists');
    if(fs.existsSync(path.join(resources, 'save_data.xml'))){
      fs.rmSync(path.join(resources, 'save_data.xml'));
    }
  } else {

    if(fs.existsSync(path.join(xmlFolder, 'save_data.xml'))){

      // If it doesn't, copy the one in the resources folder to the user data folder then delete it from the resources folder
      console.log('Save data does not exist');
      fs.copyFileSync(path.join(resources, 'save_data.xml'), path.join(dataFolder, 'save_data.xml'));
      
      if(fs.existsSync(path.join(resources, 'save_data.xml'))){
        fs.rmSync(path.join(resources, 'save_data.xml'));
      }
    }
  }

  // Check if the settings data exists in the user data folder
  if(fs.existsSync(path.join(xmlFolder, 'settings.xml'))){
    // If it does, delete the one in the resources folder
    console.log('Settings data exists');
    if(fs.existsSync(path.join(resources, 'settings.xml'))){
      fs.rmSync(path.join(resources, 'settings.xml'));
    }
  } else {
    // If it doesn't, copy the one in the resources folder to the user data folder then delete it from the resources folder
    console.log('Settings data does not exist');
    fs.copyFileSync(path.join(resources, 'settings.xml'), path.join(xmlFolder, 'settings.xml'));
    if(fs.existsSync(path.join(resources, 'settings.xml'))){
      fs.rmSync(path.join(resources, 'settings.xml'));
    }
  }

  // Check if the item data exists in the resources folder
  if(fs.existsSync(path.join(resources, 'item_data.xml'))){
    // If it does, copy it to the user data folder then delete it from the resources folder
    fs.copyFileSync(path.join(resources, 'item_data.xml'), path.join(dataFolder, 'item_data.xml'));
    fs.rmSync(path.join(resources, 'item_data.xml'));
  }

  // Check if the lang_fr data exists in the resources folder
  if(fs.existsSync(path.join(resources, 'lang_fr.xml'))){
    // If it does, copy it to the user data folder then delete it from the resources folder
    fs.copyFileSync(path.join(resources, 'lang_fr.xml'), path.join(langFolder, 'lang_fr.xml'));
    fs.rmSync(path.join(resources, 'lang_fr.xml'));
  }

  // Check if the lang_en data exists in the resources folder
  if(fs.existsSync(path.join(resources, 'lang_en.xml'))){
    // If it does, copy it to the user data folder then delete it from the resources folder
    fs.copyFileSync(path.join(resources, 'lang_en.xml'), path.join(langFolder, 'lang_en.xml'));
    fs.rmSync(path.join(resources, 'lang_en.xml'));
  }

  // Check if the carrack data exists in the resources folder
  if(fs.existsSync(path.join(resources, 'carrack_data.xml'))){
    // If it does, copy it to the user data folder then delete it from the resources folder
    fs.copyFileSync(path.join(resources, 'carrack_data.xml'), path.join(dataFolder, 'carrack_data.xml'));
    fs.rmSync(path.join(resources, 'carrack_data.xml'));
  }
}

/**
 * Create Application Window
 * @returns {BrowserWindow} Application Window Instance
 */
export function createAppWindow(): BrowserWindow {

  
  eventSystem.getInstance().addEvent('app-maximize');

  // Check if the data files exist
  checkDataFiles();

  // Create new window instance
  appWindow = new BrowserWindow({
    width: 1000,
    height: 800,
    minWidth: 1000,
    minHeight: 800,
    backgroundColor: '#202020',
    show: false,
    autoHideMenuBar: true,
    frame: false,
    titleBarStyle: 'hidden',
    icon: path.resolve('assets/images/appIcon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: APP_WINDOW_PRELOAD_WEBPACK_ENTRY,
      sandbox: false,
    },
  });

  // Load the index.html of the app window.
  appWindow.loadURL(APP_WINDOW_WEBPACK_ENTRY);

  // Show window when its ready to
  appWindow.on('ready-to-show', () => {
    appWindow.show()

    eventSystem.getInstance().linkToEvent((e, {maximize})=>{

      console.log(maximize ? 'Maximize window' : 'Unmaximize window')

      const ev = e as IpcMainEvent;

      if(appWindow.isMaximized()){
        appWindow.unmaximize();
        ev.sender.send('app-maximize-reply', false);
      } else {
        appWindow.maximize();
        ev.sender.send('app-maximize-reply', true);
      }
    }, 'app-maximize', 'appWindow');
  });

  // Register Inter Process Communication for main process
  registerMainIPC();

  // Close all windows when main window is closed
  appWindow.on('close', () => {
    appWindow = null;
    app.quit();
  });

  process.on('warning', e => console.warn(e.stack));

  return appWindow;
}

/**
 * Register Inter Process Communication
 */
function registerMainIPC() {
  /**
   * Here you can assign IPC related codes for the application window
   * to Communicate asynchronously from the main process to renderer processes.
   */

  events()
}


