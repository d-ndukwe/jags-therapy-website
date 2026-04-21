// Replace 'your-cloud-name' with your actual Cloudinary cloud name


// A foolproof way to optimize ANY Cloudinary link
export const optimizeCloudinaryUrl = (rawUrl: string) => {
  if (!rawUrl) return "";
  
  // This finds "/upload/" and inserts the optimization parameters right after it
  return rawUrl.replace("/upload/", "/upload/f_auto,q_auto/");
};