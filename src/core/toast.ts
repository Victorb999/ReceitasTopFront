import toastr from "toastr";

toastr.options = {
  closeButton: true,
  debug: false,
  progressBar: false,
  newestOnTop: true,
  preventDuplicates: false,
  positionClass: "toast-top-center",
  showDuration: 500,
  hideDuration: 4500,
  timeOut: 5000,
  extendedTimeOut: 100,
  showEasing: "swing",
  hideEasing: "linear",
  showMethod: "fadeIn",
  hideMethod: "fadeOut"
};

const toast = {
  success(msg: string, title: string) {
    toastr["success"](msg, title);
  },
  info(msg: string, title: string) {
    toastr["info"](msg, title);
  },
  error(msg: string, title: string) {
    toastr["error"](msg, title);
  },
  warning(msg: string, title: string) {
    toastr["warning"](msg, title);
  }
};

export default toast;
