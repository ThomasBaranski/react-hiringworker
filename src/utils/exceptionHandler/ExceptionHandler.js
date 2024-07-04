import toast from "react-hot-toast";

export const ExceptionHanlder = (res) => {
  if (res?.data) {
    // console.log("res in ex", res?.data?.message);
    if (res?.data?.Response) {
      return toast.success(res?.data?.Response);
    } else {
      toast.success(res?.data?.message);
    }
  } else {
    // console.log("res?.error", res?.error);
    if (res?.error?.data?.Response?.error) {
      return toast.error(res?.error?.data?.Response?.error[0]);
    } else if (res?.error?.data?.Response) {
      return toast.error(res?.error?.data?.Response);
    } else {
      return toast.error(res?.error?.data?.message);
    }
  }
};
