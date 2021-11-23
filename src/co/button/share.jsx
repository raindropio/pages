import { TWITTER_ID, FACEBOOK_APP_ID } from '~config/vendors'
import { copyText } from '~modules/browser'

import Button from './index'
import Icon from '~co/icon'

export function Share({ url, title }) {
    return [
        <Button
            key='twitter'
            variant='flat'
            style={{color: '#1DA1F2'}}
            target='_blank'
            href={`https://twitter.com/intent/tweet?via=${TWITTER_ID}&url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}>
            <Icon 
                name='twitter'
                variant='fill' />
        </Button>,

        <Button
            key='facebook'
            variant='flat'
            style={{color: '#4267B2'}}
            target='_blank'
            href={`https://www.facebook.com/dialog/share?app_id=${FACEBOOK_APP_ID}&href=${encodeURIComponent(url)}&display=popup`}>
            <Icon 
                name='facebook-circle'
                variant='fill' />
        </Button>,

        <Button
            key='reddit'
            variant='flat'
            style={{color: '#FF4500'}}
            target='_blank'
            href={`https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`}>
            <Icon 
                name='reddit'
                variant='fill' />
            </Button>,

        <Button
            key='email'
            variant='flat'
            href={`mailto:?body=${encodeURIComponent(url)}`}>
            <Icon 
                name='mail' />
        </Button>,

        <Button
            key='clipboard'
            variant='flat'
            onClick={()=>copyText(url)}>
            <Icon 
                name='file-copy' />
        </Button>,
    ]
}