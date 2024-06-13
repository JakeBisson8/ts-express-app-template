require('dotenv-safe').config();
const Service = require('node-windows').Service;
const path = require('path');

const { SERVICE_NAME, SERVICE_DESCRIPTION } = process.env;

const svc = new Service({
  name: SERVICE_NAME,
  description: SERVICE_DESCRIPTION,
  script: path.join(__dirname, 'dist', 'index.js').replace('\\', '\\\\'),
  env: {
    name: 'NODE_ENV',
    value: 'production',
  },
});

svc.on('install', () => {
  console.log('Service installed!');
  svc.start();
});

svc.on('alreadyinstalled', () => {
  console.log('Service is already installed');
  svc.start();
});

svc.on('start', () => {
  console.log('Service started!');
});

svc.on('stop', () => {
  console.log('Service Stopped!');
});

svc.on('uninstall', () => {
  console.log('Service uninstalled!');
});

svc.on('alreadyuninstalled', () => {
  console.log('Service is already uninstalled');
});

svc.on('error', (err) => {
  console.error('Error occured:', err);
});

const command = process.argv[2];
switch (command) {
  case 'install':
    console.log('Installing the service...');
    svc.install();
    break;
  case 'start':
    console.log('Starting the service...');
    svc.start();
    break;
  case 'stop':
    console.log('Stopping the service...');
    svc.stop();
    break;
  case 'uninstall':
    console.log('Uninstalling the service...');
    svc.uninstall();
    break;
  default:
    console.log(`'${command}' is not a valid command.\nSupported commands are: install, start, stop, uninstall`);
    break;
}
