const LOGIN = `
  query login($user_name: String!, $password: String!) {
    user(where: { _and: { deleted_at: { _is_null: true }, user_name: { _eq: $user_name }, password: { _eq: $password } } }) {
      id
    }
  }
`

module.exports = {
  LOGIN
}
