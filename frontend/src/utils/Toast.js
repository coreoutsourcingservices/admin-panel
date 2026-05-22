import toast from "react-hot-toast";

const toastConfig = {
  position: "top-center",
  duration: 2000,

  style: {
    background: "#222",
    color: "#fff",
    padding: "12px 16px",
    borderRadius: "10px",
      zIndex: 999999999999,
  },
};


// Success Toast
export const handleSuccess = (msg) => {
  toast.success(msg, toastConfig);
};


// Error Toast
export const handleError = (msg) => {
  toast.error(msg, toastConfig);
};


// Normal Toast
export const handleNormal = (msg) => {
  toast(msg, toastConfig);
};


// Loading Toast
export const handleLoading = (msg = "Loading...") => {
  return toast.loading(msg, toastConfig);
};


// Remove Toast
export const handleDismiss = (id) => {
  toast.dismiss(id);
};


// Promise Toast
export const handlePromise = (promise) => {

  toast.promise(
    promise,

    {
      loading: "Loading...",
    },
    toastConfig
  );
};