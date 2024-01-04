type ProfileResponse = {
  name:string|null;
  bio:string|null;
  company:string|null;
  blog:string|null;
  location:string|null;
  email:string|null;
  avatar_url:string|null,
  login:string|null,
  followers:Array<Followers>|null;
  following:Array<Followers>|null;
}


type Followers = {
  login:string,
  avatar_url:string,
  type:string,
}
