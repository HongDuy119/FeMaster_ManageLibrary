import { useTheme } from '@emotion/react';
import { useState } from 'react';
import { AiTwotoneStar } from 'react-icons/ai'

const ItemComment = (props) => {
    const {item} = props
   
    const createArray = (length) => {
        var arr = []
        for (let i = 1; i <= length; i++) {
            arr.push(i)
        }
        return arr
    }

    return (
        <div className='d-flex py-3 border-top border-bottom'>
            <div className='me-2'>
                <div style={{ width: '40px' }}>
                    <img src={item.user.avatar?`http://localhost:8082/${item.user.avatar}`:"https://img6.thuthuatphanmem.vn/uploads/2022/11/18/anh-avatar-don-gian-ma-dep_081757969.jpg"} className='w-100 rounded-circle' alt="" />
                </div>
            </div>
            <div className="d-flex flex-column flex-fill px-2 ">
                <div className="fw-semibold">{item.user.name}</div>
                <div className="mb-2 d-flex align-items-center">{createArray(item.star).map((index) => (<AiTwotoneStar key={index} className="text-warning" />))}</div>
                <div className="">{item.comment}</div>
            </div>
        </div>
    )
}
export default ItemComment