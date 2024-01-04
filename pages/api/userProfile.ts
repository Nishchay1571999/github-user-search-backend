

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
    octokit.rest.users.getByUsername({username:username}).then((response)=>{
      data = response.data
    })
  }else {
    res.status(400).json({
      message:"UserID Field requirerd"
    })
  }
  res.status(200).json(data)

}
