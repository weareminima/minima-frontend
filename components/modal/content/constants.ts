export const COMMON_CONTENT_CLASSES = 'absolute pointer-events-auto top-1/2 inset-x-4 left-0 sm:left-1/2 transform -translate-y-1/2 w-full h-full sm:h-auto sm:max-h-[90%] sm:-translate-x-1/2 outline-none bg-white flex flex-col grow overflow-hidden sm:rounded-3xl';
export const CONTENT_CLASSES = {
  xs: `sm:w-[300px] ${COMMON_CONTENT_CLASSES}`,
  s: `sm:w-4/6 md:w-1/2 lg:w-5/12 xl:w-1/3 ${COMMON_CONTENT_CLASSES}`,
  default: `sm:w-4/5 md:w-2/3 lg:1/2 xl:w-2/5 ${COMMON_CONTENT_CLASSES}`,
  l: `sm:w-10/12 md:w-10/12 lg:w-10/12 xl:w-8/12 ${COMMON_CONTENT_CLASSES}`,
  xl: `sm:w-full md:w-full lg:w-full xl:w-full ${COMMON_CONTENT_CLASSES}`,
};

export const OVERLAY_CLASSES = 'z-50 absolute inset-0 bg-dark/25 bg-blur';
