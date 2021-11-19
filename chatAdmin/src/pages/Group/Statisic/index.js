import React, { useState,useEffect } from 'react'
import { groupApi } from './../../../api'

import {formatting} from './../../../utils'
import './index.scss'

const IMG_BASE_URL = 'http://localhost:3333/'

function StatisticsGroup() {
  const [groupList, setGroupList] = useState([])
  useEffect(()=>{
    ;(async () => {
      const { data } = await groupApi.getAllGroup()
      if (data.status === 2000) {
        setGroupList(data.data)
      }
    })()
  },[])

  return (
    <div className='view_group'>
      {
        groupList.map(item => {
          return <div key={item._id} className='group_list'>
            <img className='group_avatar' width="60" src={IMG_BASE_URL + item.img} alt="图片" />
            <span>创建时间：{formatting(item.createDate)}</span>
            <span className='group_name'>群名称：{item.title}</span>
            <span className='group_desc'>群描述：{item.desc===''?'群主太懒未设置！':item.desc}</span>
            <span>群主昵称：{item.holderUserId.nickname}</span>
            </div>
        })
      }
    </div>
  )
}

export default StatisticsGroup
