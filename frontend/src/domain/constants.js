const DEFAULT_IMAGE_BASE_PATH = '/images/default/';

export const INSTRUMENT_FIELD_NAMES = {
  BRAND: 'brand',
  MODEL: 'model',
  PHYSICAL_ADDRESS: 'physicalAddress',
  DETECTED_PHYSICAL_ADDRESS: 'detectedPhysicalAddress',
  DESCRIPTION: 'description',
  IMAGE: 'instrumentImage',
};

export const DEFAULT_IMAGES = {
  NONE: {
    path: DEFAULT_IMAGE_BASE_PATH + 'none.png',
  },

  CAMERA: {
    path: DEFAULT_IMAGE_BASE_PATH + 'camera.png',
  },

  DAQ: {
    path: DEFAULT_IMAGE_BASE_PATH + 'daq.png',
  },

  FUNCTIONS_GENERATOR: {
    path: DEFAULT_IMAGE_BASE_PATH + 'functions_generator.png',
  },

  MULTIMETER: {
    path: DEFAULT_IMAGE_BASE_PATH + 'multimeter.png',
  },

  OSCILLOSCOPE: {
    path: DEFAULT_IMAGE_BASE_PATH + 'oscilloscope.png',
  },

  POWER_SUPPLY: {
    path: DEFAULT_IMAGE_BASE_PATH + 'power_supply.png',
  },
};
