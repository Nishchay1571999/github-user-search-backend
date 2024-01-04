
import type { NextApiRequest, NextApiResponse } from 'next'
import { Octokit } from '@octokit/rest'

type Data = any

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const {url} = req
  const octokit = new Octokit();
  let data:any = {}
  if(url){
  const {searchParams} = new URL(url , "http://"+req.headers.host)
  const username = searchParams.get("userid")
  if(username){
    octokit.rest.users.getByUsername({username:username}).then((response)=>{
      res.status(200).json(response.data)
    })
  }else {
    octokit.rest.users.list({since:300,per_page:10}).then((response)=>{
      data =  response.data
      res.status(200).json(data)  
    })
  }
  }else {
    res.send(404)
  }
}
