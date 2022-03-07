export interface User {
  key ?: string,
  nick : string,
  email : string,
  roles : string[],
  history : Array<{name : string, rated : boolean, starRated : boolean}>,
  banned : boolean
}
