

import type { NextApiRequest, NextApiResponse } from 'next'
import { Octokit } from '@octokit/rest'

type Data = any

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {url} = req
  const octokit = new Octokit();
  let data:ProfileResponse = {
    name:null,
    bio:null,
    company:null,
    blog:null,
    location:null,
    email:null,
    avatar_url:null,
    login:null,
    followers:null,
    following:null,
  }
  if(url){
  const {searchParams} = new URL(url , `http://${req.headers.host}`)
  const username = searchParams.get("userid")
  console.log(username)
  if(username){
    let followers:Array<Followers> = []
    let following:Array<Followers> = []

    octokit.rest.users.getByUsername({username:username}).then((response)=>{
      octokit.rest.users.listFollowersForUser({username:username}).then((followerArray)=>{
        followers = followerArray.data.map((item)=>{
          return {
            login:item.login,
            avatar_url:item.avatar_url,
            type:item.type
          }
        })
        octokit.rest.users.listFollowingForUser({username:username}).then((followingArray)=>{
          following = followingArray.data.map((item)=>{
            return {
              login:item.login,
              avatar_url:item.avatar_url,
              type:item.type
            }
          })
          data = {
            name:response.data.name,
            company: response.data.company,
            blog:response.data.blog,
            bio:response.data.bio,
            location:response.data.location,
            email:response.data.email,
            avatar_url:response.data.avatar_url,
            login:response.data.login,
            followers: followers,
            following: following
          }
          res.status(200).json(data)
        })
      })
    })
  }else {
    res.status(400).json({
      message:"UserID Field requirerd"
    })
  }
  }else {
    res.status(400).json({
      message:"UserID Field requirerd"
    })

  }

}
