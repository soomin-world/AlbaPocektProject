import Swal from "sweetalert2";

function sweetAlert(timer: number, icon: any, title: string): void {
  Swal.mixin({
    toast: true,
    position: "top",
    showConfirmButton: false,
    timer: timer,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener("mouseenter", Swal.stopTimer);
      toast.addEventListener("mouseleave", Swal.resumeTimer);
    },
  }).fire({
    icon: icon,
    title: title,
  });
}
export default sweetAlert;
