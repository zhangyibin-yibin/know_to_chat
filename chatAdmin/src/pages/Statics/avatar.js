import React, { useEffect, useState } from 'react'

import './avatar.scss'

import { systemApi } from './../../api'
import { isDev } from './../../utils'

const IMG_BASE_URL = isDev ? 'http://localhost:3333/' : 'http://co-messager.chenr.cn'

export default function AvatarStatics() {

  const [avatarList, setAvatarList] = useState([])
  console.log(setAvatarList);

  useEffect(() => {
    ;(async () => {
      const {data = {}} = await systemApi.getAvatar()
      console.log(data);
      if (data.status === 2000) {
        setAvatarList(data.data)
      }
    })()
  }, [])

  return (
    <div className="statics-avatar-page">
      <main className="avatar-list">
        {
          avatarList.map(item => {
            return <span className="avatar-item">
              <img width="200" key={item} src={IMG_BASE_URL + 'face/' + item} alt="图片" />
              <span className="oper">oper</span>
            </span>
          })
        }
      </main>
    </div>
  )
}
