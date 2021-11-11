import manajemenUsers from "@navigation/vertical/manajemen-users";
import manajemenSoal from "@navigation/vertical/bank-soal";
import manajemenTo from "@navigation/vertical/manajemen-try-out";
import accessControl from "@/navigation/vertical/access-control";

export default [
  {
    title: 'Home',
    route: 'home',
    icon: 'HomeIcon',
  },
  ...manajemenUsers,
  ...manajemenSoal,
  ...manajemenTo,
  ...accessControl
]
