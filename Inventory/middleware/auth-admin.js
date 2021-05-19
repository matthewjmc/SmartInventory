export default async function({ $auth, redirect }) {
  let user = $auth.user;
  if (!$auth.loggedIn) {
    redirect("/login");
  } else {
    if (user && user.role != "admin") {
      redirect("/inventory");
    }
  }
}
