import { TWITTER_ID, FACEBOOK_APP_ID } from '~config/vendors'
import { copyText } from '~modules/browser'

import Button from './index'
import Icon from '~co/icon'
import FacebookCircleIcon from 'remixicon/icons/Logos/facebook-circle-fill.svg?react'
import FileCopyIcon from 'remixicon/icons/Document/file-copy-line.svg?react'
import MailIcon from 'remixicon/icons/Business/mail-line.svg?react'
import RedditIcon from 'remixicon/icons/Logos/reddit-fill.svg?react'
import TwitterIcon from 'remixicon/icons/Logos/twitter-fill.svg?react'

export function Share({ url, title }) {
    return [
        <Button
            key='twitter'
            variant='flat'
            style={{color: '#1DA1F2'}}
            target='_blank'
            rel='noopener noreferrer'
            href={`https://twitter.com/intent/tweet?via=${TWITTER_ID}&url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`}>
            <Icon 
                as={TwitterIcon} />
        </Button>,

        <Button
            key='facebook'
            variant='flat'
            style={{color: '#4267B2'}}
            target='_blank'
            rel='noopener noreferrer'
            href={`https://www.facebook.com/dialog/share?app_id=${FACEBOOK_APP_ID}&href=${encodeURIComponent(url)}&display=popup`}>
            <Icon 
                as={FacebookCircleIcon} />
        </Button>,

        <Button
            key='reddit'
            variant='flat'
            style={{color: '#FF4500'}}
            target='_blank'
            rel='noopener noreferrer'
            href={`https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`}>
            <Icon 
                as={RedditIcon} />
            </Button>,

        <Button
            key='email'
            variant='flat'
            href={`mailto:?body=${encodeURIComponent(url)}`}>
            <Icon 
                as={MailIcon} />
        </Button>,

        <Button
            key='clipboard'
            variant='flat'
            onClick={()=>copyText(url)}>
            <Icon 
                as={FileCopyIcon} />
        </Button>,
    ]
}