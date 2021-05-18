export default async function({ $auth, redirect }) {
  let user = $auth.user;
  if (user && user.role != "admin") {
    redirect('/inventory')
  }
}